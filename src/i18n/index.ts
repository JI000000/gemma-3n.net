// 支持的语言
export const languages = {
  en: 'English',
  zh: '中文'
} as const;

export type Language = keyof typeof languages;

// 默认语言
export const defaultLang: Language = 'en';

// 语言配置
export const langConfig = {
  en: {
    name: 'English',
    dir: 'ltr',
    locale: 'en-US'
  },
  zh: {
    name: '中文',
    dir: 'ltr', 
    locale: 'zh-CN'
  }
} as const;

// UI文本资源
export const ui = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.about': 'About', 
    'nav.benchmarks': 'Benchmarks',
    'nav.blog': 'Blog',
    'nav.toolkit': 'Toolkit',
    'nav.resources': 'Resources',
    'nav.faq': 'FAQ',
    'nav.demo': 'Demo',
    
    // Home
    'hero.title': 'Gemma-3n.net: The Ultimate Developer Guide',
    'hero.subtitle': 'Master Google\'s Gemma 3n AI models with comprehensive tutorials, benchmarks, and tools.',
    'hero.cta.primary': 'Get Started',
    'hero.cta.secondary': 'View Demos',
    
    // Demo
    'demo.title': '🚀 Gemma 3n Interactive Demo',
    'demo.subtitle': 'Experience in-browser AI inference - fully local, no server required',
    'demo.loading.initializing': 'Initializing lightweight AI model...',
    'demo.loading.engine': 'Downloading lightweight inference engine...',
    'demo.loading.wasm': 'Initializing WebAssembly module...',
    'demo.loading.vocab': 'Loading vocabulary and configuration...',
    'demo.loading.weights': 'Optimizing model weights...',
    'demo.loading.ready': 'Model ready!',
    'demo.status.ready': '✅ Gemma 3n Lite is ready (Online Demo Version)',
    'demo.scenarios.label': 'Select a demo scenario',
    'demo.scenarios.code.title': 'Code Completion',
    'demo.scenarios.code.description': 'Intelligent code suggestions',
    'demo.scenarios.translate.title': 'Language Translation',
    'demo.scenarios.translate.description': 'Translate between languages',
    'demo.scenarios.chat.title': 'Assistant Chat',
    'demo.scenarios.chat.description': 'Conversational assistant',
    'demo.input.label': 'Input Text',
    'demo.input.placeholder': 'Enter your text...',
    'demo.parameters.label': 'Temperature (Creativity)',
    'demo.parameters.conservative': 'Conservative',
    'demo.parameters.creative': 'Creative',
    'demo.button.loading': 'Model loading...',
    'demo.button.generate': 'Generate AI Response',
    'demo.button.generating': 'Generating...',
    'demo.output.label': 'AI Output',
    'demo.output.placeholder': 'AI-generated content will appear here...',
    'demo.output.thinking': '🤖 AI is thinking...',
    'demo.output.error': '❌ Generation failed:',
    'demo.alert.no_input': 'Please enter some text',
    'demo.metrics.tokensPerSecond': 'Tokens/sec',
    'demo.metrics.inferenceTime': 'Inference Time (ms)',
    'demo.metrics.memoryUsage': 'Memory Usage (MB)',
    'demo.metrics.modelSize': 'Model Size',
    'demo.placeholders.code': `function fibonacci(n) {
  // Calculate fibonacci sequence
  if (n <= 1) return n;
  return`,
    'demo.placeholders.translate': `Please translate the following text to English:
Artificial intelligence is changing our world.`,
    'demo.placeholders.chat': `Hello, I would like to know the features and advantages of the Gemma 3n model.`,
    'demo.simulations.code_response': ` fibonacci(n - 1) + fibonacci(n - 2);
}

// Optimized version: using dynamic programming
function fibonacciDP(n) {
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
  }
  return dp[n];
}`,
    'demo.simulations.translation_response': `**Translation Result:**
Artificial Intelligence is transforming our world.

*Detected Language: Chinese → English*`,
    'demo.simulations.chat_response_1': `Hello! I'm happy to introduce Gemma 3n. It is the latest multimodal AI model released by Google, with the following features:

🎯 **On-device Optimization**: Designed for devices like mobile phones and laptops
⚡ **Efficient Architecture**: "Nested" MatFormer Transformer structure
🎨 **Multimodal Capability**: Supports text, image, and audio processing
🔧 **Developer Friendly**: Compatible with the mainstream AI tool ecosystem

Which aspect would you like to know more about?`,
    'demo.simulations.chat_response_2': `The advantages of Gemma 3n compared to other models are:

1. **Smaller Memory Footprint**: The E2B version requires only 4GB of memory
2. **Faster Inference Speed**: Optimized for mobile devices
3. **Better Accuracy**: Achieves 79.8% on the MMLU benchmark
4. **Stronger Multimodality**: Natively supports vision and audio

This makes it particularly suitable for building privacy-first on-device AI applications.`,
    'demo.simulations.chat_response_3': `Regarding the technical implementation of Gemma 3n, I recommend that you:

📚 **Learning Path**: Start with our introductory tutorials
💻 **Practical Projects**: Try the iOS deployment or Ollama integration
🔧 **Advanced Skills**: Learn LoRA fine-tuning techniques
🌐 **Community Involvement**: Follow the latest model updates and optimizations

Would you like me to recommend a specific tutorial?`,
    
    // Controls
    'controls.temperature': 'Temperature',
    'controls.temperature.desc': 'Controls randomness in output',
    'controls.maxTokens': 'Max Tokens',
    'controls.maxTokens.desc': 'Maximum length of generated text',
    'controls.topK': 'Top-K',
    'controls.topK.desc': 'Limits vocabulary for more focused output',
    
    // Metrics
    'metrics.inference': 'Inference Time',
    'metrics.memory': 'Memory Usage',
    'metrics.tokens': 'Tokens/sec',
    'metrics.local': 'Local Processing',
    'metrics.api': 'API Call',
    
    // Scenarios
    'scenarios.code': 'Code Generation',
    'scenarios.code.desc': 'Generate and complete code',
    'scenarios.text': 'Text Generation', 
    'scenarios.text.desc': 'Creative writing and content',
    'scenarios.chat': 'Q&A Chat',
    'scenarios.chat.desc': 'Interactive conversations',
    
    // Benchmarks
    'benchmarks.title': 'Performance Benchmarks',
    'benchmarks.subtitle': 'How does Gemma 3n compare to competitors? Here are the benchmarks.',
    'benchmarks.source': 'Data sourced from official Google AI publications and independent benchmarks.',
    'benchmarks.heading': 'Performance Benchmarks',
    'benchmarks.efficiency_champion_title': 'Efficiency Champion',
    'benchmarks.efficiency_champion': 'Gemma 3n E4B achieves 79.8% MMLU with only 4B parameters, outperforming Llama 3.1 8B (66.7%) while using half the memory.',
    'benchmarks.mobile_first_design_title': 'Mobile-First Design',
    'benchmarks.mobile_first_design': 'MatFormer architecture enables dynamic scaling, allowing the same model to run efficiently from smartphones to workstations.',
    'benchmarks.mmlu.title': 'MMLU',
    'benchmarks.mmlu.desc': 'Massive Multitask Language Understanding',
    'benchmarks.mmlu.note': 'Outperforms leading models in its class on this key knowledge and reasoning benchmark.',
    'benchmarks.lmarena.title': 'LMArena Score',
    'benchmarks.lmarena.desc': 'Human preference chatbot benchmark',
    'benchmarks.lmarena.max': 'of max observed',
    'benchmarks.lmarena.note': 'The first model under 10B parameters to break the 1300 barrier, showcasing strong conversational ability.',
    'benchmarks.vision.title': 'Vision Encoder Speed',
    'benchmarks.vision.desc': 'On-device performance (Pixel Edge TPU)',
    'benchmarks.vision.faster': 'Faster',
    'benchmarks.vision.compare': 'MobileNet-V5 vs SoViT',
    'benchmarks.vision.note': 'A massive speedup in vision processing with higher accuracy and a smaller memory footprint.',
    'benchmarks.table.title': 'Gemma 3n vs. Competition',
    'benchmarks.table.model': 'Model',
    'benchmarks.table.params': 'Parameters',
    'benchmarks.table.mmlu': 'MMLU',
    'benchmarks.table.gsm8k': 'GSM8K',
    'benchmarks.table.humaneval': 'HumanEval',
    'benchmarks.table.memory': 'Memory (GB)',
    'benchmarks.gemma_e4b': 'Gemma 3n E4B',
    'benchmarks.gemma_e2b': 'Gemma 3n E2B',
    'benchmarks.llama_3_8b': 'Llama 3.1 8B',
    'benchmarks.llama_3_3b': 'Llama 3.2 3B',
    'benchmarks.score': 'Score',
    'benchmarks.tag.superior': 'Superior performance',
    'benchmarks.tag.below': 'Below Gemma 3n E4B',
    'benchmarks.memory.note': 'Memory requirements are for full precision models.',

    // Toolkit
    'toolkit.title': 'Developer Toolkit',
    'toolkit.subtitle': 'Everything you need to get started with Gemma 3n',
    'toolkit.quickstart': 'Quick Start',
    'toolkit.integration': 'Platform Integration',
    'toolkit.requirements': 'Hardware Requirements',
    'toolkit.practices': 'Best Practices',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.retry': 'Try Again',
    'common.close': 'Close',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.continue': 'Continue',
    'common.learn.more': 'Learn More',
    'common.get.started': 'Get Started',
    'common.view.all': 'View All',
    
    // PWA
    'pwa.install': 'Install App',
    'pwa.install.desc': 'Install Gemma-3n.net for offline access',
    'pwa.update': 'Update Available',
    'pwa.update.desc': 'A new version is available. Refresh to update.',
    'pwa.offline': 'You\'re offline',
    'pwa.offline.desc': 'Some features may be limited without internet connection.',
    
    // 语言切换
    'lang.switch': 'Switch Language',
    'lang.current': 'English',

    // resources
    'resources.heading': 'Resources',
    'resources.subtitle': 'Essential links to get you started and building with Gemma 3n.',
    'resources.category.download': 'Download Models',
    'resources.category.api': 'Official APIs & Guides',
    'resources.download.hf.title': 'Hugging Face',
    'resources.download.hf.desc': 'Access all Gemma 3n models, GGUF versions, and community-tuned variants.',
    'resources.download.ollama.title': 'Ollama',
    'resources.download.ollama.desc': 'Pull and run Gemma 3n models with a single command on your local machine.',
    'resources.download.lmstudio.title': 'LM Studio',
    'resources.download.lmstudio.desc': 'Discover and run Gemma 3n through a user-friendly desktop application.',
    'resources.api.studio.title': 'Google AI Studio',
    'resources.api.studio.desc': 'Experiment with Gemma 3n models directly in your browser with Google\'s free tool.',
    'resources.api.keras.title': 'Keras',
    'resources.api.keras.desc': 'Utilize Gemma 3n with Keras, Google\'s high-level API for building and training models.',
    'resources.api.paper.title': 'Technical Report',
    'resources.api.paper.desc': 'Read the official paper from Google for a deep dive into Gemma 3n\'s architecture.',

    // Demo 页面主结构
    'demo.page.title': 'AI Demo | Interactive Experience',
    'demo.page.description': 'Experience the power of Gemma 3n - run AI models directly in your browser, no installation required.',
    'demo.hero.title': 'Gemma 3n Interactive Experience',
    'demo.hero.subtitle': 'Experience powerful AI features directly in your browser. Code completion • Language translation • Intelligent Q&A',
    'demo.hero.feature1.title': 'Ultra-fast Response',
    'demo.hero.feature1.desc': 'Millisecond-level AI inference, real-time interaction',
    'demo.hero.feature2.title': 'Privacy First',
    'demo.hero.feature2.desc': 'All data processed locally, never uploaded to the cloud',
    'demo.hero.feature3.title': 'Multi-scenario Support',
    'demo.hero.feature3.desc': 'Coding, translation, chat — one model for all',
    'demo.hero.cta': 'Try Now →',
    'demo.section.title': 'Interactive AI Demo',
    'demo.section.desc': 'This is a simulated version showing how Gemma 3n works in real-world scenarios. For production, use ONNX.js or WebAssembly to run the real model.',
    'demo.info.title': 'About this Demo',
    'demo.info.current.title': 'Current Features',
    'demo.info.current.feature1': 'Simulates Gemma 3n inference process and response style',
    'demo.info.current.feature2': 'Realistic UI and interaction flow',
    'demo.info.current.feature3': 'Performance metrics based on real hardware data',
    'demo.info.current.feature4': 'Supports three core application scenarios',
    'demo.info.prod.title': 'Production Version',
    'demo.info.prod.feature1': 'Load real Gemma 3n model with ONNX.js',
    'demo.info.prod.feature2': 'Accelerated inference with WebAssembly',
    'demo.info.prod.feature3': 'Full tokenizer and post-processing pipeline',
    'demo.info.prod.feature4': 'Supports model quantization and optimization',
    'demo.tech.title': 'Technical Implementation Path',
    'demo.tech.desc': 'Upgrade the demo to a full-fledged AI application tech stack',
    'demo.tech.frontend.title': 'Frontend Architecture',
    'demo.tech.frontend.engine': 'Lightweight Inference Engine',
    'demo.tech.frontend.engine.code': "// ONNX.js integration\nimport * as ort from 'onnxruntime-web';\n\n// Load model\nconst session = await ort.InferenceSession\n  .create('/models/gemma-3n-e2b.onnx');\n\n// Inference\nconst results = await session.run(feeds);",
    'demo.tech.frontend.wasm': 'WebAssembly Optimization',
    'demo.tech.frontend.wasm.code': "// WebAssembly tokenizer\nimport init, { tokenize } from './pkg/tokenizer.js';\n\n// Initialize WASM module\nawait init();\n\n// High-performance tokenization\nconst tokens = tokenize(inputText);",
    'demo.tech.deploy.title': 'Model Deployment',
    'demo.tech.deploy.convert': 'Model Conversion',
    'demo.tech.deploy.convert1': 'Hugging Face → ONNX',
    'demo.tech.deploy.convert2': 'Dynamic quantization (INT8)',
    'demo.tech.deploy.convert3': 'Graph optimization and constant folding',
    'demo.tech.deploy.convert4': 'WebGL backend adaptation',
    'demo.tech.deploy.cdn': 'CDN Distribution',
    'demo.tech.deploy.cdn1': 'Global acceleration with Cloudflare',
    'demo.tech.deploy.cdn2': 'Chunked download strategy',
    'demo.tech.deploy.cdn3': 'Browser cache optimization',
    'demo.tech.deploy.cdn4': 'Progressive loading',
    'demo.tech.deploy.optimize': 'Performance Optimization',
    'demo.tech.deploy.optimize1': 'Web Workers multithreading',
    'demo.tech.deploy.optimize2': 'SharedArrayBuffer',
    'demo.tech.deploy.optimize3': 'WebGPU acceleration (future)',
    'demo.tech.deploy.optimize4': 'Memory pool management',
    'demo.tech.cost.title': 'Zero-cost Solution Advantages',
    'demo.tech.cost.cloud': 'Traditional Cloud AI Cost',
    'demo.tech.cost.cloud1': '🔴 OpenAI API: $0.002/1K tokens',
    'demo.tech.cost.cloud2': '🔴 Azure OpenAI: $0.0015/1K tokens',
    'demo.tech.cost.cloud3': '🔴 Google Cloud AI: $0.001/1K tokens',
    'demo.tech.cost.cloud4': '🔴 Monthly: $200-2000 (medium traffic)',
    'demo.tech.cost.device': 'Gemma 3n On-device Solution',
    'demo.tech.cost.device1': '✅ Inference cost: $0',
    'demo.tech.cost.device2': '✅ CDN: $0 (Cloudflare free tier)',
    'demo.tech.cost.device3': '✅ Storage: $0 (static hosting)',
    'demo.tech.cost.device4': '✅ Monthly: $0 + $12/year domain',
    'demo.cta.title': 'Ready to build your AI app?',
    'demo.cta.desc': 'Start with tutorials and master the power of Gemma 3n step by step.',
    'demo.cta.learn': 'Start Learning',
    'demo.cta.toolkit': 'Toolkit',
    'demo.cta.download': 'Download Model',

    // FAQ区块
    'faq.heading': 'Frequently Asked Questions',
    'faq.subtitle': "Got questions? We've got answers. Here are some of the most common things developers ask about Gemma 3n.",
    'faq.q1': 'Is Gemma 3n free to use?',
    'faq.a1': 'Yes, Gemma 3n models are released under a license that permits free access for commercial and research use. Always check the official license terms for details.',
    'faq.q2': "What does 'multimodal' actually mean for Gemma 3n?",
    'faq.a2': 'It means the model can natively understand and process more than just text. It can analyze images and listen to audio, making it suitable for a wider range of applications like describing photos or transcribing speech.',
    'faq.q3': 'How is Gemma 3n different from the regular Gemma 2 or Gemma family?',
    'faq.a3': 'Gemma 3n is specifically optimized for on-device performance. It uses the novel MatFormer architecture to be more efficient in terms of memory and computation, making it ideal for running on phones and laptops.',
    'faq.q4': 'Can I fine-tune Gemma 3n on my own data?',
    'faq.a4': 'Absolutely. The models are designed to be fine-tuned. Google provides recipes and support through frameworks like Keras, PyTorch, and JAX to facilitate this process.',
    'faq.q5': 'How do I run Gemma 3n with Ollama?',
    'faq.a5': "Running Gemma 3n with Ollama is straightforward. Simply install Ollama and run 'ollama run gemma-3n:e4b' for the 4B model or 'ollama run gemma-3n:e2b' for the 2B model. The model will be downloaded automatically.",
    'faq.q6': "What's the difference between Gemma 3n E2B and E4B models?",
    'faq.a6': 'E2B (2B parameters) is smaller and faster, ideal for mobile devices and quick inference. E4B (4B parameters) offers better performance and accuracy but requires more computational resources. Both use the same MatFormer architecture.',
    'faq.q7': 'Can I use Gemma 3n models from Hugging Face?',
    'faq.a7': 'Yes, all Gemma 3n models are available on Hugging Face Hub. You can use them with the transformers library: from transformers import AutoModelForCausalLM, AutoTokenizer. Both 16-bit and quantized versions are available.',
    'faq.q8': 'Is Gemma 3n better than Llama 3 for local AI setups?',
    'faq.a8': "Gemma 3n E4B often outperforms Llama 3 8B in many benchmarks while being smaller and more efficient. For on-device applications, Gemma 3n's MatFormer architecture provides better memory efficiency and faster inference.",
    'faq.q9': 'Can I run Gemma 3n on iOS devices?',
    'faq.a9': 'Yes, Gemma 3n models can run on iOS devices. The E2B model is particularly well-suited for mobile deployment. You can use frameworks like CoreML or run quantized versions for optimal performance on Apple devices.',
    'faq.q10': 'What hardware requirements does Gemma 3n have?',
    'faq.a10': 'Gemma 3n E2B can run on devices with as little as 4GB RAM. E4B typically requires 8GB+ RAM for comfortable operation. Both models can run on CPU-only setups, though GPU acceleration significantly improves inference speed.',
    
    // newsletter
    'newsletter.heading': 'Stay Updated',
    'newsletter.desc': 'Get the latest tutorials and news about Gemma 3n delivered to your inbox. No spam, ever.',
    'newsletter.placeholder': 'Enter your email',
    'newsletter.subscribe': 'Subscribe',

    // footer
    'footer.rights': 'All rights reserved.',
    'footer.independent': 'An independent project, not affiliated with Google.',  

    // Blog
    'blog.title': 'Blog',
    'blog.description': 'In-depth articles, tutorials, and analysis on Gemma 3n and the world of on-device AI.',
    'blog.heading': 'Blog & Tutorials',
    'blog.subtitle': 'In-depth articles, guides, and analysis to help you master on-device AI.',
    'blog.posted_on': 'Posted on',
  },
  zh: {
    // 导航
    'nav.home': '首页',
    'nav.about': '关于',
    'nav.benchmarks': '性能测试',
    'nav.blog': '博客',
    'nav.toolkit': '工具包',
    'nav.resources': '资源',
    'nav.faq': '常见问题',
    'nav.demo': '演示',
    
    // 首页
    'hero.title': 'Gemma-3n.net: 终极开发者指南',
    'hero.subtitle': '通过全面的教程、基准测试和工具，掌握Google的Gemma 3n AI模型。',
    'hero.cta.primary': '开始使用',
    'hero.cta.secondary': '查看演示',
    
    // Demo
    'demo.title': '🚀 Gemma 3n 交互式Demo',
    'demo.subtitle': '体验浏览器内AI推理 - 完全本地化，无需服务器',
    'demo.loading.initializing': '正在初始化轻量级AI模型...',
    'demo.loading.engine': '下载轻量级推理引擎...',
    'demo.loading.wasm': '初始化WebAssembly模块...',
    'demo.loading.vocab': '加载词汇表和配置...',
    'demo.loading.weights': '优化模型权重...',
    'demo.loading.ready': '模型就绪！',
    'demo.status.ready': '✅ Gemma 3n Lite 已就绪 (在线Demo版本)',
    'demo.scenarios.label': '选择演示场景',
    'demo.scenarios.code.title': '代码补全',
    'demo.scenarios.code.description': '智能代码建议',
    'demo.scenarios.translate.title': '语言翻译',
    'demo.scenarios.translate.description': '多语言互译',
    'demo.scenarios.chat.title': '智能问答',
    'demo.scenarios.chat.description': '对话助手',
    'demo.input.label': '输入文本',
    'demo.input.placeholder': '输入您的文本...',
    'demo.parameters.label': '温度设置 (创造性)',
    'demo.parameters.conservative': '保守',
    'demo.parameters.creative': '创新',
    'demo.button.loading': '模型加载中...',
    'demo.button.generate': '生成AI回复',
    'demo.button.generating': '生成中...',
    'demo.output.label': 'AI输出结果',
    'demo.output.placeholder': 'AI生成的内容将在这里显示...',
    'demo.output.thinking': '🤖 AI正在思考...',
    'demo.output.error': '❌ 生成失败:',
    'demo.alert.no_input': '请输入一些文本',
    'demo.metrics.tokensPerSecond': 'Tokens/秒',
    'demo.metrics.inferenceTime': '推理时间(ms)',
    'demo.metrics.memoryUsage': '内存使用(MB)',
    'demo.metrics.modelSize': '模型大小',
    'demo.placeholders.code': `function fibonacci(n) {
  // 计算斐波那契数列
  if (n <= 1) return n;
  return`,
    'demo.placeholders.translate': `请将以下文本翻译成英文：
人工智能正在改变我们的世界。`,
    'demo.placeholders.chat': `你好，我想了解Gemma 3n模型的特点和优势。`,
    'demo.simulations.code_response': ` fibonacci(n - 1) + fibonacci(n - 2);
}

// 优化版本：使用动态规划
function fibonacciDP(n) {
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
  }
  return dp[n];
}`,
    'demo.simulations.translation_response': `**翻译结果:**
人工智能正在改变我们的世界。

*检测到的语言: 中文 → 英文*`,
    'demo.simulations.chat_response_1': `您好！我很高兴为您介绍Gemma 3n。这是Google最新发布的多模态AI模型，具有以下特点：

🎯 **设备端优化**: 专为手机、笔记本等设备设计
⚡ **高效架构**: MatFormer"嵌套"Transformer结构
🎨 **多模态能力**: 支持文本、图像、音频处理
🔧 **开发者友好**: 与主流AI工具生态兼容

您还想了解哪个方面的详细信息？`,
    'demo.simulations.chat_response_2': `Gemma 3n相比其他模型的优势在于：

1. **更小的内存占用**: E2B版本仅需4GB内存
2. **更快的推理速度**: 针对移动设备优化
3. **更好的准确性**: MMLU基准测试达到79.8%
4. **更强的多模态**: 原生支持视觉和音频

这使得它特别适合构建隐私优先的设备端AI应用。`,
    'demo.simulations.chat_response_3': `关于Gemma 3n的技术实现，我建议您：

📚 **学习路径**: 从我们的入门教程开始
💻 **实践项目**: 尝试iOS部署或Ollama集成
🔧 **进阶技能**: 学习LoRA微调技术
🌐 **社区参与**: 关注最新的模型更新和优化

需要我为您推荐具体的教程吗？`,
    
    // 参数控制
    'controls.temperature': '温度值',
    'controls.temperature.desc': '控制输出的随机性',
    'controls.maxTokens': '最大长度',
    'controls.maxTokens.desc': '生成文本的最大长度',
    'controls.topK': 'Top-K',
    'controls.topK.desc': '限制词汇表以获得更集中的输出',
    
    // 性能监控
    'metrics.inference': '推理时间',
    'metrics.memory': '内存使用',
    'metrics.tokens': '令牌/秒',
    'metrics.local': '本地处理',
    'metrics.api': 'API调用',
    
    // 预设场景
    'scenarios.code': '代码生成',
    'scenarios.code.desc': '生成和补全代码',
    'scenarios.text': '文本生成',
    'scenarios.text.desc': '创意写作和内容创作',
    'scenarios.chat': '问答对话',
    'scenarios.chat.desc': '交互式对话',
    
    // 工具包
    'toolkit.title': '开发者工具包',
    'toolkit.subtitle': '开始使用 Gemma 3n 所需的一切',
    'toolkit.quickstart': '快速开始',
    'toolkit.integration': '平台集成',
    'toolkit.requirements': '硬件要求',
    'toolkit.practices': '最佳实践',
    
    // 通用
    'common.loading': '加载中...',
    'common.error': '错误',
    'common.retry': '重试',
    'common.close': '关闭',
    'common.save': '保存',
    'common.cancel': '取消',
    'common.continue': '继续',
    'common.learn.more': '了解更多',
    'common.get.started': '开始使用',
    'common.view.all': '查看全部',
    
    // PWA
    'pwa.install': '安装应用',
    'pwa.install.desc': '安装 Gemma-3n.net 以便离线访问',
    'pwa.update': '有可用更新',
    'pwa.update.desc': '新版本可用，刷新页面以更新。',
    'pwa.offline': '您当前离线',
    'pwa.offline.desc': '没有网络连接时某些功能可能受限。',

    // 语言切换
    'lang.switch': '切换语言',
    'lang.current': '中文',

    // 基准测试
    'benchmarks.title': '性能基准',
    'benchmarks.subtitle': 'Gemma 3n 与竞争对手相比表现如何？这里是数据对比。',
    'benchmarks.source': '数据来源于Google AI官方发布和独立基准测试。',
    'benchmarks.heading': '性能基准',
    'benchmarks.mmlu.title': 'MMLU',
    'benchmarks.mmlu.desc': '多任务语言理解能力',
    'benchmarks.mmlu.note': '在该关键知识与推理基准上超越同级主流模型',
    'benchmarks.lmarena.title': 'LMArena 得分',
    'benchmarks.lmarena.desc': '人类偏好对话基准',
    'benchmarks.lmarena.max': '最大分数占比',
    'benchmarks.lmarena.note': '首个突破1300分的10B以下模型，展现强大对话能力',
    'benchmarks.vision.title': '视觉编码速度',
    'benchmarks.vision.desc': '设备端视觉推理性能（Pixel Edge TPU）',
    'benchmarks.vision.faster': '加速',
    'benchmarks.vision.compare': 'MobileNet-V5 vs SoViT',
    'benchmarks.vision.note': '视觉处理速度大幅提升，精度更高，内存占用更低',
    'benchmarks.table.title': 'Gemma 3n 与竞品对比',
    'benchmarks.table.model': '模型',
    'benchmarks.table.params': '参数量',
    'benchmarks.table.mmlu': 'MMLU',
    'benchmarks.table.gsm8k': 'GSM8K',
    'benchmarks.table.humaneval': 'HumanEval',
    'benchmarks.table.memory': '内存(GB)',
    'benchmarks.gemma_e4b': 'Gemma 3n E4B',
    'benchmarks.gemma_e2b': 'Gemma 3n E2B',
    'benchmarks.llama_3_8b': 'Llama 3.1 8B',
    'benchmarks.llama_3_3b': 'Llama 3.2 3B',
    'benchmarks.score': '分数',
    'benchmarks.tag.superior': '性能领先',
    'benchmarks.tag.below': '低于 Gemma 3n E4B',
    'benchmarks.memory.note': '内存需求为全精度模型配置。',
    'benchmarks.efficiency_champion_title': '效率之王',
    'benchmarks.efficiency_champion': 'Gemma 3n E4B 仅用 4B 参数即达 79.8% MMLU，性能超越 Llama 3.1 8B（66.7%），内存占用仅为其一半。',
    'benchmarks.mobile_first_design_title': '移动优先设计',
    'benchmarks.mobile_first_design': 'MatFormer 架构支持动态扩展，同一模型可高效运行于手机到工作站等多种设备。',

    // 资源区块
    'resources.heading': '资源',
    'resources.subtitle': '开始使用 Gemma 3n 的重要链接。',
    'resources.category.download': '下载模型',
    'resources.category.api': '官方API与指南',
    'resources.download.hf.title': 'Hugging Face',
    'resources.download.hf.desc': '获取全部 Gemma 3n 模型、GGUF 版本及社区微调模型。',
    'resources.download.ollama.title': 'Ollama',
    'resources.download.ollama.desc': '一行命令本地拉取并运行 Gemma 3n 模型。',
    'resources.download.lmstudio.title': 'LM Studio',
    'resources.download.lmstudio.desc': '桌面端可视化应用，轻松体验和运行 Gemma 3n。',
    'resources.api.studio.title': 'Google AI Studio',
    'resources.api.studio.desc': '无需安装，直接在浏览器体验 Gemma 3n。',
    'resources.api.keras.title': 'Keras',
    'resources.api.keras.desc': '用 Keras 高效构建和训练 Gemma 3n 模型。',
    'resources.api.paper.title': '技术报告',
    'resources.api.paper.desc': '阅读 Google 官方论文，深入了解 Gemma 3n 架构。',

    // Demo 页面主结构
    'demo.page.title': 'AI Demo | Interactive Experience',
    'demo.page.description': 'Experience the power of Gemma 3n - run AI models directly in your browser, no installation required.',
    'demo.hero.title': 'Gemma 3n Interactive Experience',
    'demo.hero.subtitle': 'Experience powerful AI features directly in your browser. Code completion • Language translation • Intelligent Q&A',
    'demo.hero.feature1.title': 'Ultra-fast Response',
    'demo.hero.feature1.desc': 'Millisecond-level AI inference, real-time interaction',
    'demo.hero.feature2.title': 'Privacy First',
    'demo.hero.feature2.desc': 'All data processed locally, never uploaded to the cloud',
    'demo.hero.feature3.title': 'Multi-scenario Support',
    'demo.hero.feature3.desc': 'Coding, translation, chat — one model for all',
    'demo.hero.cta': 'Try Now →',
    'demo.section.title': 'Interactive AI Demo',
    'demo.section.desc': 'This is a simulated version showing how Gemma 3n works in real-world scenarios. For production, use ONNX.js or WebAssembly to run the real model.',
    'demo.info.title': 'About this Demo',
    'demo.info.current.title': 'Current Features',
    'demo.info.current.feature1': 'Simulates Gemma 3n inference process and response style',
    'demo.info.current.feature2': 'Realistic UI and interaction flow',
    'demo.info.current.feature3': 'Performance metrics based on real hardware data',
    'demo.info.current.feature4': 'Supports three core application scenarios',
    'demo.info.prod.title': 'Production Version',
    'demo.info.prod.feature1': 'Load real Gemma 3n model with ONNX.js',
    'demo.info.prod.feature2': 'Accelerated inference with WebAssembly',
    'demo.info.prod.feature3': 'Full tokenizer and post-processing pipeline',
    'demo.info.prod.feature4': 'Supports model quantization and optimization',
    'demo.tech.title': 'Technical Implementation Path',
    'demo.tech.desc': 'Upgrade the demo to a full-fledged AI application tech stack',
    'demo.tech.frontend.title': 'Frontend Architecture',
    'demo.tech.frontend.engine': 'Lightweight Inference Engine',
    'demo.tech.frontend.engine.code': "// ONNX.js integration\nimport * as ort from 'onnxruntime-web';\n\n// Load model\nconst session = await ort.InferenceSession\n  .create('/models/gemma-3n-e2b.onnx');\n\n// Inference\nconst results = await session.run(feeds);",
    'demo.tech.frontend.wasm': 'WebAssembly Optimization',
    'demo.tech.frontend.wasm.code': "// WebAssembly tokenizer\nimport init, { tokenize } from './pkg/tokenizer.js';\n\n// Initialize WASM module\nawait init();\n\n// High-performance tokenization\nconst tokens = tokenize(inputText);",
    'demo.tech.deploy.title': 'Model Deployment',
    'demo.tech.deploy.convert': 'Model Conversion',
    'demo.tech.deploy.convert1': 'Hugging Face → ONNX',
    'demo.tech.deploy.convert2': 'Dynamic quantization (INT8)',
    'demo.tech.deploy.convert3': 'Graph optimization and constant folding',
    'demo.tech.deploy.convert4': 'WebGL backend adaptation',
    'demo.tech.deploy.cdn': 'CDN Distribution',
    'demo.tech.deploy.cdn1': 'Global acceleration with Cloudflare',
    'demo.tech.deploy.cdn2': 'Chunked download strategy',
    'demo.tech.deploy.cdn3': 'Browser cache optimization',
    'demo.tech.deploy.cdn4': 'Progressive loading',
    'demo.tech.deploy.optimize': 'Performance Optimization',
    'demo.tech.deploy.optimize1': 'Web Workers multithreading',
    'demo.tech.deploy.optimize2': 'SharedArrayBuffer',
    'demo.tech.deploy.optimize3': 'WebGPU acceleration (future)',
    'demo.tech.deploy.optimize4': 'Memory pool management',
    'demo.tech.cost.title': 'Zero-cost Solution Advantages',
    'demo.tech.cost.cloud': 'Traditional Cloud AI Cost',
    'demo.tech.cost.cloud1': '🔴 OpenAI API: $0.002/1K tokens',
    'demo.tech.cost.cloud2': '🔴 Azure OpenAI: $0.0015/1K tokens',
    'demo.tech.cost.cloud3': '🔴 Google Cloud AI: $0.001/1K tokens',
    'demo.tech.cost.cloud4': '🔴 Monthly: $200-2000 (medium traffic)',
    'demo.tech.cost.device': 'Gemma 3n On-device Solution',
    'demo.tech.cost.device1': '✅ Inference cost: $0',
    'demo.tech.cost.device2': '✅ CDN: $0 (Cloudflare free tier)',
    'demo.tech.cost.device3': '✅ Storage: $0 (static hosting)',
    'demo.tech.cost.device4': '✅ Monthly: $0 + $12/year domain',
    'demo.cta.title': 'Ready to build your AI app?',
    'demo.cta.desc': 'Start with tutorials and master the power of Gemma 3n step by step.',
    'demo.cta.learn': 'Start Learning',
    'demo.cta.toolkit': 'Toolkit',
    'demo.cta.download': 'Download Model',

    // FAQ区块
    'faq.heading': '常见问题',
    'faq.subtitle': '有疑问？我们来解答。以下是开发者最常问的一些问题。',
    'faq.q1': 'Gemma 3n 可以免费商用吗？',
    'faq.a1': '可以。Gemma 3n 模型采用宽松许可协议，允许免费商用和科研使用。请务必查阅官方许可条款。',
    'faq.q2': 'Gemma 3n 的"多模态"具体指什么？',
    'faq.a2': '多模态意味着模型不仅能理解文本，还能分析图片和音频，适用于描述照片、语音转录等多场景。',
    'faq.q3': 'Gemma 3n 和 Gemma 2 有什么区别？',
    'faq.a3': 'Gemma 3n 针对设备端优化，采用 MatFormer 架构，内存和算力效率更高，非常适合手机、笔记本等本地部署。',
    'faq.q4': '可以用自己的数据微调 Gemma 3n 吗？',
    'faq.a4': '当然可以。Google 提供了 Keras、PyTorch、JAX 等主流框架的微调方案和工具。',
    'faq.q5': '如何用 Ollama 运行 Gemma 3n？',
    'faq.a5': '安装 Ollama 后，运行 "ollama run gemma-3n:e4b" 或 "ollama run gemma-3n:e2b" 即可自动下载并运行对应模型。',
    'faq.q6': 'E2B 和 E4B 有什么区别？',
    'faq.a6': 'E2B（2B参数）更小更快，适合移动端和快速推理；E4B（4B参数）精度更高但资源需求更大。两者均采用 MatFormer 架构。',
    'faq.q7': '可以在 Hugging Face 上用 Gemma 3n 吗？',
    'faq.a7': '可以，所有 Gemma 3n 模型均已上架 Hugging Face Hub，支持 transformers 库直接调用。',
    'faq.q8': 'Gemma 3n 比 Llama 3 更适合本地部署吗？',
    'faq.a8': 'Gemma 3n E4B 在多项基准测试中优于 Llama 3 8B，且体积更小、推理更快，非常适合本地和隐私场景。',
    'faq.q9': 'Gemma 3n 能在 iOS 设备上运行吗？',
    'faq.a9': '可以，E2B 版本特别适合移动端。可用 CoreML 或量化模型在苹果设备高效运行。',
    'faq.q10': 'Gemma 3n 对硬件有何要求？',
    'faq.a10': 'E2B 只需 4GB 内存即可运行，E4B 推荐 8GB 以上。CPU 也可运行，若有 GPU 推理速度更快。',

    // newsletter
    'newsletter.heading': '获取最新资讯',
    'newsletter.desc': '订阅后可第一时间获取 Gemma 3n 的最新教程与新闻。绝无垃圾邮件。',
    'newsletter.placeholder': '请输入您的邮箱',
    'newsletter.subscribe': '订阅',

    // footer
    'footer.rights': '保留所有权利。',
    'footer.independent': '独立项目，与 Google 无关联。',

    // Blog
    'blog.title': '博客',
    'blog.description': 'Gemma 3n 及端侧 AI 深度文章、教程与分析。',
    'blog.heading': '博客与教程',
    'blog.subtitle': '深度文章、实用指南与分析，助你精通端侧 AI。',
    'blog.posted_on': '发布于',
  }
} as const;

// 获取翻译文本的函数
export function useTranslations(lang: Language) {
  return function t(key: keyof typeof ui[typeof defaultLang]): string {
    return ui[lang]?.[key] || ui[defaultLang][key] || key;
  }
}

// 从URL路径获取语言
export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Language;
  return defaultLang;
}

// 获取本地化路径
export function getLocalizedPath(path: string, lang: Language): string {
  if (lang === defaultLang) {
    return path;
  }
  return `/${lang}${path}`;
}

// 获取替代语言路径
export function getAlternateLanguagePaths(currentPath: string, currentLang: Language) {
  const paths: Record<Language, string> = {} as Record<Language, string>;
  
  // 移除当前语言前缀
  let basePath = currentPath;
  if (currentLang !== defaultLang) {
    basePath = currentPath.replace(`/${currentLang}`, '') || '/';
  }
  
  // 为每种语言生成路径
  Object.keys(languages).forEach(lang => {
    const language = lang as Language;
    paths[language] = getLocalizedPath(basePath, language);
  });
  
  return paths;
} 