import React, {
  useState,
  useCallback,
  useLayoutEffect,
  useEffect,
  useMemo,
} from 'react';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import { signOut, getAuth } from 'firebase/auth';

import styles from './style.module';
import SmartPhone from '../../assets/phone.svg';
import ProfileSvg from '../../assets/profile.svg';
import MessagesSvg from '../../assets/messages-ios.svg';
import { TIME_FORMAT, APPS, ESCAPE_KEY } from './constants';
import { toggle, close } from './menuSlice';
import { Messenger } from '../Messenger';
import { Profile } from '../Profile';
import { fetchMessages } from '../Messenger/messengerSlice';
import { AppView } from '../AppView';


export const Menu = () => {
  const auth = getAuth();
  const menu = useSelector(state => state.menu.value);
  const dispatch = useDispatch();

  const toggleMenu = useCallback(() => {
    dispatch(toggle());
  }, [dispatch]);

  const closeMenu = useCallback(() => {
    dispatch(close());
  }, [dispatch]);

  const menuClass = menu ? `${styles.menu} ${styles.active}` : styles.menu;
  const phoneClass = menu ? `${styles.phone} ${styles.active}` : styles.phone;

  let currentTime = dayjs().format(TIME_FORMAT);
  const [time, setTime] = useState(currentTime);

  const [currentApp, setCurrentApp] = useState(null);
  console.log('currentApp: ', currentApp)

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

  const onSignOut = useCallback(() => {
    signOut(auth);
  }, [auth]);

  const getApp = useCallback(() => {
    switch (currentApp) {
      case 'messenger':
        return <Messenger
          messages={memoizedMessages}
        />
      case 'profile':
        return <Profile />
      default: <></>;
    }
  }, [currentApp, memoizedMessages]);

  return (
    <>
      <div onClick={closeMenu} className={menuClass}></div>
      <button onClick={toggleMenu} className={styles.menu__open}>
        <SmartPhone className={styles.phone__icon} />
      </button>
      <div className={phoneClass}>
        <div className={styles.phone__wrap}>
          <AppView currentApp={currentApp} closeApp={closeApp}>
            {getApp()}
          </AppView>
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
              className={styles.phone__app}
            >
              <MessagesSvg />
              {!!unreadMessages.length && (
                <div className={styles.app__notification}>
                  {unreadMessages.length}
                </div>
              )}
            </button>
            <button onClick={openApp(APPS[1].app)} className={`${styles.phone__app} ${styles.phone_app_profile}`}>
              <ProfileSvg />
            </button>
            <button className={styles.phone__app} onClick={onSignOut}>Exit</button>
          </div>
        </div>
      </div>
    </>
  );
};
