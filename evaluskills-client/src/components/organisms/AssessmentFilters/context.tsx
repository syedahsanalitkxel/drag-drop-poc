import React from 'react';
import { AssessmentTemplateFilterInterface } from '../../../interfaces/AssessmentFilters';
const FilterContext = React.createContext<{ activeFilters: AssessmentTemplateFilterInterface }>({
  activeFilters: {},
});

export default FilterContext;
