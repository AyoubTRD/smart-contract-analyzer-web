import { AnalyzerModelModel } from "./models/analyzer-model.model";

export interface AnalyzerModelDataSource {
  getAvailableModels(): Promise<AnalyzerModelModel[]>;

  getModelById(id: string): Promise<AnalyzerModelModel | null>;
}
