// base item (values shared among every other)
export interface Item {
  itemId: number | string;
  itemVersionId?: number;
  defination: string;
}

// Partial item (In Array list)
export interface AssessmentItemShort extends Item {
  category: string;
  type: string;
  competency: string;
  isFaithBased: boolean;
  isSystemDefined: boolean;
}

// Used inside Assessment Item detailed object
export interface ItemElement {
  id: number | string;
  title: string;
  itemElementOptions: [
    {
      id: number | string;
      value: number;
      title: string;
      statement: string;
      behaviour: string;
      scaling: string;
    }
  ];
}

// core detailed item (Return from single get)
export interface AssessmentItem {
  id: number | string;
  versionId: number;
  versionNo: number;
  isSystemDefined: boolean;
  clientId: number;
  itemsStatusId: number;
  definition: string;
  typeId: number;
  competencyId: number;
  categoryId: number;
  isFaithBased: boolean;
  accreditationAlignment: boolean;
  isActive: boolean;
  questionTypeId: number;
  itemEntities: number[];
  itemRecomendedApplications: number[];
  itemElements: ItemElement[];
}
