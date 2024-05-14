import { AnalyzerModelModel } from "@/lib/contract-analysis/data/models/analyzer-model.model";
import { ModelEntityAdapter } from "@/lib/shared/domain/entities/adapters/model-entity.adapter";
import { AnalyzerModelEntity } from "../analyzer-model.entity";

export class AnalyzerModelAdapter
  implements ModelEntityAdapter<AnalyzerModelModel, AnalyzerModelEntity>
{
  toEntity(model: AnalyzerModelModel): AnalyzerModelEntity {
    return new AnalyzerModelEntity(
      model.id,
      model.name,
      model.description,
      model.supportsSourceCode,
      model.supportsBytecode,
    );
  }
}
