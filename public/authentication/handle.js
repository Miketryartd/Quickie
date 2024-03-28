// Initialize Firebase
if (!firebase.apps.length){
    firebase.initializeApp({
        apiKey: "AIzaSyCJmgsAtnZe74k6rNFn_jr2GLPMA3WCNdk",
              authDomain: "quickie-1dddc.firebaseapp.com",
              projectId: "quickie-1dddc",
              storageBucket: "quickie-1dddc.appspot.com",
              messagingSenderId: "607731414177",
              appId: "1:607731414177:web:d43b1d2194c349b4aface0"
    });
    
}
// Function to handle login
function handleLogin() {
    // Your login logic here
    // After successful login, retrieve the userId
    const userId = firebase.auth().currentUser.uid;
    // Call functions to apply user preferences, such as dark mode
    checkAndApplyUserPreferences(userId);
}

// Function to check and apply user preferences
function checkAndApplyUserPreferences(userId) {
    // Check if user is logged in and retrieve their preferences
    if (userId) {
        retrieveUserDarkModePreference(userId);
        // You can call other functions to retrieve and apply other preferences as well
    }
}

// Function to retrieve user's dark mode preference from Firebase
function retrieveUserDarkModePreference(userId) {
    const database = firebase.database();
    database.ref('users/' + userId + '/darkMode').once('value').then((snapshot) => {
        const isDarkMode = snapshot.val();
        if (isDarkMode) {
            // Apply dark mode styles
            applyDarkMode(true);
        }
    }).catch((error) => {
        console.error('Error retrieving dark mode preference:', error);
    });
}

// Call the function to check and apply user preferences when the page loads
window.addEventListener('load', () => {
    // Check if the user is already logged in
    const user = firebase.auth().currentUser;
    if (user) {
        const userId = user.uid;
        checkAndApplyUserPreferences(userId);
    }
});
