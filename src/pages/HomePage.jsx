import { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { useCart } from '../context/CartContext';
import { sampleProducts, categories } from '../data/sampleProducts';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const { products } = useAdmin();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Use sample products if no products in admin context
  const displayProducts = products.length > 0 ? products : sampleProducts;
  // const displayProducts = products;

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(displayProducts);
    } else {
      setFilteredProducts(
        displayProducts.filter(product => product.category === selectedCategory)
      );
    }
  }, [selectedCategory, displayProducts]);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to handmade Art Gallery</h1>
        <p>Discover unique handcrafted paintings, bottle art, sketches, and portraits that will transform your living space into a masterpiece.</p>
      </section>

      {/* Category Filter */}
      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ₹{selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default HomePage; 