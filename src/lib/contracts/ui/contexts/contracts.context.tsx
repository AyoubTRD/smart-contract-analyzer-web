import { createContext, useContext, useState } from "react";
import { ContractEntity } from "../../domain/entities/contract.entity";
import { diContainer } from "@/lib/di/initDi";
import { FetchContractByAddressUsecase } from "../../domain/usecases/fetch-contract-by-address.usecase";
import { useToast } from "@/components/ui/use-toast";

export interface ContractsContextValue {
  getContractByAddress(address: string): Promise<void>;
  loadedContract?: ContractEntity;
  isLoadingContract: boolean;
  clearLoadedContract(): void;
}

const ContractsContext = createContext<ContractsContextValue | undefined>(
  undefined,
);

export function ContractsProvider(props: { children: React.ReactNode }) {
  const toast = useToast();

  const [loadedContract, setLoadedContract] = useState<ContractEntity>();
  const [isLoadingContract, setIsLoadingContract] = useState(false);

  const contextValue: ContractsContextValue = {
    loadedContract,
    clearLoadedContract() {
      setLoadedContract(undefined);
    },
    async getContractByAddress(address: string) {
      setIsLoadingContract(true);
      setLoadedContract(undefined);
      const fetchContractUsecase = diContainer.resolve(
        FetchContractByAddressUsecase,
      );

      try {
        const result = await fetchContractUsecase.execute(address);
        if (!result) {
          toast.toast({
            title: "Contract not found",
            description:
              "The given address is incorrect, try using a different one",
          });
        } else setLoadedContract(result);
      } catch (e) {
        console.error(e);
        toast.toast({
          variant: "destructive",
          title: "Unknown error",
          description: "Error occurred while fetching contract: " + e,
        });
      } finally {
        setIsLoadingContract(false);
      }
    },
  };

  return (
    <ContractsContext.Provider value={contextValue}>
      {props.children}
    </ContractsContext.Provider>
  );
}

export const useContracts = () => {
  return useContext(ContractsContext) as ContractsContextValue;
};
