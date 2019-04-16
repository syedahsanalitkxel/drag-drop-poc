import React from 'react';
import { InstrumentTemplateFilterInterface } from './interface';

const FilterContext = React.createContext<{ activeFilters: InstrumentTemplateFilterInterface }>({
  activeFilters: {},
});

export default FilterContext;
