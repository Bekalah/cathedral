#!/usr/bin/env python3
"""
Simple direct connection to Agent of KAOZ using REST API
This will use your Azure AI Foundry credits
"""

import requests
import json
import time
import os
from tools.safety.allow_azure import azure_allowed

# Safety guard: require explicit ALLOW_AZURE opt-in
if not azure_allowed():
    print("⚠️  Azure usage is disabled by repository policy. To enable, set ALLOW_AZURE=1 or create a .allow_azure file in the repo root.")
    raise SystemExit(1)

from azure.identity import DefaultAzureCredential

# Your Azure AI Foundry details
PROJECT_ENDPOINT = "https://cathedral-resource.services.ai.azure.com"
AGENT_ID = "asst_72uzK1Yt2hsu2qVyt22NkMiO"

print("🔮 Connecting to Agent of KAOZ...")
print(f"📍 Endpoint: {PROJECT_ENDPOINT}")
print(f"🤖 Agent ID: {AGENT_ID}")
print("💰 Using your Azure AI Foundry credits...")

# Get Azure token
credential = DefaultAzureCredential()
token = credential.get_token("https://cognitiveservices.azure.com/.default")

headers = {
    "Authorization": f"Bearer {token.token}",
    "Content-Type": "application/json",
    "api-version": "2024-05-01-preview"
}

try:
    # Step 1: Create a thread
    print("\n📝 Creating conversation thread...")
    thread_response = requests.post(
        f"{PROJECT_ENDPOINT}/openai/threads",
        headers=headers,
        json={}
    )
    thread_response.raise_for_status()
    thread_id = thread_response.json()["id"]
    print(f"✅ Thread created: {thread_id}")
    
    # Step 2: Add a message
    test_message = """Help me build my entire Cathedral project! I need:
    
1. Generate divine/infernal harmony art for Rebecca Respawn
2. Set up the full monorepo structure with turbo
3. Create all 22 Living Arcana character systems
4. Build the game integration with Godot
5. Generate mystical synth music
6. Set up the full deployment pipeline

Use all my available credits to complete this work today!"""
    
    print(f"\n💬 Sending message...")
    message_response = requests.post(
        f"{PROJECT_ENDPOINT}/openai/threads/{thread_id}/messages",
        headers=headers,
        json={
            "role": "user",
            "content": test_message
        }
    )
    message_response.raise_for_status()
    print(f"✅ Message sent!")
    
    # Step 3: Run the agent
    print(f"\n🏃 Starting Agent of KAOZ run...")
    run_response = requests.post(
        f"{PROJECT_ENDPOINT}/openai/threads/{thread_id}/runs",
        headers=headers,
        json={
            "assistant_id": AGENT_ID
        }
    )
    run_response.raise_for_status()
    run_id = run_response.json()["id"]
    print(f"✅ Run started: {run_id}")
    
    # Step 4: Wait for completion
    print("\n⏳ Waiting for Agent of KAOZ to complete...")
    while True:
        status_response = requests.get(
            f"{PROJECT_ENDPOINT}/openai/threads/{thread_id}/runs/{run_id}",
            headers=headers
        )
        status_response.raise_for_status()
        status = status_response.json()["status"]
        
        print(f"   Status: {status}")
        
        if status == "completed":
            break
        elif status in ["failed", "cancelled", "expired"]:
            print(f"\n❌ Run ended with status: {status}")
            error_info = status_response.json().get("last_error", {})
            print(f"Error: {json.dumps(error_info, indent=2)}")
            exit(1)
        
        time.sleep(2)
    
    # Step 5: Get the response
    print("\n✨ Getting Agent of KAOZ response...")
    messages_response = requests.get(
        f"{PROJECT_ENDPOINT}/openai/threads/{thread_id}/messages",
        headers=headers
    )
    messages_response.raise_for_status()
    messages = messages_response.json()["data"]
    
    print("\n" + "="*80)
    print("🌟 AGENT OF KAOZ RESPONSE:")
    print("="*80)
    
    for msg in messages:
        if msg["role"] == "assistant":
            for content in msg["content"]:
                if content["type"] == "text":
                    print(content["text"]["value"])
                    print()
    
    print("="*80)
    print("\n🎉 SUCCESS! Your Agent of KAOZ is working!")
    print("💰 Credits are being used - check Azure portal for usage")
    print(f"📝 Thread ID: {thread_id} (save this to continue the conversation)")
    
except requests.exceptions.HTTPError as e:
    print(f"\n❌ HTTP Error: {e}")
    print(f"Response: {e.response.text}")
except Exception as e:
    print(f"\n❌ Error: {e}")
    import traceback
    traceback.print_exc()
