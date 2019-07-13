import React from 'react';
import './Blog.css';

function Blog() {
  const imgs = ['/img/blog1.jpg', '/img/blog2.jpg', '/img/blog3.jpg'];
  const renderCard = () => {
    return imgs.map((img, i) => {
      return (
        <div className="ui card" key={i}>
          <div className="image">
            <img src={img} alt="blog1" />
          </div>
          <div className="content">
            <div className="description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Praesentium, hic quas optio dicta aliquam vel nisi accusantium,
              quae possimus vitae expedita, esse repellendus dolores rerum
              aperiam aut provident unde minima!
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <section className="blog">
      <div className="ui container">
        <h3 className="ui top attached header" style={{ marginTop: '10px' }}>
          #Blog
        </h3>
        <div className="blog-item">{renderCard()}</div>
      </div>
    </section>
  );
}

export default Blog;
