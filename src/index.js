import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import App from './components/App/App';

ReactDOM.render((
  <BrowserRouter>
    <Routes>
      <App />
    </Routes>
  </BrowserRouter>
), document.getElementById('root'));
