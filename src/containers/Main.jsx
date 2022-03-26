import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Menu } from '../components/Menu';
import { CodeEditor } from './CodeEditor';
import { Intro } from './Intro';
import { Auth } from './Auth';
import store from '../store';
import { Provider } from 'react-redux';

import { RequireAuth } from './Auth/RequiredAuth';

import styles from '../style.module';

export const Main = () => {

  return (
    <Provider store={store}>
      <div className={styles.app}>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/editor"
            element={
              <RequireAuth>
                <Menu />
                <CodeEditor />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </Provider>
  );
};
