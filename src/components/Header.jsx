import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { getTotalItems } = useCart();

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
        Handmade Art Gallery
        </Link>
        
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/cart" className="cart-icon">
            <ShoppingCart size={24} />
            {getTotalItems() > 0 && (
              <span className="cart-badge">{getTotalItems()}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header; 