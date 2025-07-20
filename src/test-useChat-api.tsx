// Quick test to see what useChat returns
import { useChat } from '@ai-sdk/react';

export function TestUseChatAPI() {
  const chatResult = useChat();
  
  // Log all the properties of the useChat result
  console.log('useChat result keys:', Object.keys(chatResult));
  console.log('useChat result:', chatResult);
  
  return null; // Just for testing
}
