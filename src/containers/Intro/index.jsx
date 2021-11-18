import React, { useState, useEffect, useCallback } from 'react';
import styles from './style.module';
import { INTRO_TEXT } from './constants.ts';
import { useNavigate } from 'react-router-dom';

export const Intro = () => {
    const [introText, setIntroText] = useState('');
    const navigate = useNavigate();

    const isFirstTime = JSON.parse(localStorage.getItem('isFirstTime'));

    useEffect(() => {
        if (!isFirstTime && isFirstTime !== null) {
            return;
        }
        localStorage.setItem('isFirstTime', true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const printText = useCallback(() => {
        INTRO_TEXT.split('').forEach((letter, index) => {
            setTimeout(() => {
                setIntroText((prev) => prev + letter);
            }, index * 70);
        });
    }, []);

    useEffect(() => {
        printText();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (introText.length === INTRO_TEXT.length) {
            setTimeout(() => {
                navigate('/editor');
            }, 500);
        }
    })
    return <div className={styles.intro_text}>{introText}</div>
};