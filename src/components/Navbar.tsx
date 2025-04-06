
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Search } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="app-container">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-pharmacy-600 font-bold text-2xl">CureFlow</span>
            <span className="text-pharmacy-500 text-sm font-medium">Pharmacy</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-pharmacy-600 font-medium">Home</Link>
            <Link to="/medicines" className="text-gray-700 hover:text-pharmacy-600 font-medium">Medicines</Link>
            <Link to="/upload-prescription" className="text-gray-700 hover:text-pharmacy-600 font-medium">Upload Prescription</Link>
            <Link to="/find-store" className="text-gray-700 hover:text-pharmacy-600 font-medium">Find Store</Link>
            <Link to="/orders" className="text-gray-700 hover:text-pharmacy-600 font-medium">My Orders</Link>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-pharmacy-600">
              <Search size={20} />
            </button>
            <Link to="/cart" className="text-gray-700 hover:text-pharmacy-600 relative">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pharmacy-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/account" className="text-gray-700 hover:text-pharmacy-600">
              <User size={20} />
            </Link>
            <Link to="/login" className="btn-pharmacy">
              Login / Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <nav className="flex flex-col space-y-4 py-2">
              <Link to="/" className="text-gray-700 hover:text-pharmacy-600 font-medium">Home</Link>
              <Link to="/medicines" className="text-gray-700 hover:text-pharmacy-600 font-medium">Medicines</Link>
              <Link to="/upload-prescription" className="text-gray-700 hover:text-pharmacy-600 font-medium">Upload Prescription</Link>
              <Link to="/find-store" className="text-gray-700 hover:text-pharmacy-600 font-medium">Find Store</Link>
              <Link to="/orders" className="text-gray-700 hover:text-pharmacy-600 font-medium">My Orders</Link>
            </nav>
            <div className="flex items-center space-x-4 mt-4 pt-4 border-t">
              <Link to="/cart" className="text-gray-700 hover:text-pharmacy-600 relative">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pharmacy-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link to="/account" className="text-gray-700 hover:text-pharmacy-600">
                <User size={20} />
              </Link>
              <Link to="/login" className="btn-pharmacy flex-1 text-center">
                Login / Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
