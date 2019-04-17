import React, { lazy, Suspense, useContext } from 'react';
import { Redirect, Route, RouteProps, Switch } from 'react-router';

import Spinner from './components/atoms/Spinner';

import { InstrumentTemplateRoutes } from './modules/InstrumentTemplate';

import InstrumentClientContainer from './containers/InstrumentClientContainer';
import { AuthContext } from './modules/Auth/authContext';

const AuthContainer = lazy(() => import('./containers/AuthContainer'));

const DashboardHome = lazy(() => import('./components/pages/Dashboard'));
const AssessmentItemContainer = lazy(() => import('./containers/AssessmentItemContainer'));
const ClientContainer = lazy(() => import('./containers/ClientContainer'));

const InstrumentDetailContainer = lazy(() => import('./containers/InstrumentDetailContainer'));
const EmailTemplateContainer = lazy(() => import('./containers/AddEditEmailContainer'));
const AddEditClientContainer = lazy(() => import('./containers/EditAddClientContainer'));
const InstructionsContainer = lazy(() => import('./containers/EvaluationInstructionContainer'));

const UserContainer = lazy(() => import('./containers/UserContainer'));
const CreateEvaluation = lazy(() => import('./components/pages/CreateInstruments'));
const ParticipantHome = lazy(() => import('./components/pages/ParticipantEmailInvite'));
import { EvaluationRoutes } from './modules/Evaluation';
interface RouteItemInterface {
  Component: any;
  path: string;
}

interface PrivateRouteInterface extends RouteProps {
  component: any;
}

const PrivateRoute: React.FunctionComponent<PrivateRouteInterface> = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  return (
    <Route
      {...rest}
      exact={true}
      render={props =>
        authContext.checkAuthentication() ? <Component {...props} /> : <Redirect to="/account/login" />
      }
    />
  );
};

const renderRouteFromList = (isPrivate: boolean) => (item: RouteItemInterface, i: number) => {
  const { Component } = item;
  if (isPrivate) {
    return <PrivateRoute exact={true} key={i} path={item.path} component={Component} />;
  }
  return <Route exact={true} key={i} path={item.path} component={Component} />;
};

const Routes: React.FunctionComponent = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        {EvaluationRoutes.map(renderRouteFromList(false))}
        <Route exact={true} path="/account/login" component={AuthContainer} />
        <Route exact={true} path="/account/select-client" component={AuthContainer} />
        <Route exact={true} path="/account/reset-password" component={AuthContainer} />
        <Route exact={true} path="/account/email-confirmation" component={AuthContainer} />
        <PrivateRoute exact={true} path="/" component={DashboardHome} />
        <PrivateRoute exact={true} path="/assessment-items" component={AssessmentItemContainer} />
        <PrivateRoute exact={true} path="/assessment-items/add" component={AssessmentItemContainer} />
        <PrivateRoute exact={true} path="/assessment-items/edit/:id" component={AssessmentItemContainer} />
        <PrivateRoute exact={true} path="/assessment-items/copy/:id" component={AssessmentItemContainer} />
        <PrivateRoute exact={true} path="/instrument" component={InstrumentClientContainer} />
        {InstrumentTemplateRoutes.map(renderRouteFromList(true))}
        <PrivateRoute exact={true} path="/client-assessment-detail/:id" component={InstrumentDetailContainer} />
        <PrivateRoute exact={true} path="/clients" component={ClientContainer} />
        <PrivateRoute exact={true} path="/clients/add" component={AddEditClientContainer} />
        <PrivateRoute exact={true} path="/clients/edit/:id" component={AddEditClientContainer} />
        <PrivateRoute exact={true} path="/email/add" component={EmailTemplateContainer} />
        <PrivateRoute exact={true} path="/email/edit/:id" component={EmailTemplateContainer} />
        <PrivateRoute exact={true} path="/email" component={EmailTemplateContainer} />
        <Route exact={true} path="/evaluation-instructions/add" component={InstructionsContainer} />
        <Route exact={true} path="/evaluation-instructions/edit/:id" component={InstructionsContainer} />
        <Route exact={true} path="/evaluation-instructions" component={InstructionsContainer} />
        <Route exact={true} path="/addInstrumental" component={CreateEvaluation} />
        <PrivateRoute exact={true} path="/users" component={UserContainer} />
        <Route exact={true} path="/participants" component={ParticipantHome} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
