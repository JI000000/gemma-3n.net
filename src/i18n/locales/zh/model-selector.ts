export const modelSelector = {
  'title': 'AI模型选择器',
  'subtitle': '为你的需求找到完美的Gemma 3n模型',
  'description': '根据你的硬件、使用场景和偏好获得个性化推荐',
  
  // Step Navigation
  'step.hardware': '硬件配置',
  'step.usecase': '使用场景',
  'step.preferences': '性能偏好',
  'step.results': '推荐结果',
  
  // Hardware Section
  'hardware.title': '硬件配置',
  'hardware.description': '告诉我们你的设备规格',
  'hardware.ram.label': '内存 (RAM)',
  'hardware.ram.placeholder': '输入内存大小，单位GB (例如: 8, 16, 32)',
  'hardware.gpu.label': '显卡',
  'hardware.gpu.placeholder': '例如: RTX 3060, 集成显卡, 移动GPU',
  'hardware.cpu.label': '处理器',
  'hardware.cpu.placeholder': '例如: Intel i7, AMD Ryzen 5, 移动CPU',
  'hardware.auto-detect': '自动检测我的硬件',
  'hardware.auto-detect.loading': '检测中...',
  
  // Use Case Section
  'usecase.title': '你将用它做什么？',
  'usecase.description': '选择你的主要使用场景',
  'usecase.chat.name': '聊天对话',
  'usecase.chat.description': '日常对话、客服支持、休闲互动',
  'usecase.coding.name': '编程开发',
  'usecase.coding.description': '代码生成、调试、软件开发',
  'usecase.content.name': '内容创作',
  'usecase.content.description': '文章写作、创意内容、文本生成',
  'usecase.analysis.name': '数据分析研究',
  'usecase.analysis.description': '数据分析、研究任务、复杂推理',
  'usecase.finetuning.name': '微调定制',
  'usecase.finetuning.description': '为特定应用训练自定义模型',
  
  // Preferences Section
  'preferences.title': '性能偏好',
  'preferences.description': '什么对你最重要？',
  'preferences.speed.name': '速度',
  'preferences.speed.description': '快速响应、实时应用',
  'preferences.accuracy.name': '准确性',
  'preferences.accuracy.description': '高质量输出、精确任务',
  'preferences.efficiency.name': '效率',
  'preferences.efficiency.description': '低资源占用、电池续航',
  'preferences.experience.label': '经验水平',
  'preferences.experience.beginner': '初学者',
  'preferences.experience.intermediate': '中级',
  'preferences.experience.advanced': '高级',
  
  // Results Section
  'results.title': '你的个性化推荐',
  'results.description': '根据你的配置，以下是最适合你的模型',
  'results.top-recommendation': '最佳推荐',
  'results.other-options': '其他选择',
  'results.score': '兼容性评分',
  'results.breakdown': '评分详情',
  'results.hardware-score': '硬件',
  'results.usecase-score': '使用场景',
  'results.performance-score': '性能',
  'results.experience-score': '经验',
  'results.reasoning': '为什么推荐这个模型？',
  'results.memory-requirements': '内存要求',
  'results.min': '最低',
  'results.recommended': '推荐',
  'results.optimal': '最佳',
  'results.features': '主要特性',
  'results.limitations': '限制',
  'results.download': '下载安装',
  'results.ollama': 'Ollama',
  'results.huggingface': 'Hugging Face',
  'results.try-demo': '试用演示',
  'results.read-guide': '阅读指南',
  'results.related-articles': '相关文章',
  
  // Actions
  'action.next': '下一步',
  'action.previous': '上一步',
  'action.start-over': '重新开始',
  'action.get-recommendations': '获取推荐',
  'action.copy-command': '复制命令',
  'action.copied': '已复制！',
  
  // Validation
  'validation.ram.required': '请输入内存大小',
  'validation.ram.invalid': '请输入有效的内存大小 (例如: 8, 16, 32)',
  'validation.gpu.required': '请输入显卡型号',
  'validation.cpu.required': '请输入处理器型号',
  'validation.usecase.required': '请选择使用场景',
  'validation.priority.required': '请选择性能偏好',
  'validation.experience.required': '请选择经验水平',
  
  // Hardware Detection
  'detection.success': '硬件检测成功',
  'detection.failed': '硬件检测失败，请手动输入',
  'detection.not-supported': '你的浏览器不支持硬件检测',
  
  // Loading States
  'loading.calculating': '计算推荐中...',
  'loading.detecting': '检测硬件中...',
  
  // Error Messages
  'error.general': '出现错误，请重试',
  'error.no-recommendations': '未找到合适的模型，请调整你的要求',
  
  // SEO
  'seo.title': 'AI模型选择器 - 找到你的完美Gemma 3n模型',
  'seo.description': '根据硬件、使用场景和偏好获得个性化AI模型推荐。对比Gemma 3n E2B和E4B模型。',
  'seo.keywords': 'AI模型选择器, Gemma 3n对比, 模型推荐, 硬件兼容性, AI模型选择'
} as const; 