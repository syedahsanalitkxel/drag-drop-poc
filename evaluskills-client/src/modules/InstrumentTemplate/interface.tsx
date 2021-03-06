import { AssessmentItemShort } from '../AssessmentItem/interface';

export interface TemplateItem extends AssessmentItemShort {
  commentsRequired: boolean;
}

// Instrument Template
export interface InstrumentTemplateInterface {
  id?: number | string;
  title: string;
  recommendedApplicationIds: number[];
  isSystemDefined?: boolean;
  clientId?: number;
  templateItems?: TemplateItem[];
  competency?: number;
  influential?: number;
  isFaithBased?: number;
  rational?: number;
  templateStatus?: string;
  templateStatusId?: number;
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
