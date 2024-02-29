// script.js
document.addEventListener('DOMContentLoaded', function() {
    const postForm = document.getElementById('post-form');
    const postsContainer = document.getElementById('posts');

    // Fetch posts from the server and display them
    fetchPosts();

    // Event listener for submitting new post
    postForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const author = document.getElementById('author').value;

        fetch('/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content, author })
        })
        .then(response => response.json())
        .then(post => {
            // Clear form fields
            document.getElementById('title').value = '';
            document.getElementById('content').value = '';
            document.getElementById('author').value = '';

            // Add new post to the posts container
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.content}</p>
                <p><strong>Author:</strong> ${post.author}</p>
                <p><strong>Posted At:</strong> ${new Date(post.createdAt).toLocaleString()}</p>
            `;
            postsContainer.prepend(postElement);
        })
        .catch(error => console.error('Error posting data:', error));
    });

    // Function to fetch posts from the server
    function fetchPosts() {
        fetch('/posts')
        .then(response => response.json())
        .then(posts => {
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.content}</p>
                    <p><strong>Author:</strong> ${post.author}</p>
                    <p><strong>Posted At:</strong> ${new Date(post.createdAt).toLocaleString()}</p>
                `;
                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => console.error('Error fetching posts:', error));
    }
});
