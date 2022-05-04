import { useUploadFile } from 'react-firebase-hooks/storage';

export const readFile = (file) => {
    return new Promise((res, rej) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => res(e.target.result);
        reader.onerror = (e) => rej(e);
    });
};

export const useUploadPhoto = (file) => {
    useUploadFile(file);
};