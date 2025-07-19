export interface ModelData {
  id: string;
  name: string;
  displayName: string;
  description: string;
  params: number; // in billions
  memory: {
    min: number; // GB
    recommended: number; // GB
    optimal: number; // GB
  };
  performance: {
    speed: number; // 0-100
    accuracy: number; // 0-100
    efficiency: number; // 0-100
  };
  useCases: string[];
  quantization: string[];
  downloadLinks: {
    ollama: string;
    huggingface: string;
    direct?: string;
  };
  features: string[];
  limitations: string[];
  releaseDate: string;
}

export interface HardwareProfile {
  id: string;
  name: string;
  description: string;
  ram: {
    min: number;
    max: number;
  };
  gpu: string;
  cpu: string;
  useCases: string[];
  priority: 'speed' | 'accuracy' | 'efficiency';
}

export interface UseCaseProfile {
  id: string;
  name: string;
  description: string;
  requirements: {
    accuracy: 'low' | 'medium' | 'high';
    speed: 'low' | 'medium' | 'high';
    memory: 'low' | 'medium' | 'high';
  };
  examples: string[];
  relatedModels: string[];
}

export const modelDatabase = {
  models: [
    {
      id: 'gemma-3n-e2b-it',
      name: 'Gemma 3n E2B (Instruction Tuned)',
      displayName: 'Gemma 3n E2B',
      description: '2.1B parameter instruction-tuned model optimized for chat and coding tasks',
      params: 2.1,
      memory: {
        min: 4,
        recommended: 8,
        optimal: 16
      },
      performance: {
        speed: 85,
        accuracy: 72,
        efficiency: 95
      },
      useCases: ['chat', 'basic-coding', 'translation', 'summarization'],
      quantization: ['q4_k_m', 'q5_k_m', 'q8_0'],
      downloadLinks: {
        ollama: 'ollama pull gemma3n:e2b-it',
        huggingface: 'https://huggingface.co/google/gemma-3n-E2B-it'
      },
      features: [
        'Fast inference speed',
        'Low memory footprint',
        'Good for basic tasks',
        'Mobile-friendly'
      ],
      limitations: [
        'Limited reasoning capability',
        'Basic coding only',
        'Shorter context window'
      ],
      releaseDate: '2024-12-01'
    },
    {
      id: 'gemma-3n-e4b-it',
      name: 'Gemma 3n E4B (Instruction Tuned)',
      displayName: 'Gemma 3n E4B',
      description: '4.1B parameter instruction-tuned model with enhanced reasoning and coding capabilities',
      params: 4.1,
      memory: {
        min: 8,
        recommended: 16,
        optimal: 32
      },
      performance: {
        speed: 70,
        accuracy: 85,
        efficiency: 80
      },
      useCases: ['advanced-coding', 'reasoning', 'analysis', 'content-generation'],
      quantization: ['q4_k_m', 'q5_k_m', 'q8_0'],
      downloadLinks: {
        ollama: 'ollama pull gemma3n:e4b-it',
        huggingface: 'https://huggingface.co/google/gemma-3n-E4B-it'
      },
      features: [
        'Enhanced reasoning',
        'Advanced coding capabilities',
        'Better content generation',
        'Longer context handling'
      ],
      limitations: [
        'Higher memory requirements',
        'Slower inference',
        'More computational resources needed'
      ],
      releaseDate: '2024-12-01'
    },
    {
      id: 'gemma-3n-e2b-base',
      name: 'Gemma 3n E2B (Base)',
      displayName: 'Gemma 3n E2B Base',
      description: '2.1B parameter base model for fine-tuning and custom applications',
      params: 2.1,
      memory: {
        min: 4,
        recommended: 8,
        optimal: 16
      },
      performance: {
        speed: 90,
        accuracy: 65,
        efficiency: 98
      },
      useCases: ['fine-tuning', 'custom-applications', 'research'],
      quantization: ['q4_k_m', 'q5_k_m', 'q8_0'],
      downloadLinks: {
        ollama: 'ollama pull gemma3n:e2b-base',
        huggingface: 'https://huggingface.co/google/gemma-3n-E2B-base'
      },
      features: [
        'Fastest inference',
        'Lowest memory usage',
        'Ideal for fine-tuning',
        'Research-friendly'
      ],
      limitations: [
        'No instruction following',
        'Requires fine-tuning',
        'Basic capabilities only'
      ],
      releaseDate: '2024-12-01'
    },
    {
      id: 'gemma-3n-e4b-base',
      name: 'Gemma 3n E4B (Base)',
      displayName: 'Gemma 3n E4B Base',
      description: '4.1B parameter base model for advanced fine-tuning and research',
      params: 4.1,
      memory: {
        min: 8,
        recommended: 16,
        optimal: 32
      },
      performance: {
        speed: 75,
        accuracy: 78,
        efficiency: 85
      },
      useCases: ['advanced-fine-tuning', 'research', 'custom-applications'],
      quantization: ['q4_k_m', 'q5_k_m', 'q8_0'],
      downloadLinks: {
        ollama: 'ollama pull gemma3n:e4b-base',
        huggingface: 'https://huggingface.co/google/gemma-3n-E4B-base'
      },
      features: [
        'Larger parameter count',
        'Better base capabilities',
        'Advanced fine-tuning',
        'Research applications'
      ],
      limitations: [
        'No instruction following',
        'Higher resource requirements',
        'Requires expertise to use'
      ],
      releaseDate: '2024-12-01'
    }
  ] as ModelData[],

  hardwareProfiles: [
    {
      id: 'low-end',
      name: 'Low-End Device',
      description: 'Basic hardware with limited resources',
      ram: { min: 4, max: 8 },
      gpu: 'Integrated Graphics',
      cpu: 'Basic CPU',
      useCases: ['basic-chat', 'simple-tasks', 'learning'],
      priority: 'efficiency'
    },
    {
      id: 'mid-range',
      name: 'Mid-Range Device',
      description: 'Standard hardware with moderate resources',
      ram: { min: 8, max: 16 },
      gpu: 'Entry-level GPU',
      cpu: 'Mid-range CPU',
      useCases: ['chat', 'coding', 'content-creation'],
      priority: 'speed'
    },
    {
      id: 'high-end',
      name: 'High-End Device',
      description: 'Powerful hardware with abundant resources',
      ram: { min: 16, max: 64 },
      gpu: 'Dedicated GPU',
      cpu: 'High-end CPU',
      useCases: ['advanced-coding', 'research', 'production'],
      priority: 'accuracy'
    },
    {
      id: 'mobile',
      name: 'Mobile Device',
      description: 'Smartphone or tablet with limited resources',
      ram: { min: 4, max: 8 },
      gpu: 'Mobile GPU',
      cpu: 'Mobile CPU',
      useCases: ['basic-chat', 'simple-tasks'],
      priority: 'efficiency'
    }
  ] as HardwareProfile[],

  useCaseProfiles: [
    {
      id: 'chat',
      name: 'Chat & Conversation',
      description: 'General conversation, customer support, and casual interactions',
      requirements: {
        accuracy: 'medium',
        speed: 'high',
        memory: 'low'
      },
      examples: ['Customer support chatbot', 'Personal assistant', 'Casual conversation'],
      relatedModels: ['gemma-3n-e2b-it', 'gemma-3n-e4b-it']
    },
    {
      id: 'coding',
      name: 'Programming & Development',
      description: 'Code generation, debugging, and software development tasks',
      requirements: {
        accuracy: 'high',
        speed: 'medium',
        memory: 'medium'
      },
      examples: ['Code generation', 'Bug fixing', 'Code review', 'Documentation'],
      relatedModels: ['gemma-3n-e2b-it', 'gemma-3n-e4b-it']
    },
    {
      id: 'content-generation',
      name: 'Content Creation',
      description: 'Writing articles, creative content, and text generation',
      requirements: {
        accuracy: 'high',
        speed: 'medium',
        memory: 'medium'
      },
      examples: ['Article writing', 'Creative stories', 'Marketing copy', 'Technical writing'],
      relatedModels: ['gemma-3n-e4b-it']
    },
    {
      id: 'analysis',
      name: 'Data Analysis & Research',
      description: 'Data analysis, research tasks, and complex reasoning',
      requirements: {
        accuracy: 'high',
        speed: 'low',
        memory: 'high'
      },
      examples: ['Data analysis', 'Research summaries', 'Complex reasoning', 'Academic work'],
      relatedModels: ['gemma-3n-e4b-it']
    },
    {
      id: 'fine-tuning',
      name: 'Fine-tuning & Customization',
      description: 'Training custom models for specific applications',
      requirements: {
        accuracy: 'medium',
        speed: 'low',
        memory: 'high'
      },
      examples: ['Custom chatbot', 'Domain-specific model', 'Specialized applications'],
      relatedModels: ['gemma-3n-e2b-base', 'gemma-3n-e4b-base']
    }
  ] as UseCaseProfile[]
};

// Types are already exported above 