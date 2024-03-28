document.addEventListener('DOMContentLoaded', function(){
    // Reference to the Firebase database
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
    const database = firebase.database();

    function fetchPosts() {
        const postsRef = database.ref('posts');
       

        postsRef.once('value').then((snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((postSnapshot) => {
                    const post = postSnapshot.val();

                    // Create HTML elements for the post with userId only
                   const pub = document.getElementById('pubic');

                   const li = document.createElement('li');
                   const id = document.createElement('h5');
                   const title = document.createElement('h3');
                   const text = document.createElement('h4');
                   const date = document.createElement('h5');
                   const img = document.createElement('img');

                   pub.appendChild(li);

                   id.innerText = `${post.userId}`;
                   li.appendChild(id);
                   title.innerText = `${post.title}`;
                   li.appendChild(title);
                   text.innerText = `${post.content}`;
                   li.appendChild(text);
                   date.innerText = `${new Date(post.timestamp).toLocaleString()}`;
                   li.appendChild(date);

                   const storage = firebase.storage();
                   const storageRef = storage.ref();
                   const imageRef = storageRef.child(`images/${post.userId}.jpg`);
                   imageRef.getDownloadUrl().then((url) =>{
                    img.src = url;
                    li.appendChild(img);
                   })
                   
                });
            } else {
                console.log('No posts found.');
            }
        }).catch((error) => {
            console.error('Error fetching posts:', error);
        });
    }

    // Call fetchPosts function when the page loads
    window.addEventListener('load', fetchPosts);
});