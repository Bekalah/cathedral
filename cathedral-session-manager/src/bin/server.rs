use axum::{extract::State, http::StatusCode, response::Json, routing::post, Router};
use tower_http::cors::CorsLayer;
use serde_json::{json, Value};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt, EnvFilter};

use crate::{CathedralSessionManager, SessionRequest, PlatformType, Permission, UserDetails};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize tracing
    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "cathedral_session_server=debug,tower_http=debug".into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    // Initialize session manager
    let session_manager = std::sync::Arc::new(CathedralSessionManager::new());
    
    // Create the axum router
    let app = Router::new()
        .route("/api/session/create", post(create_session))
        .route("/api/session/sync", post(sync_project_state))
        .route("/api/session/deploy", post(deploy_to_master))
        .route("/api/session/status", post(get_status))
        .route("/api/health", post(health_check))
        .layer(CorsLayer::permissive())
        .with_state(session_manager);

    // Start the server
    let listener = tokio::net::TcpListener::bind("0.0.0.0:8080").await?;
    println!("🎭 Cathedral Session Manager Server starting on port 8080");
    println!("📱 Replit integration: READY");
    println!("🔗 Rust platforms sync: ACTIVE");
    println!("🌐 Master repository: https://bekalah.github.io/cathedral");
    
    axum::serve(listener, app).await?;
    
    Ok(())
}

async fn create_session(
    State(session_manager): State<std::sync::Arc<CathedralSessionManager>>,
    Json(request): Json<Value>,
) -> Result<Json<Value>, StatusCode> {
    let response = session_manager.create_session(
        SessionRequest {
            action: crate::SessionAction::CreateSession,
            platform: extract_platform_type(&request),
            user_details: extract_user_details(&request),
        }
    ).await;

    Ok(Json(json!({
        "success": response.success,
        "session_id": response.session_id,
        "message": response.message,
        "data": response.data
    })))
}

async fn sync_project_state(
    State(session_manager): State<std::sync::Arc<CathedralSessionManager>>,
    Json(request): Json<Value>,
) -> Result<Json<Value>, StatusCode> {
    let session_id = extract_session_id(&request)
        .map_err(|_| StatusCode::BAD_REQUEST)?;
    
    let project_state = extract_project_state(&request)
        .map_err(|_| StatusCode::BAD_REQUEST)?;

    let response = session_manager.sync_project_state(session_id, project_state).await;

    Ok(Json(json!({
        "success": response.success,
        "session_id": response.session_id,
        "message": response.message,
        "data": response.data
    })))
}

async fn deploy_to_master(
    State(session_manager): State<std::sync::Arc<CathedralSessionManager>>,
    Json(request): Json<Value>,
) -> Result<Json<Value>, StatusCode> {
    let session_id = extract_session_id(&request)
        .map_err(|_| StatusCode::BAD_REQUEST)?;

    let response = session_manager.deploy_to_master(session_id).await;

    Ok(Json(json!({
        "success": response.success,
        "session_id": response.session_id,
        "message": response.message,
        "data": response.data
    })))
}

async fn get_status(
    State(session_manager): State<std::sync::Arc<CathedralSessionManager>>,
) -> Result<Json<Value>, StatusCode> {
    let response = session_manager.get_status().await;

    Ok(Json(json!({
        "success": response.success,
        "message": response.message,
        "data": response.data
    })))
}

async fn health_check() -> Result<Json<Value>, StatusCode> {
    Ok(Json(json!({
        "status": "healthy",
        "service": "Cathedral Session Manager",
        "version": "1.0.0",
        "timestamp": chrono::Utc::now()
    })))
}

// Helper functions to extract data from JSON requests
fn extract_platform_type(request: &Value) -> PlatformType {
    if let Some(platform_str) = request.get("platform") {
        match platform_str.as_str().unwrap_or("replit") {
            "replit" => PlatformType::Replit,
            "github-codespaces" => PlatformType::GitHubCodespaces,
            "local-vscode" => PlatformType::LocalVSCode,
            "docker-rust" => PlatformType::DockerRust,
            custom => PlatformType::CustomRustPlatform(custom.to_string()),
        }
    } else {
        PlatformType::Replit
    }
}

fn extract_user_details(request: &Value) -> Option<UserDetails> {
    if let Some(user_data) = request.get("user_details") {
        Some(UserDetails {
            username: user_data.get("username")
                .and_then(|v| v.as_str())
                .unwrap_or("cathedral-dev")
                .to_string(),
            email: user_data.get("email")
                .and_then(|v| v.as_str())
                .unwrap_or("dev@cathedral.magnus")
                .to_string(),
            github_token: user_data.get("github_token")
                .and_then(|v| v.as_str())
                .map(|s| s.to_string()),
            replit_token: user_data.get("replit_token")
                .and_then(|v| v.as_str())
                .map(|s| s.to_string()),
            permissions: vec![
                Permission::Read,
                Permission::Write,
                Permission::Deploy,
            ],
        })
    } else {
        None
    }
}

fn extract_session_id(request: &Value) -> Result<uuid::Uuid, Box<dyn std::error::Error>> {
    if let Some(session_id_str) = request.get("session_id") {
        Ok(uuid::Uuid::parse_str(session_id_str.as_str().unwrap_or("") )?)
    } else {
        Err("session_id missing".into())
    }
}

fn extract_project_state(request: &Value) -> Result<crate::ProjectState, Box<dyn std::error::Error>> {
    if let Some(project_data) = request.get("project_state") {
        Ok(crate::ProjectState {
            current_branch: project_data.get("current_branch")
                .and_then(|v| v.as_str())
                .unwrap_or("main")
                .to_string(),
            files_modified: project_data.get("files_modified")
                .and_then(|v| v.as_array())
                .map(|arr| arr.iter().filter_map(|item| item.as_str().map(|s| s.to_string())).collect())
                .unwrap_or_default(),
            compilation_status: crate::CompilationStatus::Success("Rust compilation ready".to_string()),
            deployment_status: None,
            test_results: None,
        })
    } else {
        Err("project_state missing".into())
    }
}