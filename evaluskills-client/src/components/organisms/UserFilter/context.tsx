import React from 'react';
import UserFilters from '../../../interfaces/UserFilter';

const FilterContext = React.createContext<{ activeFilters: UserFilters }>({
  activeFilters: {},
});

export default FilterContext;
