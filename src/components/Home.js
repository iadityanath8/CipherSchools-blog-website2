import React, { useState, useEffect } from 'react';
import api from '../axiosapu/api.js'
import { Link } from 'react-router-dom';
import '.com.css'; 

const Homepage = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);

  useEffect(() => {
    api.get('/Blogs')
      .then(response => {
        setFeaturedPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching featured posts:', error);
      });
  }, []); 

  return (
    <div className="homepage">
      <section className="hero">
        <h1>Welcome to Our Blog</h1>
        <p>Discover inspiration, knowledge, and insights</p>
        <Link to="/about" className="btn">
          Learn More
        </Link>
      </section>

      <section className="featured-posts">
        <h2>Featured Posts</h2>
        <div className="post-list">
          {featuredPosts.map(post => (
            <Link to={`/blog/${post._id}`} key={post._id} className="post-card">
              <img src={post.image} alt={post.title} />
              <h3>{post.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="newsletter">
        <h2>Subscribe to Our Newsletter</h2>
        <form>
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </form>// Import the CSS file for styling
      </section>
    </div>
  );
};

export default Homepage;
