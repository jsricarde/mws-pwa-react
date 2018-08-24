import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Home/Home';
import Detail from './pages/Detail/Detail';
import NotFound from './pages/NotFound/NotFound';

const Routes = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/characters/:id" component={Detail} />
      {/* <Route
        path="/characters/:itemId"
        component={({ match }) => (
          <h1>
            Item:
            {' '}
            {match.params.itemId}
          </h1>
        )}
      /> */}
      <Route exact path="/characters" component={Home} />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default Routes;
