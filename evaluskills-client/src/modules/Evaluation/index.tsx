import { lazy } from 'react';

import Container from './Container';
export const EvaluationRoutes = [
  {
    Component: lazy(() => import('./Container')),
    path: '/evaluation/start',
  },
  {
    Component: lazy(() => import('./Container')),
    path: '/evaluation/questions',
  },
  {
    Component: lazy(() => import('./Container')),
    path: '/evaluation/summary',
  },
  {
    Component: lazy(() => import('./Container')),
    path: '/evaluation/result',
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
