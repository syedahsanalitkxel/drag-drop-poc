import React from 'react';
import { AssessmentTemplateFilterInterface } from '../interface';
const FilterContext = React.createContext<{ activeFilters: AssessmentTemplateFilterInterface }>({
  activeFilters: { TypeIds: [] },
});

export default FilterContext;
