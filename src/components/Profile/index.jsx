import React, { useState, useCallback, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { ref } from 'firebase/storage';
import { useAuthState, useUpdateProfile } from 'react-firebase-hooks/auth';

import { storage } from '../../api';
import styles from './style.module';

import { readFile, useUploadPhoto } from '../../utils';

export const Profile = () => {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [file, setFile] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  const onFileLoad = useCallback((e) => {
    setFile(e.target.files[0]);
  }, []);


  // const [value, photoLoading, error] = useDownloadURL(
  //   ref(storage, 'path/to/file')
  // );


  useEffect(() => {
    // const getImage = async () => {
    //   const url = await readFile(file);
    //   return url;
    // };
    // if (file) {
    //   getImage(file)
    //     .then((url) => setPhotoURL(url));
    // }
    if (file) {
      useUploadPhoto(file)
    }
  }, [file]);
  return (
    <div className={styles.profile}>
      <div className={styles.avatar_box}>
        {photoURL ? (
          <label className={`${styles.avatar} ${styles.custom}`} htmlFor="avatar">
            <img src={photoURL} alt="Avatar" />
          </label>
        ) : (
          <label className={styles.avatar} htmlFor="avatar"></label>
        )}
      </div>
      <input id="avatar" className={styles.input} type="file" onChange={onFileLoad} />
    </div>
  );
};
