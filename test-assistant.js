// Simple test to verify the AssistantInterface component can be imported and used
import React from 'react';
import AssistantInterface from './src/components/dc-temp/AssistantInterface.tsx';

// Test that the component can be imported without errors
console.log('AssistantInterface component imported successfully');
console.log('Component type:', typeof AssistantInterface);

// Test that capabilities are properly used
import { capabilities } from './src/components/dc-temp/capabilities.tsx';
console.log('Capabilities imported:', capabilities.length, 'capabilities found');

// Verify that forEach can be called on capabilities
try {
  capabilities.forEach(cap => {
    console.log('Capability:', cap.id, '-', cap.name);
  });
  console.log('✅ forEach works correctly on capabilities');
} catch (error) {
  console.error('❌ forEach error:', error.message);
}
