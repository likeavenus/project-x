import React, {
  useState,
  useCallback,
  useLayoutEffect,
  useEffect,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { CSSTransition } from "react-transition-group";

import styles from "./style.module";
import SmartPhone from "../../assets/phone.svg";
import MessagesApp from "../../assets/messages-ios.svg";
import { TIME_FORMAT, APPS, ESCAPE_KEY } from "./constants";
import { getMessages } from "../../api";

export const Menu = () => {
  const [isOpen, setMenuState] = useState(false);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const toggleMenu = useCallback(() => {
    setMenuState((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuState(false);
  }, []);

  // const openIntro = useCallback(() => {
  //   localStorage.setItem("isFirstTime", true);
  //   closeMenu();
  //   navigate("/");
  // }, [closeMenu, navigate]);

  const menuClass = isOpen ? `${styles.menu} ${styles.active}` : styles.menu;
  const phoneClass = isOpen ? `${styles.phone} ${styles.active}` : styles.phone;

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
    window.addEventListener("keydown", handleOnEscape);
    return () => window.removeEventListener("keydown", handleOnEscape);
  }, [handleOnEscape]);

  useEffect(() => {
    getMessages()
      .then((data) => {
        setMessages(data);
      })
      .catch((e) => new Error(e));
  }, []);

  const unreadMessages = useMemo(() => {
    return [...messages].filter((item) => item.checked === false);
  }, [messages]);

  return (
    <>
      <div onClick={closeMenu} className={menuClass}></div>
      <button onClick={toggleMenu} className={styles.menu__open}>
        <SmartPhone className={styles.phone__icon} />
      </button>
      <div className={phoneClass}>
        <div className={styles.phone__wrap}>
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
              {messages.map((item) => {
                return (
                  <div key={item.id} className={styles.message}>
                    <div className={styles.message__avatar} />
                    <div className={styles.message__data}>
                      <div className={styles.message__author}>
                        {item.author}
                      </div>
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
