import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';
import Spinner from './components/atoms/Spinner';

const Home = lazy(() => import('./components/pages/LandingPage'));
const DashboardHome = lazy(() => import('./components/pages/Dashboard'));
const AssessmentItemContainer = lazy(() => import('./containers/AssessmentItemContainer'));
const ClientContainer = lazy(() => import('./containers/ClientContainer'));
const AddClient = lazy(() => import('./components/pages/AddClient'));
const AddAssessment = lazy(() => import('./components/pages/AddAssessment'));
const EditAssessment = lazy(() => import('./components/pages/EditAssessment'));
const AddEmailTemplate = lazy(() => import('./components/pages/AddEmailTemplate'));
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
      <Route exact={true} path="/setting/addemail">
        <AddEmailTemplate />
      </Route>
      <Route exact={true} path="/setting">
        <Email />
      </Route>
      <Route exact={true} path="/users">
        <User />
      </Route>
    </Switch>
  </Suspense>
);

export default Routes;
