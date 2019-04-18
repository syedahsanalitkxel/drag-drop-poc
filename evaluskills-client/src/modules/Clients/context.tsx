import React from 'react';
import { ClientFilters } from './clientFilterInterface';

const FilterContext = React.createContext<{ activeFilters: ClientFilters }>({
  activeFilters: {},
});

export default FilterContext;
