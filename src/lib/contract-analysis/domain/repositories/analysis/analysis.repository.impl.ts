import { inject, injectable } from "tsyringe";
import { AnalysisRepository } from "./analysis.repository";
import { DI_TOKENS } from "@/lib/di/DI_TOKENS";
import type { AnalysisDataSource } from "@/lib/contract-analysis/data/analysis.datasource";
import { AnalysisResultEntity } from "../../entities/analysis-result.entity";

@injectable()
export class AnalysisRepositoryImpl implements AnalysisRepository {
  constructor(
    @inject(DI_TOKENS.AnalysisDataSource)
    private analysisDatasource: AnalysisDataSource,
  ) {}

  async analyzeSourceCode(
    modelId: string,
    sourcecode: string,
  ): Promise<AnalysisResultEntity> {
    const result = await this.analysisDatasource.requestAnalysisForSourceCode(
      modelId,
      sourcecode,
    );

    return result;
  }

  async analyzeBytecode(
    modelId: string,
    bytecode: string,
  ): Promise<AnalysisResultEntity> {
    const result = await this.analysisDatasource.requestAnalysisForBytecode(
      modelId,
      bytecode,
    );

    return result;
  }
}
