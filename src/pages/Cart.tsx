
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, CreditCard, ArrowRight } from 'lucide-react';

// Sample cart data
const initialCartItems = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    price: 5.99,
    image: "https://placehold.co/200?text=Medicine1",
    quantity: 2,
    prescription_required: false,
  },
  {
    id: 3,
    name: "Vitamin C 1000mg",
    price: 8.50,
    image: "https://placehold.co/200?text=Medicine3",
    quantity: 1,
    prescription_required: false,
  },
  {
    id: 4,
    name: "Aspirin 100mg",
    price: 6.75,
    image: "https://placehold.co/200?text=Medicine4",
    quantity: 3,
    prescription_required: false,
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyCoupon = () => {
    // Simple coupon logic for demo
    if (couponCode.toLowerCase() === 'save10') {
      setCouponApplied(true);
      setCouponDiscount(10);
    } else {
      alert('Invalid coupon code');
    }
  };

  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryFee = 4.99;
  const discount = couponApplied ? (subtotal * couponDiscount / 100) : 0;
  const total = subtotal + deliveryFee - discount;

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="app-container">
        <h1 className="text-3xl font-bold text-pharmacy-800 mb-2">Your Cart</h1>
        <p className="text-gray-600 mb-8">
          Review your items and proceed to checkout
        </p>

        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b">
                  <h2 className="text-xl font-semibold text-pharmacy-800">
                    Cart Items ({cartItems.length})
                  </h2>
                </div>
                <div className="divide-y">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-4 flex items-center">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 object-cover rounded-lg mr-4"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-pharmacy-800">{item.name}</h3>
                        <div className="flex flex-wrap justify-between items-center mt-2">
                          <span className="font-bold text-pharmacy-700">${item.price.toFixed(2)}</span>
                          <div className="flex items-center">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="text-gray-500 hover:text-pharmacy-600 bg-gray-100 hover:bg-gray-200 rounded-full p-1"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="mx-3 w-8 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="text-gray-500 hover:text-pharmacy-600 bg-gray-100 hover:bg-gray-200 rounded-full p-1"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <span className="font-bold text-pharmacy-700 ml-4">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 ml-4"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-gray-50 flex justify-between items-center">
                  <Link 
                    to="/medicines" 
                    className="text-pharmacy-600 hover:text-pharmacy-800 font-medium flex items-center"
                  >
                    <ShoppingBag size={18} className="mr-2" />
                    Continue Shopping
                  </Link>
                  <button 
                    onClick={() => setCartItems([])}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b">
                  <h2 className="text-xl font-semibold text-pharmacy-800">
                    Order Summary
                  </h2>
                </div>
                <div className="p-4">
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                    </div>
                    {couponApplied && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount ({couponDiscount}%)</span>
                        <span className="font-medium">-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t pt-3 flex justify-between">
                      <span className="text-gray-800 font-semibold">Total</span>
                      <span className="font-bold text-pharmacy-800">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Coupon */}
                  {!couponApplied ? (
                    <div className="mb-6">
                      <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-1">
                        Apply Coupon
                      </label>
                      <div className="flex">
                        <input
                          type="text"
                          id="coupon"
                          placeholder="Enter coupon code"
                          className="flex-1 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-l-lg focus:ring-pharmacy-500 focus:border-pharmacy-500"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <button 
                          onClick={applyCoupon}
                          className="bg-pharmacy-600 text-white px-4 py-2.5 rounded-r-lg hover:bg-pharmacy-700 transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Try "SAVE10" for a 10% discount</p>
                    </div>
                  ) : (
                    <div className="mb-6 bg-green-50 p-3 rounded-lg flex justify-between items-center">
                      <div>
                        <span className="text-green-600 font-medium">Coupon Applied: </span>
                        <span className="text-gray-700">{couponCode.toUpperCase()}</span>
                      </div>
                      <button 
                        onClick={() => {
                          setCouponApplied(false);
                          setCouponCode('');
                          setCouponDiscount(0);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}

                  {/* Checkout Button */}
                  <Link 
                    to="/checkout" 
                    className="w-full bg-pharmacy-600 hover:bg-pharmacy-700 text-white font-medium py-3 px-5 rounded-lg transition-colors duration-300 flex items-center justify-center"
                  >
                    <CreditCard size={18} className="mr-2" />
                    <span>Proceed to Checkout</span>
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gray-100 p-6 rounded-full">
                <ShoppingBag size={48} className="text-gray-400" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any medicines to your cart yet.
            </p>
            <Link to="/medicines" className="btn-pharmacy inline-block">
              Browse Medicines
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
