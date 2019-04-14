import React, { lazy, Suspense, useContext } from 'react';
import { Redirect, Route, RouteProps, Switch } from 'react-router';

import Spinner from './components/atoms/Spinner';

import { InstrumentTemplateRoutes } from './modules/InstrumentTemplate';

import InstrumentClientContainer from './containers/InstrumentClientContainer';
import { AuthContext } from './modules/Auth/authContext';

const AuthContainer = lazy(() => import('./containers/AuthContainer'));

const Home = lazy(() => import('./components/pages/LandingPage'));
const DashboardHome = lazy(() => import('./components/pages/Dashboard'));
const AssessmentItemContainer = lazy(() => import('./containers/AssessmentItemContainer'));
const ClientContainer = lazy(() => import('./containers/ClientContainer'));
const InstrumentDetailContainer = lazy(() => import('./containers/InstrumentDetailContainer'));
const EmailTemplateContainer = lazy(() => import('./containers/AddEditEmailContainer'));
const AddEditClientContainer = lazy(() => import('./containers/EditAddClientContainer'));
const InstructionsContainer = lazy(() => import('./containers/EvaluationInstructionContainer'));

const CreateEvaluation = lazy(() => import('./components/pages/CreateInstruments'));
const User = lazy(() => import('./components/pages/User'));
const ParticipantHome = lazy(() => import('./components/pages/ParticipantEmailInvite'));

interface RouteItemInterface {
  Component: any;
  path: string;
}

interface PrivateRouteInterface extends RouteProps {
  component: any;
}

const PrivateRoute: React.FunctionComponent<PrivateRouteInterface> = ({
  component: Component,
  ...rest
}) => {
  const authContext = useContext(AuthContext);
  return (
    <Route
      {...rest}
      exact={true}
      render={props =>
        authContext.checkAuthentication() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

function renderRouteFromList(item: RouteItemInterface, i: number) {
  const { Component } = item;
  return <PrivateRoute exact={true} key={i} path={item.path} component={Component} />;
}

const Routes: React.FunctionComponent = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/login" component={AuthContainer} />
        <Route exact={true} path="/select-client" component={AuthContainer} />
        <Route exact={true} path="/reset-password" component={AuthContainer} />
        <PrivateRoute exact={true} path="/dashboard" component={DashboardHome} />
        <Route exact={true} path="/verify-email" component={DashboardHome} />
        <PrivateRoute exact={true} path="/assessment-items" component={AssessmentItemContainer} />
        <PrivateRoute
          exact={true}
          path="/assessment-items/add"
          component={AssessmentItemContainer}
        />
        <PrivateRoute
          exact={true}
          path="/assessment-items/edit/:id"
          component={AssessmentItemContainer}
        />
        <PrivateRoute exact={true} path="/instrument" component={InstrumentClientContainer} />
        {InstrumentTemplateRoutes.map(renderRouteFromList)}
        <PrivateRoute
          exact={true}
          path="/client-assessment-detail/:id"
          component={InstrumentDetailContainer}
        />
        <PrivateRoute exact={true} path="/clients" component={ClientContainer} />
        <PrivateRoute exact={true} path="/clients/add" component={AddEditClientContainer} />
        <PrivateRoute exact={true} path="/clients/edit/:id" component={AddEditClientContainer} />
        <PrivateRoute exact={true} path="/email/add" component={EmailTemplateContainer} />
        <PrivateRoute exact={true} path="/email/edit/:id" component={EmailTemplateContainer} />
        <PrivateRoute exact={true} path="/email" component={EmailTemplateContainer} />
        <Route exact={true} path="/evaluation-instructions/add" component={InstructionsContainer} />
        <Route
          exact={true}
          path="/evaluation-instructions/edit/:id"
          component={InstructionsContainer}
        />
        <Route exact={true} path="/evaluation-instructions" component={InstructionsContainer} />
        <Route exact={true} path="/addInstrumental" component={CreateEvaluation} />
        <PrivateRoute exact={true} path="/users" component={User} />
        <Route exact={true} path="/participants" component={ParticipantHome} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
