
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Upload, Clock, MapPin, ShoppingCart, User } from 'lucide-react';

const categoriesBanner = [
  { name: "Pain Relief", image: "https://placehold.co/100?text=Pain" },
  { name: "Cold & Fever", image: "https://placehold.co/100?text=Fever" },
  { name: "Diabetes Care", image: "https://placehold.co/100?text=Diabetes" },
  { name: "Cardiac Care", image: "https://placehold.co/100?text=Cardiac" },
  { name: "Vitamins", image: "https://placehold.co/100?text=Vitamins" },
  { name: "Baby Care", image: "https://placehold.co/100?text=Baby" },
  { name: "Skin Care", image: "https://placehold.co/100?text=Skin" },
  { name: "Eye Care", image: "https://placehold.co/100?text=Eye" },
];

const featuredMedicines = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    price: 5.99,
    image: "https://placehold.co/200?text=Medicine1",
    description: "For fever and body pain",
    discount: 10,
  },
  {
    id: 2,
    name: "Amoxicillin 250mg",
    price: 12.99,
    image: "https://placehold.co/200?text=Medicine2",
    description: "Antibiotic for infections",
    discount: 5,
  },
  {
    id: 3,
    name: "Vitamin C 1000mg",
    price: 8.50,
    image: "https://placehold.co/200?text=Medicine3",
    description: "Immunity booster",
    discount: 15,
  },
  {
    id: 4,
    name: "Aspirin 100mg",
    price: 6.75,
    image: "https://placehold.co/200?text=Medicine4",
    description: "Pain reliever",
    discount: 0,
  },
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement search functionality
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pharmacy-100 to-blue-50 py-16">
        <div className="app-container">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-pharmacy-800 mb-4">
                Your Medicines, Delivered at Your Doorstep
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Upload your prescription or select symptoms to get the medicines you need.
                Fast, reliable and secure delivery.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/medicines" className="btn-pharmacy">
                  Browse Medicines
                </Link>
                <Link to="/upload-prescription" className="btn-secondary">
                  Upload Prescription
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="https://placehold.co/600x400?text=Pharmacy+Delivery" 
                alt="Pharmacy Delivery" 
                className="rounded-lg shadow-xl max-w-full h-auto" 
              />
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-12 bg-white p-4 rounded-full shadow-md max-w-3xl mx-auto">
            <form onSubmit={handleSearch} className="flex items-center">
              <Search size={20} className="text-gray-400 ml-2" />
              <input
                type="text"
                placeholder="Search for medicines, symptoms..."
                className="flex-1 ml-2 outline-none text-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="bg-pharmacy-600 text-white px-6 py-2 rounded-full font-medium">
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="app-container">
          <h2 className="text-3xl font-bold text-center text-pharmacy-800 mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-pharmacy-100 p-4 rounded-full mb-4">
                <Upload size={32} className="text-pharmacy-600" />
              </div>
              <h3 className="text-xl font-semibold text-pharmacy-800 mb-2">Upload Prescription</h3>
              <p className="text-gray-600">Take a photo of your prescription and upload it. Our pharmacists will verify it.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-pharmacy-100 p-4 rounded-full mb-4">
                <ShoppingCart size={32} className="text-pharmacy-600" />
              </div>
              <h3 className="text-xl font-semibold text-pharmacy-800 mb-2">Add to Cart</h3>
              <p className="text-gray-600">Add medicines to your cart. You can also select by symptoms if you don't have a prescription.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-pharmacy-100 p-4 rounded-full mb-4">
                <MapPin size={32} className="text-pharmacy-600" />
              </div>
              <h3 className="text-xl font-semibold text-pharmacy-800 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your medicines delivered to your doorstep from the nearest pharmacy store.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Banner */}
      <section className="py-12 bg-gray-50">
        <div className="app-container">
          <h2 className="text-2xl font-bold text-pharmacy-800 mb-8">Shop by Category</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {categoriesBanner.map((category, index) => (
              <Link key={index} to={`/category/${category.name.toLowerCase().replace(' & ', '-').replace(' ', '-')}`} className="group">
                <div className="bg-white rounded-lg p-4 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md card-hover">
                  <img src={category.image} alt={category.name} className="w-16 h-16 object-cover mb-3 rounded-full" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-pharmacy-600">{category.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="app-container">
          <h2 className="text-2xl font-bold text-pharmacy-800 mb-8">Featured Medicines</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredMedicines.map((medicine) => (
              <div key={medicine.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden card-hover">
                <div className="relative">
                  <img src={medicine.image} alt={medicine.name} className="w-full h-48 object-cover" />
                  {medicine.discount > 0 && (
                    <div className="absolute top-2 right-2 bg-pharmacy-600 text-white text-xs font-bold px-2 py-1 rounded">
                      {medicine.discount}% OFF
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-pharmacy-800 mb-1">{medicine.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{medicine.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-baseline">
                      <span className="text-lg font-bold text-pharmacy-700">${medicine.price.toFixed(2)}</span>
                      {medicine.discount > 0 && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          ${(medicine.price * (1 + medicine.discount / 100)).toFixed(2)}
                        </span>
                      )}
                    </div>
                    <button className="bg-pharmacy-600 text-white p-2 rounded-full hover:bg-pharmacy-700 transition-colors">
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/medicines" className="btn-pharmacy inline-block">
              View All Medicines
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="app-container">
          <h2 className="text-3xl font-bold text-center text-pharmacy-800 mb-12">Why Choose CureFlow Pharmacy</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-pharmacy-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Clock className="text-pharmacy-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-pharmacy-800 mb-2">Quick Delivery</h3>
              <p className="text-gray-600">Get your medicines delivered within hours from your nearest pharmacy store.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-pharmacy-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="text-pharmacy-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-pharmacy-800 mb-2">Vast Selection</h3>
              <p className="text-gray-600">Wide range of medicines, healthcare products, and medical supplies.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-pharmacy-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <User className="text-pharmacy-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-pharmacy-800 mb-2">Expert Advice</h3>
              <p className="text-gray-600">Qualified pharmacists to verify prescriptions and provide guidance.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-pharmacy-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <MapPin className="text-pharmacy-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-pharmacy-800 mb-2">Nearby Stores</h3>
              <p className="text-gray-600">Connected to pharmacy stores near you for faster service and delivery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials/App Promotion */}
      <section className="py-16 bg-white">
        <div className="app-container">
          <div className="flex flex-col md:flex-row items-center bg-gradient-to-r from-pharmacy-100 to-blue-50 rounded-2xl overflow-hidden">
            <div className="md:w-1/2 p-8 md:p-12">
              <h2 className="text-3xl font-bold text-pharmacy-800 mb-4">Download Our Mobile App</h2>
              <p className="text-gray-700 mb-6">
                Get exclusive offers, easier ordering, and real-time tracking with our mobile app.
                Available for iOS and Android devices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center justify-center">
                  <span className="mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.5"/><path d="M16 3v4"/><path d="M8 3v4"/><path d="M3 11h18"/><path d="M18 16.5v3.5"/><path d="M18 20h-4"/><path d="M18 18h-4"/></svg>
                  </span>
                  <div className="text-left">
                    <span className="text-xs block">Download on the</span>
                    <span className="text-sm font-medium">App Store</span>
                  </div>
                </button>
                <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center justify-center">
                  <span className="mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3H7a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4z"/><path d="M12 7v5"/><path d="M15 10h-6"/><path d="M7 12v5h10v-5"/></svg>
                  </span>
                  <div className="text-left">
                    <span className="text-xs block">GET IT ON</span>
                    <span className="text-sm font-medium">Google Play</span>
                  </div>
                </button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://placehold.co/600x400?text=Mobile+App" 
                alt="CureFlow Mobile App" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
