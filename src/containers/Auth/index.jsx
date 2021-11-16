import React, { useCallback, useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigate } from 'react-router';
import { useAuth } from './useAuth';

import styles from './style.module';

export const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();
  const { login } = useAuth();

  const handleOnInputChange = useCallback((e) => {
    if (e.target.name === 'email') {
      return setEmail(e.target.value);
    }
    setPassword(e.target.value);
  }, []);

  const handleOnSubmit = useCallback(() => {
    login(auth, email, password)
      .then((data) => {
        console.log(data)
        const { code, errors, message } = data.error;

        if (!errors) {
          // navigate('/editor')
        }
      })
      .catch((err) => console.error(err))
    // if (!auth.currentUser) {
    //   return createUserWithEmailAndPassword(auth, email, password)
    //     .then((userCredential) => {
    //       const user = userCredential.user;
    //     })
    //     .catch((error) => {
    //       // const errorCode = error.code;
    //       const errorMessage = error.message;
    //       console.error(errorMessage);
    //     });
    // }
    // signInWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     // ...
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.error(errorMessage);
    //   });
  }, [login]);

  return (
    <div className={styles.auth}>
      <div className={styles.auth__container}>
        <h2 className={styles.auth__title}>кто я?</h2>
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
        <button onClick={handleOnSubmit} className={styles.auth__button}>
          могу ли я войти?
        </button>
      </div>
    </div>
  );
};
