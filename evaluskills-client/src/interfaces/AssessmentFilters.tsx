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
export interface AssessmentTemplateFilterInterface {
  search?: string;
  PageNumber?: number;
  PageSize?: number;
  recommendedApplicationId?: number;
  status?: string;
  TotalRecords?: number;
}
