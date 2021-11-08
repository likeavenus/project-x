import React, { useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import { setMessage } from './messengerSlice';
import { useDispatch } from 'react-redux';

import styles from './style.module';

export const Messenger = ({ currentApp, messages, closeApp }) => {
  const dispatch = useDispatch();

  const setMessageChecked = useCallback(
    (item) => () => {
      if (!item.checked) {
        dispatch(setMessage(item));
      }
    },
    [dispatch],
  );

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
        {messages &&
          !!messages.length &&
          messages.map((item) => {
            return (
              <div
                key={item.id}
                className={
                  !item.checked
                    ? `${styles.message} ${styles.active}`
                    : styles.message
                }
                onClick={setMessageChecked(item)}
              >
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
