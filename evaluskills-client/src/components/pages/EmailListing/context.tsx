import React from 'react';
import { EmailFiterInterface } from '../../../interfaces/Email';

const FilterContext = React.createContext<{ activeFilters: EmailFiterInterface }>({
  activeFilters: {},
});

export default FilterContext;
