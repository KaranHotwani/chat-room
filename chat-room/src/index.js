import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import HomePage from './components/HomePage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/chat/:id" component={App}/>
      </Switch>
    </BrowserRouter>
    
  </React.StrictMode>,
  document.getElementById('root')
);
