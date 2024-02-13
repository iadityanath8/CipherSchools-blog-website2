import React, { useState } from 'react';
import './com.css'
import api from '../axiosapu/api.js'

function BlogCard({ title, content, author, image, idd }) {
  
  const [likes, setLikes] = useState(0);
  const handleLikeClick = (idd) => {
    console.log(idd)
    api.post(`/${idd}/like`, {}, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      console.log(res.data);
      // Assuming the response contains the updated number of likes
      setLikes(res.data.likes);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className="blog-card">
      <div className="blog-header">
        <img src={image} alt="Blog" className="blog-image" />
        <h2 className="blog-title">{title}</h2>
      </div>
      <p className="blog-content">{content}</p>
      <p className="blog-author">By {author}</p>
      
    </div>
  );
}

export default BlogCard;
