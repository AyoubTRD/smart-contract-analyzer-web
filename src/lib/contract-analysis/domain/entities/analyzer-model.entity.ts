export class AnalyzerModelEntity {
  constructor(
    public id: string,
    public name: string,
    public description: string | null,
    public supportsSourceCode: boolean,
    public supportsBytecode: boolean,
  ) {}
}
