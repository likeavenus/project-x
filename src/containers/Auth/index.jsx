import React, { useCallback, useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router';

import { useAuth } from './useAuth';
import { AUTH_STATE, ERROR_CODES } from './constants';

import styles from './style.module';

export const Auth = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [authState, setAuthState] = useState(AUTH_STATE.AUTHENTICATION);
  const navigate = useNavigate();
  const auth = getAuth();
  const { login, registration } = useAuth();
  const [error, setError] = useState(null);

  const handleOnInputChange = useCallback((e) => {
    if (e.target.name === 'email') {
      return setEmail(e.target.value);
    }
    setPassword(e.target.value);
  }, []);

  const handleOnSubmit = useCallback(() => {
    if (email.length > 2 && password.length > 2) {
      if (authState === AUTH_STATE.REGISTRATION) {
        registration(auth, email, password)
          .then((userCredential) => {
            if (!userCredential.error) {
              navigate('/editor');
            } else {
              console.log(userCredential.error);
            }
          })
          .catch((err) => console.error(err));
      }
      if (authState === AUTH_STATE.AUTHENTICATION) {
        login(auth, email, password)
          .then((userCredential) => {
            if (!userCredential.error) {
              setError(null);
              navigate('/editor');
            } else {
              if (userCredential.error.code === ERROR_CODES.NOT_FOUND) {
                setError({
                  type: ERROR_CODES.NOT_FOUND,
                  errorMessage: 'Пользователь не найден. Зарегистрируйтесь.',
                });
              }
            }
          })
          .catch((err) => console.error(err));
      }
    }
  }, [auth, authState, email, login, navigate, password, registration]);

  const handleChangeAuthState = useCallback(
    (newState) => () => {
      setError(null);
      setAuthState(newState);
    },
    [],
  );

  const handleOnEnter = useCallback(
    (e) => {
      if (e.code === 'Enter') {
        handleOnSubmit();
      }
    },
    [handleOnSubmit],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleOnEnter);
    return () => window.removeEventListener('keydown', handleOnEnter);
  }, [handleOnEnter]);

  return (
    <div className={styles.auth}>
      <div className={styles.auth__container}>
        <h2 className={styles.auth__title}>
          {authState === AUTH_STATE.REGISTRATION && 'Зарегистрироваться'}
          {authState === AUTH_STATE.AUTHENTICATION && 'Войти'}
        </h2>
        <input
          name="email"
          placeholder="email"
          value={email}
          onChange={handleOnInputChange}
          type="text"
          className={`${styles.auth__input} ${styles.auth__login}`}
        />
        <input
          name="password"
          placeholder="пароль"
          value={password}
          onChange={handleOnInputChange}
          type="password"
          className={`${styles.auth__input} ${styles.auth__password}`}
        />
        {authState === AUTH_STATE.REGISTRATION ? (
          <p className={styles.auth__text}>
            Уже есть аккаунт?{' '}
            <button onClick={handleChangeAuthState(AUTH_STATE.AUTHENTICATION)}>
              Войти
            </button>
          </p>
        ) : (
          <p className={styles.auth__text}>
            Нет аккаунта?{' '}
            <button onClick={handleChangeAuthState(AUTH_STATE.REGISTRATION)}>
              Зарегистрироваться
            </button>
          </p>
        )}
        {error && <p className={styles.error__message}>{error.errorMessage}</p>}

        <button onClick={handleOnSubmit} className={styles.auth__button}>
          Отправить
        </button>
      </div>
    </div>
  );
};
