import { inject, injectable } from "tsyringe";
import { AnalysisDataSource } from "./analysis.datasource";
import { AnalysisResultModel } from "./models/analysis-result.model";
import type { AnalyzerModelDataSource } from "./analyzer-model.datasource";
import { DI_TOKENS } from "@/lib/di/DI_TOKENS";
import { API_ENDPOINT } from "@/lib/config/api";
import axios from "axios";

@injectable()
export class V1ApiAnalysisDatasource implements AnalysisDataSource {
  axiosClient = new axios.Axios({
    baseURL: API_ENDPOINT + "/analyze",
  });

  constructor(
    @inject(DI_TOKENS.AnalyzerModelDataSource)
    private analyzerModelDatasource: AnalyzerModelDataSource,
  ) {}

  async requestAnalysisForSourceCode(
    modelId: string,
    sourceCode: string,
  ): Promise<AnalysisResultModel> {
    const model = await this.analyzerModelDatasource.getModelById(modelId);
    if (!model) throw new Error("Model does not exist");

    const response = await this.axiosClient.get("/sourcecode", {
      params: {
        sourcecode: sourceCode,
        modelId,
      },
    });
    const data = JSON.parse(response.data);

    return new AnalysisResultModel(
      null,
      data.vulnerabilities.map((v: any) => ({
        id: v.id,
        name: v.name,
        description: v.desc,
      })),
      model,
    );
  }
  async requestAnalysisForBytecode(
    modelId: string,
    bytecode: string,
  ): Promise<AnalysisResultModel> {
    const model = await this.analyzerModelDatasource.getModelById(modelId);
    if (!model) throw new Error("Model does not exist");

    const response = await this.axiosClient.get("/bytecode", {
      params: {
        bytecode: bytecode,
        modelId,
      },
    });

    return new AnalysisResultModel(
      null,
      response.data.vulnerabilities.map((v: any) => ({
        id: v.id,
        name: v.name,
        description: v.desc,
      })),
      model,
    );
  }
}
