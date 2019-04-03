import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';
import Spinner from './components/atoms/Spinner';
import InstrumentTemplateContainer from './containers/InstrumentContainer';

const Home = lazy(() => import('./components/pages/LandingPage'));
const DashboardHome = lazy(() => import('./components/pages/Dashboard'));
const AssessmentItemContainer = lazy(() => import('./containers/AssessmentItemContainer'));
const ClientContainer = lazy(() => import('./containers/ClientContainer'));
const AddClient = lazy(() => import('./components/pages/AddClient'));
const AddAssessment = lazy(() => import('./components/pages/AddAssessment'));
const EditAssessment = lazy(() => import('./components/pages/EditAssessment'));
const EditClient = lazy(() => import('./components/pages/EditClient'));

const User = lazy(() => import('./components/pages/User'));

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
        <AddAssessment />
      </Route>
      <Route exact={true} path="/assessment-items/edit/:id">
        <EditAssessment />
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
