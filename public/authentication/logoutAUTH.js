// Function to handle logout
// Check if Firebase app has already been initialized


function logout() {
   
    // Initialize Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyCJmgsAtnZe74k6rNFn_jr2GLPMA3WCNdk",
          authDomain: "quickie-1dddc.firebaseapp.com",
          projectId: "quickie-1dddc",
          storageBucket: "quickie-1dddc.appspot.com",
          messagingSenderId: "607731414177",
          appId: "1:607731414177:web:d43b1d2194c349b4aface0"
    };
    
    if (!firebase.apps.length) {
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    }
    
  

    // Get a reference to the Firebase authentication service
    const auth = firebase.auth();

    // Sign out the user
    auth.signOut().then(() => {
        // Sign-out successful.
        console.log('User signed out');
        // Redirect to login page or any other page after logout
        window.location.href = '/public/login.html';
        retrieveUserDarkModePreference(userId);
    }).catch((error) => {
        // An error happened.
        console.error('Sign out error:', error);
        alert('An error occurred during sign out. Please try again later.');
    });
}

// Attach event listener to logout button
