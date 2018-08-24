import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import App from './components/App/App';

ReactDOM.render((
  <Router>
    <Routes>
      <App />
    </Routes>
  </Router>
), document.getElementById('root'));
