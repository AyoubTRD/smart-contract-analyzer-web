import { ContractsDataSource } from "./contracts.datasource";

import axios from "axios";
import { Web3Eth } from "web3";
import { ETHERSCAN_API_KEY } from "@/lib/config/etherscan";
import { ContractModel } from "../models/contract.model";
import { WEB3_NET_ENDPOINT } from "@/lib/config/web3";

export class EtherscanContractsDataSource implements ContractsDataSource {
  private etherscanClient = axios.create({
    baseURL: "https://api.etherscan.io/api",
    params: {
      apiKey: ETHERSCAN_API_KEY,
    },
  });

  private web3 = new Web3Eth(WEB3_NET_ENDPOINT);

  private async isContractVerified(address: string): Promise<boolean> {
    const sourceCode = this.fetchContractSourceCode(address);

    return !!sourceCode;
  }

  private async fetchContractSourceCode(
    address: string,
  ): Promise<string | null> {
    const res = await this.etherscanClient.get("/", {
      params: {
        module: "contract",
        action: "getsourcecode",
        address,
      },
    });

    const result = res.data.result[0];

    return result["SourceCode"];
  }

  async fetchContractBytecode(address: string): Promise<string | null> {
    const result = await this.web3.getCode(address);
    return result;
  }

  async fetchContractByAddress(address: string): Promise<ContractModel | null> {
    const isVerified = await this.isContractVerified(address);

    let sourcecode: string | null = null;
    let bytecode: string | null = null;

    if (isVerified) {
      sourcecode = await this.fetchContractSourceCode(address);
    }
    bytecode = await this.fetchContractBytecode(address);

    if (!sourcecode && !bytecode)
      throw new Error("Couldn't find contract source code or bytecode");

    return new ContractModel(address, !!sourcecode, sourcecode, bytecode);
  }
}
