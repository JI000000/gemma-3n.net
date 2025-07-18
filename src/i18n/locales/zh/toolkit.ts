export const toolkit = {
  'toolkit.title': 'Gemma 3n 工具箱 - 完整开发者资源',
  'toolkit.description': 'Gemma 3n开发的综合工具箱。包括Ollama设置、Hugging Face集成、iOS部署指南和模型对比工具。',
  'toolkit.h1': 'Gemma 3n 工具箱',
  'toolkit.subheading': '开始Gemma 3n开发所需的一切。从快速设置到高级部署策略。',
  'toolkit.tag1': 'Ollama 就绪',
  'toolkit.tag2': 'Hugging Face 兼容',
  'toolkit.tag3': 'iOS 优化',
  
  // Quick Start Tools
  'toolkit.quickstart.title': '快速开始工具',
  'toolkit.quickstart.ollama.title': 'Ollama 设置',
  'toolkit.quickstart.ollama.desc': '使用Ollama在5分钟内本地运行Gemma 3n。',
  'toolkit.quickstart.ollama.code': '# 首先安装Ollama\nollama run gemma-3n:e4b\n# 或者使用更小的模型\nollama run gemma-3n:e2b',
  'toolkit.quickstart.ollama.link': '完整指南 →',
  'toolkit.quickstart.hf.title': 'Hugging Face',
  'toolkit.quickstart.hf.desc': '直接从Hugging Face Hub使用Gemma 3n模型。',
  'toolkit.quickstart.hf.code': 'from transformers import AutoTokenizer, AutoModelForCausalLM\nmodel_name = "google/gemma-3n-e4b-it"\nmodel = AutoModelForCausalLM.from_pretrained(model_name)',
  'toolkit.quickstart.hf.link': '浏览模型 →',
  'toolkit.quickstart.compare.title': 'E2B vs E4B',
  'toolkit.quickstart.compare.desc': '交互式工具帮助您选择正确的模型大小。',
  'toolkit.quickstart.compare.e2b': 'E2B: 移动友好',
  'toolkit.quickstart.compare.e4b': 'E4B: 更高准确性',
  'toolkit.quickstart.compare.ram2b': '4GB RAM',
  'toolkit.quickstart.compare.ram4b': '8GB RAM',
  'toolkit.quickstart.compare.link': '详细对比 →',
  
  // Platform Integrations
  'toolkit.platform.title': '平台集成',
  'toolkit.platform.ios.title': '📱 iOS 开发',
  'toolkit.platform.ios.desc': '在iOS设备上部署Gemma 3n模型，获得优化性能。',
  'toolkit.platform.ios.setup': '推荐设置:',
  'toolkit.platform.ios.setup1': 'Gemma 3n E2B for iPhone (2GB模型)',
  'toolkit.platform.ios.setup2': 'CoreML转换以获得最佳性能',
  'toolkit.platform.ios.setup3': 'GGUF量化以减少大小',
  'toolkit.platform.ios.code': '# 转换为CoreML\npip install coremltools\n# 遵循我们的详细iOS指南',
  'toolkit.platform.ios.link': 'iOS部署指南 →',
  'toolkit.platform.finetune.title': '🔧 微调工具',
  'toolkit.platform.finetune.desc': '为您的特定用例定制Gemma 3n模型。',
  'toolkit.platform.finetune.methods': '可用方法:',
  'toolkit.platform.finetune.lora': 'LoRA (低秩适应)',
  'toolkit.platform.finetune.unsloth': 'Unsloth实现2倍更快训练',
  'toolkit.platform.finetune.colab': 'Google Colab笔记本就绪',
  'toolkit.platform.finetune.code': '# 从Unsloth开始\npip install unsloth\n# 或尝试我们的LoRA教程',
  'toolkit.platform.finetune.lora_link': 'LoRA指南 →',
  'toolkit.platform.finetune.unsloth_link': 'Unsloth指南 →',
  
  // Hardware Requirements
  'toolkit.hardware.title': '硬件要求',
  'toolkit.hardware.table.model': '模型',
  'toolkit.hardware.table.ram_fp16': 'RAM (FP16)',
  'toolkit.hardware.table.ram_4bit': 'RAM (4-bit)',
  'toolkit.hardware.table.use_case': '最佳用例',
  'toolkit.hardware.e2b': 'Gemma 3n E2B',
  'toolkit.hardware.e4b': 'Gemma 3n E4B',
  'toolkit.hardware.use_case_mobile': '移动设备、边缘设备',
  'toolkit.hardware.use_case_laptop': '笔记本电脑、工作站',
  'toolkit.hardware.features.cpu.title': '✅ 仅CPU',
  'toolkit.hardware.features.cpu.desc': '两个模型在仅CPU设置上都能高效运行',
  'toolkit.hardware.features.gpu.title': '🚀 GPU加速',
  'toolkit.hardware.features.gpu.desc': '使用CUDA/Metal支持显著提升速度',
  'toolkit.hardware.features.mobile.title': '📱 移动就绪',
  'toolkit.hardware.features.mobile.desc': 'E2B针对iOS和Android部署优化',
  
  'toolkit.resources.title': '官方资源',
  'toolkit.resources.description': '直接从Google和开源社区获取最新的官方文档、研究论文和社区讨论。',
  'toolkit.resources.google.title': 'Google 官方',
  'toolkit.resources.google.deepmind_page': 'DeepMind 官方页面',
  'toolkit.resources.google.deepmind_desc': '官方模型概述、架构详情和性能基准。',
  'toolkit.resources.google.ai_dev': 'AI 开发者',
  'toolkit.resources.google.ai_dev_desc': '技术文档、API参考和集成指南。',
  'toolkit.resources.google.announcement': '官方公告',
  'toolkit.resources.google.announcement_desc': '发布公告、核心特性和架构创新。',
  'toolkit.downloads.title': '下载模型',
  'toolkit.downloads.huggingface': 'Hugging Face Hub',
  'toolkit.downloads.huggingface_desc': '官方模型仓库，提供多种格式选项。',
  'toolkit.downloads.ollama': 'Ollama 库',
  'toolkit.downloads.ollama_desc': '本地开发的简单一键安装。',
  'toolkit.downloads.ollama_link': '在Ollama上查看',
  'toolkit.community.title': '社区与研究',
  'toolkit.community.reddit': 'r/LocalLLaMA',
  'toolkit.community.reddit_desc': '活跃的社区讨论、基准测试和用户体验。',
  'toolkit.community.hackernews': 'Hacker News',
  'toolkit.community.hackernews_desc': 'Gemma 3n的技术讨论和社区反馈。',
  'toolkit.community.research': '研究项目',
  'toolkit.community.research_desc': '逆向工程工作和架构分析。',
  'toolkit.learning.title': '学习资源',
  'toolkit.learning.unsloth': 'Unsloth 博客',
  'toolkit.learning.unsloth_desc': '微调指南和性能优化技术。',
  'toolkit.learning.hf_blog': 'Hugging Face 博客',
  'toolkit.learning.hf_blog_desc': '技术深度分析和集成教程。',
  
  // CTA sections - 中文翻译
  'cta.title': '准备使用Gemma 3n构建应用了吗？',
  'cta.subtitle': '加入已在生产环境中使用Gemma 3n的数千名开发者。',
  'cta.button1': '浏览教程',
  'cta.button2': '下载模型',
} as const; 