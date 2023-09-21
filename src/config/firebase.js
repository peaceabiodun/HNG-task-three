
import  { initializeApp } from 'firebase/app';
import { getAnalytics} from 'firebase/analytics'
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCr7god4pjOnGo6xCU80HOmwfIIisfif4s",
  authDomain: "hng-task-3-1a203.firebaseapp.com",
  projectId: "hng-task-3-1a203",
  storageBucket: "hng-task-3-1a203.appspot.com",
  messagingSenderId: "210566674173",
  appId: "1:210566674173:web:fad1cb6eb72ee226faf094",
  measurementId: "G-9PRJPMTSX1"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
