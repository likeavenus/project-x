import React from 'react';

import styles from './style.module';

export const ModalWindow = ({ isOpen, children }) => {
    return isOpen && <div className={styles.modal}>{children}</div>
};