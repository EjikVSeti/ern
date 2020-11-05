import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/main" exact>
          <MainPage/>
        </Route>
        <Redirect to="/main"/>
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/login" exact>
        <LoginPage/>
      </Route>
      <Redirect to="/login"/>
    </Switch>
  );
}
