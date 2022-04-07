import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Main } from './containers/Main';

const App = () => {
  return (
    <Router>
      <Main />
    </Router>
  );
};

export default App;
