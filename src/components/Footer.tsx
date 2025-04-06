
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-12 pb-8 border-t">
      <div className="app-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold text-pharmacy-800 mb-4">CureFlow Pharmacy</h3>
            <p className="text-gray-600 mb-4">Your trusted partner for all healthcare needs. Get medicines delivered to your doorstep.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-pharmacy-600 hover:text-pharmacy-800">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-pharmacy-600 hover:text-pharmacy-800">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-pharmacy-600 hover:text-pharmacy-800">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-pharmacy-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-pharmacy-600">About Us</Link>
              </li>
              <li>
                <Link to="/medicines" className="text-gray-600 hover:text-pharmacy-600">Medicines</Link>
              </li>
              <li>
                <Link to="/upload-prescription" className="text-gray-600 hover:text-pharmacy-600">Upload Prescription</Link>
              </li>
              <li>
                <Link to="/find-store" className="text-gray-600 hover:text-pharmacy-600">Find Nearby Store</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-pharmacy-600">Health Blog</Link>
              </li>
            </ul>
          </div>

          {/* Policy */}
          <div>
            <h3 className="text-lg font-bold text-pharmacy-800 mb-4">Policies</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-gray-600 hover:text-pharmacy-600">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-pharmacy-600">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="text-gray-600 hover:text-pharmacy-600">Shipping Policy</Link>
              </li>
              <li>
                <Link to="/return-policy" className="text-gray-600 hover:text-pharmacy-600">Return Policy</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-pharmacy-600">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-pharmacy-800 mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="text-pharmacy-600 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-600">123 Health Street, Medical District, City - 12345</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-pharmacy-600 mr-2 flex-shrink-0" />
                <a href="tel:+1234567890" className="text-gray-600 hover:text-pharmacy-600">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-pharmacy-600 mr-2 flex-shrink-0" />
                <a href="mailto:support@cureflow.com" className="text-gray-600 hover:text-pharmacy-600">support@cureflow.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">© 2025 CureFlow Pharmacy. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <img src="https://placehold.co/200x30?text=Payment+Partners" alt="Payment Partners" className="h-8" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
