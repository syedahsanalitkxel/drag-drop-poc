import { Item } from '../AssessmentItem/interface';

export interface TemplateItem extends Item {
  commentsRequired: boolean;
}

// Instrument Template
export interface BaseInstrumentTemplate {
  id?: number | string;
  title: string;
  recommendedApplicationId: number;
  isSystemDefined: boolean;
  clientId: number;
  templateItems: TemplateItem[];
}
