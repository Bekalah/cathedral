#!/usr/bin/env python3
"""
Quick test to connect to Agent of KAOZ and use Azure AI Foundry credits
"""

import asyncio
import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential

async def test_agent_connection():
    """Test connection to Agent of KAOZ"""
    
    # Your Azure AI Foundry project endpoint
    project_endpoint = "https://cathedral-resource.services.ai.azure.com/"
    
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
            subscription_id="88235353-b821-4046-9457-89f70c3d8e9e",
            resource_group_name="cathedral-rg",
            project_name="cathedral-resource"
        )
        
        print("✅ Connected successfully!")
        
        # Create a thread for conversation  
        thread = client.agents.create_thread({})
        print(f"📝 Thread created: {thread.id}")
        
        # Send a test message to your agent
        test_message = "Hello Agent of KAOZ! Help me generate art for Rebecca Respawn showing divine and infernal harmony with a golden heart connecting them."
        
        message = client.agents.create_message(
            thread_id=thread.id,
            role="user",
            content=test_message
        )
        
        print(f"💬 Message sent: {test_message}")
        
        # Run the agent
        run = client.agents.create_and_process_run(
            thread_id=thread.id,
            assistant_id=agent_id
        )
        
        print(f"🏃 Agent run completed!")
        
        # Get the response
        messages = client.agents.list_messages(thread_id=thread.id)
        
        print("\n✨ Agent of KAOZ Response:")
        print("=" * 80)
        for msg in messages.data:
            if msg.role == "assistant":
                for content in msg.content:
                    if hasattr(content, 'text'):
                        print(content.text.value)
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
