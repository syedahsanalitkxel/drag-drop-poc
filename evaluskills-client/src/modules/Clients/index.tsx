import { lazy } from 'react';

const ClientRoutes = [
  {
    Component: lazy(() => import('./container')),
    path: '/clients',
  },
  {
    Component: lazy(() => import('./addEditContainer')),
    path: '/clients/add',
  },
  {
    Component: lazy(() => import('./addEditContainer')),
    path: '/clients/edit/:id',
  },
];

export { ClientRoutes };
