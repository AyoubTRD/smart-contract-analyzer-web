import { ContractModel } from "@/lib/contracts/data/models/contract.model";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { cn } from "@/lib/utils";

export function ContractInfo({
  contract,
  className,
}: {
  contract: ContractModel;
  className?: string;
}) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>Selected contract</CardTitle>
        <CardDescription>Address: {contract.address}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-card">
          <pre className="text-sm text-wrap">{contract.code}</pre>
        </div>
      </CardContent>
    </Card>
  );
}
