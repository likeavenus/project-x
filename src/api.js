import { initializeApp } from "firebase/app";
import "regenerator-runtime/runtime.js";

const firebaseConfig = {
  apiKey: "AIzaSyCIJOZkYffBbgDsHOTZb04RYzIj4G_HOIs",
  authDomain: "tasks-e8be8.firebaseapp.com",
  projectId: "tasks-e8be8",
  storageBucket: "tasks-e8be8.appspot.com",
  messagingSenderId: "197449182616",
  appId: "1:197449182616:web:09cc5ddb2f5f5b453e0fed"
};

const app = initializeApp(firebaseConfig);

export default {
  app,
}