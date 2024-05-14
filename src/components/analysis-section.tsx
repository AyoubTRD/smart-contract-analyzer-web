import { ContractForm } from "./contract-form";
import { AnalysisSummary } from "./analysis-summary";
import { cn } from "@/lib/utils";

export function AnalysisSection() {
  return (
    <div className={cn("grid lg:grid-cols-2 gap-x-12 gap-y-8 mt-8")}>
      <div className={cn()}>
        <ContractForm />
      </div>
      <div>
        <AnalysisSummary />
      </div>
    </div>
  );
}
