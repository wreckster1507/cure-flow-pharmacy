
import { useState } from 'react';
import { MapPin, Search, Phone, Clock, Star } from 'lucide-react';

const mockStores = [
  {
    id: 1,
    name: "CureFlow Downtown",
    address: "123 Main Street, Downtown, City - 10001",
    phone: "+1 (234) 567-8901",
    hours: "8:00 AM - 10:00 PM",
    distance: 1.2,
    rating: 4.7,
    reviews: 120,
    image: "https://placehold.co/400x200?text=Pharmacy+1"
  },
  {
    id: 2,
    name: "CureFlow Westside",
    address: "456 West Avenue, Westside, City - 10002",
    phone: "+1 (234) 567-8902",
    hours: "9:00 AM - 9:00 PM",
    distance: 2.5,
    rating: 4.5,
    reviews: 95,
    image: "https://placehold.co/400x200?text=Pharmacy+2"
  },
  {
    id: 3,
    name: "CureFlow Eastside",
    address: "789 East Boulevard, Eastside, City - 10003",
    phone: "+1 (234) 567-8903",
    hours: "8:00 AM - 11:00 PM",
    distance: 3.8,
    rating: 4.8,
    reviews: 150,
    image: "https://placehold.co/400x200?text=Pharmacy+3"
  },
  {
    id: 4,
    name: "CureFlow Northside",
    address: "101 North Road, Northside, City - 10004",
    phone: "+1 (234) 567-8904",
    hours: "24 Hours",
    distance: 4.1,
    rating: 4.6,
    reviews: 110,
    image: "https://placehold.co/400x200?text=Pharmacy+4"
  },
];

const FindStore = () => {
  const [location, setLocation] = useState('');
  const [radius, setRadius] = useState('5');
  const [stores, setStores] = useState(mockStores);
  const [selectedStore, setSelectedStore] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Filter stores based on radius (in a real app, this would be done by the backend)
      const filteredStores = mockStores.filter(store => 
        store.distance <= parseInt(radius)
      );
      setStores(filteredStores);
      setIsLoading(false);
    }, 1000);
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="app-container">
        <h1 className="text-3xl font-bold text-pharmacy-800 mb-2">Find Nearby Stores</h1>
        <p className="text-gray-600 mb-8">
          Locate the nearest CureFlow pharmacy stores in your area for faster delivery.
        </p>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1 md:col-span-2">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Location
                </label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    id="location"
                    placeholder="Enter your address or coordinates"
                    className="pl-10 w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-pharmacy-500 focus:border-pharmacy-500"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={handleGetLocation}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pharmacy-600 font-medium text-sm"
                  >
                    Use Current
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="radius" className="block text-sm font-medium text-gray-700 mb-1">
                  Search Radius (km)
                </label>
                <select
                  id="radius"
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-pharmacy-500 focus:border-pharmacy-500"
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                >
                  <option value="1">1 km</option>
                  <option value="2">2 km</option>
                  <option value="5">5 km</option>
                  <option value="10">10 km</option>
                  <option value="20">20 km</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="btn-pharmacy w-full md:w-auto"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Search size={18} className="mr-2" />
                    Find Stores
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Store Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Store List */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold text-pharmacy-800">
                {stores.length} Stores Found
              </h2>
            </div>
            <div className="divide-y max-h-[600px] overflow-y-auto">
              {stores.map((store) => (
                <div 
                  key={store.id} 
                  className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${selectedStore === store.id ? 'bg-gray-50 border-l-4 border-pharmacy-600' : ''}`}
                  onClick={() => setSelectedStore(store.id)}
                >
                  <div className="flex items-start">
                    <img 
                      src={store.image} 
                      alt={store.name} 
                      className="w-20 h-20 object-cover rounded-lg mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-pharmacy-800">{store.name}</h3>
                      <div className="flex items-center text-gray-600 text-sm mb-1">
                        <MapPin size={14} className="mr-1" />
                        <span>{store.address}</span>
                      </div>
                      <div className="flex flex-wrap gap-y-1 gap-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Phone size={14} className="mr-1" />
                          <span>{store.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          <span>{store.hours}</span>
                        </div>
                      </div>
                      <div className="flex items-center mt-2 justify-between">
                        <div className="flex items-center">
                          <Star size={14} className="text-yellow-500 fill-yellow-500 mr-1" />
                          <span className="text-sm font-medium">{store.rating}</span>
                          <span className="text-xs text-gray-500 ml-1">({store.reviews} reviews)</span>
                        </div>
                        <span className="text-sm font-medium text-pharmacy-600">{store.distance} km away</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {stores.length === 0 && (
                <div className="p-8 text-center">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">No Stores Found</h3>
                  <p className="text-gray-600">Try increasing your search radius or changing your location.</p>
                </div>
              )}
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold text-pharmacy-800">Store Locations</h2>
            </div>
            <div className="flex-1 bg-gray-100 min-h-[400px] flex items-center justify-center">
              {/* In a real app, this would be a map component like Google Maps or Mapbox */}
              <div className="text-center p-6">
                <MapPin size={48} className="text-pharmacy-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Map View</h3>
                <p className="text-gray-600 mb-4">
                  In the actual application, a real map would display here with markers for each pharmacy location.
                </p>
                {selectedStore && (
                  <div className="mt-4 p-4 bg-white rounded-lg shadow-sm inline-block text-left">
                    <h4 className="font-semibold text-pharmacy-800">
                      {stores.find(s => s.id === selectedStore)?.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {stores.find(s => s.id === selectedStore)?.address}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindStore;
