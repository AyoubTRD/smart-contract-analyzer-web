import { useContext } from "react";
import { AnalyzerContext } from "./analyzer.context";

export const useAnalyzer = () => useContext(AnalyzerContext);
