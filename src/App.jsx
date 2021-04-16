// React Imports
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

// Pages Imports
import StartPage from './pages/Start';
import TreePage from './pages/Tree';
import ErrorPage from './pages/Error';

// Styles Imports
import './styles/global.css';

// Contexts
import { TreeProvider } from './contexts/TreeContext';

//! Render
ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path='/'>
        <StartPage />
      </Route>
      <Route exact path='/Tree'>
        <TreeProvider>
          <TreePage />
        </TreeProvider>
      </Route>
      <Route path='/'>
        <ErrorPage />
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root'),
);
