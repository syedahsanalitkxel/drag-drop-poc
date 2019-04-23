import { lazy } from 'react';
import EvaluationComment from './comment';
import EvaluationList from './list';
import EvaluationQuesetion from './question';
import EvaluationResult from './result';
import EvaluationStart from './StartEvaluation/start';
import EvaluationSummary from './summary';

export const EvaluationRoutes = [
  {
    Component: lazy(() => import('./StartEvaluation/start')),
    path: '/evaluation/start',
  },
  {
    Component: lazy(() => import('./question')),
    path: '/evaluation/questions',
  },
  {
    Component: lazy(() => import('./summary')),
    path: '/evaluation/summary',
  },
  {
    Component: lazy(() => import('./result')),
    path: '/evaluation/result',
  },
  {
    Component: lazy(() => import('./comment')),
    path: '/evaluation/comment',
  },
  {
    Component: lazy(() => import('./list')),
    path: '/evaluation/list',
  },
];
export default {
  EvaluationComment,
  EvaluationList,
  EvaluationQuesetion,
  EvaluationResult,
  EvaluationRoutes,
  EvaluationStart,
  EvaluationSummary,
};
