// Initialize Firebase if not already initialized
if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyCJmgsAtnZe74k6rNFn_jr2GLPMA3WCNdk",
        authDomain: "quickie-1dddc.firebaseapp.com",
        projectId: "quickie-1dddc",
        storageBucket: "quickie-1dddc.appspot.com",
        messagingSenderId: "607731414177",
        appId: "1:607731414177:web:d43b1d2194c349b4aface0"
    });
}

// Get a reference to the Firebase database
const database = firebase.database();

// Initialize userId and username as null initially
let userId = null;
let username = null;

// Function to log user interactions
function logUserInteraction(username, action) {
    // Get the current timestamp
    const timestamp = new Date().toISOString();

    // Push the user interaction data to the database
    database.ref('userInteractions/' + username).push({
        timestamp: timestamp,
        action: action
    });
}

// Function to retrieve user's dark mode preference from Firebase
// Function to retrieve user's dark mode preference from Firebase

// Mobile menu function
function mobileMenu() {
    const underSectionL = document.getElementById('underSectionL');
    const footer = document.querySelector('.footer');
    if (underSectionL.style.display === 'block') {
        footer.style.display = 'none';
        logUserInteraction(username, 'User opened mobile Menu');
        underSectionL.style.display = 'none';
    } else {
        footer.style.display = 'block';
        underSectionL.style.display = 'block';
        logUserInteraction(username, 'User opened mobile menu');
    }
}

//pc menu function//



// Night mode function
function checkAndApplyUserDarkModePreference() {
    // Retrieve dark mode preference from local storage
    const localDarkMode = JSON.parse(localStorage.getItem('darkMode'));

    if (localDarkMode !== null && localDarkMode !== undefined) {
        // Use dark mode preference from local storage
        nightMode(localDarkMode);
    } else {
        // Retrieve dark mode preference from Firebase
        retrieveUserDarkModePreference(userId);
    }

    // Retrieve user's username from the database
    database.ref('users/' + userId + '/username').once('value').then((snapshot) => {
        username = snapshot.val();
        if (username) {
            // Log the user's dark mode preference
            logUserInteraction(username, 'User logged in');
        }
    }).catch((error) => {
        console.error('Error retrieving username:', error);
    });
}

// Call the function to check and apply user's dark mode preference when the page loads
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        userId = user.uid;
     const localDarkMode = JSON.parse(localStorage.getItem('darkMode'));
     nightMode(localDarkMode);
     checkAndApplyUserDarkModePreference();
    } else {
        // No user is signed in.
        userId = null;
        // Apply default dark mode setting when user is logged out
        nightMode(false);
    }
});

// Function to retrieve user's dark mode preference from Firebase
function retrieveUserDarkModePreference(userId) {
    if (userId) {
        // Retrieve user's dark mode preference from the database
        database.ref('users/' + userId + '/darkMode').once('value').then((snapshot) => {
            const isDarkMode = snapshot.val();
            if (isDarkMode !== null && isDarkMode !== undefined) {
                darkModeLocalStorage = true;
                // Update the isDarkMode variable based on the retrieved preference
                nightMode(isDarkMode);
            } else {
                // If dark mode preference is not set, default to false
                darkModeLocalStorage = false;
                nightMode(false);
            }
        }).catch((error) => {
            console.error('Error retrieving dark mode preference:', error);
        });
    } else {
        console.error('User ID is null.');
    }
}
// Initialize a variable to keep track of the current mode
let isDarkMode = false;
let darkModeLocalStorage = JSON.parse(localStorage.getItem('darkMode')) || false; // Initialize with local storage value

function nightMode() {
    const DATAVALUEBLACK = document.querySelectorAll('[data-value="black"]');
    const DATAVALUEWHITE = document.querySelectorAll('[data-value="white"]');
    const DATAVALUEMID = document.querySelectorAll('[data-value="mid"]');
    const button = document.getElementById('nightMode');
    let buttonText;
    let userAction;

    if (isDarkMode) {
        buttonText = ' Dark Mode';
        button.innerHTML = `<i class='bx bx-moon'></i>${buttonText}`;
        userAction = 'Switched to dark mode';
        DATAVALUEBLACK.forEach(elements => {
            elements.style.backgroundColor = '';
        });

        DATAVALUEMID.forEach(elements => {
            elements.style.backgroundColor = '';
        });

        DATAVALUEWHITE.forEach(elements => {
            elements.style.color = '';
        });

        // Update darkModeLocalStorage
        darkModeLocalStorage = false;
       
        localStorage.removeItem('darkMode');
    } else {
        buttonText = ' Bright Mode';
        button.innerHTML = `<i class='bx bx-sun'></i>${buttonText}`;
        userAction = 'Switched to bright mode';
        DATAVALUEBLACK.forEach(elements => {
            elements.style.backgroundColor = 'rgb(21, 20, 20)';
        });

        DATAVALUEWHITE.forEach(elements => {
            elements.style.color = 'white';
        });

        DATAVALUEMID.forEach(elements => {
            elements.style.backgroundColor = 'rgb(35, 35, 35)';
        });

        // Update darkModeLocalStorage
        darkModeLocalStorage = true;

    }

    // Toggle the mode
    isDarkMode = !isDarkMode;

    // Save the updated darkModeLocalStorage to local storage
    localStorage.setItem('darkMode', JSON.stringify(darkModeLocalStorage));
    console.log('saved in localStorage!', darkModeLocalStorage);

    logUserInteraction(username, userAction);
}



// Function to update user's dark mode preference in Firebase
function updateUserDarkModePreference(isDarkMode) {
    if (userId && isDarkMode !== undefined) {
        // Update the user's dark mode preference in the database
        database.ref('users/' + userId).update({
            darkMode: isDarkMode
        }).then(() => {
            console.log("Dark mode preference updated successfully.");
        }).catch((error) => {
            console.error("Error updating dark mode preference:", error);
        });
    } else {
        console.error("User ID is null or dark mode preference is undefined.");
    }
}

// Profile menu function
function profileFunction() {
    const profileMenu = document.getElementById('profileMenu');

    if (profileMenu.style.display === 'block'){
        profileMenu.style.display = 'none';
    } else {
        profileMenu.style.display = 'block';
        logUserInteraction(username, 'User opened profile menu (pc--)');
    }
}

// Mobile menu profile function
function MobileprofileMenu() {
    const profileMenu = document.getElementById('profileMenu');
    const mobileProfileMenu = document.getElementById('mobileProfileMenu');
    const compute = window.getComputedStyle(profileMenu);
    const isProfileDisplayed = compute.display !== 'none';

    if (profileMenu && mobileProfileMenu) {
        if (isProfileDisplayed) {
            logUserInteraction(username, 'User closed mobile profile menu');
            profileMenu.style.display = 'none';
            mobileProfileMenu.innerHTML = `<i class="bx bx-user-circle"></i>`;
        } else {
            profileMenu.style.display = 'block';
            mobileProfileMenu.innerHTML = `<i class="bx bxs-user-circle"></i>`;
            logUserInteraction(username, 'User opened mobile profile menu');
        }
    } else {
        console.error("Profile menu element or mobile profile menu element not found.");
    }
}

// Function to apply dark mode styles
