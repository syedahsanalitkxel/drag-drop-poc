import { Item } from '../AssessmentItem/interface';

export interface TemplateItem extends Item {
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
  description?: string;
  status?: boolean;
}

// Instrument Filter
export interface InstrumentTemplateFilterInterface {
  Search?: string;
  PageNumber?: number;
  PageSize?: number;
  recommendedApplicationId?: number;
  type?: string;
  TotalRecords?: number;
}
