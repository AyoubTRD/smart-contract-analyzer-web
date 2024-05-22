import Markdown from "react-markdown";

import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { useAnalyzer } from "@/lib/contract-analysis/ui/useAnalyzer";
import { Skeleton } from "./ui/skeleton";
import { Accordion } from "@radix-ui/react-accordion";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

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
      {safe ? (
        <Alert variant={safe ? "default" : "destructive"}>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-bold">
            {safe ? "This smart contract is safe" : "Vulnerabilities found!"}
          </AlertTitle>
          <AlertDescription
            className="mt-2
        "
          >
            <p className="text-green-400">
              No vulnerabilities have been detected. However, you should be wary
              of false positives. Check the{" "}
              <a href="/docs" className="underline">
                {" "}
                documentation
              </a>
            </p>
          </AlertDescription>
        </Alert>
      ) : (
        <>
          <h4 className="font-bold text-md">Summary: </h4>
          <Markdown className={"text-muted-foreground"}>
            {analysisResult.message}
          </Markdown>

          <h4 className="font-bold text-md mt-4">Detected vulnerabilites: </h4>
          <Accordion type="single" collapsible className="w-full">
            {analysisResult.vulnerabilities.map((v) => (
              <AccordionItem value={v.id}>
                <AccordionTrigger>{v.name}</AccordionTrigger>
                <AccordionContent>
                  <Markdown>{v.description}</Markdown>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </>
      )}
    </div>
  );
}
