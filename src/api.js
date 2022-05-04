import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore, setDoc, doc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import 'regenerator-runtime/runtime.js';

const firebaseConfig = {
  apiKey: 'AIzaSyCIJOZkYffBbgDsHOTZb04RYzIj4G_HOIs',
  authDomain: 'tasks-e8be8.firebaseapp.com',
  projectId: 'tasks-e8be8',
  storageBucket: 'tasks-e8be8.appspot.com',
  messagingSenderId: '197449182616',
  appId: '1:197449182616:web:09cc5ddb2f5f5b453e0fed'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

export const storage = getStorage(app);

export const getTasks = async () => {
  const data = [];
  const tasksArray = await getDocs(collection(db, 'tasks'));
  tasksArray.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
};

export const getMessages = async () => {
  const data = [];
  const messagesArray = await getDocs(collection(db, 'messages'));
  messagesArray.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
};

export const setMessageById = async (item) => {
  await setDoc(doc(db, 'messages', item.id), {
    ...item,
    checked: true,
  });
}

export default {
  app,
}