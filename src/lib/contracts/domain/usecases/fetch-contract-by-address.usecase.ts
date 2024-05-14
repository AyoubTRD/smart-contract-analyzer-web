import { DI_TOKENS } from "@/lib/di/DI_TOKENS";
import { Usecase } from "@/lib/shared/domain/usecases/usecase";
import { inject, injectable } from "tsyringe";
import { ContractEntity } from "../entities/contract.entity";
import type { ContractsRepository } from "../repositories/contracts.repository";

@injectable()
export class FetchContractByAddressUsecase
  implements Usecase<string, ContractEntity | null>
{
  constructor(
    @inject(DI_TOKENS.ContractsRepository)
    private contractsRepository: ContractsRepository,
  ) {}
  execute(address: string): Promise<ContractEntity | null> {
    return this.contractsRepository.fetchContractByAddress(address);
  }
}
