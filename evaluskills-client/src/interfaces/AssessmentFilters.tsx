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
