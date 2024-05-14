import { ContractModel } from "../models/contract.model";

export abstract class ContractsDataSource {
  fetchContractByAddress(address: string): Promise<ContractModel | null>;
}
