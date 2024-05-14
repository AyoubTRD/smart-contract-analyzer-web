import { AnalysisResultModel } from "./models/analysis-result.model";

export interface AnalysisDataSource {
  requestAnalysisForSourceCode(
    modelId: string,
    sourceCode: string,
  ): Promise<AnalysisResultModel>;

  requestAnalysisForBytecode(
    modelId: string,
    bytecode: string,
  ): Promise<AnalysisResultModel>;
}
