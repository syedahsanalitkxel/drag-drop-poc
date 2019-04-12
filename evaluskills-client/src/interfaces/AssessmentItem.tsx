import { array } from '@storybook/addon-knobs';

export default interface AssessmentItemInterface {
  category: string;
  competency: string;
  definition: string;
  id: string;
  type: string;
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
  isSystemDefined: boolean;
  clientId: number;
  itemsStatusId: number;
  definition: string;
  typeId: number;
  competencyId: number;
  categoryId: number;
  isFaithBased: boolean;
  accreditationAlignment: boolean;
  questionTypeId: number;
  itemEntities: [number];
  itemRecomendedApplications: [number];
  itemElements: Elementobj[];
}
