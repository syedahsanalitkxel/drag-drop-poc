import React from 'react';

const FilterContext = React.createContext<{ activeFilters: any }>({
  activeFilters: {},
});

export default FilterContext;
