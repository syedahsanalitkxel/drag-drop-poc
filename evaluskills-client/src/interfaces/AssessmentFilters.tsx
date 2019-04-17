export default interface AssessmentFiltersInterface {
  query?: string;
  type?: string;
  competency?: string;
  category?: string;
  accreditation?: string;
  status?: string;
  application?: string;
  page?: {
    number: number;
    size: number;
    total: number;
  };
}
export interface FilterAssessmentItemInterface {
  accreditation?: number | string;
  application?: number | string;
  categoryId?: number | string;
  competencyId?: number | string;
  itemsStatusIds?: string;
  itemRecomendedApplications?: [number | string];
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
  itemsStatusIds?: number | string;
  itemRecomendedApplications?: [number | string];
}
