export class ContractModel {
  constructor(
    public address: string,
    public verified: boolean,
    public code: string | null,
    public bytecode: string | null
  ) {}
}
