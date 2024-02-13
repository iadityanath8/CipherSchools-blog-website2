import React, { useState, useEffect } from 'react';
import BlogCard from './BlogCard';
import Navbar from './NavBar';
import axios from 'axios';

function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const access_token = localStorage.getItem('token')

  useEffect(() => {
      axios.get('http://localhost:3001/api/blogs', {
          headers: {
              'Authorization': `Bearer ${access_token}`,
              'Content-Type': 'application/json'
          }
      })
      .then(response => {
          setBlogs(response.data);
      })
      .catch(error => {
          console.error('Error fetching blogs:', error);
      });
  }, []);
  
  return (
    <>
    <Navbar/>
    
    <div className="blogs-page">
      <h2>Blogs</h2>

      <div className="blog-cards">
      {blogs.map((e,index) => (
        <BlogCard key={index} id={e._id} title={e.title} content={e.content} image={e.image} author={e.author}/>
      ))}
      </div>

    </div>
    </>
  );
}

export default BlogsPage;
