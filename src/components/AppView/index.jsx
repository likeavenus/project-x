import React from 'react';
import { CSSTransition } from 'react-transition-group';

import styles from './style.module';

export const AppView = ({ children, currentApp, closeApp }) => {
  return (
    <CSSTransition
      key="open-app"
      in={!!currentApp}
      appear
      timeout={200}
      classNames={{
        enterActive: styles.active,
        enterDone: styles.done,
        exitActive: styles.exit,
        exitDone: styles.exit__active,
      }}
    >
      <div className={styles.app__view}>
        {children}
        <button onClick={closeApp} className={styles.app__close}>
          <span></span>
        </button>
      </div>
    </CSSTransition>
  );
};
