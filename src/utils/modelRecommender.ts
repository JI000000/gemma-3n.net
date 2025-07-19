import { modelDatabase, type ModelData, type HardwareProfile, type UseCaseProfile } from '../data/models';

export interface UserInput {
  hardware: {
    ram: number;
    gpu: string;
    cpu: string;
  };
  useCase: string;
  priority: 'speed' | 'accuracy' | 'efficiency';
  experience: 'beginner' | 'intermediate' | 'advanced';
}

export interface RecommendationScore {
  model: ModelData;
  totalScore: number;
  breakdown: {
    hardware: number;
    useCase: number;
    performance: number;
    experience: number;
  };
  reasoning: string[];
}

export class ModelRecommender {
  private models = modelDatabase.models;
  private hardwareProfiles = modelDatabase.hardwareProfiles;
  private useCaseProfiles = modelDatabase.useCaseProfiles;

  getRecommendations(userInput: UserInput): RecommendationScore[] {
    const scores = this.models.map(model => this.calculateScore(userInput, model));
    
    // Sort by total score (descending)
    return scores.sort((a, b) => b.totalScore - a.totalScore);
  }

  getTopRecommendation(userInput: UserInput): RecommendationScore | null {
    const recommendations = this.getRecommendations(userInput);
    return recommendations.length > 0 ? recommendations[0] : null;
  }

  private calculateScore(userInput: UserInput, model: ModelData): RecommendationScore {
    const hardwareScore = this.calculateHardwareScore(userInput.hardware, model);
    const useCaseScore = this.calculateUseCaseScore(userInput.useCase, model);
    const performanceScore = this.calculatePerformanceScore(userInput.priority, model);
    const experienceScore = this.calculateExperienceScore(userInput.experience, model);

    const totalScore = (
      hardwareScore.score * 0.35 +
      useCaseScore.score * 0.35 +
      performanceScore.score * 0.20 +
      experienceScore.score * 0.10
    );

    return {
      model,
      totalScore,
      breakdown: {
        hardware: hardwareScore.score,
        useCase: useCaseScore.score,
        performance: performanceScore.score,
        experience: experienceScore.score
      },
      reasoning: [
        ...hardwareScore.reasoning,
        ...useCaseScore.reasoning,
        ...performanceScore.reasoning,
        ...experienceScore.reasoning
      ]
    };
  }

  private calculateHardwareScore(hardware: UserInput['hardware'], model: ModelData) {
    let score = 0;
    const reasoning: string[] = [];

    // RAM compatibility (40% of hardware score)
    const ramScore = this.calculateRAMScore(hardware.ram, model.memory);
    score += ramScore.score * 0.4;
    reasoning.push(...ramScore.reasoning);

    // GPU compatibility (30% of hardware score)
    const gpuScore = this.calculateGPUScore(hardware.gpu, model);
    score += gpuScore.score * 0.3;
    reasoning.push(...gpuScore.reasoning);

    // CPU compatibility (30% of hardware score)
    const cpuScore = this.calculateCPUScore(hardware.cpu, model);
    score += cpuScore.score * 0.3;
    reasoning.push(...cpuScore.reasoning);

    return { score, reasoning };
  }

  private calculateRAMScore(userRAM: number, modelMemory: ModelData['memory']) {
    let score = 0;
    const reasoning: string[] = [];

    if (userRAM >= modelMemory.optimal) {
      score = 100;
      reasoning.push(`Your ${userRAM}GB RAM exceeds optimal requirements (${modelMemory.optimal}GB)`);
    } else if (userRAM >= modelMemory.recommended) {
      score = 85;
      reasoning.push(`Your ${userRAM}GB RAM meets recommended requirements (${modelMemory.recommended}GB)`);
    } else if (userRAM >= modelMemory.min) {
      score = 60;
      reasoning.push(`Your ${userRAM}GB RAM meets minimum requirements (${modelMemory.min}GB)`);
    } else {
      score = 20;
      reasoning.push(`Your ${userRAM}GB RAM is below minimum requirements (${modelMemory.min}GB)`);
    }

    return { score, reasoning };
  }

  private calculateGPUScore(userGPU: string, model: ModelData) {
    let score = 70; // Base score
    const reasoning: string[] = [];

    const gpuLower = userGPU.toLowerCase();
    
    if (gpuLower.includes('rtx') || gpuLower.includes('gtx')) {
      score = 95;
      reasoning.push('Dedicated NVIDIA GPU detected - excellent for AI inference');
    } else if (gpuLower.includes('amd') || gpuLower.includes('radeon')) {
      score = 85;
      reasoning.push('Dedicated AMD GPU detected - good for AI inference');
    } else if (gpuLower.includes('integrated') || gpuLower.includes('intel')) {
      score = 60;
      reasoning.push('Integrated graphics detected - CPU-based inference will be used');
    } else if (gpuLower.includes('mobile') || gpuLower.includes('mali')) {
      score = 50;
      reasoning.push('Mobile GPU detected - limited AI acceleration');
    } else {
      score = 70;
      reasoning.push('Unknown GPU type - moderate performance expected');
    }

    // Adjust based on model size
    if (model.params > 4 && score < 80) {
      score -= 10;
      reasoning.push('Large model may be slow on this GPU');
    }

    return { score, reasoning };
  }

