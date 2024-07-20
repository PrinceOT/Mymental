// PostFeed.js (Post Feed Component)
import React, { useState } from 'react';
import Post from './Post';
import './style.css';

const PostFeed = () => {
  const [posts, setPosts] = useState([
    { id: 1, username: 'user1', content: 'This is the first post.' },
    { id: 2, username: 'user2', content: 'Another post here!' },
    { id: 2, username: 'user2', content: 'Another post here!' },
    { id: 2, username: 'user2', content: 'Another post here!' },
    { id: 2, username: 'user2', content: 'Another post here!' },
    { id: 2, username: 'user2', content: 'Another post here!' },
    { id: 2, username: 'user2', content: 'Another post here!' },
    
    // Add more posts as needed
  ]);

  return (
    <div className="post-feed">
      <h2>Post Feed</h2>
      {posts.map(post => (
        <Post key={post.id} username={post.username} content={post.content} />
      ))}
    </div>
  );
};

export default PostFeed;
