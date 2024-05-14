export type Bytecode = string;

export class ContractEntity {
  constructor(
    public address: string,
    public verified: boolean,
    public code: string | null,
    public bytecode: Bytecode | null
  ) {}
}
