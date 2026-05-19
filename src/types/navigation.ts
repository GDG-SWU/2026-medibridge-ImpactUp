import { DiagnoseResponse } from "../api/mediBridgeApi";

export type RootStackParamList = {
  Home: undefined;
  SymptomStep1: undefined;
  SymptomStep2: {
    selectedParts: string[];
  };
    SymptomStep3: {
    selectedParts: string[];
    abdomenParts: string[];
  };
    SymptomStep4: {
    selectedParts: string[];
    abdomenParts: string[];
    painLevel: number;
  };
    SymptomStep5: {
    selectedParts: string[];
    abdomenParts: string[];
    painLevel: number;
    duration: string;
  };
    SymptomStep6: {
    selectedParts: string[];
    abdomenParts: string[];
    painLevel: number;
    duration: string;
    symptoms: string[];
  };
  DiagnosisLoading: {
    diagnoseResult: DiagnoseResponse;
  };

  DiagnosisResult: {
    diagnoseResult: DiagnoseResponse;
  };

  RecommendMedicine: {
    diagnoseResult: DiagnoseResponse;
  };

  CommunicationCard: undefined;
};