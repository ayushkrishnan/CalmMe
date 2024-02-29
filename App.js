// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/posts', { title, content, author })
      .then(response => {
        setPosts([...posts, response.data]);
        setTitle('');
        setContent('');
        setAuthor('');
      })
      .catch(error => {
        console.error('Error posting data:', error);
      });
  };

  return (
    <div>
      <h1>Forum</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required /><br />
        <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required /><br />
        <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required /><br />
        <button type="submit">Submit</button>
      </form>
      <div>
        {posts.map(post => (
          <div key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>By: {post.author}</p>
            <p>{new Date(post.date).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
