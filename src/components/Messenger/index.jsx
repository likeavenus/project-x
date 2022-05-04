import React, { useCallback } from 'react';
import { setMessage } from './messengerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage, closeMessage } from './messengerSlice';

import styles from './style.module';
import { Message } from './Message';

export const Messenger = ({ messages }) => {
  const dispatch = useDispatch();
  const isMessageOpened = useSelector(
    (state) => state.messenger.isMessageOpened,
  );

  const openMessage = useCallback(
    (item) => () => {
      if (!item.checked) {
        dispatch(setMessage(item));
      }
      dispatch(showMessage(item));
    },
    [dispatch],
  );

  return (
    <>
        <div
          className={
            isMessageOpened
              ? `${styles.messages} ${styles.active}`
              : styles.messages
          }
        >
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
                  onClick={openMessage(item)}
                >
                  <div className={styles.message__avatar} />
                  <div className={styles.message__data}>
                    <div className={styles.message__author}>{item.author}</div>
                    <div className={styles.message__text}>
                      {item.chat[item.chat.length - 1].text}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <Message isMessageOpened={isMessageOpened} />
    </>
  );
};
