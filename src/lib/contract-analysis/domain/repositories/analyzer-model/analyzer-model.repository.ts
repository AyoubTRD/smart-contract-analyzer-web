import { AnalyzerModelEntity } from "../../entities/analyzer-model.entity";

export interface AnalyzerModelRepository {
  getAvailableModels(): Promise<AnalyzerModelEntity[]>;
}
