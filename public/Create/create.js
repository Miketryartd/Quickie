document.addEventListener('DOMContentLoaded', function() {
    const firebaseConfig = {
        apiKey: "AIzaSyCJmgsAtnZe74k6rNFn_jr2GLPMA3WCNdk",
    authDomain: "quickie-1dddc.firebaseapp.com",
    projectId: "quickie-1dddc",
    storageBucket: "quickie-1dddc.appspot.com",
    messagingSenderId: "607731414177",
    appId: "1:607731414177:web:d43b1d2194c349b4aface0"
    };

    // Initialize Firebase
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
  
    const storage = firebase.storage();

    // Reference to the Firebase database
    const database = firebase.database();

    document.getElementById('submitForm').addEventListener('submit', function(event){
        event.preventDefault();

        firebase.auth().onAuthStateChanged(function(user){
            if (user){
                const userId = user.uid;

                // Retrieve the username for the current user
                database.ref('users/' + userId).once('value').then((snapshot)=>{
                    const username = snapshot.val();

                    const title = document.getElementById('titleInput').value;
                    const content = document.getElementById('content').value;
                    const file = document.getElementById('fileInput').files[0]; // Get the first selected file

                    // Upload image to Firebase Storage
                    const storageRef = firebase.storage().ref();
                    const imageRef = storageRef.child('images/' + file.name);
                    imageRef.put(file).then((snapshot) => {
                        console.log('Image uploaded successfully');
                        // Get the image URL
                        return snapshot.ref.getDownloadURL();
                    }).then((imageUrl) => {
                        // Save post data along with image URL
                        const newPost = {
                            title: title,
                            content: content,
                            timestamp: firebase.database.ServerValue.TIMESTAMP,
                            userId: userId,
                            imageUrl: imageUrl
                        };

                        const newPostKey = database.ref('posts').push().key;
                        const updates = {};
                        updates['/posts/' + newPostKey] = newPost;
                        database.ref().update(updates).then(() =>{
                            console.log('Successfully posted');

                            document.getElementById('titleInput').value = '';
                            document.getElementById('content').value = '';

                            fetchPosts(); // Assuming fetchPosts() is defined elsewhere
                        }).catch((error) =>{
                            console.error('Error posting:', error);
                        });
                    }).catch((error) => {
                        console.error('Error uploading image:', error);
                    });
                }).catch((error) =>{
                    console.error('Error retrieving username:', error);
                });
            }
        });
    });
});
//profile function//

function profileFunction() {
    const profileMenu = document.getElementById('profileMenu');

    if (profileMenu.style.display === 'block'){
        profileMenu.style.display = 'none';
    } else {
        profileMenu.style.display = 'block';
        logUserInteraction(username, 'User opened profile menu (pc--)');
    }
}
