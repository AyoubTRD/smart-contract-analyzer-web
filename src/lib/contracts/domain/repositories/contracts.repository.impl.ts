import { inject, injectable } from "tsyringe";
import type { ContractsDataSource } from "../../data/sources/contracts.datasource";
import { ContractEntity } from "../entities/contract.entity";
import { ContractsRepository } from "./contracts.repository";
import { DI_TOKENS } from "@/lib/di/DI_TOKENS";

@injectable()
export class ContractsRepositoryImpl implements ContractsRepository {
  constructor(
    @inject(DI_TOKENS.ContractsDataSource)
    private contractsDataSource: ContractsDataSource,
  ) {}

  async fetchContractByAddress(
    address: string,
  ): Promise<ContractEntity | null> {
    const contract =
      await this.contractsDataSource.fetchContractByAddress(address);

    if (!contract) return null;

    return new ContractEntity(
      contract.address,
      contract.verified,
      contract.code,
      contract.bytecode,
    );
  }
}
