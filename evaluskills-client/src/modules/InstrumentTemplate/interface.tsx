import { AssessmentItemShort } from '../AssessmentItem/interface';

export interface TemplateItem extends AssessmentItemShort {
  commentsRequired: boolean;
}

// Instrument Template
export interface InstrumentTemplateInterface {
  id?: number | string;
  title: string;
  recommendedApplicationId: number;
  isSystemDefined?: boolean;
  clientId?: number;
  templateItems?: TemplateItem[];
  competency?: number;
  influential?: number;
  isFaithBased?: number;
  rational?: number;
}

// Instrument Filter
export interface InstrumentTemplateFilterInterface {
  Search?: string;
  PageNumber?: number;
  PageSize?: number;
  recommendedApplicationId?: string;
  type?: string;
  TotalRecords?: number;
}
