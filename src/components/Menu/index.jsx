import React, {
  useState,
  useCallback,
  useLayoutEffect,
  useEffect,
  useMemo,
} from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useSelector, useDispatch, useStore } from 'react-redux';

import styles from './style.module';
import SmartPhone from '../../assets/phone.svg';
import MessagesApp from '../../assets/messages-ios.svg';
import { TIME_FORMAT, APPS, ESCAPE_KEY } from './constants';
import { toggle, close } from './menuSlice';
import { Messenger } from '../Messenger';
import { fetchMessages } from '../Messenger/messengerSlice';

export const Menu = () => {
  const menu = useSelector(state => state.menu.value);
  const dispatch = useDispatch();
  const store = useStore();
  console.log(store.getState());

  const navigate = useNavigate();
  const toggleMenu = useCallback(() => {
    dispatch(toggle());
  }, [dispatch]);

  const closeMenu = useCallback(() => {
    dispatch(close());
  }, [dispatch]);

  // const openIntro = useCallback(() => {
  //   localStorage.setItem("isFirstTime", true);
  //   closeMenu();
  //   navigate("/");
  // }, [closeMenu, navigate]);

  const menuClass = menu ? `${styles.menu} ${styles.active}` : styles.menu;
  const phoneClass = menu ? `${styles.phone} ${styles.active}` : styles.phone;

  let currentTime = dayjs().format(TIME_FORMAT);
  const [time, setTime] = useState(currentTime);

  const [currentApp, setCurrentApp] = useState(null);

  const openApp = useCallback(
    (app) => () => {
      setCurrentApp(app);
    },
    [],
  );

  const closeApp = useCallback(() => setCurrentApp(null), []);

  useLayoutEffect(() => {
    const timerId = setInterval(() => {
      setTime(dayjs().format(TIME_FORMAT));
    }, 10000);

    return () => clearInterval(timerId);
  }, []);

  const handleOnEscape = useCallback(
    (e) => {
      if (e.key === ESCAPE_KEY) {
        closeMenu();
      }
    },
    [closeMenu],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleOnEscape);
    return () => window.removeEventListener('keydown', handleOnEscape);
  }, [handleOnEscape]);
  const messengerData = useSelector((state) => state.messenger);

  useEffect(() => {
      dispatch(fetchMessages())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const unreadMessages = useMemo(() => {
    if (messengerData.messages && messengerData.messages.length) {
      return [...messengerData.messages].filter((item) => item.checked === false);
    }
    return [];
  }, [messengerData.messages]);

  const memoizedMessages = useMemo(() => messengerData.messages, [messengerData.messages]);

  return (
    <>
      <div onClick={closeMenu} className={menuClass}></div>
      <button onClick={toggleMenu} className={styles.menu__open}>
        <SmartPhone className={styles.phone__icon} />
      </button>
      <div className={phoneClass}>
        <div className={styles.phone__wrap}>
          <Messenger
            currentApp={currentApp}
            messages={memoizedMessages}
            closeApp={closeApp}
          />
          <div
            className={
              currentApp
                ? `${styles.time__box} ${styles.active}`
                : styles.time__box
            }
          >
            {time}
          </div>
          <div className={styles.app_panel}>
            <button
              onClick={openApp(APPS[0].app)}
              className={`${styles.phone__app}`}
            >
              <MessagesApp />
              {!!unreadMessages.length && (
                <div className={styles.app__notification}>
                  {unreadMessages.length}
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
