# 🔮 Connect to Agent of KAOZ - Use Your $200 Credits NOW! 🔮

## ✅ Quick Start (Easiest Method)

Your agent is already configured! Here's how to use it:

### Method 1: Using VS Code AI Foundry Extension (RECOMMENDED)

1. **Open the Agent File** (you already have it open):
   - File: `AgentofKAOZ.agent.yaml`
   - Agent ID: `asst_72uzK1Yt2hsu2qVyt22NkMiO`
   - Model: `gpt-4.1`

2. **Click "Open in Playground" button** at the top of the YAML file
   - This opens the Azure AI Foundry playground
   - You can chat with your agent directly there
   - It will use your credits automatically

3. **Start Using Your Agent!**
   ```
   Ask it things like:
   - "Generate divine/infernal harmony art for Rebecca Respawn"
   - "Help me structure my Cathedral monorepo with turbo"
   - "Create all 22 Living Arcana character descriptions"
   - "Build Godot integration code for my mystical fable system"
   ```

### Method 2: Using Azure AI Foundry Portal

1. Go to: https://cathedral-resource.services.ai.azure.com/
2. Click on "Agents" in the left menu
3. Find "AgentofKAOZ" (ID: `asst_72uzK1Yt2hsu2qVyt22NkMiO`)
4. Click "Test" or "Playground"
5. Start chatting - credits will be used automatically

### Method 3: Using Python SDK (for automation)

```python
# Install: pip install azure-ai-projects azure-identity openai

from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.ai.projects.models import AgentThread, AgentThreadMessage

# Connect to your project
client = AIProjectClient(
    endpoint="https://cathedral-resource.services.ai.azure.com",
    credential=DefaultAzureCredential()
)

# Create thread and send message
thread = client.agents.create_thread()
message = client.agents.create_message(
    thread_id=thread.id,
    role="user",
    content="Generate divine/infernal art for Rebecca Respawn!"
)

# Run your agent
run = client.agents.create_and_process_run(
    thread_id=thread.id,
    assistant_id="asst_72uzK1Yt2hsu2qVyt22NkMiO"
)

# Get response
messages = client.agents.list_messages(thread_id=thread.id)
for msg in messages:
    if msg.role == "assistant":
        print(msg.content[0].text.value)
```

## 💰 Your Credits Status

- **Subscription**: Azure subscription 1 (88235353-b821-4046-9457-89f70c3d8e9e)
- **Project**: cathedral-resource
- **Endpoint**: https://cathedral-resource.services.ai.azure.com
- **Model**: gpt-4.1 (your most powerful deployment)
- **Credits**: ~$200 available (use them TODAY!)

## 🎯 What to Build Today

Use your Agent of KAOZ to generate:

1. **Art Generation**
   - 22 Living Arcana character portraits (divine/infernal harmony style)
   - Sacred geometry patterns
   - Mystical background art

2. **Code Generation**
   - Complete monorepo structure with turbo
   - Godot game integration scripts
   - Character system implementations
   - Synth music generation code

3. **Content Creation**
   - All character backstories and descriptions
   - Tarot reading interpretations
   - Mystical narrative content
   - Game dialogue and quests

4. **Documentation**
   - API documentation
   - User guides
   - Deployment instructions
   - Architecture diagrams

## 🚀 Priority Tasks (Use Credits Now!)

```
1. Generate all 22 Arcana character art descriptions
2. Create complete Godot integration code
3. Build full turbo monorepo configuration
4. Generate mystical music system code
5. Create deployment and build scripts
6. Write complete documentation
```

## ⚡ Quick Test Command

Open the YAML file and click "Open in Playground" OR run:

```bash
# Test in Python
python3 << 'EOF'
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential

client = AIProjectClient(
    endpoint="https://cathedral-resource.services.ai.azure.com",
    credential=DefaultAzureCredential()
)

thread = client.agents.create_thread()
client.agents.create_message(
    thread_id=thread.id,
    role="user",
    content="Hello Agent of KAOZ! I'm ready to build Cathedral today!"
)

run = client.agents.create_and_process_run(
    thread_id=thread.id,
    assistant_id="asst_72uzK1Yt2hsu2qVyt22NkMiO"
)

messages = client.agents.list_messages(thread_id=thread.id)
for msg in messages:
    if msg.role == "assistant":
        print(msg.content[0].text.value)
EOF
```

## 🎉 START NOW!

The easiest way: **Click "Open in Playground"** in the YAML file you have open!

Your agent is configured, your credits are ready, and everything is set up. Just start asking questions and building! 🔮✨
