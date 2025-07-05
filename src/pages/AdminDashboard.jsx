import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { Trash2, Edit } from 'lucide-react';

const AdminDashboard = () => {
  const { isAuthenticated, logout, products, addProduct, updateProduct, deleteProduct } = useAdmin();
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: '',
    dimensions: '',
    material: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      inStock: true
    };

    if (editingProduct) {
      updateProduct({ ...productData, id: editingProduct.id });
      setEditingProduct(null);
    } else {
      addProduct(productData);
    }

    setFormData({
      title: '',
      description: '',
      price: '',
      category: '',
      image: '',
      dimensions: '',
      material: ''
    });
    setShowAddForm(false);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      image: product.image,
      dimensions: product.dimensions || '',
      material: product.material || ''
    });
    setShowAddForm(true);
  };

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="add-product-form">
        <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
        
        {!showAddForm && !editingProduct && (
          <button 
            className="add-product-btn"
            onClick={() => setShowAddForm(true)}
          >
            Add New Product
          </button>
        )}

        {(showAddForm || editingProduct) && (
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title">Product Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price *</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '2px solid #ecf0f1',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                >
                  <option value="">Select Category</option>
                  <option value="Bottle Painting">Bottle Painting</option>
                  <option value="Portrait">Portrait</option>
                  <option value="Canvas Painting">Canvas Painting</option>
                  <option value="Sketch">Sketch</option>
                  <option value="Ceramic">Ceramic</option>
                  <option value="Watercolor">Watercolor</option>
                  <option value="Oil Painting">Oil Painting</option>
                  <option value="Acrylic Painting">Acrylic Painting</option>
                  <option value="Digital Art">Digital Art</option>
                  <option value="Mixed Media">Mixed Media</option>
                  <option value="Sculpture">Sculpture</option>
                  <option value="Jewelry">Jewelry</option>
                  <option value="Home Decor">Home Decor</option>
                  <option value="Cup Painting">Cup Painting</option>
                  <option value="T-Shirt Painting">T-Shirt Painting</option>
                  <option value="Custom Orders">Custom Orders</option>
                  
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="image">Image URL *</label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="dimensions">Dimensions</label>
                <input
                  type="text"
                  id="dimensions"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleInputChange}
                  placeholder="e.g., 16 x 20"
                />
              </div>
              <div className="form-group">
                <label htmlFor="material">Material</label>
                <input
                  type="text"
                  id="material"
                  name="material"
                  value={formData.material}
                  onChange={handleInputChange}
                  placeholder="e.g., Acrylic on Canvas"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                required
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '2px solid #ecf0f1',
                  borderRadius: '8px',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className="add-product-btn">
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
              <button 
                type="button"
                className="add-product-btn"
                style={{ backgroundColor: '#7f8c8d' }}
                onClick={() => {
                  setShowAddForm(false);
                  setEditingProduct(null);
                  setFormData({
                    title: '',
                    description: '',
                    price: '',
                    category: '',
                    image: '',
                    dimensions: '',
                    material: ''
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      <div>
        <h3>Current Products ({products.length})</h3>
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <img 
                src={product.image} 
                alt={product.title} 
                className="product-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x250?text=Art+Work';
                }}
              />
              <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <div className="product-price">₹{product.price.toFixed(2)}</div>
                <p className="product-description">
                  {product.description.length > 100 
                    ? `${product.description.substring(0, 100)}...` 
                    : product.description
                  }
                </p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    className="quantity-btn"
                    onClick={() => handleEdit(product)}
                    style={{ backgroundColor: '#3498db', color: 'white', border: 'none' }}
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    className="quantity-btn"
                    onClick={() => handleDelete(product.id)}
                    style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <p style={{ textAlign: 'center', padding: '2rem', color: '#7f8c8d' }}>
            No products added yet. Add your first product above!
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 