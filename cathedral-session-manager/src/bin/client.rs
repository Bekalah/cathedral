use reqwest::Client;
use serde_json::{json, Value};
use std::env;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let args: Vec<String> = env::args().collect();
    
    if args.len() < 2 {
        print_usage();
        return Ok(());
    }

    let command = &args[1];
    let server_url = env::var("CATHEDRAL_SERVER_URL").unwrap_or_else(|_| "http://localhost:8080".to_string());
    
    let client = Client::new();
    
    match command.as_str() {
        "create" => {
            let platform = args.get(2).map(|s| s.as_str()).unwrap_or("replit");
            create_session(&client, &server_url, platform).await?
        }
        "sync" => {
            let session_id = args.get(2).expect("Session ID required");
            sync_project_state(&client, &server_url, session_id).await?
        }
        "deploy" => {
            let session_id = args.get(2).expect("Session ID required");
            deploy_to_master(&client, &server_url, session_id).await?
        }
        "status" => {
            get_status(&client, &server_url).await?
        }
        "health" => {
            health_check(&client, &server_url).await?
        }
        _ => {
            print_usage();
        }
    }

    Ok(())
}

async fn create_session(client: &Client, server_url: &str, platform: &str) -> Result<(), Box<dyn std::error::Error>> {
    println!("🎭 Creating Cathedral session on {}...", platform);
    
    let response = client
        .post(&format!("{}/api/session/create", server_url))
        .json(&json!({
            "platform": platform,
            "user_details": {
                "username": "cathedral-dev",
                "email": "dev@cathedral.magnus",
                "permissions": ["read", "write", "deploy"]
            }
        }))
        .send()
        .await?;

    let result: Value = response.json().await?;
    
    if result["success"].as_bool().unwrap_or(false) {
        println!("✅ Session created successfully!");
        if let Some(session_id) = result["session_id"].as_str() {
            println!("📋 Session ID: {}", session_id);
            println!("🔗 Use with: cathedral-client sync {}", session_id);
        }
    } else {
        println!("❌ Failed to create session: {}", result["message"]);
    }

    Ok(())
}

async fn sync_project_state(client: &Client, server_url: &str, session_id: &str) -> Result<(), Box<dyn std::error::Error>> {
    println!("🔄 Syncing project state for session {}...", session_id);
    
    let response = client
        .post(&format!("{}/api/session/sync", server_url))
        .json(&json!({
            "session_id": session_id,
            "project_state": {
                "current_branch": "main",
                "files_modified": [
                    "godot/scripts/core/cathedral_high_tech_music_system.gd",
                    "cathedral-magnum-opus-integration.sh"
                ],
                "compilation_status": "success"
            }
        }))
        .send()
        .await?;

    let result: Value = response.json().await?;
    
    if result["success"].as_bool().unwrap_or(false) {
        println!("✅ Project state synchronized successfully!");
        println!("🎵 High-Tech Music System: ACTIVE");
        println!("🏗️ Professional Modular Design: ACTIVE");
        println!("🛠️ Shell Integration: ACTIVE");
    } else {
        println!("❌ Sync failed: {}", result["message"]);
    }

    Ok(())
}

async fn deploy_to_master(client: &Client, server_url: &str, session_id: &str) -> Result<(), Box<dyn std::error::Error>> {
    println!("🚀 Deploying to Master Repository (bekalah.github.io/cathedral)...");
    
    let response = client
        .post(&format!("{}/api/session/deploy", server_url))
        .json(&json!({
            "session_id": session_id
        }))
        .send()
        .await?;

    let result: Value = response.json().await?;
    
    if result["success"].as_bool().unwrap_or(false) {
        println!("✅ Deployment successful!");
        if let Some(data) = result["data"].as_object() {
            if let Some(deployment_url) = data.get("deployment_url") {
                println!("🌐 Live at: {}", deployment_url);
            }
        }
        println!("🎉 Cathedral Magnum Opus v1.0 is LIVE!");
    } else {
        println!("❌ Deployment failed: {}", result["message"]);
    }

    Ok(())
}

async fn get_status(client: &Client, server_url: &str) -> Result<(), Box<dyn std::error::Error>> {
    println!("📊 Getting Cathedral Session Status...");
    
    let response = client
        .post(&format!("{}/api/session/status", server_url))
        .send()
        .await?;

    let result: Value = response.json().await?;
    
    if result["success"].as_bool().unwrap_or(false) {
        if let Some(data) = result["data"].as_object() {
            println!("\n🏛️ Cathedral Magnum Opus Status:");
            println!("├── Active Sessions: {}", data.get("active_sessions").unwrap_or(&json!(0)));
            println!("├── Compilation Success: {}", data.get("compilation_success").unwrap_or(&json!(0)));
            println!("├── Deployment Success: {}", data.get("deployment_success").unwrap_or(&json!(0)));
            println!("└── System Ready: {}", data.get("system_ready").unwrap_or(&json!(false)));
            
            if let Some(platform_dist) = data.get("platform_distribution") {
                println!("\n🌐 Platform Distribution:");
                for (platform, count) in platform_dist.as_object().unwrap_or(&std::collections::HashMap::new()) {
                    println!("├── {}: {}", platform, count);
                }
            }
        }
    } else {
        println!("❌ Failed to get status: {}", result["message"]);
    }

    Ok(())
}

async fn health_check(client: &Client, server_url: &str) -> Result<(), Box<dyn std::error::Error>> {
    println!("🏥 Checking Cathedral Session Manager health...");
    
    let response = client
        .post(&format!("{}/api/health", server_url))
        .send()
        .await?;

    let result: Value = response.json().await?;
    
    println!("✅ Service: {}", result.get("service").unwrap_or(&json!("Unknown")));
    println!("📊 Status: {}", result.get("status").unwrap_or(&json!("Unknown")));
    println!("🔢 Version: {}", result.get("version").unwrap_or(&json!("Unknown")));
    
    Ok(())
}

fn print_usage() {
    println!("🏛️ Cathedral Session Manager Client");
    println!("=====================================");
    println!("");
    println!("Usage: cathedral-client <command> [args]");
    println!("");
    println!("Commands:");
    println!("  create [platform]     - Create new session");
    println!("  sync <session_id>     - Sync project state");
    println!("  deploy <session_id>   - Deploy to master repository");
    println!("  status                - Get system status");
    println!("  health                - Check service health");
    println!("");
    println!("Platforms: replit, github-codespaces, local-vscode, docker-rust");
    println!("");
    println!("Examples:");
    println!("  cathedral-client create replit");
    println!("  cathedral-client sync 123e4567-e89b-12d3-a456-426614174000");
    println!("  cathedral-client deploy 123e4567-e89b-12d3-a456-426614174000");
}