import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Menu } from '../components/Menu';
import { CodeEditor } from './CodeEditor';
import { Intro } from './Intro';
import { Auth } from './Auth';
import store from '../store';
import { Provider } from 'react-redux';

import styles from '../style.module';

export const Main = () => {
  const location = useLocation();

  return (
    <Provider store={store}>
      {location.pathname === '/' ? null : <Menu />}
      <div className={styles.app}>
        <Routes>
          <Route path='/' element={<Intro />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/editor' element={<CodeEditor />} />
        </Routes>
      </div>
    </Provider>
  );
};
