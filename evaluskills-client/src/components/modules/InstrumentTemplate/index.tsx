import { lazy } from 'react';
import InstrumentTemplateAddEdit from './addEdit';
import InstrumentTemplateContainer from './container';
import InstrumentTemplateList from './list';

const InstrumentTemplateRoutes = [
  {
    Component: lazy(() => import('./container')),
    path: '/instrument-templatess',
  },
  {
    Component: lazy(() => import('./container')),
    path: '/instrument-templatess/add',
  },
  {
    Component: lazy(() => import('./container')),
    path: '/instrument-templatess/edit/:id',
  },
];

export {
  InstrumentTemplateAddEdit,
  InstrumentTemplateContainer,
  InstrumentTemplateList,
  InstrumentTemplateRoutes,
};
