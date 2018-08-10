import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Detail from './pages/Detail/Detail';
import NotFound from './pages/NotFound/NotFound';

const Routes = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/characters/" component={Home} />
      <Route exact path="/characters/:id" component={Detail} />
      {/* <Route component={NotFound} /> */}
    </Switch>
  </div>

);

export default Routes;
