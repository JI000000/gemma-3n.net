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
    'nav.compare': 'Compare',
    'nav.leaderboard': 'Leaderboard',
    
    // Home
    'hero.title': 'Gemma-3n.net: The Ultimate Developer Guide',
    'hero.subtitle': 'Master Google\'s Gemma 3n AI models with comprehensive tutorials, benchmarks, and tools.',
    'hero.cta.primary': 'Get Started',
    'hero.cta.secondary': 'View Demos',
    
    // SEO
    'seo.home.title': 'Gemma-3n.net: The Ultimate Developer Guide for Google’s Gemma 3n',
    'seo.home.description': 'Master Google’s Gemma 3n AI model with comprehensive tutorials, benchmarks, and tools. Your essential resource for local and cloud deployment.',
    'seo.about.title': 'About Gemma-3n.net | Our Mission and Methodology',
    'seo.about.description': 'Learn about the mission of Gemma-3n.net: to provide the most accurate, independent, and up-to-date resources for the Gemma 3n developer community.',
    'seo.blog.title': 'Gemma 3n Blog | Tutorials, News, and In-Depth Analysis',
    'seo.blog.description': 'The official blog for Gemma-3n.net. Find the latest news, expert tutorials, and deep-dive articles on fine-tuning, deploying, and optimizing the Gemma 3n model.',
    'seo.toolkit.title': 'Gemma 3n Toolkit | Downloads, Guides, and Official Resources',
    'seo.toolkit.description': 'The complete developer toolkit for Gemma 3n. Access official model downloads, setup guides for Ollama and Hugging Face, iOS deployment docs, and more.',
    'seo.compare.title': 'Gemma 3n vs. Llama 3: In-Depth AI Model Comparison',
    'seo.compare.description': 'A head-to-head, data-driven comparison of Google\'s Gemma 3n and Meta\'s Llama 3. Analyze performance benchmarks, architecture, and real-world use cases.',
    'seo.leaderboard.title': 'AI Model Leaderboard | Compare Gemma 3n, Llama 3, and More',
    'seo.leaderboard.description': 'Live AI model leaderboard comparing the latest open-source and proprietary models on key industry benchmarks. See how Gemma 3n stacks up against the competition.',

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
    'toolkit.title': 'Gemma 3n Toolkit - Complete Developer Resources',
    'toolkit.description': 'Comprehensive toolkit for Gemma 3n development. Includes Ollama setup, Hugging Face integration, iOS deployment guides, and model comparison tools.',
    'toolkit.h1': 'Gemma 3n Toolkit',
    'toolkit.subheading': 'Everything you need to get started with Gemma 3n development. From quick setup to advanced deployment strategies.',
    'toolkit.tag1': 'Ollama Ready',
    'toolkit.tag2': 'Hugging Face Compatible',
    'toolkit.tag3': 'iOS Optimized',
    'toolkit.resources.title': 'Official Resources',
    'toolkit.resources.description': 'Access the latest official documentation, research papers, and community discussions directly from Google and the open source community.',
    'toolkit.resources.google.title': 'Google Official',
    'toolkit.resources.google.deepmind_page': 'DeepMind Official Page',
    'toolkit.resources.google.deepmind_desc': 'Official model overview, architecture details, and performance benchmarks.',
    'toolkit.resources.google.ai_dev': 'AI for Developers',
    'toolkit.resources.google.ai_dev_desc': 'Technical documentation, API references, and integration guides.',
    'toolkit.resources.google.announcement': 'Official Announcement',
    'toolkit.resources.google.announcement_desc': 'Launch announcement, key features, and architectural innovations.',
    'toolkit.downloads.title': 'Download Models',
    'toolkit.downloads.huggingface': 'Hugging Face Hub',
    'toolkit.downloads.huggingface_desc': 'Official model repositories with multiple format options.',
    'toolkit.downloads.ollama': 'Ollama Library',
    'toolkit.downloads.ollama_desc': 'Easy one-command installation for local development.',
    'toolkit.downloads.ollama_link': 'View on Ollama',
    'toolkit.community.title': 'Community & Research',
    'toolkit.community.reddit': 'r/LocalLLaMA',
    'toolkit.community.reddit_desc': 'Active community discussions, benchmarks, and user experiences.',
    'toolkit.community.hackernews': 'Hacker News',
    'toolkit.community.hackernews_desc': 'Technical discussions and community feedback on Gemma 3n.',
    'toolkit.community.research': 'Research Projects',
    'toolkit.community.research_desc': 'Reverse engineering efforts and architectural analysis.',
    'toolkit.learning.title': 'Learning Resources',
    'toolkit.learning.unsloth': 'Unsloth Blog',
    'toolkit.learning.unsloth_desc': 'Fine-tuning guides and performance optimization techniques.',
    'toolkit.learning.hf_blog': 'Hugging Face Blog',
    'toolkit.learning.hf_blog_desc': 'Technical deep-dives and integration tutorials.',
    'cta.title': 'Ready to Build with Gemma 3n?',
    'cta.subtitle': 'Join thousands of developers already using Gemma 3n in production.',
    'cta.button1': 'Browse Tutorials',
    'cta.button2': 'Download Models',
    
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

    'footer.independent': 'An independent, community-driven guide to Google’s Gemma 3n.',
    'footer.rights': 'All rights reserved.',
    'footer.stay_updated': 'Stay Updated',
    'footer.subscribe_desc': 'Get the latest Gemma 3n news, tutorials, and benchmarks delivered to your inbox.',
    'footer.subscribe_button': 'Subscribe',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',

    // Blog
    'blog.title': 'Gemma 3n Developer Blog',
    'blog.description': 'News, tutorials, and in-depth articles on the Gemma 3n AI model.',
    'blog.read_more': 'Read More',
    'blog.giscus.comments': 'Comments',
    'blog.table_of_contents': 'Table of Contents',
    'blog.last_updated': 'Last Updated',
    'blog.share': 'Share This Post',
    'blog.share.twitter': 'Share on Twitter',
    'blog.share.linkedin': 'Share on LinkedIn',
    'blog.share.facebook': 'Share on Facebook',
    'blog.share.copy': 'Copy Link',
    'blog.share.copied': 'Copied!',

    // 对比页面
    'compare.title': "Gemma 3n vs. Llama 3: 终极对决",
    'compare.description': "深度数据驱动对比 Google Gemma 3n 与 Meta Llama 3。我们分析基准测试、硬件需求和使用场景，助你选择最适合你项目的模型。",
    'compare.h1': "Gemma 3n <span class='text-blue-600'>对决</span> Llama 3",
    'compare.subheading': "效率与性能的碰撞。我们深入剖析两大领先开源模型，助你根据具体需求做出最终决策。",
    'compare.showdown_badge': "模型对决",
    'compare.glance.title': "速览：核心差异",
    'compare.glance.feature': "特性",
    'compare.glance.gemma': "Gemma 3n (E4B)",
    'compare.glance.llama': "Llama 3 (8B)",
    'compare.glance.architecture': "架构",
    'compare.glance.architecture.gemma': "MatFormer (动态缩放)",
    'compare.glance.architecture.llama': "标准 Transformer",
    'compare.glance.params': "有效参数",
    'compare.glance.params.gemma': "~40亿",
    'compare.glance.params.llama': "80亿",
    'compare.glance.strength': "核心优势",
    'compare.glance.strength.gemma': "端侧性能, 高效率",
    'compare.glance.strength.llama': "原始推理 & 编程能力",
    'compare.glance.hardware': "硬件需求",
    'compare.glance.hardware.gemma': "<span class='font-semibold text-green-600 dark:text-green-400'>低</span> (现代笔记本)",
    'compare.glance.hardware.llama': "<span class='font-semibold text-orange-500'>中</span> (需要良好GPU)",
    'compare.glance.multimodality': "多模态能力",
    'compare.glance.multimodality.gemma': "原生支持文本、音频、图像",
    'compare.glance.multimodality.llama': "仅文本",
    'compare.benchmarks.title': "性能基准测试",
    'compare.benchmarks.note': "*基准分数是基于公开聚合数据的说明性展示。",
    'compare.deepdive.title': "深度分析",
    'compare.deepdive.gemma.title': "🏆 Gemma 3n 的胜出之处",
    'compare.deepdive.gemma.1.title': "效率与可及性",
    'compare.deepdive.gemma.1.desc': "在消费级硬件（笔记本、手机）上流畅运行，RAM占用显著减少，是端侧应用的完美选择。",
    'compare.deepdive.gemma.2.title': "原生多模态",
    'compare.deepdive.gemma.2.desc': "从底层设计就支持在单一模型中理解文本、音频和图像，解锁了Llama无法单独处理的新型应用。",
    'compare.deepdive.gemma.3.title': "动态架构",
    'compare.deepdive.gemma.3.desc': "MatFormer架构使其能动态调整计算量，无需巨大的静态参数即可提供均衡的性能。",
    'compare.deepdive.llama.title': "🏆 Llama 3 的胜出之处",
    'compare.deepdive.llama.1.title': "原始推理与编程能力",
    'compare.deepdive.llama.1.desc': "凭借更多专用参数，Llama 3在复杂逻辑推理、数学问题和代码生成方面表现出色，纯文本基准测试通常优于Gemma。",
    'compare.deepdive.llama.2.title': "成熟的微调生态",
    'compare.deepdive.llama.2.desc': "作为一个更成熟的架构，社区为Llama 3贡献了大量针对特定任务的微调版本。",
    'compare.deepdive.llama.3.title': "可预测的性能",
    'compare.deepdive.llama.3.desc': "其标准Transformer架构意味着性能非常可预测，并且能随更强大的硬件很好地扩展。",
    'compare.verdict.title': "最终裁决：哪款适合你？",
    'compare.verdict.subtitle': "你的选择完全取决于项目的核心目标。",
    'compare.verdict.gemma.title': "选择 Gemma 3n 如果...",
    'compare.verdict.gemma.bullet1': "你正在为**移动或边缘设备**构建应用。",
    'compare.verdict.gemma.bullet2': "你的应用需要**多模态能力**（音频/视觉）。",
    'compare.verdict.gemma.bullet3': "**资源效率**和低RAM占用至关重要。",
    'compare.verdict.gemma.bullet4': "你需要一个用于通用任务的、均衡的全面模型。",
    'compare.verdict.llama.title': "选择 Llama 3 如果...",
    'compare.verdict.llama.bullet1': "你的主要用例是**复杂的编程或推理**。",
    'compare.verdict.llama.bullet2': "你拥有**强大的GPU**。",
    'compare.verdict.llama.bullet3': "你需要在**纯文本任务**上获得绝对最佳性能。",
    'compare.verdict.llama.bullet4': "你想利用庞大的社区微调模型库。",
    'compare.cta.title': "准备好深入探索了吗？",
    'compare.cta.subtitle': "浏览我们的实战教程，掌握这两款模型。",
    'compare.cta.button1': "浏览全部教程",
    'compare.cta.button2': "获取工具箱",

    // Leaderboard Page
    'leaderboard.title': "AI Model Leaderboard: The Best Open Source Models",
    'leaderboard.description': "A data-driven, sortable leaderboard comparing the top open-source AI models like Gemma 3n, Llama 3, Phi-3, and Qwen 2. Filter by benchmarks like MMLU, GSM8K, and HumanEval.",
    'leaderboard.h1': "Open Model Leaderboard",
    'leaderboard.subheading': "The definitive, data-driven ranking of today's top open-source AI models. Sort, compare, and find the best model for your needs.",
    'leaderboard.badge': "Community Benchmark",
    'leaderboard.table.rank': "Rank",
    'leaderboard.table.model': "Model",
    'leaderboard.table.params': "Params (B)",
    'leaderboard.table.mmlu': "MMLU",
    'leaderboard.table.gsm8k': "GSM8K",
    'leaderboard.table.humaneval': "HumanEval",
    'leaderboard.table.tags': "Tags",
    'leaderboard.notes.definitions': "* MMLU: Massive Multitask Language Understanding. GSM8K: Grade School Math. HumanEval: Code Generation.",
    'leaderboard.notes.disclaimer': "* Performance data is based on publicly available information and may vary based on quantization and implementation.",
    'leaderboard.tags.reasoning': "Reasoning Power",
    'leaderboard.tags.efficiency': "Efficiency King",
    'leaderboard.tags.multimodal': "Multimodal",
    'leaderboard.tags.coder': "Strong Coder",
    'leaderboard.tags.on_device': "On-Device",
    'leaderboard.tags.fast': "Fast",

    // Privacy and Terms
    'privacy.title': "Privacy Policy",
    'privacy.h1': "Privacy Policy for Gemma-3n.net",
    'privacy.effective_date': "Effective Date: July 1, 2025",
    'privacy.p1': "Welcome to Gemma-3n.net. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.",
    'privacy.h2_info': "Collection of Your Information",
    'privacy.p2': "We may collect information about you in a variety of ways. The information we may collect on the Site includes:",
    'privacy.h3_personal': "Personal Data",
    'privacy.p3': "Personally identifiable information, such as your email address, that you voluntarily give to us when you subscribe to our newsletter.",
    'privacy.h3_analytics': "Derivative Data",
    'privacy.p4': "Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site. We use a privacy-focused analytics service and do not use Google Analytics.",
    'privacy.h2_use': "Use of Your Information",
    'privacy.p5': "Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to: email you regarding your account or order, respond to customer service requests, and send you a newsletter.",
    'privacy.h2_security': "Security of Your Information",
    'privacy.p6': "We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.",
    'privacy.h2_contact': "Contact Us",
    'privacy.p7': "If you have questions or comments about this Privacy Policy, please contact us at: legal@gemma-3n.net",

    'terms.title': "Terms of Service",
    'terms.h1': "Terms of Service for Gemma-3n.net",
    'terms.effective_date': "Effective Date: July 1, 2025",
    'terms.p1': "By using the website located at Gemma-3n.net (the \"Site\"), you agree to be bound by these Terms of Service (this \"Agreement\"), whether or not you register as a member. If you do not agree with these terms, you should not use the Site.",
    'terms.h2_use': "Use of the Site",
    'terms.p2': "You may use the Site for your personal, non-commercial use only. You agree not to use the Site for any purpose that is unlawful or prohibited by this Agreement. You may not use the Site in any manner that could damage, disable, overburden, or impair the Site.",
    'terms.h2_disclaimer': "Disclaimer",
    'terms.p3': "The information provided on the Site is for general informational purposes only. All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability or completeness of any information on the Site.",
    'terms.h2_liability': "Limitation of Liability",
    'terms.p4': "IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.",
    'terms.h2_governing': "Governing Law",
    'terms.p5': "This Agreement shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law principles.",
    'terms.h2_contact': "Contact Us",
    'terms.p6': "If you have questions or comments about these Terms of Service, please contact us at: legal@gemma-3n.net",
  },
  zh: {
    // 导航
    'nav.home': '首页',
    'nav.about': '关于',
    'nav.benchmarks': '性能测试',
    'nav.blog': '博客',
    'nav.toolkit': '工具箱',
    'nav.resources': '资源',
    'nav.faq': '常见问题',
    'nav.demo': '演示',
    'nav.compare': '对比',
    'nav.leaderboard': '排行榜',
    
    // 首页
    'hero.title': 'Gemma-3n.net: 终极开发者指南',
    'hero.subtitle': '通过全面的教程、基准测试和工具，掌握Google的Gemma 3n AI模型。',
    'hero.cta.primary': '开始使用',
    'hero.cta.secondary': '查看演示',
    
    // SEO
    'seo.home.title': 'Gemma-3n.net: Google Gemma 3n 终极开发者指南',
    'seo.home.description': '通过全面的教程、基准测试和工具，掌握Google的Gemma 3n AI模型。您进行本地和云端部署的重要资源。',
    'seo.about.title': '关于 Gemma-3n.net | 我们的使命与方法论',
    'seo.about.description': '了解 Gemma-3n.net 的使命：为Gemma 3n开发者社区提供最准确、独立和最新的资源。',
    'seo.blog.title': 'Gemma 3n 博客 | 教程、新闻与深度分析',
    'seo.blog.description': 'Gemma-3n.net 的官方博客。查找关于微调、部署和优化Gemma 3n模型的最新消息、专家教程和深度文章。',
    'seo.toolkit.title': 'Gemma 3n 工具箱 | 下载、指南和官方资源',
    'seo.toolkit.description': 'Gemma 3n 的完整开发者工具箱。获取官方模型下载、Ollama和Hugging Face的设置指南、iOS部署文档等。',
    'seo.compare.title': 'Gemma 3n vs. Llama 3: AI模型深度对比',
    'seo.compare.description': 'Google的Gemma 3n与Meta的Llama 3的正面数据驱动对比。分析性能基准、架构和真实世界用例。',
    'seo.leaderboard.title': 'AI模型排行榜 | 对比Gemma 3n、Llama 3等',
    'seo.leaderboard.description': '实时的AI模型排行榜，比较最新的开源和专有模型在关键行业基准上的表现。查看Gemma 3n与竞争对手的较量。',

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
    
    // 工具箱
    'toolkit.title': 'Gemma 3n 工具箱 - 完整的开发者资源',
    'toolkit.description': 'Gemma 3n 开发的综合工具箱。包括 Ollama 设置、Hugging Face 集成、iOS 部署指南和模型比较工具。',
    'toolkit.h1': 'Gemma 3n Toolkit',
    'toolkit.subheading': '您开始 Gemma 3n 开发所需的一切。从快速设置到高级部署策略。',
    'toolkit.tag1': 'Ollama 就绪',
    'toolkit.tag2': 'Hugging Face 兼容',
    'toolkit.tag3': 'iOS 优化',
    'toolkit.resources.title': '官方资源',
    'toolkit.resources.description': '直接从谷歌和开源社区访问最新的官方文档、研究论文和社区讨论。',
    'toolkit.resources.google.title': 'Google Official',
    'toolkit.resources.google.deepmind_page': 'DeepMind Official Page',
    'toolkit.resources.google.deepmind_desc': 'Official model overview, architecture details, and performance benchmarks.',
    'toolkit.resources.google.ai_dev': 'AI for Developers',
    'toolkit.resources.google.ai_dev_desc': 'Technical documentation, API references, and integration guides.',
    'toolkit.resources.google.announcement': 'Official Announcement',
    'toolkit.resources.google.announcement_desc': 'Launch announcement, key features, and architectural innovations.',
    'toolkit.downloads.title': 'Download Models',
    'toolkit.downloads.huggingface': 'Hugging Face Hub',
    'toolkit.downloads.huggingface_desc': 'Official model repositories with multiple format options.',
    'toolkit.downloads.ollama': 'Ollama Library',
    'toolkit.downloads.ollama_desc': 'Easy one-command installation for local development.',
    'toolkit.downloads.ollama_link': 'View on Ollama',
    'toolkit.community.title': 'Community & Research',
    'toolkit.community.reddit': 'r/LocalLLaMA',
    'toolkit.community.reddit_desc': 'Active community discussions, benchmarks, and user experiences.',
    'toolkit.community.hackernews': 'Hacker News',
    'toolkit.community.hackernews_desc': 'Technical discussions and community feedback on Gemma 3n.',
    'toolkit.community.research': 'Research Projects',
    'toolkit.community.research_desc': 'Reverse engineering efforts and architectural analysis.',
    'toolkit.learning.title': 'Learning Resources',
    'toolkit.learning.unsloth': 'Unsloth Blog',
    'toolkit.learning.unsloth_desc': 'Fine-tuning guides and performance optimization techniques.',
    'toolkit.learning.hf_blog': 'Hugging Face Blog',
    'toolkit.learning.hf_blog_desc': 'Technical deep-dives and integration tutorials.',
    'cta.title': 'Ready to Build with Gemma 3n?',
    'cta.subtitle': 'Join thousands of developers already using Gemma 3n in production.',
    'cta.button1': 'Browse Tutorials',
    'cta.button2': 'Download Models',
    
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

    // 页脚
    'footer.independent': '一个由社区驱动的、独立的Gemma 3n开发者指南。',
    'footer.rights': '版权所有。',
    'footer.stay_updated': '保持更新',
    'footer.subscribe_desc': '订阅我们的新闻通讯，获取最新的Gemma 3n新闻、教程和基准测试。',
    'footer.subscribe_button': '订阅',
    'footer.privacy': '隐私政策',
    'footer.terms': '服务条款',

    // 博客
    'blog.title': 'Gemma 3n 开发者博客',
    'blog.description': '关于Gemma 3n AI模型的新闻、教程和深度文章。',
    'blog.read_more': '阅读更多',
    'blog.giscus.comments': '评论',
    'blog.table_of_contents': '目录',
    'blog.last_updated': '最后更新于',
    'blog.share': '分享这篇文章',
    'blog.share.twitter': '分享到推特',
    'blog.share.linkedin': '分享到领英',
    'blog.share.facebook': '分享到脸书',
    'blog.share.copy': '复制链接',
    'blog.share.copied': '已复制！',

    // 对比页面
    'compare.title': "Gemma 3n vs. Llama 3: 终极对决",
    'compare.description': "深度数据驱动对比 Google Gemma 3n 与 Meta Llama 3。我们分析基准测试、硬件需求和使用场景，助你选择最适合你项目的模型。",
    'compare.h1': "Gemma 3n <span class='text-blue-600'>对决</span> Llama 3",
    'compare.subheading': "效率与性能的碰撞。我们深入剖析两大领先开源模型，助你根据具体需求做出最终决策。",
    'compare.showdown_badge': "模型对决",
    'compare.glance.title': "速览：核心差异",
    'compare.glance.feature': "特性",
    'compare.glance.gemma': "Gemma 3n (E4B)",
    'compare.glance.llama': "Llama 3 (8B)",
    'compare.glance.architecture': "架构",
    'compare.glance.architecture.gemma': "MatFormer (动态缩放)",
    'compare.glance.architecture.llama': "标准 Transformer",
    'compare.glance.params': "有效参数",
    'compare.glance.params.gemma': "~40亿",
    'compare.glance.params.llama': "80亿",
    'compare.glance.strength': "核心优势",
    'compare.glance.strength.gemma': "端侧性能, 高效率",
    'compare.glance.strength.llama': "原始推理 & 编程能力",
    'compare.glance.hardware': "硬件需求",
    'compare.glance.hardware.gemma': "<span class='font-semibold text-green-600 dark:text-green-400'>低</span> (现代笔记本)",
    'compare.glance.hardware.llama': "<span class='font-semibold text-orange-500'>中</span> (需要良好GPU)",
    'compare.glance.multimodality': "多模态能力",
    'compare.glance.multimodality.gemma': "原生支持文本、音频、图像",
    'compare.glance.multimodality.llama': "仅文本",
    'compare.benchmarks.title': "性能基准测试",
    'compare.benchmarks.note': "*基准分数是基于公开聚合数据的说明性展示。",
    'compare.deepdive.title': "深度分析",
    'compare.deepdive.gemma.title': "🏆 Gemma 3n 的胜出之处",
    'compare.deepdive.gemma.1.title': "效率与可及性",
    'compare.deepdive.gemma.1.desc': "在消费级硬件（笔记本、手机）上流畅运行，RAM占用显著减少，是端侧应用的完美选择。",
    'compare.deepdive.gemma.2.title': "原生多模态",
    'compare.deepdive.gemma.2.desc': "从底层设计就支持在单一模型中理解文本、音频和图像，解锁了Llama无法单独处理的新型应用。",
    'compare.deepdive.gemma.3.title': "动态架构",
    'compare.deepdive.gemma.3.desc': "MatFormer架构使其能动态调整计算量，无需巨大的静态参数即可提供均衡的性能。",
    'compare.deepdive.llama.title': "🏆 Llama 3 的胜出之处",
    'compare.deepdive.llama.1.title': "原始推理与编程能力",
    'compare.deepdive.llama.1.desc': "凭借更多专用参数，Llama 3在复杂逻辑推理、数学问题和代码生成方面表现出色，纯文本基准测试通常优于Gemma。",
    'compare.deepdive.llama.2.title': "成熟的微调生态",
    'compare.deepdive.llama.2.desc': "作为一个更成熟的架构，社区为Llama 3贡献了大量针对特定任务的微调版本。",
    'compare.deepdive.llama.3.title': "可预测的性能",
    'compare.deepdive.llama.3.desc': "其标准Transformer架构意味着性能非常可预测，并且能随更强大的硬件很好地扩展。",
    'compare.verdict.title': "最终裁决：哪款适合你？",
    'compare.verdict.subtitle': "你的选择完全取决于项目的核心目标。",
    'compare.verdict.gemma.title': "选择 Gemma 3n 如果...",
    'compare.verdict.gemma.bullet1': "你正在为**移动或边缘设备**构建应用。",
    'compare.verdict.gemma.bullet2': "你的应用需要**多模态能力**（音频/视觉）。",
    'compare.verdict.gemma.bullet3': "**资源效率**和低RAM占用至关重要。",
    'compare.verdict.gemma.bullet4': "你需要一个用于通用任务的、均衡的全面模型。",
    'compare.verdict.llama.title': "选择 Llama 3 如果...",
    'compare.verdict.llama.bullet1': "你的主要用例是**复杂的编程或推理**。",
    'compare.verdict.llama.bullet2': "你拥有**强大的GPU**。",
    'compare.verdict.llama.bullet3': "你需要在**纯文本任务**上获得绝对最佳性能。",
    'compare.verdict.llama.bullet4': "你想利用庞大的社区微调模型库。",
    'compare.cta.title': "准备好深入探索了吗？",
    'compare.cta.subtitle': "浏览我们的实战教程，掌握这两款模型。",
    'compare.cta.button1': "浏览全部教程",
    'compare.cta.button2': "获取工具箱",

    // Leaderboard Page
    'leaderboard.title': "AI模型排行榜：最佳开源模型对比",
    'leaderboard.description': "一个数据驱动、可排序的排行榜，比较Gemma 3n、Llama 3、Phi-3和Qwen 2等顶级开源AI模型。可按MMLU、GSM8K和HumanEval等基准进行筛选。",
    'leaderboard.h1': "开源模型排行榜",
    'leaderboard.subheading': "当今顶级开源AI模型的权威数据驱动排名。排序、比较，找到最适合您需求的模型。",
    'leaderboard.badge': "社区基准测试",
    'leaderboard.table.rank': "排名",
    'leaderboard.table.model': "模型",
    'leaderboard.table.params': "参数量 (B)",
    'leaderboard.table.mmlu': "MMLU",
    'leaderboard.table.gsm8k': "GSM8K",
    'leaderboard.table.humaneval': "HumanEval",
    'leaderboard.table.tags': "标签",
    'leaderboard.notes.definitions': "* MMLU: Massive Multitask Language Understanding. GSM8K: Grade School Math. HumanEval: Code Generation.",
    'leaderboard.notes.disclaimer': "* 性能数据基于公开信息，可能因量化和实现方式而异。",
    'leaderboard.tags.reasoning': "推理能力强",
    'leaderboard.tags.efficiency': "效率之王",
    'leaderboard.tags.multimodal': "多模态",
    'leaderboard.tags.coder': "编程高手",
    'leaderboard.tags.on_device': "端侧设备",
    'leaderboard.tags.fast': "速度快",

    // 隐私与条款
    'privacy.title': "隐私政策",
    'privacy.h1': "Gemma-3n.net 隐私政策",
    'privacy.effective_date': "生效日期：2025年7月1日",
    'privacy.p1': "欢迎访问 Gemma-3n.net。我们致力于保护您的隐私。本隐私政策解释了当您访问我们的网站时，我们如何收集、使用、披露和保护您的信息。请仔细阅读本隐私政策。如果您不同意本隐私政策的条款，请不要访问本网站。",
    'privacy.h2_info': "您的信息收集",
    'privacy.p2': "我们可能以多种方式收集有关您的信息。我们可能在网站上收集的信息包括：",
    'privacy.h3_personal': "个人数据",
    'privacy.p3': "您在订阅我们的新闻通讯时自愿提供给我们的个人身份信息，例如您的电子邮件地址。",
    'privacy.h3_analytics': "衍生数据",
    'privacy.p4': "当您访问本网站时，我们的服务器会自动收集的信息，例如您的IP地址、浏览器类型、操作系统、访问时间以及您在访问本网站前后直接查看的页面。我们使用注重隐私的分析服务，不使用谷歌分析。",
    'privacy.h2_use': "您的信息使用",
    'privacy.p5': "拥有关于您的准确信息使我们能够为您提供流畅、高效和定制化的体验。具体而言，我们可能使用通过本网站收集的关于您的信息来：就您的帐户或订单向您发送电子邮件，回复客户服务请求，以及向您发送新闻通讯。",
    'privacy.h2_security': "您的信息安全",
    'privacy.p6': "我们使用行政、技术和物理安全措施来帮助保护您的个人信息。虽然我们已采取合理措施来保护您提供给我们的个人信息，但请注意，尽管我们做出了努力，但没有任何安全措施是完美或不可逾越的，也没有任何数据传输方法可以保证不会被拦截或遭到其他类型的滥用。",
    'privacy.h2_contact': "联系我们",
    'privacy.p7': "如果您对本隐私政策有任何问题或意见，请通过以下方式与我们联系：legal@gemma-3n.net",

    'terms.title': "服务条款",
    'terms.h1': "Gemma-3n.net 服务条款",
    'terms.effective_date': "生效日期：2025年7月1日",
    'terms.p1': "使用位于 Gemma-3n.net 的网站（“本网站”），即表示您同意受本服务条款（“本协议”）的约束，无论您是否注册为会员。如果您不同意这些条款，则不应使用本网站。",
    'terms.h2_use': "网站使用",
    'terms.p2': "您只能将本网站用于个人非商业用途。您同意不为任何非法或本协议禁止的目的使用本网站。您不得以任何可能损坏、禁用、超载或损害本网站的方式使用本网站。",
    'terms.h2_disclaimer': "免责声明",
    'terms.p3': "本网站上提供的信息仅供一般参考之用。本网站上的所有信息均出于善意提供，但我们不对本网站上任何信息的准确性、充分性、有效性、可靠性、可用性或完整性作出任何明示或暗示的陈述或保证。",
    'terms.h2_liability': "责任限制",
    'terms.p4': "在任何情况下，我们或我们的董事、员工或代理人均不对您或任何第三方因您使用本网站而引起的任何直接、间接、后果性、惩戒性、附带性、特殊性或惩罚性损害负责，包括利润损失、收入损失、数据丢失或其他损害，即使我们已被告知可能发生此类损害。",
    'terms.h2_governing': "管辖法律",
    'terms.p5': "本协议应受加利福尼亚州法律管辖并根据其解释，不考虑其法律冲突原则。",
    'terms.h2_contact': "联系我们",
    'terms.p6': "如果您对本服务条款有任何问题或意见，请通过以下方式与我们联系：legal@gemma-3n.net",
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