// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

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
const auth = getAuth();

// Function to handle form submission

// Function to handle form submission
document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form submission

    // Retrieve form field values
    const email = document.getElementById('Email-signup').value;
    const username = document.getElementById('User-signup').value;
    const password = document.getElementById('Userpass-signup').value;
    const birthDate = document.getElementById('Userdate-signup').value;
    const UserFirstName = document.getElementById('UserFirstName').value;
    const UserMiddleInitial = document.getElementById('UserMiddleInitial').value;
    const UserLastName = document.getElementById('UserLastName').value;
    const UserAbbreviation = document.getElementById('UserAbbreviation').value;
    const UserOCCUPATION = document.getElementById('UserOccupation').value;
    const UserPIN = document.querySelector('[data-value="User18PIN"]').value;
    const SELECT = document.getElementById('Select').value;
    const UserPHONE = document.getElementById('PhoneNumber').value;
    


    if (email.trim() === '' || username.trim() === '' || password.trim() === '' || birthDate.trim() === '' || UserFirstName.trim() === '' || UserPIN.trim() === '' || UserAbbreviation.trim() === '' || UserLastName === '' || UserMiddleInitial.trim() === '' || UserOCCUPATION.trim() === '') {
        const ALLERRORS = document.querySelectorAll('[data-ALL="inps"]');
        ALLERRORS.forEach(inps => {
            inps.style.border = '1px solid red';
        });
        return;
    } else {
        const ALLERRORS = document.querySelectorAll('[data-ALL="inps"]');
        ALLERRORS.forEach(inps => {
            inps.style.border = '1px solid rgba(0, 0, 0, 0.113)';
        });
    }

    // Check if UserPIN has 18 characters and contains only numbers
    if (UserPIN.length !== 18 || !/^\d+$/.test(UserPIN)) {
      const error1 = document.getElementById('error1');
      error1.style.display = 'block';
        return;
    } else {
        error1.style.display = 'none';
    }

    if (password.length < 6){
     const error1 = document.getElementById('error2');
     error1.style.display = 'block';

     
        return;
    } else{
        error1.style.display = 'none';
    }


    try {
        // Proceed with user registration
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userId = userCredential.user.uid;

        // Store user data in the database
        await set(ref(db, 'users/' + username), {
            UserFirstName: UserFirstName,
            UserMiddleInitial: UserMiddleInitial,
            UserLastName: UserLastName,
            UserAbbreviation: UserAbbreviation,
            Gender: SELECT,
            UserOCCUPATION: UserOCCUPATION,
            email: email,
            PHONE: UserPHONE,
            birthDate: birthDate,
            username: username,
            password: password,
            UserPIN: UserPIN,
            UserId: userId
        });

        // Redirect to login page after successful registration
        window.location.href = 'login.html';
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            // Handle case where email is already in use
            const error7 = document.getElementById('error7');
            error7.style.display = 'block';
        } else {
            // Handle other errors
            console.error("Error creating user:", error);
            alert('An error occurred during user registration. Please try again later.');
        }
    }
});

