import { useContext } from "react";
import { ContractsContext, ContractsContextValue } from "./contracts.context";

export const useContracts = () => {
  return useContext(ContractsContext) as ContractsContextValue;
};
