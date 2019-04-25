import { lazy } from 'react';

const EvaluationInstruction = [
  {
    Component: lazy(() => import('./container')),
    path: '/evaluation-instructions',
  },
  {
    Component: lazy(() => import('./container')),
    path: '/evaluation-instructions/add',
  },
  {
    Component: lazy(() => import('./container')),
    path: '/evaluation-instructions/edit/:id',
  },
  {
    Component: lazy(() => import('./container')),
    path: '/evaluation-instructions/copy/:id',
  },
];

export { EvaluationInstruction };
