import { lazy } from 'react';

import Container from './Container';
export const EvaluationRoutes = [
  {
    Component: lazy(() => import('./Container')),
    path: '/evaluation/:token/start',
  },
  {
    Component: lazy(() => import('./Container')),
    path: '/evaluation/:token/questions/:instrumentId/:instrumentItemId',
  },
  {
    Component: lazy(() => import('./Container')),
    path: '/evaluation/:token/summary',
  },
  {
    Component: lazy(() => import('./Container')),
    path: '/evaluation/:token/result',
  },
  {
    Component: lazy(() => import('./Container')),
    path: '/evaluation/comment',
  },
  {
    Component: lazy(() => import('./Container')),
    path: '/evaluation/list',
  },
];
export default {
  Container,
  EvaluationRoutes,
};
