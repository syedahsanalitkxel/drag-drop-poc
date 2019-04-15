import { lazy } from 'react';
import InstrumentTemplateAddEdit from './addEdit';
import InstrumentTemplateContainer from './container';
import InstrumentTemplateList from './list';

const InstrumentTemplateRoutes = [
  {
    Component: lazy(() => import('./container')),
    path: '/instrument-templates',
  },
  {
    Component: lazy(() => import('./container')),
    path: '/instrument-templates/add',
  },
  {
    Component: lazy(() => import('./container')),
    path: '/instrument-templates/edit/:id',
  },
];

export { InstrumentTemplateAddEdit, InstrumentTemplateContainer, InstrumentTemplateList, InstrumentTemplateRoutes };
