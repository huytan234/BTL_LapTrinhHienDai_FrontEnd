import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getDatabase } from "firebase/database";

const BASE_URL = 'https://huytan.pythonanywhere.com/'

const firebaseConfig = {
    apiKey: "AIzaSyDDl_73QhJ0RokMx6uPoArcYoHxLGWB934",
    authDomain: "chatapp-78174.firebaseapp.com",
    databaseURL: "https://chatapp-78174-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "chatapp-78174",
    storageBucket: "chatapp-78174.appspot.com",
    messagingSenderId: "918576463068",
    appId: "1:918576463068:web:b9e3dc87a0dd9692980819",
    measurementId: "G-ZF7RFB3XXS"
  };
  
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// function add() {
//     const db = getDatabase();
//     set(ref(db, 'users/' + userId), {tenbien: "Gia tri gui len"});
// }


export const endpoints = {
    'users': '/users/',
    'get-user':(id)=>`/users/${id}/`,
    'tudo': `/tudos/`,
    'access-card':(id) => `/users/${id}/register-access-card/`,
    'bills': '/bills/',
    'login': '/o/token/',
    'current-user': '/users/current-user/',
    'add-feedback': '/feedbacks/add-feedback/',
    'get-feedback': '/feedbacks/',
    'add-user':'/users/add-user/',
    'update-user':'/users/current-user/update-current-user/'

};
export const authAPI = (accessToken) => axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${accessToken ? accessToken : AsyncStorage.getItem("access-token")}`
    }
})


export default axios.create({
    baseURL: BASE_URL
});