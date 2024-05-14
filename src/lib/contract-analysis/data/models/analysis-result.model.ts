import { AnalyzerModelModel } from "./analyzer-model.model";

export class AnalysisResultModel {
  constructor(
    public message: string | null,
    public vulnerabilities: {
      id: string;
      name: string;
      description: string | null;
    }[],
    public model: AnalyzerModelModel,
  ) {}
}
