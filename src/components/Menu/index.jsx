import React, { useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";

import styles from "./style.module";

export const Menu = () => {
  const [isOpen, openMenu] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = useCallback(() => {
    openMenu((prev) => !prev);
  }, []);

  const handleOnLinkClick = useCallback(() => {
    openMenu(false);
  }, []);

  const openIntro = useCallback(() => {
    localStorage.setItem('isFirstTime', true);
    handleOnLinkClick();
    navigate('/');
  }, [handleOnLinkClick, navigate]);

  const menuClassName = isOpen
    ? `${styles.menu} ${styles.active}`
    : `${styles.menu}`;


  return (
    <div className={menuClassName}>
      <div className={styles.menu__box}>
        <button onClick={toggleMenu} className={styles.menu__open}>
          меню
        </button>
        {isOpen && (
          <nav className={styles.nav}>
            <Link
              onClick={handleOnLinkClick}
              to="/editor"
              className={styles.link}
            >
              Терминал
            </Link>
            <button className={styles.show_intro} onClick={openIntro}>
              Посмотреть вступление
            </button>
          </nav>
        )}
      </div>
    </div>
  );
};
