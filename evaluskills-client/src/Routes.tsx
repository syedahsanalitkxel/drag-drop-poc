import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';

import Spinner from './components/atoms/Spinner';

import { InstrumentTemplateRoutes } from './modules/InstrumentTemplate';

import InstrumentClientContainer from './containers/InstrumentClientContainer';

const AuthContainer = lazy(() => import('./containers/AuthContainer'));

const Home = lazy(() => import('./components/pages/LandingPage'));
const DashboardHome = lazy(() => import('./components/pages/Dashboard'));
const AssessmentItemContainer = lazy(() => import('./containers/AssessmentItemContainer'));
const ClientContainer = lazy(() => import('./containers/ClientContainer'));
const AssessmentContainer = lazy(() => import('./containers/AddEditAssessmesntContainer'));
const InstrumentDetailContainer = lazy(() => import('./containers/InstrumentDetailContainer'));
const EmailTemplateContainer = lazy(() => import('./containers/AddEditEmailContainer'));
const AddEditClientContainer = lazy(() => import('./containers/EditAddClientContainer'));
const InstructionsContainer = lazy(() => import('./containers/EvaluationInstructionContainer'));

const CreateEvaluation = lazy(() => import('./components/pages/CreateInstruments'));
const User = lazy(() => import('./components/pages/User'));
const ParticipantHome = lazy(() => import('./components/pages/ParticipantEmailInvite'));

const Routes = () => (
  <Suspense fallback={<Spinner />}>
    <Switch>
      <Route exact={true} path="/">
        <Home />
      </Route>

      <Route exact={true} path="/login">
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
        <AssessmentItemContainer />
      </Route>
      <Route exact={true} path="/assessment-items/edit/:id">
        <AssessmentItemContainer />
      </Route>

      <Route exact={true} path="/instrument">
        <InstrumentClientContainer />
      </Route>

      {InstrumentTemplateRoutes.map((item, i) => {
        const { Component } = item;
        return (
          <Route exact={true} key={i} path={item.path}>
            <Component />
          </Route>
        );
      })}

      {/*<Route exact={true} path="/instrument-templates">*/}
      {/*<InstrumentTemplateContainer />*/}
      {/*</Route>*/}
      {/*<Route exact={true} path="/instrument-templates/add">*/}
      {/*<InstrumentTemplateContainer />*/}
      {/*</Route>*/}
      {/*<Route exact={true} path="/instrument-templates/edit/:id">*/}
      {/*<InstrumentTemplateContainer />*/}
      {/*</Route>*/}

      <Route exact={true} path="/client-assessment-detail/:id">
        <InstrumentDetailContainer />
      </Route>

      <Route exact={true} path="/clients">
        <ClientContainer />
      </Route>
      <Route exact={true} path="/clients/add">
        <AddEditClientContainer />
      </Route>
      <Route exact={true} path="/clients/edit/:id">
        <AddEditClientContainer />
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

      <Route exact={true} path="/addInstrumental">
        <CreateEvaluation />
      </Route>

      <Route exact={true} path="/users">
        <User />
      </Route>

      <Route exact={true} path="/participants">
        <ParticipantHome />
      </Route>
    </Switch>
  </Suspense>
);

export default Routes;
