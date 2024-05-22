import { container } from "tsyringe";
import { DI_TOKENS } from "./DI_TOKENS";
import { EtherscanContractsDataSource } from "../contracts/data/sources/etherscan-contracts.datasource";
import { ContractsRepositoryImpl } from "../contracts/domain/repositories/contracts.repository.impl";
import { AnalyzerModelRepositoryImpl } from "../contract-analysis/domain/repositories/analyzer-model/analyzer-model.repository.impl";
import { AnalyzerModelAdapter } from "../contract-analysis/domain/entities/adapters/analyzer-model.adapter";
import { MockAnalysisDataSource } from "../contract-analysis/data/mock-analysis.datasource";
import { AnalysisRepositoryImpl } from "../contract-analysis/domain/repositories/analysis/analysis.repository.impl";
import { V1ApiAnalyzerModelDatasource } from "../contract-analysis/data/v1-api-analyzer-model.datasource";
import { V1ApiAnalysisDatasource } from "../contract-analysis/data/v1-api-analysis.datasource";

export const diContainer = container;

export function initDI() {
  // Contracts
  diContainer.register(DI_TOKENS.ContractsDataSource, {
    useValue: new EtherscanContractsDataSource(),
  });
  diContainer.register(DI_TOKENS.ContractsRepository, {
    useValue: new ContractsRepositoryImpl(
      diContainer.resolve(DI_TOKENS.ContractsDataSource),
    ),
  });

  // Analyzer
  diContainer.register(DI_TOKENS.AnalyzerModelDataSource, {
    useValue: new V1ApiAnalyzerModelDatasource(),
  });
  diContainer.register(DI_TOKENS.AnalyzerModelRepository, {
    useValue: new AnalyzerModelRepositoryImpl(
      diContainer.resolve(DI_TOKENS.AnalyzerModelDataSource),
      diContainer.resolve(AnalyzerModelAdapter),
    ),
  });

  diContainer.register(DI_TOKENS.AnalysisDataSource, {
    useValue: new V1ApiAnalysisDatasource(
      diContainer.resolve(DI_TOKENS.AnalyzerModelDataSource),
    ),
  });
  diContainer.register(DI_TOKENS.AnalysisRepository, {
    useValue: new AnalysisRepositoryImpl(
      diContainer.resolve(DI_TOKENS.AnalysisDataSource),
    ),
  });
}
