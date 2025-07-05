import { useParams, useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

function convertGoogleDriveLink(url) {
  if (!url) return '';
  if (url.includes('drive.google.com/uc?export=view&id=')) return url;
  const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
  const fileId = fileIdMatch ? fileIdMatch[1] : null;
  if (fileId) {
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }
  return url;
}

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useAdmin();
  const navigate = useNavigate();

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  return (
    <div className="product-details-container">
      <img
        src={convertGoogleDriveLink(product.image)}
        alt={product.title}
        className="product-details-image"
        style={{ maxWidth: 400, width: '100%', borderRadius: 12 }}
      />
      <h2>{product.title}</h2>
      <h3 style={{ color: '#e74c3c' }}>₹{product.price.toFixed(2)}</h3>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Dimensions:</strong> {product.dimensions}</p>
      <p><strong>Material:</strong> {product.material}</p>
      <p style={{ marginTop: 16 }}>{product.description}</p>
      <button className="add-to-cart-btn" onClick={() => navigate('/cart')}>Go to Cart</button>
    </div>
  );
};

export default ProductDetails; 