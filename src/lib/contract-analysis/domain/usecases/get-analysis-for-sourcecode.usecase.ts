import { Usecase } from "@/lib/shared/domain/usecases/usecase";
import { AnalysisResultEntity } from "../entities/analysis-result.entity";
import { inject, injectable } from "tsyringe";
import { DI_TOKENS } from "@/lib/di/DI_TOKENS";
import type { AnalysisRepository } from "../repositories/analysis/analysis.repository";

interface Params {
  modelId: string;
  sourcecode: string;
}

@injectable()
export class GetAnalysisForSourceCodeUsecase
  implements Usecase<Params, AnalysisResultEntity>
{
  constructor(
    @inject(DI_TOKENS.AnalysisRepository)
    private analysisRepository: AnalysisRepository,
  ) {}

  execute({ sourcecode, modelId }: Params): Promise<AnalysisResultEntity> {
    return this.analysisRepository.analyzeSourceCode(modelId, sourcecode);
  }
}
