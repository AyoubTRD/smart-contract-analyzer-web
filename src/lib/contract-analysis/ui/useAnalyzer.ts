import { useContext } from "react";
import { AnalyzerContext, AnalyzerContextValue } from "./analyzer.context";

export const useAnalyzer = () =>
  useContext(AnalyzerContext) as AnalyzerContextValue;
