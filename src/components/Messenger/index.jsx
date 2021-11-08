import React from 'react';
import { CSSTransition } from 'react-transition-group';

import styles from './style.module';

export const Messenger = ({ currentApp, messages, closeApp }) => {
  return (
    <CSSTransition
      key="open-app"
      in={!!currentApp}
      mountOnEnter={false}
      unmountOnExit={true}
      timeout={200}
      classNames={{
        enterActive: styles.active,
        enterDone: styles.done,
        exitActive: styles.exit,
        exitDone: styles.exit__active,
      }}
    >
      <div className={styles.apps}>
        {!!messages.length && messages.map((item) => {
          return (
            <div key={item.id} className={styles.message}>
              <div className={styles.message__avatar} />
              <div className={styles.message__data}>
                <div className={styles.message__author}>{item.author}</div>
                <div className={styles.message__text}>{item.text}</div>
              </div>
            </div>
          );
        })}
        <button onClick={closeApp} className={styles.app__close}>
          <span></span>
        </button>
      </div>
    </CSSTransition>
  );
};
