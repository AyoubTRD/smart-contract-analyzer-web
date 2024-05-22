import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { useAnalyzer } from "@/lib/contract-analysis/ui/useAnalyzer";
import { Skeleton } from "./ui/skeleton";

export function AnalysisSummary() {
  const { analysisResult, isAnalyzing } = useAnalyzer();

  if (isAnalyzing) {
    return (
      <>
        <Skeleton className="w-24 h-6 mb-4" />
        <Skeleton className="w-full h-40 mb-4" />
      </>
    );
  }

  if (!analysisResult) return <></>;

  const safe = analysisResult.vulnerabilities.length === 0;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Analysis Summary</h2>
      <Alert variant={safe ? "default" : "destructive"}>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle className="font-bold">
          {safe ? "This smart contract is safe" : "Vulnerabilities found!"}
        </AlertTitle>
        <AlertDescription
          className="mt-2
        "
        >
          {safe ? (
            <p className="text-green-400">
              No vulnerabilities have been detected. However, you should be wary
              of false positives. Check the{" "}
              <a href="/docs" className="underline">
                {" "}
                documentation
              </a>
            </p>
          ) : (
            <>
              <p>{analysisResult.message}</p>

              <ul className="list list-disc list-inside">
                {analysisResult.vulnerabilities.map((v) => (
                  <li key={v.id}>
                    {v.name}: {v.description}
                  </li>
                ))}
              </ul>
            </>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
}
