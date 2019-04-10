import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';
import Spinner from './components/atoms/Spinner';
import InstrumentTemplateContainer from './containers/InstrumentContainer';
import InstrumentClientContainer from './containers/InstrumentClientContainer';

const AuthContainer = lazy(() => import('./containers/AuthContainer'));

const Home = lazy(() => import('./components/pages/LandingPage'));
const DashboardHome = lazy(() => import('./components/pages/Dashboard'));
const AssessmentItemContainer = lazy(() => import('./containers/AssessmentItemContainer'));
const ClientContainer = lazy(() => import('./containers/ClientContainer'));
const AssessmentContainer = lazy(() => import('./containers/AddEditAssessmesntContainer'));
const InstrumentDetailContainer = lazy(() => import('./containers/InstrumentDetailContainer'));

const AddClient = lazy(() => import('./components/pages/AddClient'));
const EmailTemplateContainer = lazy(() => import('./containers/AddEditEmailContainer'));
const EditClient = lazy(() => import('./components/pages/EditClient'));
const InstructionsContainer = lazy(() => import('./containers/EvaluationInstructionContainer'));

const User = lazy(() => import('./components/pages/User'));
const ParticipantHome = lazy(() => import('./components/pages/ParticipantEmailInvite'));
const Evaluator = lazy(() => import('./components/pages/Evaluator'));
const Question = lazy(() => import('./components/pages/Question'));
const EvaluationSummary = lazy(() => import('./components/pages/EvaluationSummary'));
const EvaluatorResult = lazy(() => import('./components/pages/EvaluatorResult'));

const Routes = () => (
  <Suspense fallback={<Spinner />}>
    <Switch>
      <Route exact={true} path="/">
        <Home />
      </Route>

      <Route exact={true} path="/login">
        <AuthContainer />
      </Route>

      <Route exact={true} path="/signup">
        <AuthContainer />
      </Route>

      <Route exact={true} path="/select-client">
        <AuthContainer />
      </Route>

      <Route exact={true} path="/reset-password">
        <AuthContainer />
      </Route>

      <Route exact={true} path="/dashboard">
        <DashboardHome />
      </Route>

      <Route exact={true} path="/verify-email">
        <DashboardHome />
      </Route>

      <Route exact={true} path="/assessment-items">
        <AssessmentItemContainer />
      </Route>
      <Route exact={true} path="/assessment-items/add">
        <AssessmentContainer />
      </Route>
      <Route exact={true} path="/assessment-items/edit/:id">
        <AssessmentContainer />
      </Route>

      <Route exact={true} path="/instrument">
        <InstrumentClientContainer />
      </Route>
      <Route exact={true} path="/instrument-templates">
        <InstrumentTemplateContainer />
      </Route>
      <Route exact={true} path="/instrument-templates/add">
        <InstrumentTemplateContainer />
      </Route>
      <Route exact={true} path="/instrument-templates/edit/:id">
        <InstrumentTemplateContainer />
      </Route>

      <Route exact={true} path="/client-assessment-detail/:id">
        <InstrumentDetailContainer />
      </Route>

      <Route exact={true} path="/clients">
        <ClientContainer />
      </Route>

      <Route exact={true} path="/clients/add">
        <AddClient />
      </Route>
      <Route exact={true} path="/email/add">
        <EmailTemplateContainer />
      </Route>
      <Route exact={true} path="/email/edit/:id">
        <EmailTemplateContainer />
      </Route>
      <Route exact={true} path="/email">
        <EmailTemplateContainer />
      </Route>
      <Route exact={true} path="/evaluation-instructions/add">
        <InstructionsContainer />
      </Route>
      <Route exact={true} path="/evaluation-instructions/edit/:id">
        <InstructionsContainer />
      </Route>
      <Route exact={true} path="/evaluation-instructions">
        <InstructionsContainer />
      </Route>
      <Route exact={true} path="/clients/edit/:id">
        <EditClient />
      </Route>

      <Route exact={true} path="/users">
        <User />
      </Route>

      <Route exact={true} path="/participants">
        <ParticipantHome />
      </Route>

      <Route exact={true} path="/evaluator">
        <Evaluator />
      </Route>

      <Route exact={true} path="/questions">
        <Question />
      </Route>

      <Route exact={true} path="/evaluation-summary">
        <EvaluationSummary />
      </Route>

      <Route exact={true} path="/evaluator-result">
        <EvaluatorResult />
      </Route>
    </Switch>
  </Suspense>
);

export default Routes;
