import { ContractModel } from "../models/contract.model";

export interface ContractsDataSource {
  fetchContractByAddress(address: string): Promise<ContractModel | null>;
}
