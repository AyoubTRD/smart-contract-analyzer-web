import { inject, injectable } from "tsyringe";
import { AnalyzerModelEntity } from "../entities/analyzer-model.entity";
import { DI_TOKENS } from "@/lib/di/DI_TOKENS";
import type { AnalyzerModelRepository } from "../repositories/analyzer-model/analyzer-model.repository";
import { Usecase } from "@/lib/shared/domain/usecases/usecase";

@injectable()
export class FetchAvailableModelsUsecase
  implements Usecase<void, AnalyzerModelEntity[]>
{
  constructor(
    @inject(DI_TOKENS.AnalyzerModelRepository)
    private analyzerModelRepository: AnalyzerModelRepository,
  ) {}

  async execute(): Promise<AnalyzerModelEntity[]> {
    return this.analyzerModelRepository.getAvailableModels();
  }
}
