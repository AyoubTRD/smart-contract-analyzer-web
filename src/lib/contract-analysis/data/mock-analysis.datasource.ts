import { inject, injectable } from "tsyringe";
import type { AnalysisDataSource } from "./analysis.datasource";
import { DI_TOKENS } from "@/lib/di/DI_TOKENS";
import type { AnalyzerModelDataSource } from "./analyzer-model.datasource";
import { AnalysisResultModel } from "./models/analysis-result.model";

@injectable()
export class MockAnalysisDataSource implements AnalysisDataSource {
  constructor(
    @inject(DI_TOKENS.AnalyzerModelDataSource)
    private analyzerModelDatasource: AnalyzerModelDataSource,
  ) {}

  requestAnalysisForBytecode(
    modelId: string,
    bytecode: string,
  ): Promise<AnalysisResultModel> {
    return this.requestAnalysisForSourceCode(modelId, "");
  }

  async requestAnalysisForSourceCode(
    modelId: string,
    sourceCode: string,
  ): Promise<AnalysisResultModel> {
    const model = await this.analyzerModelDatasource.getModelById(modelId);

    if (!model) throw new Error(`Model: ${modelId} not found`);

    return new AnalysisResultModel(
      "Hello world",
      [
        {
          id: "1",
          name: "SQL Injection",
          description:
            "This is a vulnerability where an attacker can execute malicious SQL statements.",
        },
        {
          id: "2",
          name: "Cross-Site Scripting (XSS)",
          description:
            "This vulnerability allows attackers to inject malicious scripts into web pages.",
        },
        {
          id: "3",
          name: "Insecure Deserialization",
          description:
            "Insecure deserialization can lead to remote code execution attacks.",
        },
      ],
      model,
    );
  }
}
