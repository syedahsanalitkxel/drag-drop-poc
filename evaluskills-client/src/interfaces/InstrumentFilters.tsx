export default interface InstrumentFiltersInterface {
  query?: string;
  type?: string;
  page?: {
    number: number;
    size: number;
    total: number;
  };
}
