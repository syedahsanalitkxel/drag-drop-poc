import React from 'react';
import UserFilters from '../../../interfaces/InstrumentFilters';

const FilterContext = React.createContext<{ activeFilters: UserFilters }>({
  activeFilters: {},
});

export default FilterContext;
