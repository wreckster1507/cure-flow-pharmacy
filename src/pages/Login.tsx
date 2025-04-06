
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Lock, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Login data:', { email: formData.email, password: formData.password });
      // Implement login logic
    } else {
      console.log('Register data:', formData);
      // Implement registration logic
    }
  };

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="app-container">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-pharmacy-800">
                {isLogin ? 'Login to Your Account' : 'Create an Account'}
              </h1>
              <p className="text-gray-600 mt-2">
                {isLogin 
                  ? 'Welcome back! Please enter your details.' 
                  : 'Join CureFlow Pharmacy for faster checkout and order tracking.'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="pl-10 w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-pharmacy-500 focus:border-pharmacy-500"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-pharmacy-500 focus:border-pharmacy-500"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-pharmacy-500 focus:border-pharmacy-500"
                    placeholder="••••••••"
                    required
                  />
                </div>
                {isLogin && (
                  <div className="text-right mt-1">
                    <Link to="/forgot-password" className="text-sm text-pharmacy-600 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                )}
              </div>

              {!isLogin && (
                <>
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="pl-10 w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-pharmacy-500 focus:border-pharmacy-500"
                        placeholder="+1 (123) 456-7890"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin size={18} className="text-gray-400" />
                      </div>
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={3}
                        className="pl-10 w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-pharmacy-500 focus:border-pharmacy-500"
                        placeholder="123 Main St, City, State, Zip"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <button 
                type="submit" 
                className="w-full bg-pharmacy-600 hover:bg-pharmacy-700 text-white font-medium py-2.5 px-5 rounded-lg transition-colors duration-300 flex items-center justify-center"
              >
                <span>{isLogin ? 'Login' : 'Create Account'}</span>
                <ArrowRight size={18} className="ml-2" />
              </button>
            </form>

            {/* Toggle Form */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                  onClick={() => setIsLogin(!isLogin)} 
                  className="text-pharmacy-600 font-medium hover:underline"
                >
                  {isLogin ? 'Sign up' : 'Login'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
