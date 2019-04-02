import AssessmentItemInterface from './AssessmentItem';

export default interface InstrumentTemplateInterface {
  createdAt: Date;
  clientId: string;
  description: string;
  id: string;
  isSystemDefined: string;
  recommendedApplicationId: string;
  templateItems: AssessmentItemInterface[];
  title: string;
  assessmentItemsCount: number;
  competencyCount: number;
  influentialCount: number;
  rationalCount: number;
  faithBasedCount: number;
}
