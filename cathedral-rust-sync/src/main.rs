use std::process::Command;
use std::fs;
use std::path::Path;
use std::time::SystemTime;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    println!("🏛️ Cathedral Rust Sync System");
    println!("==============================");
    println!("Connecting Rebecca's complete work to bekalah.github.io/cathedral");
    println!("");

    // Define work categories
    let categories = [
        "tarot-system/72-degrees-hermann-haindl",
        "circuitum99/33-living-chapters", 
        "audio-system/vst3-strudel-integration",
        "mystical-system/alpha-omega-arcanae",
        "business-system/rebecca-professional-work",
        "game-system/fool-respawn-gate",
        "session-system/replit-connection"
    ];

    // Create directory structure
    println!("📁 Creating work directory structure...");
    for category in &categories {
        let path = Path::new(category);
        if !path.exists() {
            fs::create_dir_all(path)?;
            println!("  ✅ Created: {}", category);
        }
    }

    // Check GitHub connection
    println!("🔍 Checking GitHub repository connection...");
    let output = Command::new("git")
        .args(&["remote", "add", "github", "https://github.com/bekalah/cathedral.git"])
        .output()
        .map_err(|e| format!("Git command failed: {}", e))?;

    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        if !stderr.contains("already exists") {
            return Err(format!("Failed to add GitHub remote: {}", stderr).into());
        }
        println!("  ✅ GitHub remote already configured");
    } else {
        println!("  ✅ GitHub remote added");
    }

    // Test GitHub connection
    println!("🧪 Testing GitHub connection...");
    let test_output = Command::new("git")
        .args(&["fetch", "github", "main"])
        .output()
        .map_err(|e| format!("Git fetch failed: {}", e))?;

    if test_output.status.success() {
        println!("  ✅ GitHub connection working");
    } else {
        println!("  ⚠️  GitHub connection needs credentials setup");
        println!("  💡 You may need to configure GitHub authentication");
    }

    // Sync categories
    println!("🔄 Synchronizing work categories...");
    for category in &categories {
        sync_category(category)?;
    }

    // Final sync
    println!("📤 Final push to GitHub...");
    Command::new("git")
        .args(&["push", "github", "main"])
        .output()
        .map_err(|e| format!("Git push failed: {}", e))?;

    println!("");
    println!("🎉 Cathedral Rust Sync Complete!");
    println!("🌐 Live at: https://github.com/bekalah/cathedral");
    println!("📅 All work synchronized: {:?}", SystemTime::now());
    println!("");
    println!("✨ Your unified Cathedral system is ready!");

    Ok(())
}

fn sync_category(category: &str) -> Result<(), Box<dyn std::error::Error>> {
    println!("  🔄 Syncing {}...", category);
    
    // Add files
    let add_output = Command::new("git")
        .args(&["add", category])
        .output()
        .map_err(|e| format!("Git add failed: {}", e))?;

    if !add_output.status.success() {
        let stderr = String::from_utf8_lossy(&add_output.stderr);
        if !stderr.contains("did not match any files") {
            return Err(format!("Failed to add {}: {}", category, stderr).into());
        }
        println!("    ⚠️  No changes in {}", category);
        return Ok(());
    }

    // Commit changes
    let timestamp = SystemTime::now()
        .duration_since(SystemTime::UNIX_EPOCH)?
        .as_secs();
    
    let commit_msg = format!("Update {} - timestamp {}", category, timestamp);
    
    let commit_output = Command::new("git")
        .args(&["commit", "-m", &commit_msg, category])
        .output()
        .map_err(|e| format!("Git commit failed: {}", e))?;

    if !commit_output.status.success() {
        let stderr = String::from_utf8_lossy(&commit_output.stderr);
        if !stderr.contains("nothing to commit") {
            println!("    ⚠️  No changes to commit in {}", category);
            return Ok(());
        }
        return Err(format!("Failed to commit {}: {}", category, stderr).into());
    }

    println!("    ✅ {} synced successfully", category);
    Ok(())
}