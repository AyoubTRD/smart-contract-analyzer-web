import { inject, injectable } from "tsyringe";
import { AnalyzerModelRepository } from "./analyzer-model.repository";
import { DI_TOKENS } from "@/lib/di/DI_TOKENS";
import type { AnalyzerModelDataSource } from "@/lib/contract-analysis/data/analyzer-model.datasource";
import { AnalyzerModelEntity } from "../../entities/analyzer-model.entity";
import { AnalyzerModelAdapter } from "../../entities/adapters/analyzer-model.adapter";

@injectable()
export class AnalyzerModelRepositoryImpl implements AnalyzerModelRepository {
  constructor(
    @inject(DI_TOKENS.AnalyzerModelDataSource)
    private modelDataSource: AnalyzerModelDataSource,
    @inject(AnalyzerModelAdapter)
    private analyzerModelAdapter: AnalyzerModelAdapter,
  ) {}

  async getAvailableModels(): Promise<AnalyzerModelEntity[]> {
    const models = await this.modelDataSource.getAvailableModels();

    return models.map((model) => this.analyzerModelAdapter.toEntity(model));
  }
}
