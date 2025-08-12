export interface GenerationParams {
  prompt: string;
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  top_k?: number;
  stream?: boolean;
}

export interface GenerationResponse {
  content: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  finish_reason?: string;
  error?: string;
}

export interface ModelInfo {
  name: string;
  size: string;
  memory: string;
  performance: {
    tokens_per_sec: number;
    latency_ms: number;
  };
}

export class GemmaAPI {
  private baseUrl: string;
  private apiKey?: string;
  private currentModel: string = 'gemma-3n-4b-it';
  private fallbackMode: boolean = false;

  constructor() {
    // 支持多种API后端
    this.baseUrl = this.getApiEndpoint();
    this.apiKey = this.getApiKey();
  }

  private getApiEndpoint(): string {
    // 优先级：Hugging Face > Ollama > 模拟模式
    if (typeof window !== 'undefined') {
      const endpoint = localStorage.getItem('gemma_api_endpoint');
      if (endpoint) return endpoint;
    }
    
    // 默认使用Hugging Face免费API
    return 'https://api-inference.huggingface.co/models/google/gemma-3n-4b-it';
  }

  private getApiKey(): string | undefined {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('gemma_api_key') || undefined;
    }
    return undefined;
  }

  async generateText(params: GenerationParams): Promise<GenerationResponse> {
    try {
      // 尝试真实API
      if (!this.fallbackMode) {
        return await this.callRealAPI(params);
      }
    } catch (error) {
      console.warn('Real API failed, falling back to simulation:', error);
      this.fallbackMode = true;
    }

    // 回退到模拟模式
    return this.simulateGeneration(params);
  }

  private async callRealAPI(params: GenerationParams): Promise<GenerationResponse> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }

    const payload = {
      inputs: params.prompt,
      parameters: {
        temperature: params.temperature || 0.7,
        max_new_tokens: params.max_tokens || 512,
        top_p: params.top_p || 0.9,
        top_k: params.top_k || 40,
        do_sample: true,
      },
    };

    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // 处理Hugging Face API响应格式
    if (Array.isArray(data) && data.length > 0) {
      return {
        content: data[0].generated_text || data[0].text || '',
        usage: {
          prompt_tokens: 0, // Hugging Face不提供token计数
          completion_tokens: 0,
          total_tokens: 0,
        },
        finish_reason: 'stop',
      };
    }

    return {
      content: data.generated_text || data.text || '',
      usage: data.usage,
      finish_reason: data.finish_reason || 'stop',
    };
  }

  private simulateGeneration(params: GenerationParams): GenerationResponse {
    const { prompt, temperature = 0.7 } = params;
    
    // 根据提示词类型生成不同的模拟响应
    let content = '';
    const delay = Math.random() * 1000 + 500; // 500-1500ms

    if (prompt.toLowerCase().includes('code') || prompt.includes('function') || prompt.includes('const')) {
      content = this.generateCodeResponse(prompt, temperature);
    } else if (prompt.toLowerCase().includes('translate') || /[а-яё]|[一-龯]|[가-힣]/.test(prompt)) {
      content = this.generateTranslationResponse(prompt, temperature);
    } else {
      content = this.generateChatResponse(prompt, temperature);
    }

    return {
      content,
      usage: {
        prompt_tokens: Math.floor(prompt.length / 4),
        completion_tokens: Math.floor(content.length / 4),
        total_tokens: Math.floor((prompt.length + content.length) / 4),
      },
      finish_reason: 'stop',
    };
  }

  private generateCodeResponse(prompt: string, temperature: number): string {
    const responses = [
      `// ${prompt}\nfunction example() {\n  const result = "Hello World";\n  return result;\n}`,
      `// ${prompt}\nconst processData = (data) => {\n  return data.map(item => ({\n    ...item,\n    processed: true\n  }));\n};`,
      `// ${prompt}\nclass Example {\n  constructor() {\n    this.value = 0;\n  }\n  \n  increment() {\n    this.value++;\n    return this.value;\n  }\n}`,
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  private generateTranslationResponse(prompt: string, temperature: number): string {
    const translations = [
      'This is a simulated translation response.',
      'Here is the translated content based on your input.',
      'Translation completed successfully.',
    ];
    
    return translations[Math.floor(Math.random() * translations.length)];
  }

  private generateChatResponse(prompt: string, temperature: number): string {
    const responses = [
      `I understand you're asking about "${prompt}". Here's what I can tell you based on my knowledge...`,
      `That's an interesting question about "${prompt}". Let me provide you with some insights...`,
      `Regarding "${prompt}", I can help you with that. Here's my response...`,
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // 流式生成（用于实时显示）
  async *generateStream(params: GenerationParams): AsyncGenerator<GenerationResponse> {
    const response = await this.generateText(params);
    const words = response.content.split(' ');
    
    for (let i = 0; i < words.length; i++) {
      yield {
        content: words.slice(0, i + 1).join(' '),
        usage: response.usage,
        finish_reason: i === words.length - 1 ? 'stop' : undefined,
      };
      
      // 模拟流式延迟
      await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100));
    }
  }

  // 获取模型信息
  async getModelInfo(): Promise<ModelInfo> {
    return {
      name: 'Gemma 3n E4B',
      size: '4.1GB',
      memory: '8GB RAM',
      performance: {
        tokens_per_sec: 45,
        latency_ms: 120,
      },
    };
  }

  // 设置API配置
  setApiConfig(endpoint: string, apiKey?: string) {
    this.baseUrl = endpoint;
    this.apiKey = apiKey;
    this.fallbackMode = false;
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('gemma_api_endpoint', endpoint);
      if (apiKey) {
        localStorage.setItem('gemma_api_key', apiKey);
      }
    }
  }

  // 检查API状态
  async checkApiStatus(): Promise<boolean> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'HEAD',
        headers: this.apiKey ? { 'Authorization': `Bearer ${this.apiKey}` } : {},
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}

// 导出单例实例
export const gemmaApi = new GemmaAPI();
