import AssessmentItemInterface from './AssessmentItem';

export default interface InstrumentTemplateInterface {
  createdAt?: Date;
  clientId?: string;
  description?: string;
  status?: boolean;
  id?: string;
  isSystemDefined?: string;
  recommendedApplicationId?: string;
  templateItems?: AssessmentItemInterface[];
  title?: string;
  assessmentItemsCount?: number;
  competencyCount?: number;
  influentialCount?: number;
  rationalCount?: number;
  faithBasedCount?: number;
}

interface TemplateItem {
  id: number;
  itemId: number;
  itemVersionId: number;
  defination: string;
  commentsRequired: boolean;
}

interface InstrumentTemplate {
  id: number;
  title: string;
  recommendedApplicationId: number;
  isSystemDefined: boolean;
  clientId: number;
  templateItems: TemplateItem[];
}
