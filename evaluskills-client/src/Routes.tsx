import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';
import Spinner from './components/atoms/Spinner';

const Home = lazy(() => import('./components/pages/LandingPage'));
const DashboardHome = lazy(() => import('./components/pages/Dashboard'));
const AssessmentItemContainer = lazy(() => import('./containers/AssessmentItemContainer'));
const ClientContainer = lazy(() => import('./containers/ClientContainer'));
const AddClient = lazy(() => import('./components/pages/Dashboard/AddClient/AddClient'));
const AddAssessment = lazy(() => import('./components/pages/AddAssessment'));
const EditAssessment = lazy(() => import('./components/pages/EditAssessment'));

const Client = lazy(() => import('./components/pages/Client'));
const User = lazy(() => import('./components/pages/User'));
const AddUser = lazy(() => import('./components/pages/AddUser'));

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

      <Route exact={true} path="/clients">
        <ClientContainer />
      </Route>

      <Route exact={true} path="/clients/add">
        <AddClient />
      </Route>

      <Route exact={true} path="/users">
        <User />
      </Route>

      <Route exact={true} path="/users/add">
        <AddUser />
      </Route>
    </Switch>
  </Suspense>
);

export default Routes;
