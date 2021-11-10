import React, { useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux';
import { closeMessage } from './messengerSlice';

import styles from './style.module';

export const Message = ({ isMessageOpened }) => {
  const currentMessage = useSelector((state) => state.messenger.currentMessage);
  const dispatch = useDispatch();

  const closeChat = useCallback(() => {
    dispatch(closeMessage());
  }, [dispatch]);

  return (
    <CSSTransition
      appear
      key="currentMessage"
      in={isMessageOpened}
      timeout={200}
      classNames={{
        enterActive: styles.active,
        enterDone: styles.done,
        exitActive: styles.exit,
        exitDone: styles.exit__active,
      }}
    >
      <div className={styles.currentMessage}>
        <>
          <div className={styles.chat__head}>
            <div className={`${styles.message__avatar} ${styles.chat}`} />
            <p className={`${styles.message__author} ${styles.chat}`}>
              {currentMessage?.author}
            </p>
          </div>
          <div className={styles.currentMessage__chat}>
            {currentMessage?.chat.map((item) => {
              return (
                <div className={styles.chat__message} key={item.id}>
                  {item.text}
                </div>
              );
            })}
          </div>
          <button onClick={closeChat} className={styles.currentMessage__close}>
            🡠
          </button>
        </>
      </div>
    </CSSTransition>
  );
};
