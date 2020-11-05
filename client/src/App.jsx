import React, { useCallback, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { reducer as reduxFormReducer } from 'redux-form';

import { Loader } from './components/Loader';
import { useRoutes } from './routes';
import { AuthReducer } from './libs/auth/reducers';
import { authorization } from './libs/auth/actions';
import { AboutReducer } from './libs/about/reducers';

const appReducer = combineReducers({
  authentication: AuthReducer,
  about: AboutReducer,
  form: reduxFormReducer
});

const configureStore = createStore(appReducer, applyMiddleware(thunkMiddleware));

export const store = configureStore;

function App (props) {
  const { isReady, isAuthenticated, authorization } = props;
  const routes = useRoutes(isAuthenticated);

  const fetchAuth = useCallback(async () => {
    await authorization();
  }, [authorization]);

  useEffect(() => {
    fetchAuth().then();
  }, [fetchAuth])

  if (!isReady) {
    return <Loader/>
  }


  return (
    <Provider  store={store}>
      <Router>
        <div className="container">
          {routes}
        </div>
      </Router>
    </Provider>
  );
}

const mapStateToProps = state => ({
  isReady: state.authentication.isReady,
  isAuthenticated: state.authentication.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  authorization: () => dispatch(authorization())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
