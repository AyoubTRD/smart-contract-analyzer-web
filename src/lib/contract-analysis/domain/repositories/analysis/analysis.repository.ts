import { AnalysisResultEntity } from "../../entities/analysis-result.entity";

export interface AnalysisRepository {
  analyzeSourceCode(
    modelId: string,
    sourcecode: string,
  ): Promise<AnalysisResultEntity>;

  analyzeBytecode(
    modelId: string,
    bytecode: string,
  ): Promise<AnalysisResultEntity>;
}
