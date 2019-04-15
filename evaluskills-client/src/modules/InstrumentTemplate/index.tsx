import { lazy } from 'react';

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
  {
    Component: lazy(() => import('./container')),
    path: '/instrument-templates/copy/:id',
  },
];

export { InstrumentTemplateRoutes };
