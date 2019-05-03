import { array } from '@storybook/addon-knobs';

export default interface AssessmentItemInterface {
  category?: string;
  competency?: string;
  definition?: string;
  id: string;
  type?: string;
  itemId?: string;
}
export interface itemElementOptions {
  value: number;
  title: string;
  statement: string;
  behaviour: string;
  scaling: string;
}
export interface Elementobj {
  title: string;
  itemElementOptions: itemElementOptions[];
}
export interface AddAssessmentItemInterface {
  componenetName?: string;
  isSystemDefined: boolean;
  clientId?: number | null | string;
  ItemStatusId?: number | string;
  definition: string;
  typeId?: number | string;
  competencyId?: number | string;
  categoryId?: number | string;
  isFaithBased?: boolean | string;
  accreditationAlignment?: boolean | string;
  questionTypeId?: number | string;
  itemEntities: number[];
  itemRecomendedApplications: number[];
  itemElements: Elementobj[];
  saveAsNewVersion?: boolean;
}
export interface AssessmentTemplateFilterInterface {
  search?: string;
  PageNumber?: number;
  PageSize?: number;
  recommendedApplicationId?: number;
  status?: string;
  TotalRecords?: number;
  accreditation?: number | string;
  application?: number | string;
  categoryId?: number | string;
  competencyId?: number | string;
  ItemStatusIds?: number | string;
  TypeIds: number[];
}
export interface EditAssessmentItemInterface {
  saveAsNewVersion: boolean;
  versionId: number;
  versionNo: number;
  isSystemDefined: boolean;
  clientId?: number | null;
  ItemStatusId: number | null;
  definition: string;
  typeId: number;
  competencyId: number | null;
  categoryId: number;
  isFaithBased: boolean;
  accreditationAlignment: boolean;
  questionTypeId: number;
  itemEntities: [number];
  itemRecomendedApplications: [number];
  itemElements: Elementobj[];
}
