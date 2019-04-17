import React from 'react';
import { ClientFilters } from '../../../interfaces/ClientFilter';

const FilterContext = React.createContext<{ activeFilters: ClientFilters }>({
  activeFilters: {},
});

export default FilterContext;
