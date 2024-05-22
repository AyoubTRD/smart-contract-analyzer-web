import { ContractModel } from "@/lib/contracts/data/models/contract.model";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

enum ContractCode {
  sourceCode = "sourcecode",
  bytecode = "bytecode",
}

export function ContractInfo({
  contract,
  className,
}: {
  contract: ContractModel;
  className?: string;
}) {
  const sourcesFound: ContractCode[] = useMemo(() => {
    const sources = [];

    if (contract.code) sources.push(ContractCode.sourceCode);
    if (contract.bytecode) sources.push(ContractCode.bytecode);

    return sources;
  }, [contract]);

  return (
    <Tabs defaultValue={sourcesFound[0]} className="w-full col-span-full">
      {sourcesFound.length > 1 && (
        <TabsList className="grid w-full grid-cols-2">
          {sourcesFound.map((s) => (
            <TabsTrigger value={s}>
              {s === ContractCode.sourceCode ? "Source code" : "Byte code"}
            </TabsTrigger>
          ))}
        </TabsList>
      )}

      <TabsContent value={ContractCode.bytecode}>
        <Card className={cn("w-full", className)}>
          <CardHeader>
            <CardTitle>Selected contract</CardTitle>
            <CardDescription>Address: {contract.address}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-card">
              <pre className="max-w-full text-sm text-wrap break-words">
                {contract.bytecode}
              </pre>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value={ContractCode.sourceCode}>
        <Card className={cn("w-full", className)}>
          <CardHeader>
            <CardTitle>Selected contract</CardTitle>
            <CardDescription>Address: {contract.address}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-card">
              <pre className="max-w-full text-sm text-wrap break-words">
                {contract.code}
              </pre>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
