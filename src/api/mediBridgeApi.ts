import {apiRequest} from './client';

export type Condition = {
  id: number;
  nameKo: string;
  nameJa: string;
};

export type Allergen = {
  id: number;
  nameKo: string;
  nameJa: string;
};

export type Medication = {
  id: number;
  nameKo: string;
  nameJa: string;
};

export type Alert = {
  id: number;
  season: string;
  titleKo: string;
  titleJa: string;
  descriptionKo: string;
  descriptionJa: string;
  level: string;
};

export type SymptomOption = {
  code: string;
  labelKo: string;
  labelJa: string;
};

export type SymptomQuestion = {
  step: number;
  questionKo: string;
  questionJa: string;
  type: 'single' | 'multi';
  options: SymptomOption[];
};

export type Facility = {
  id: number;
  nameKo: string;
  nameJa: string;
  addressKo: string;
  addressJa: string;
  phone: string;
  hours: string;
  isOpen: boolean;
  is24Hours: boolean;
  lat: number;
  lng: number;
};

export type DiagnoseRequest = {
  userId: string;
  bodyPart: string;
  detailLocation: string;
  painLevel: number;
  duration: string;
  symptoms: string[];
  specialConditions: string[];
  conditions: string[];
  allergens: string[];
  medications: string[];
};

export type DiagnoseOption = {
  type: string;
  priority: number;
  title: string;
  description: string;
};

export type DiagnoseResponse = {
  diagnoseId?: string;

  possibleCondition?: string;
  koreanCondition?: string;
  severity?: 'mild' | 'moderate' | 'severe' | 'emergency' | string;
  confidence?: 'low' | 'medium' | 'high' | string;
  summary?: string;
  reason?: string[];
  recommendedOption?: 'self-care' | 'pharmacy' | 'hospital' | 'emergency-room' | string;
  options?: DiagnoseOption[];
  warningSigns?: string[];
  safetyNotes?: string[];
  disclaimer?: string;

  suspectedCondition?: string;
  triageLevel?: 'self_care' | 'pharmacy' | 'clinic' | 'er_now' | string;
  recommendedMedications?: string[];
  notice?: string;
};

export type CommCardResponse = {
  id: number;
  category: string;
  titleKo: string;
  titleJa: string;
  patientInfoLabelKo: string;
  patientInfoLabelJa: string;
  nationalityKo: string;
  nationalityJa: string;
  allergyLabelKo: string;
  allergyLabelJa: string;
  medicationLabelKo: string;
  medicationLabelJa: string;
  durationLabelKo: string;
  durationLabelJa: string;
  requestKo: string;
  requestJa: string;
};

export const mediBridgeApi = {
  getHealth: () => apiRequest<string>('/api/health'),

  getConditions: () => apiRequest<Condition[]>('/api/conditions'),

  getAllergens: () => apiRequest<Allergen[]>('/api/allergens'),

  getMedications: () => apiRequest<Medication[]>('/api/medications'),

  getAlerts: () => apiRequest<Alert[]>('/api/alerts'),

  getSymptomQuestions: () =>
    apiRequest<SymptomQuestion[]>('/api/symptom-questions'),

  getFacilities: () => apiRequest<Facility[]>('/api/facilities'),

  diagnose: (body: DiagnoseRequest) =>
    apiRequest<DiagnoseResponse>('/api/diagnose', {
      method: 'POST',
      body,
    }),

  getCommCard: (diagnoseId: string) =>
    apiRequest<CommCardResponse>(`/api/comm-card/${diagnoseId}`),
};