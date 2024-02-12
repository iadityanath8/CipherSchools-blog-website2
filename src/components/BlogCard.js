import React from 'react';
import './com.css'
import Navbar from './NavBar';

function BlogCard({ title, content, author, image }) {
  return (
    <div className="blog-card">

      <img src = {image} className="blog-image"/>
      <div className="blog-content">
        <h3>{title}</h3>
        <p>{content}</p>
        <p><strong>Author:</strong> {author}</p>
      </div>
    
    </div>
  );
}

export default BlogCard;
