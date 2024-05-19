import React, { createContext, useCallback, useState } from "react";
import { AnalysisResultEntity } from "../domain/entities/analysis-result.entity";
import { useToast } from "@/components/ui/use-toast";
import { diContainer } from "@/lib/di/initDi";
import { GetAnalysisForSourceCodeUsecase } from "../domain/usecases/get-analysis-for-sourcecode.usecase";
import { AnalyzerModelEntity } from "../domain/entities/analyzer-model.entity";
import { GetAnalysisForBytecodeUsecase } from "../domain/usecases/get-analysis-for-bytecode.usecase";
import { FetchAvailableModelsUsecase } from "../domain/usecases/fetch-available-models.usecase";

export interface AnalyzerContextValue {
  models: AnalyzerModelEntity[];
  fetchAvailableModels(): Promise<void>;
  isFetchingModels: boolean;

  isAnalyzing: boolean;
  analyzeSourceCode(model: AnalyzerModelEntity, code: string): Promise<void>;
  analyzeBytecode(model: AnalyzerModelEntity, code: string): Promise<void>;
  clearAnalysis(): void;
  analysisResult?: AnalysisResultEntity;
}
// Define the context
export const AnalyzerContext = createContext<AnalyzerContextValue | undefined>(
  undefined,
);

// Provider component
export const AnalyzerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { toast } = useToast();
  const [analysisResult, setAnalysisResult] = useState<AnalysisResultEntity>();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Function to request analysis for a contract model
  const analyzeSourceCode = useCallback(
    async (model: AnalyzerModelEntity, sourcecode: string) => {
      setIsAnalyzing(true);
      const getSourceCodeAnalysisUsecase = diContainer.resolve(
        GetAnalysisForSourceCodeUsecase,
      );

      try {
        const analysis = await getSourceCodeAnalysisUsecase.execute({
          modelId: model.id,
          sourcecode,
        });
        // Perform contract analysis here and set the result
        setAnalysisResult(analysis);
      } catch (error) {
        console.error("Error analyzing contract:", error);
        toast({
          variant: "destructive",
          title: "Unknown error",
          description: "Error analyzing contract:" + error,
        });
      } finally {
        setIsAnalyzing(false);
      }
    },
    [setIsAnalyzing, toast],
  );

  const analyzeBytecode = useCallback(
    async (model: AnalyzerModelEntity, bytecode: string) => {
      setIsAnalyzing(true);
      const getAnalysisUsecase = diContainer.resolve(
        GetAnalysisForBytecodeUsecase,
      );

      try {
        const analysis = await getAnalysisUsecase.execute({
          modelId: model.id,
          bytecode,
        });
        // Perform contract analysis here and set the result
        setAnalysisResult(analysis);
      } catch (error) {
        console.error("Error analyzing contract:", error);
        toast({
          variant: "destructive",
          title: "Unknown error",
          description: "Error analyzing contract:" + error,
        });
      } finally {
        setIsAnalyzing(false);
      }
    },
    [setIsAnalyzing, toast],
  );

  const clearAnalysis = useCallback(() => {
    setIsAnalyzing(false);
    setAnalysisResult(undefined);
  }, [setIsAnalyzing, setAnalysisResult]);

  const [models, setModels] = useState<AnalyzerModelEntity[]>();
  const [isLoadingModels, setIsLoadingModels] = useState(false);

  const fetchAvailableModels = useCallback(async () => {
    setIsLoadingModels(true);
    const fetchAvailableModelsUsecase = diContainer.resolve(
      FetchAvailableModelsUsecase,
    );
    try {
      const models = await fetchAvailableModelsUsecase.execute();
      setModels(models);
    } catch (error) {
      console.error("Error fetching available models:", error);
      toast({
        variant: "destructive",
        title: "Unknown error",
        description: "Error fetching available models:" + error,
      });
    } finally {
      setIsLoadingModels(false);
    }
  }, [setIsLoadingModels, toast]);

  return (
    <AnalyzerContext.Provider
      value={{
        models: models || [],
        fetchAvailableModels,
        isFetchingModels: isLoadingModels,
        analysisResult,
        analyzeBytecode,
        analyzeSourceCode,
        isAnalyzing,
        clearAnalysis,
      }}
    >
      {children}
    </AnalyzerContext.Provider>
  );
};