  private calculateCPUScore(userCPU: string, model: ModelData) {
    let score = 70; // Base score
    const reasoning: string[] = [];

    const cpuLower = userCPU.toLowerCase();
    
    if (cpuLower.includes('i9') || cpuLower.includes('ryzen 9')) {
      score = 95;
      reasoning.push('High-end CPU detected - excellent performance');
    } else if (cpuLower.includes('i7') || cpuLower.includes('ryzen 7')) {
      score = 85;
      reasoning.push('Mid-high CPU detected - good performance');
    } else if (cpuLower.includes('i5') || cpuLower.includes('ryzen 5')) {
      score = 75;
      reasoning.push('Mid-range CPU detected - moderate performance');
    } else if (cpuLower.includes('i3') || cpuLower.includes('ryzen 3')) {
      score = 60;
      reasoning.push('Entry-level CPU detected - limited performance');
    } else if (cpuLower.includes('mobile') || cpuLower.includes('m')) {
      score = 50;
      reasoning.push('Mobile CPU detected - power-efficient but slower');
    } else {
      score = 70;
      reasoning.push('Unknown CPU type - moderate performance expected');
    }

    return { score, reasoning };
  }

  private calculateUseCaseScore(useCaseId: string, model: ModelData) {
    let score = 50; // Base score
    const reasoning: string[] = [];

    const useCaseProfile = this.useCaseProfiles.find(uc => uc.id === useCaseId);
    if (!useCaseProfile) {
      reasoning.push('Unknown use case - moderate compatibility');
      return { score, reasoning };
    }

    // Check if model supports this use case
    if (model.useCases.includes(useCaseId)) {
      score += 30;
      reasoning.push(`Model explicitly supports ${useCaseProfile.name}`);
    } else if (model.useCases.some(uc => useCaseProfile.relatedModels.includes(uc))) {
      score += 20;
      reasoning.push(`Model has related capabilities for ${useCaseProfile.name}`);
    }

    // Check parameter count suitability
    if (useCaseProfile.requirements.accuracy === 'high' && model.params >= 4) {
      score += 15;
      reasoning.push('Large model suitable for high-accuracy requirements');
    } else if (useCaseProfile.requirements.accuracy === 'low' && model.params <= 2.5) {
      score += 15;
      reasoning.push('Small model suitable for basic accuracy requirements');
    }

    // Check memory requirements
    if (useCaseProfile.requirements.memory === 'low' && model.memory.recommended <= 8) {
      score += 10;
      reasoning.push('Low memory footprint suitable for resource-constrained use');
    } else if (useCaseProfile.requirements.memory === 'high' && model.memory.recommended >= 16) {
      score += 10;
      reasoning.push('High memory capacity suitable for complex tasks');
    }

    return { score, reasoning };
  }

  private calculatePerformanceScore(priority: UserInput['priority'], model: ModelData) {
    let score = 0;
    const reasoning: string[] = [];

    switch (priority) {
      case 'speed':
        score = model.performance.speed;
        reasoning.push(`Speed priority: ${model.performance.speed}/100`);
        break;
      case 'accuracy':
        score = model.performance.accuracy;
        reasoning.push(`Accuracy priority: ${model.performance.accuracy}/100`);
        break;
      case 'efficiency':
        score = model.performance.efficiency;
        reasoning.push(`Efficiency priority: ${model.performance.efficiency}/100`);
        break;
    }

    return { score, reasoning };
  }

  private calculateExperienceScore(experience: UserInput['experience'], model: ModelData) {
    let score = 70; // Base score
    const reasoning: string[] = [];

    switch (experience) {
      case 'beginner':
        if (model.id.includes('it')) {
          score += 20;
          reasoning.push('Instruction-tuned model is beginner-friendly');
        } else {
          score -= 20;
          reasoning.push('Base model requires fine-tuning knowledge');
        }
        break;
      case 'intermediate':
        score += 10;
        reasoning.push('Intermediate users can handle any model type');
        break;
      case 'advanced':
        if (model.id.includes('base')) {
          score += 15;
          reasoning.push('Base model suitable for advanced customization');
        }
        reasoning.push('Advanced users can optimize any model');
        break;
    }

    return { score, reasoning };
  }

  // Helper methods for UI
  getHardwareProfiles(): HardwareProfile[] {
    return this.hardwareProfiles;
  }

  getUseCaseProfiles(): UseCaseProfile[] {
    return this.useCaseProfiles;
  }

  getModelById(id: string): ModelData | undefined {
    return this.models.find(model => model.id === id);
  }

  getModelsByUseCase(useCaseId: string): ModelData[] {
    return this.models.filter(model => model.useCases.includes(useCaseId));
  }
} 