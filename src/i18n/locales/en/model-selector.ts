export const modelSelector = {
  'title': 'AI Model Selector',
  'subtitle': 'Find the perfect Gemma 3n model for your needs',
  'description': 'Get personalized recommendations based on your hardware, use case, and preferences',
  
  // Step Navigation
  'step.hardware': 'Hardware',
  'step.usecase': 'Use Case',
  'step.preferences': 'Preferences',
  'step.results': 'Results',
  
  // Hardware Section
  'hardware.title': 'Hardware Configuration',
  'hardware.description': 'Tell us about your device specifications',
  'hardware.ram.label': 'RAM (Memory)',
  'hardware.ram.placeholder': 'Enter RAM in GB (e.g., 8, 16, 32)',
  'hardware.gpu.label': 'Graphics Card',
  'hardware.gpu.placeholder': 'e.g., RTX 3060, Integrated Graphics, Mobile GPU',
  'hardware.cpu.label': 'Processor',
  'hardware.cpu.placeholder': 'e.g., Intel i7, AMD Ryzen 5, Mobile CPU',
  'hardware.auto-detect': 'Auto-detect my hardware',
  'hardware.auto-detect.loading': 'Detecting...',
  
  // Use Case Section
  'usecase.title': 'What will you use it for?',
  'usecase.description': 'Select your primary use case',
  'usecase.chat.name': 'Chat & Conversation',
  'usecase.chat.description': 'General conversation, customer support, casual interactions',
  'usecase.coding.name': 'Programming & Development',
  'usecase.coding.description': 'Code generation, debugging, software development',
  'usecase.content.name': 'Content Creation',
  'usecase.content.description': 'Writing articles, creative content, text generation',
  'usecase.analysis.name': 'Data Analysis & Research',
  'usecase.analysis.description': 'Data analysis, research tasks, complex reasoning',
  'usecase.finetuning.name': 'Fine-tuning & Customization',
  'usecase.finetuning.description': 'Training custom models for specific applications',
  
  // Preferences Section
  'preferences.title': 'Performance Preferences',
  'preferences.description': 'What matters most to you?',
  'preferences.speed.name': 'Speed',
  'preferences.speed.description': 'Fast response times, real-time applications',
  'preferences.accuracy.name': 'Accuracy',
  'preferences.accuracy.description': 'High-quality outputs, precision tasks',
  'preferences.efficiency.name': 'Efficiency',
  'preferences.efficiency.description': 'Low resource usage, battery life',
  'preferences.experience.label': 'Experience Level',
  'preferences.experience.beginner': 'Beginner',
  'preferences.experience.intermediate': 'Intermediate',
  'preferences.experience.advanced': 'Advanced',
  
  // Results Section
  'results.title': 'Your Personalized Recommendations',
  'results.description': 'Based on your configuration, here are the best models for you',
  'results.top-recommendation': 'Top Recommendation',
  'results.other-options': 'Other Options',
  'results.score': 'Compatibility Score',
  'results.breakdown': 'Score Breakdown',
  'results.hardware-score': 'Hardware',
  'results.usecase-score': 'Use Case',
  'results.performance-score': 'Performance',
  'results.experience-score': 'Experience',
  'results.reasoning': 'Why this model?',
  'results.memory-requirements': 'Memory Requirements',
  'results.min': 'Min',
  'results.recommended': 'Recommended',
  'results.optimal': 'Optimal',
  'results.features': 'Key Features',
  'results.limitations': 'Limitations',
  'results.download': 'Download & Setup',
  'results.ollama': 'Ollama',
  'results.huggingface': 'Hugging Face',
  'results.try-demo': 'Try Demo',
  'results.read-guide': 'Read Guide',
  'results.related-articles': 'Related Articles',
  
  // Actions
  'action.next': 'Next',
  'action.previous': 'Previous',
  'action.start-over': 'Start Over',
  'action.get-recommendations': 'Get Recommendations',
  'action.copy-command': 'Copy Command',
  'action.copied': 'Copied!',
  
  // Validation
  'validation.ram.required': 'Please enter your RAM amount',
  'validation.ram.invalid': 'Please enter a valid RAM amount (e.g., 8, 16, 32)',
  'validation.gpu.required': 'Please enter your graphics card',
  'validation.cpu.required': 'Please enter your processor',
  'validation.usecase.required': 'Please select a use case',
  'validation.priority.required': 'Please select a performance priority',
  'validation.experience.required': 'Please select your experience level',
  
  // Hardware Detection
  'detection.success': 'Hardware detected successfully',
  'detection.failed': 'Hardware detection failed. Please enter manually.',
  'detection.not-supported': 'Hardware detection not supported in your browser',
  
  // Loading States
  'loading.calculating': 'Calculating recommendations...',
  'loading.detecting': 'Detecting hardware...',
  
  // Error Messages
  'error.general': 'Something went wrong. Please try again.',
  'error.no-recommendations': 'No suitable models found. Try adjusting your requirements.',
  
  // SEO
  'seo.title': 'AI Model Selector - Find Your Perfect Gemma 3n Model',
  'seo.description': 'Get personalized AI model recommendations based on your hardware, use case, and preferences. Compare Gemma 3n E2B vs E4B models.',
  'seo.keywords': 'AI model selector, Gemma 3n comparison, model recommendation, hardware compatibility, AI model choice'
} as const; 