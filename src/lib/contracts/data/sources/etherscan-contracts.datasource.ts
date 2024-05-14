import { ContractsDataSource } from "./contracts.datasource";

import axios from "axios";
import { ETHERSCAN_API_KEY } from "@/lib/config/etherscan";
import { ContractModel } from "../models/contract.model";

export class EtherscanContractsDataSource implements ContractsDataSource {
  private etherscanClient = axios.create({
    baseURL: "https://api.etherscan.io/api",
    params: {
      apiKey: ETHERSCAN_API_KEY,
    },
  });

  async fetchContractByAddress(address: string): Promise<ContractModel | null> {
    const res = await this.etherscanClient.get("/", {
      params: {
        module: "contract",
        action: "getsourcecode",
        address,
      },
    });

    const result = res.data.result[0];

    if (!result) return null;
    return new ContractModel(address, true, result["SourceCode"], null);
  }
}
