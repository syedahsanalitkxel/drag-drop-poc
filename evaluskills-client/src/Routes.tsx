import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';
import Spinner from './components/atoms/Spinner';
import InstrumentTemplateContainer from './containers/InstrumentContainer';

const Home = lazy(() => import('./components/pages/LandingPage'));
const DashboardHome = lazy(() => import('./components/pages/Dashboard'));
const AssessmentItemContainer = lazy(() => import('./containers/AssessmentItemContainer'));
const ClientContainer = lazy(() => import('./containers/ClientContainer'));
const AssessmentContainer = lazy(() => import('./containers/AddEditAssessmesntContainer'));

const AddClient = lazy(() => import('./components/pages/AddClient'));
const AddAssessment = lazy(() => import('./components/pages/AddAssessment'));
const AddEmailTemplate = lazy(() => import('./components/pages/AddEmailTemplate'));
const EmailTemplateContainer = lazy(() => import('./containers/AddEditEmailContainer'));
const EditClient = lazy(() => import('./components/pages/EditClient'));
const InstructionsContainer = lazy(() => import('./containers/EvaluationInstructionContainer'));

const User = lazy(() => import('./components/pages/User'));
const Email = lazy(() => import('./components/pages/Email'));

const Routes = () => (
  <Suspense fallback={<Spinner />}>
    <Switch>
      <Route exact={true} path="/">
        <Home />
      </Route>

      <Route exact={true} path="/dashboard">
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

      <Route exact={true} path="/instrument-templates">
        <InstrumentTemplateContainer />
      </Route>
      <Route exact={true} path="/instrument-templates/add">
        <InstrumentTemplateContainer />
      </Route>
      <Route exact={true} path="/instrument-templates/edit/:id">
        <InstrumentTemplateContainer />
      </Route>

      <Route exact={true} path="/clients">
        <ClientContainer />
      </Route>

      <Route exact={true} path="/clients/add">
        <AddClient />
      </Route>
      <Route exact={true} path="/setting/email/add">
        <EmailTemplateContainer />
      </Route>
      <Route exact={true} path="/setting/email/edit/:id">
        <EmailTemplateContainer />
      </Route>
      <Route exact={true} path="/setting">
        <Email />
      </Route>
      <Route exact={true} path="/setting/instructions">
        <InstructionsContainer />
      </Route>
      <Route exact={true} path="/setting/instructions/edit/:id">
        <InstructionsContainer />
      </Route>
      <Route exact={true} path="/clients/edit/:id">
        <EditClient />
      </Route>

      <Route exact={true} path="/users">
        <User />
      </Route>
    </Switch>
  </Suspense>
);

export default Routes;
