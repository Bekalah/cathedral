#!/bin/bash
# Agent Status Monitor - Check continuous execution
# Run: bash agent_status.sh

echo "🏰 CATHEDRAL AGENT STATUS (500x POWER MODE)"
echo "=========================================="
echo ""

# Check if agents are running
AGENT_PID=$(ps aux | grep "[r]un_agents_enhanced" | awk '{print $2}' | head -1)
LOOP_PID=$(ps aux | grep "[w]hile true.*RUN_AGENTS" | awk '{print $2}' | head -1)

if [ -n "$LOOP_PID" ]; then
    echo "✅ Agent loop running (PID: $LOOP_PID)"
else
    echo "❌ Agent loop NOT running"
fi

if [ -n "$AGENT_PID" ]; then
    echo "✅ Agents executing (PID: $AGENT_PID)"
else
    echo "⏸️  Agents idle (between cycles)"
fi

echo ""
echo "📊 Recent Activity:"
echo "------------------"
if [ -f agent_loop.log ]; then
    echo "Last 10 log entries:"
    tail -10 agent_loop.log
    echo ""
    CYCLES=$(grep -c "Agent cycle complete" agent_loop.log 2>/dev/null || echo "0")
    echo "Total cycles completed: $CYCLES"
else
    echo "No log file yet"
fi

echo ""
echo "📁 Agent Responses:"
echo "------------------"
if [ -d agent_responses ]; then
    RESPONSE_COUNT=$(ls -1 agent_responses/*.txt 2>/dev/null | wc -l | tr -d ' ')
    echo "Total response files: $RESPONSE_COUNT"
    
    if [ -f agent_responses/metrics.json ]; then
        echo ""
        echo "Latest metrics:"
        cat agent_responses/metrics.json | python3 -m json.tool 2>/dev/null | head -20
    fi
    
    echo ""
    echo "Most recent responses:"
    ls -lt agent_responses/*.txt 2>/dev/null | head -5 | awk '{print $9, $6, $7, $8}'
else
    echo "No responses yet"
fi

echo ""
echo "💾 Context Files:"
echo "----------------"
ls -lh FULL_CONTEXT_FOR_AGENTS.md MASTER_PROJECT_CONTEXT.md AGENT_PRIORITY_TASKS.md 2>/dev/null | awk '{print $9, $5}'

echo ""
echo "🎯 Godot Project Status:"
echo "-----------------------"
if [ -d godot ]; then
    echo "Godot scripts created:"
    find godot/scripts -name "*.gd" 2>/dev/null | wc -l | xargs echo "  GDScript files:"
    
    echo "Core systems:"
    ls godot/scripts/core/*.gd 2>/dev/null | wc -l | xargs echo "  "
    
    echo "Project size:"
    du -sh godot 2>/dev/null | awk '{print "  " $1}'
else
    echo "Godot directory not found"
fi

echo ""
echo "📦 Package Status:"
echo "-----------------"
if [ -d packages ]; then
    echo "Total packages:"
    ls -d packages/*/ 2>/dev/null | wc -l | xargs echo "  "
    
    echo "Key packages:"
    for pkg in codex-144-99 liber-arcanae cyoa-book-game godot-codex-14499; do
        if [ -d "packages/$pkg" ]; then
            echo "  ✅ $pkg"
        else
            echo "  ❌ $pkg"
        fi
    done
fi

echo ""
echo "=========================================="
echo "To stop agents: kill $LOOP_PID"
echo "To monitor live: tail -f agent_loop.log"
echo "=========================================="
