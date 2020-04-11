import React from 'react';
import { Route, Switch } from 'react-router-dom';
import history from '../helpers/history';
import RequireAuth from '../hoc/authHoc';
import MainLayout from '../hoc/Layout';
import ConnectedLogin from '../views/Login';
import AllRoutes from './routes';
import RoutesInterface from './typed';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={ConnectedLogin} />
    <MainLayout history={history}>
      {AllRoutes.map((route: RoutesInterface) => (
        <Route
          key={route.id}
          path={route.path}
          component={RequireAuth(route.component, route.allowedRoles)}
          exact={route.exact}
        />
      ))}
    </MainLayout>
  </Switch>
);
export default Routes;
