import { ContractEntity } from "../entities/contract.entity";

export interface ContractsRepository {
  fetchContractByAddress(address: string): Promise<ContractEntity | null>;
}
