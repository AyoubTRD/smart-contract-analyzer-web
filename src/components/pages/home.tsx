import { ContractsProvider } from "@/lib/contracts/ui/contexts/contracts.context";
import { AnalyzerProvider } from "@/lib/contract-analysis/ui/analyzer.context";
import { AnalysisSection } from "../analysis-section";

export function Home() {
  return (
    <ContractsProvider>
      <AnalyzerProvider>
        <AnalysisSection />
      </AnalyzerProvider>
    </ContractsProvider>
  );
}
