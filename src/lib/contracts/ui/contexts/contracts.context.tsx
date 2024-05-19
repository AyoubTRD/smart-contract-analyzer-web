import { createContext, useCallback, useState } from "react";
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

export const ContractsContext = createContext<
  ContractsContextValue | undefined
>(undefined);

export function ContractsProvider(props: { children: React.ReactNode }) {
  const { toast } = useToast();

  const [loadedContract, setLoadedContract] = useState<ContractEntity>();
  const [isLoadingContract, setIsLoadingContract] = useState(false);

  const contextValue: ContractsContextValue = {
    loadedContract,
    clearLoadedContract: useCallback(() => {
      setLoadedContract(undefined);
    }, [setLoadedContract]),
    getContractByAddress: useCallback(
      async (address: string) => {
        setIsLoadingContract(true);
        setLoadedContract(undefined);
        const fetchContractUsecase = diContainer.resolve(
          FetchContractByAddressUsecase,
        );

        try {
          const result = await fetchContractUsecase.execute(address);
          if (!result) {
            toast({
              title: "Contract not found",
              description:
                "The given address is incorrect, try using a different one",
            });
          } else setLoadedContract(result);
        } catch (e) {
          console.error(e);
          toast({
            variant: "destructive",
            title: "Unknown error",
            description: "Error occurred while fetching contract: " + e,
          });
        } finally {
          setIsLoadingContract(false);
        }
      },
      [setIsLoadingContract, toast],
    ),
    isLoadingContract,
  };

  return (
    <ContractsContext.Provider value={contextValue}>
      {props.children}
    </ContractsContext.Provider>
  );
}
