import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Form } from "./ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { useEffect, useMemo } from "react";
import { ContractInfo } from "./contract-info";
import { useAnalyzer } from "@/lib/contract-analysis/ui/useAnalyzer";
import { useContracts } from "@/lib/contracts/ui/contexts/useContracts";
import { useToast } from "./ui/use-toast";
import { Input } from "./ui/input";

enum ContractEntryMethod {
  code = "code",
  address = "address",
}

const formSchema = z.object({
  model: z.string(),
  method: z.string(),
  address: z.string().optional(),
  code: z.string().optional(),
});

export function ContractForm() {
  const toast = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const method = form.watch("method");
  const address = form.watch("address");
  const code = form.watch("code");

  const {
    isAnalyzing,
    analyzeBytecode,
    analyzeSourceCode,
    models,
    fetchAvailableModels,
  } = useAnalyzer();

  useEffect(() => {
    fetchAvailableModels();
  }, [fetchAvailableModels]);

  const { getContractByAddress, loadedContract, isLoadingContract } =
    useContracts();

  const handleFetchContract = () => {
    getContractByAddress(address as string);
  };

  const canSubmitForm = useMemo(() => {
    if (!form.formState.isValid) {
      return false;
    }

    if (method === ContractEntryMethod.address && !loadedContract) {
      return false;
    }
    return true;
  }, [loadedContract, method, form.formState]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const sourceCode = loadedContract?.code || data.code;
    const bytecode = loadedContract?.bytecode;

    const model = models.find((m) => m.id === data.model)!;
    if (!model) {
      toast.toast({
        variant: "destructive",
        title: "No model selected",
        description: "Please select one of the listed models",
      });
      return;
    }

    if (sourceCode && model.supportsSourceCode)
      analyzeSourceCode(model, sourceCode);
    else if (bytecode && model.supportsBytecode)
      analyzeBytecode(model, bytecode);

    if (!sourceCode && !bytecode) {
      toast.toast({
        variant: "destructive",
        title: "Error",
        description: "There is no source code or byte code to analyze",
      });
    }
  };

  const showSourceCodeModels = useMemo(() => {
    if (code) return true;
    if (loadedContract?.code) return true;

    return false;
  }, [code, loadedContract]);

  const showBytecodeModels = useMemo(() => {
    if (loadedContract?.bytecode) return true;

    return false;
  }, [loadedContract]);

  const modelsToShow = useMemo(
    () =>
      models.filter((m) => {
        if (m.supportsBytecode && showBytecodeModels) return true;
        if (m.supportsSourceCode && showSourceCodeModels) return true;
      }),
    [showBytecodeModels, showSourceCodeModels, models],
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid md:grid-cols-2 gap-4"
      >
        <FormField
          control={form.control}
          name="method"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Method</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value={ContractEntryMethod.address}>
                        Address
                      </SelectItem>
                      <SelectItem value={ContractEntryMethod.code}>
                        Code
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="model"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Model</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {modelsToShow.map((model) => (
                        <SelectItem key={model.id} value={model.id}>
                          {model.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            );
          }}
        />

        {method == ContractEntryMethod.address && (
          <>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="col-span-full">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="0x4BdC4A7837000E5288a568c661bc3b732D942047"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="button"
              disabled={isLoadingContract || !address}
              variant={"outline"}
              className="col-span-full"
              onClick={handleFetchContract}
            >
              Fetch smart contract
            </Button>
          </>
        )}
        {method === ContractEntryMethod.code && (
          <FormField
            name="code"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="h-80"
                    placeholder={`// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract SimpleStorage {
    uint storedData;

    function set(uint x) public {
        storedData = x;
    }

    function get() public view returns (uint) {
        return storedData;
    }
}
`}
                  ></Textarea>
                </FormControl>
              </FormItem>
            )}
          />
        )}

        <Button
          type="submit"
          disabled={!canSubmitForm || isAnalyzing}
          className="w-full col-span-full"
        >
          Analyze
        </Button>

        {loadedContract && (
          <ContractInfo className="col-span-full" contract={loadedContract} />
        )}
      </form>
    </Form>
  );
}
