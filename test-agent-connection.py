#!/usr/bin/env python3
"""
Quick test to connect to Agent of KAOZ and use Azure AI Foundry credits.
Uses the Azure AI Projects SDK (azure-ai-projects) with the correct project endpoint.
"""

import asyncio
import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.ai.agents.models import ListSortOrder

async def test_agent_connection():
    """Test connection to Agent of KAOZ"""
    
    # Azure AI Foundry Project endpoint (Project -> Settings -> Keys and endpoints)
    # Tip: you can export PROJECT_ENDPOINT to avoid hardcoding.
    project_endpoint = os.environ.get(
        "PROJECT_ENDPOINT",
        "https://cathedral-resource.services.ai.azure.com/api/projects/cathedral",
    )
    
    # Your Agent ID from the YAML file
    agent_id = "asst_72uzK1Yt2hsu2qVyt22NkMiO"
    
    print("🔮 Connecting to Agent of KAOZ...")
    print(f"📍 Endpoint: {project_endpoint}")
    print(f"🤖 Agent ID: {agent_id}")
    print(f"💰 Using Azure AI Foundry credits...")
    
    try:
        # Create client using your Azure credentials
        credential = DefaultAzureCredential()
        client = AIProjectClient(
            endpoint=project_endpoint,
            credential=credential,
        )
        
        print("✅ Connected successfully!")
        
        # Create a thread for conversation
        thread = client.agents.threads.create()
        print(f"📝 Thread created: {thread.id}")
        
        # Send a test message to your agent
        test_message = "Hello Agent of KAOZ! Help me generate art for Rebecca Respawn showing divine and infernal harmony with a golden heart connecting them."
        
        message = client.agents.messages.create(
            thread_id=thread.id,
            role="user",
            content=test_message,
        )
        
        print(f"💬 Message sent: {test_message}")
        
        # Run the agent
        run = client.agents.runs.create_and_process(
            thread_id=thread.id,
            agent_id=agent_id,
        )
        
        print(f"🏃 Agent run completed!")
        
        # Get the response
        messages = client.agents.messages.list(thread_id=thread.id, order=ListSortOrder.ASCENDING)
        
        print("\n✨ Agent of KAOZ Response:")
        print("=" * 80)
        for msg in messages:
            # Print assistant text messages when present
            if getattr(msg, "text_messages", None):
                for tm in msg.text_messages:
                    try:
                        print(tm.text.value)
                    except Exception:
                        # Fallback if object shape differs
                        print(str(tm))
        print("=" * 80)
        
        print("\n🎉 SUCCESS! Your Agent of KAOZ is working and using your credits!")
        print("💰 Check Azure portal to see credit usage")
        
    except Exception as e:
        print(f"\n❌ Connection failed: {e}")
        print("\nTroubleshooting:")
        print("1. Make sure you're logged into Azure CLI: az login")
        print("2. Verify your subscription has access to cathedral-resource")
        print("3. Check that the agent ID matches your deployment")

if __name__ == "__main__":
    asyncio.run(test_agent_connection())
