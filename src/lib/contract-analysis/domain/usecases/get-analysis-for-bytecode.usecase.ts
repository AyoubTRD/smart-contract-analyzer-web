import { Usecase } from "@/lib/shared/domain/usecases/usecase";
import { inject, injectable } from "tsyringe";
import { AnalysisResultEntity } from "../entities/analysis-result.entity";
import { DI_TOKENS } from "@/lib/di/DI_TOKENS";
import type { AnalysisRepository } from "../repositories/analysis/analysis.repository";

interface Params {
  modelId: string;
  bytecode: string;
}

@injectable()
export class GetAnalysisForBytecodeUsecase
  implements Usecase<Params, AnalysisResultEntity>
{
  constructor(
    @inject(DI_TOKENS.AnalysisRepository)
    private analysisRepository: AnalysisRepository,
  ) {}

  execute(params: Params): Promise<AnalysisResultEntity> {
    return this.analysisRepository.analyzeBytecode(
      params.modelId,
      params.bytecode,
    );
  }
}
