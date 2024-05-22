import { injectable } from "tsyringe";
import { AnalyzerModelDataSource } from "./analyzer-model.datasource";
import { AnalyzerModelModel } from "./models/analyzer-model.model";
import { API_ENDPOINT } from "@/lib/config/api";

@injectable()
export class V1ApiAnalyzerModelDatasource implements AnalyzerModelDataSource {
  async getAvailableModels(): Promise<AnalyzerModelModel[]> {
    const response = await fetch(API_ENDPOINT + "/models");
    const data = await response.json();

    return data.map(
      (item: any) =>
        new AnalyzerModelModel(
          item.id,
          item.name,
          item.desc,
          item.supports_sourcecode,
          item.supports_bytecode,
        ),
    );
  }
  async getModelById(id: string): Promise<AnalyzerModelModel | null> {
    const models = await this.getAvailableModels();
    return models.find((model) => model.id === id) ?? null;
  }
}
