/**
 * Demo component to test the ChatInterface with very long text messages
 * to ensure proper width constraints and text wrapping
 */

import React, { useState } from 'react'
import { CopilotInterface } from './CopilotInterface'
import type { UIMessage } from 'ai'
import { testCapabilities } from '../../test-data/capabilities'

const longMessageDemo: UIMessage[] = [
  {
    id: '1',
    role: 'user',
    parts: [
      { 
        type: 'text', 
        text: 'Can you write me a comprehensive analysis of the current state of artificial intelligence and machine learning technologies, including their applications, limitations, and future prospects?' 
      }
    ]
  },
  {
    id: '2',
    role: 'assistant',
    parts: [
      { 
        type: 'text', 
        text: `Here's a comprehensive analysis of the current state of AI and ML technologies:

**Current State of Artificial Intelligence and Machine Learning**

Artificial Intelligence (AI) and Machine Learning (ML) have experienced unprecedented growth and adoption across virtually every industry in recent years. We're currently in what many experts consider the "golden age" of AI, characterized by breakthrough achievements in natural language processing, computer vision, and autonomous systems.

**Key Applications:**

1. **Natural Language Processing**: Large Language Models like GPT-4, Claude, and others have revolutionized how we interact with computers, enabling conversational AI, content generation, code assistance, and translation services that approach human-level quality.

2. **Computer Vision**: AI systems can now accurately identify objects, faces, and scenes in images and videos, powering applications from medical imaging diagnosis to autonomous vehicle navigation and augmented reality experiences.

3. **Recommendation Systems**: Platforms like Netflix, Amazon, and Spotify use sophisticated ML algorithms to personalize user experiences, driving significant business value and user engagement.

4. **Healthcare**: AI is transforming medical diagnosis, drug discovery, and treatment planning, with systems that can detect diseases earlier and more accurately than human specialists in some cases.

5. **Financial Services**: From fraud detection and algorithmic trading to credit scoring and risk assessment, ML models are integral to modern financial operations.

**Current Limitations:**

Despite remarkable progress, several significant limitations remain:

1. **Data Quality and Bias**: AI systems are only as good as the data they're trained on, and biased or incomplete datasets can lead to unfair or inaccurate outcomes.

2. **Interpretability**: Many advanced AI models, particularly deep neural networks, operate as "black boxes," making it difficult to understand how they arrive at specific decisions.

3. **Energy Consumption**: Training and running large AI models requires substantial computational resources and energy, raising environmental concerns.

4. **Generalization**: While AI excels in specific domains, achieving artificial general intelligence (AGI) that can perform any intellectual task remains elusive.

5. **Safety and Alignment**: Ensuring AI systems behave safely and align with human values becomes increasingly challenging as they become more powerful.

**Future Prospects:**

The future of AI holds immense promise across multiple dimensions:

1. **Multimodal AI**: Integration of text, image, audio, and video processing will enable more natural and comprehensive AI interactions.

2. **Edge AI**: Deployment of AI directly on devices will reduce latency, improve privacy, and enable offline functionality.

3. **AI-Assisted Scientific Discovery**: AI will accelerate research in fields like materials science, climate modeling, and space exploration.

4. **Personalized Education**: Adaptive learning systems will provide customized educational experiences tailored to individual learning styles and pace.

5. **Sustainable AI**: Development of more efficient algorithms and hardware will reduce the environmental impact of AI systems.

The next decade will likely see AI becoming even more integrated into our daily lives, while addressing current limitations through improved techniques, better governance frameworks, and more sustainable practices. The key will be balancing innovation with responsible development to ensure AI benefits humanity as a whole.` 
      }
    ]
  },
  {
    id: '3',
    role: 'user',
    parts: [
      { 
        type: 'text', 
        text: 'This is an extremely long message to test the width constraints of the chat interface and ensure that even when I write a very long message that goes on and on and on, it still maintains proper formatting and doesn\'t cause the chat interface to become too wide or break the layout. The message should wrap properly and maintain readability while staying within the maximum width constraints that have been set for the chat bubbles. This is important for user experience and ensuring that the interface remains functional and visually appealing even with extensive text content.' 
      }
    ]
  },
  {
    id: '4',
    role: 'assistant',
    parts: [
      { 
        type: 'text', 
        text: 'Perfect! Your long message demonstrates exactly what we needed to test. As you can see, the chat interface now properly handles long text messages by:\n\n• Constraining the overall chat width with max-w-4xl\n• Using break-words to prevent text overflow\n• Maintaining the max-w-[80%] constraint on individual message bubbles\n• Preserving whitespace and line breaks with whitespace-pre-wrap\n• Ensuring proper text wrapping for readability\n\nThe interface remains visually appealing and functional regardless of message length, which is crucial for a good user experience.' 
      }
    ]
  }
]

export function ChatDemoLongMessages() {
  const [messages, setMessages] = useState<UIMessage[]>(longMessageDemo)

  return (
    <div className="h-screen w-full">
      <CopilotInterface
        messages={messages}
        capabilities={testCapabilities}
        enableFileUpload={true}
        maxFileSize={10}
        allowedFileTypes={['*']}
        businessUnits={[]}
        sessions={[]}
        notifications={[]}
        onNewChat={() => setMessages(longMessageDemo)}
        onSessionSelect={() => {}}
        onSessionDelete={() => {}}
        showCapabilities={true}
      />
    </div>
  )
}
