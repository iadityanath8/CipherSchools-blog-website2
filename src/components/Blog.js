import React, { useState, useEffect } from 'react';
import BlogCard from './BlogCard';
import Navbar from './NavBar';

function BlogsPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch blog data from API or other source
    // Example:
    // fetch('https://api.example.com/blogs')
    //   .then(response => response.json())
    //   .then(data => setBlogs(data))
    //   .catch(error => console.error('Error fetching blogs:', error));

    // For demonstration purposes, using dummy data
    const dummyData = [
      { id: 1, title: 'Blog 1', image:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.f39jvygchyqBhPiAM1LDIwHaE7%26pid%3DApi&f=1&ipt=bc0bf072d110d272c153409ddb09057266e6784767817ad293ae10b83c6623b7&ipo=images",content: 'Content of blog 1', author: 'Author 1' },
      { id: 2, title: 'Blog 2', image:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.f39jvygchyqBhPiAM1LDIwHaE7%26pid%3DApi&f=1&ipt=bc0bf072d110d272c153409ddb09057266e6784767817ad293ae10b83c6623b7&ipo=images",content: 'Content of blog 2', author: 'Author 2' },
      { id: 3, title: 'Blog 3', image:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.f39jvygchyqBhPiAM1LDIwHaE7%26pid%3DApi&f=1&ipt=bc0bf072d110d272c153409ddb09057266e6784767817ad293ae10b83c6623b7&ipo=images",content: 'Content of blog 3', author: 'Author 3' }
    ];

    setBlogs(dummyData);
  }, []);

  return (
    <>
    <Navbar/>
    
    <div className="blogs-page">
      <h2>Blogs</h2>

      <div className="blog-cards">
        {blogs.map(blog => (
          <BlogCard
            key={blog.id}
            title={blog.title}
            content={blog.content}
            image = {blog.image}
            author={blog.author}
          />
        ))}
      </div>

    </div>
    </>
  );
}

export default BlogsPage;
