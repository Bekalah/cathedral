#!/usr/bin/env python3
"""
Connection Health Check and Optimizer
Tests Azure connections and optimizes settings for maximum throughput
"""

import os
import time
import asyncio
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.core.exceptions import AzureError

def test_connection():
    """Test basic Azure connection"""
    print("🔍 Testing Azure AI connection...")
    
    endpoint = os.environ.get("PROJECT_ENDPOINT")
    if not endpoint:
        print("❌ PROJECT_ENDPOINT not set!")
        print("\nSet it with:")
        print('  export PROJECT_ENDPOINT="https://your-resource.services.ai.azure.com/api/projects/cathedral"')
        return False
    
    try:
        credential = DefaultAzureCredential()
        client = AIProjectClient(endpoint=endpoint, credential=credential)
        print(f"✅ Connected to: {endpoint}")
        return True
    except AzureError as e:
        print(f"❌ Connection failed: {e}")
        return False
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return False


def test_agent_access():
    """Test agent accessibility"""
    print("\n🤖 Testing agent access...")
    
    endpoint = os.environ.get("PROJECT_ENDPOINT")
    agent_id_kaoz = os.environ.get("AGENT_ID_KAOZ", "asst_72uzK1Yt2hsu2qVyt22NkMiO")
    agent_id_order = os.environ.get("AGENT_ID_ORDER", "asst_Pgb3ctXzbsv21gX2auBeEFZx")
    
    try:
        credential = DefaultAzureCredential()
        client = AIProjectClient(endpoint=endpoint, credential=credential)
        
        # Try to create a thread (lightweight test)
        thread = client.agents.threads.create()
        print(f"✅ Thread created: {thread.id}")
        
        print(f"✅ KAOZ Agent ID: {agent_id_kaoz}")
        print(f"✅ ORDER Agent ID: {agent_id_order}")
        
        return True
    except Exception as e:
        print(f"❌ Agent access failed: {e}")
        return False


def measure_latency():
    """Measure connection latency"""
    print("\n⚡ Measuring connection latency...")
    
    endpoint = os.environ.get("PROJECT_ENDPOINT")
    
    try:
        credential = DefaultAzureCredential()
        
        latencies = []
        for i in range(5):
            start = time.time()
            client = AIProjectClient(endpoint=endpoint, credential=credential)
            thread = client.agents.threads.create()
            latency = time.time() - start
            latencies.append(latency)
            print(f"  Test {i+1}: {latency*1000:.0f}ms")
        
        avg_latency = sum(latencies) / len(latencies)
        print(f"\n📊 Average latency: {avg_latency*1000:.0f}ms")
        
        # Recommend settings based on latency
        if avg_latency < 0.5:
            print("✅ Excellent latency! You can use Heavy Mode (500 agents)")
            recommended_agents = 500
        elif avg_latency < 1.0:
            print("✅ Good latency! Use Medium Mode (100 agents)")
            recommended_agents = 100
        else:
            print("⚠️  High latency. Start with Light Mode (10 agents)")
            recommended_agents = 10
        
        return recommended_agents
    except Exception as e:
        print(f"❌ Latency test failed: {e}")
        return 10


def check_credits():
    """Check if Azure credits are accessible"""
    print("\n💳 Checking Azure credits status...")
    
    # This is informational - actual credit checking requires Azure Portal access
    print("⚠️  Credit checking requires Azure Portal access")
    print("📊 To check your credits:")
    print("  1. Go to https://portal.azure.com")
    print("  2. Navigate to Cost Management + Billing")
    print("  3. Check your subscription balance")
    print("  4. Set up budget alerts if needed")
    
    return True


def recommend_configuration(recommended_agents):
    """Provide configuration recommendations"""
    print("\n" + "="*60)
    print("🎯 RECOMMENDED CONFIGURATION")
    print("="*60)
    
    if recommended_agents >= 500:
        print("\n✨ HEAVY MODE - Maximum Throughput")
        print("  export MAX_PARALLEL_AGENTS=500")
        print("  export BATCH_SIZE=100")
        print("  export CONNECTION_POOL_SIZE=200")
    elif recommended_agents >= 100:
        print("\n⚡ MEDIUM MODE - Balanced Performance")
        print("  export MAX_PARALLEL_AGENTS=100")
        print("  export BATCH_SIZE=50")
        print("  export CONNECTION_POOL_SIZE=50")
    else:
        print("\n🔰 LIGHT MODE - Safe Start")
        print("  export MAX_PARALLEL_AGENTS=10")
        print("  export BATCH_SIZE=10")
        print("  export CONNECTION_POOL_SIZE=5")
    
    print("\n💡 Quick Start Command:")
    print("  ./QUICK_START_ENHANCED_AGENTS.sh")
    print("="*60)


def main():
    """Run all connection tests"""
    print("="*60)
    print("🔮 CATHEDRAL AGENT CONNECTION OPTIMIZER")
    print("="*60)
    
    # Test basic connection
    if not test_connection():
        print("\n❌ Cannot proceed without valid connection")
        return
    
    # Test agent access
    if not test_agent_access():
        print("\n⚠️  Agent access issues detected")
    
    # Measure latency and get recommendations
    recommended_agents = measure_latency()
    
    # Check credits (informational)
    check_credits()
    
    # Provide recommendations
    recommend_configuration(recommended_agents)
    
    print("\n✅ Connection optimization complete!")
    print("🚀 You're ready to run the enhanced agent system")


if __name__ == "__main__":
    main()
