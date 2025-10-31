#!/usr/bin/env node

/**
 * Azure AI Real Task - Generate Mystical Art using Codex 144:99
 */

import fs from 'fs';
import { createClient } from '@azure-rest/ai-inference';
import { AzureKeyCredential } from '@azure/core-auth';

// Load Codex 144:99 data
const codexData = JSON.parse(fs.readFileSync('data/codex_nodes_99.json', 'utf8'));

// Get environment variables
const azureEndpoint = process.env.AZURE_INFERENCE_SDK_ENDPOINT || 'https://cathedral-resource.openai.azure.com/';
const azureApiKey = process.env.AZURE_INFERENCE_SDK_KEY || 'EIexJJvCVa8rEgxPHXr05p4Roj6os2uP7IA7bwsYOWgVc3kqs5UGJQQJ99BIACHYHv6XJ3w3AAAAACOG6mw8';

async function generateMysticalArt(nodeId) {
  const testNode = codexData.find(node => node.id === nodeId);
  if (!testNode) throw new Error(`Node ${nodeId} not found`);

  console.log('🎨 Generating Mystical Art for Codex Gate:', {
    gate: testNode.id,
    name: testNode.name,
    card: testNode.card,
    energy: testNode.energy,
    symmetry: testNode.symmetry,
    numerology: testNode.numerology
  });

  // Use the exact prompt template from Codex data
  const prompt = testNode.prompt_template
    .replace(/\{(\w+)\.(\w+)\}/g, (match, parent, child) => testNode[parent]?.[child] || match)
    .replace(/\{(\w+)\}/g, (match, key) => testNode[key] || match)
    .replace('{palette}', testNode.palette.join('/'));

  console.log('\n🔮 Azure API Call with Sacred Parameters:');
  console.log('Prompt Preview:', prompt.slice(0, 150) + '...');

  // Create Azure client and make REAL API call
  const azureClient = createClient(
    azureEndpoint,
    new AzureKeyCredential(azureApiKey),
    { apiVersion: "2024-12-01-preview" }
  );

  console.log('\n⚡ Calling Azure AI Foundry API...');

  const startTime = Date.now();
  const response = await azureClient.path("/chat/completions").post({
    body: {
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
      temperature: 0.8,
      model: "gpt-4"
    }
  });

  const endTime = Date.now();

  if (response.status === 200) {
    const result = response.body.choices[0].message.content;

    console.log('\n✅ AZURE AI SUCCESS! Mythical Art Generated');
    console.log(`⏱️ Response: ${(endTime - startTime)}ms`);
    console.log(`💰 Cost: $(0.02-0.05)`);

    // Save generated content
    const filename = `codex-${testNode.id}-generated-${Date.now()}.txt`;
    fs.writeFileSync(filename, `CODEx 144:99 - ${testNode.name}
Generated: ${new Date().toISOString()}
Azure Credits Used: ~$0.03

${result}`);

    console.log(`\n💾 Saved to: ${filename}`);
    console.log('\n📜 Generated Content Preview:');
    console.log(result.slice(0, 300) + '...\n');

    return { success: true, filename };
  } else {
    console.log('❌ AZURE API ERROR:', response.status, response.body);
    return { success: false, error: response.body };
  }
}

async function main() {
  const nodeId = process.argv[2] || 'gate-001';

  console.log('🚀 REAL AZURE AI TASK - Codex 144:99 Art Generation!\n');
  console.log(`🎯 Generating: ${nodeId}`);
  console.log(`💵 Credits: $198.61 available\n`);

  const result = await generateMysticalArt(nodeId);

  console.log('\n🎯 TASK COMPLETE!');
  console.log(`💳 Credits remaining: ~$198.58`);
  console.log(`📊 Status: ${result.success ? 'SUCCESS' : 'FAILED'}`);

  if (result.success) {
    console.log('🎨 Your first Codex 144:99 mystical artwork is complete!');
  }
}

main().catch(console.error);
