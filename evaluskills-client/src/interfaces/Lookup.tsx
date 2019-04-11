import { lookups } from '../enums';

export interface LookupItemInterface {
  value?: number;
  text?: string;
}

export const LookupItemInitialState = {
  text: 'item',
  value: 0,
};

export interface LookupInterface {
  assessmentTypesLookUp: LookupItemInterface[];
  billingPlansLookUp: LookupItemInterface[];
  categoriesLookUp: LookupItemInterface[];
  competenciesLookUp: LookupItemInterface[];
  emailTypesLookUp: LookupItemInterface[];
  entitiesLookUp: LookupItemInterface[];
  evaluationRolesLookUp: LookupItemInterface[];
  questionTypesLookUp: LookupItemInterface[];
  recommendedApplicationsLookUp: LookupItemInterface[];
  statesLookUp: LookupItemInterface[];
  testTypesLookUp: LookupItemInterface[];
  userRolesLookUp: LookupItemInterface[];
  [key: string]: LookupItemInterface[];
}

export const lookupInitialState: LookupInterface = {
  assessmentTypesLookUp: [],
  billingPlansLookUp: [],
  categoriesLookUp: [],
  competenciesLookUp: [],
  emailTypesLookUp: [],
  entitiesLookUp: [],
  evaluationRolesLookUp: [],
  questionTypesLookUp: [],
  recommendedApplicationsLookUp: [],
  statesLookUp: [],
  testTypesLookUp: [],
  userRolesLookUp: [],
};

export interface LookupContextInterface {
  findByValue?: (id: number, key: string) => void;
  findKey?: (key: lookups) => LookupItemInterface[];
  lookups?: LookupInterface;
}

export const LookupContextInitialState = {
  findByValue: (id: number, key: string) => {},
  findKey: (key: lookups) => [LookupItemInitialState],
  lookups: lookupInitialState,
};
