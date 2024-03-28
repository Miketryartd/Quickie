import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";


// Check if Firebase app has already been initialized


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCJmgsAtnZe74k6rNFn_jr2GLPMA3WCNdk",
          authDomain: "quickie-1dddc.firebaseapp.com",
          projectId: "quickie-1dddc",
          storageBucket: "quickie-1dddc.appspot.com",
          messagingSenderId: "607731414177",
          appId: "1:607731414177:web:d43b1d2194c349b4aface0"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Firebase database service
const db = getDatabase();

// Function to handle form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Retrieve form field values
    const username = document.getElementById('User-login').value;
    const password = document.getElementById('Userpass-login').value;
    const email = document.getElementById('Email-login').value;
    const UserPIN = document.querySelector(' [data-value="User18PIN" ] ').value;
    const UserPHONE = document.getElementById('PhoneNumber').value;
    const ALL = {username, password, email, UserPHONE, UserPIN};
 

    // Check if any field is empty
    if (username.trim() === '' || password.trim() === '' ||  UserPIN.trim() === '' || email.trim() === '') {
        const ALLERRORS = document.querySelectorAll('[data-ALL="inps"]');
        ALLERRORS.forEach(inps => {
              inps.style.border = '1px solid red';
        })
        return;
    } else {
        const ALLERRORS = document.querySelectorAll('[data-ALL="inps"]');
        ALLERRORS.forEach(inps => {
            inps.style.border = '1px solid rgba(0, 0, 0, 0.113)';
        })
    }


    if (UserPIN.length !== 18 || !/^\d+$/.test(UserPIN)) {
        const error4 = document.getElementById('error4');
        error4.style.display = 'block';
          return;
      } else {
          error4.style.display = 'none';
      }
  
      if (password.length < 6){
       const error3 = document.getElementById('error3');
       error3.style.display = 'block';
  
       
          return;
      } else{
          error3.style.display = 'none';
      }
    // Check if username exists in the database
    const userRef = ref(db, 'users/' + username);
get(userRef).then((snapshot) => {
    if (snapshot.exists()) {
        const userData = snapshot.val();
        if (userData.password === password && userData.UserPIN === UserPIN) {
            // Password matches, login successful
            const error6 = document.getElementById('error6');
            const error5 = document.getElementById('error5');
            error5.style.display = 'none';
            error6.style.display = 'none';
            window.location.href = '/public/home/home.html';
            checkAndApplyUserPreferences();
            retrieveUserDarkModePreference(userId);
        } else {
            // Password or PIN does not match
            const error6 = document.getElementById('error6');
            error6.style.display = 'block';
            const error5 = document.getElementById('error5');
            error5.style.display = 'none';
        }
    } else {
        // User does not exist
        const error5 = document.getElementById('error5');
        error5.style.display = 'block';
        const error6 = document.getElementById('error6');
        error6.style.display = 'none';
    }
}).catch((error) => {
    console.error('Error checking user existence:', error);
    // Handle error
});

  
});
