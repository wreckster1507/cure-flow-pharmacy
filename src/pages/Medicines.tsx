
import { useState, useEffect } from 'react';
import { Search, Filter, ShoppingCart, Star, ChevronDown } from 'lucide-react';

// Sample medicine data
const mockMedicines = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    price: 5.99,
    image: "https://placehold.co/300x200?text=Paracetamol",
    description: "For fever and body pain",
    category: "Pain Relief",
    prescription_required: false,
    rating: 4.5,
    reviews: 120,
    stock: 50,
    discount: 10,
  },
  {
    id: 2,
    name: "Amoxicillin 250mg",
    price: 12.99,
    image: "https://placehold.co/300x200?text=Amoxicillin",
    description: "Antibiotic for infections",
    category: "Antibiotics",
    prescription_required: true,
    rating: 4.2,
    reviews: 85,
    stock: 30,
    discount: 0,
  },
  {
    id: 3,
    name: "Vitamin C 1000mg",
    price: 8.50,
    image: "https://placehold.co/300x200?text=Vitamin+C",
    description: "Immunity booster",
    category: "Vitamins",
    prescription_required: false,
    rating: 4.7,
    reviews: 200,
    stock: 100,
    discount: 15,
  },
  {
    id: 4,
    name: "Aspirin 100mg",
    price: 6.75,
    image: "https://placehold.co/300x200?text=Aspirin",
    description: "Pain reliever",
    category: "Pain Relief",
    prescription_required: false,
    rating: 4.3,
    reviews: 150,
    stock: 80,
    discount: 5,
  },
  {
    id: 5,
    name: "Cetirizine 10mg",
    price: 7.25,
    image: "https://placehold.co/300x200?text=Cetirizine",
    description: "For allergies",
    category: "Allergy",
    prescription_required: false,
    rating: 4.4,
    reviews: 110,
    stock: 60,
    discount: 0,
  },
  {
    id: 6,
    name: "Omeprazole 20mg",
    price: 9.99,
    image: "https://placehold.co/300x200?text=Omeprazole",
    description: "For acidity and ulcers",
    category: "Gastric Care",
    prescription_required: false,
    rating: 4.6,
    reviews: 95,
    stock: 45,
    discount: 8,
  },
  {
    id: 7,
    name: "Insulin Glargine",
    price: 45.50,
    image: "https://placehold.co/300x200?text=Insulin",
    description: "For diabetes management",
    category: "Diabetes Care",
    prescription_required: true,
    rating: 4.8,
    reviews: 75,
    stock: 20,
    discount: 0,
  },
  {
    id: 8,
    name: "Multivitamin Tablets",
    price: 11.25,
    image: "https://placehold.co/300x200?text=Multivitamin",
    description: "Complete nutritional supplement",
    category: "Vitamins",
    prescription_required: false,
    rating: 4.5,
    reviews: 180,
    stock: 90,
    discount: 12,
  },
];

const categories = [
  "All Categories",
  "Pain Relief",
  "Antibiotics",
  "Vitamins",
  "Allergy",
  "Gastric Care",
  "Diabetes Care",
  "Cold & Fever",
  "Cardiac Care"
];

const Medicines = () => {
  const [medicines, setMedicines] = useState(mockMedicines);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sort, setSort] = useState('recommended');
  const [filterPrescription, setFilterPrescription] = useState<boolean | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...mockMedicines];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(medicine => 
        medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        medicine.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(medicine => medicine.category === selectedCategory);
    }

    // Apply prescription filter
    if (filterPrescription !== null) {
      filtered = filtered.filter(medicine => medicine.prescription_required === filterPrescription);
    }

    // Apply sorting
    if (sort === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'discount') {
      filtered.sort((a, b) => b.discount - a.discount);
    }

    setMedicines(filtered);
  }, [searchQuery, selectedCategory, sort, filterPrescription]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the useEffect
  };

  const handleAddToCart = (id: number) => {
    console.log(`Added medicine with ID ${id} to cart`);
    // Implement cart functionality
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSort('recommended');
    setFilterPrescription(null);
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="app-container">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-pharmacy-800">Browse Medicines</h1>
          <button
            className="md:hidden flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-gray-300"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} />
            <span>Filters</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters - Desktop */}
          <div className={`md:w-1/4 lg:w-1/5 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-20">
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">Search</h3>
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search medicines..."
                      className="w-full p-2 pr-8 border border-gray-300 rounded-lg focus:ring-pharmacy-600 focus:border-pharmacy-600"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </form>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">Category</h3>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="radio"
                        id={`category-${index}`}
                        name="category"
                        className="w-4 h-4 text-pharmacy-600 border-gray-300 focus:ring-pharmacy-500"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                      />
                      <label htmlFor={`category-${index}`} className="ml-2 text-gray-700">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">Prescription Required</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="prescription-all"
                      name="prescription"
                      className="w-4 h-4 text-pharmacy-600 border-gray-300 focus:ring-pharmacy-500"
                      checked={filterPrescription === null}
                      onChange={() => setFilterPrescription(null)}
                    />
                    <label htmlFor="prescription-all" className="ml-2 text-gray-700">
                      All Medicines
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="prescription-no"
                      name="prescription"
                      className="w-4 h-4 text-pharmacy-600 border-gray-300 focus:ring-pharmacy-500"
                      checked={filterPrescription === false}
                      onChange={() => setFilterPrescription(false)}
                    />
                    <label htmlFor="prescription-no" className="ml-2 text-gray-700">
                      No Prescription Needed
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="prescription-yes"
                      name="prescription"
                      className="w-4 h-4 text-pharmacy-600 border-gray-300 focus:ring-pharmacy-500"
                      checked={filterPrescription === true}
                      onChange={() => setFilterPrescription(true)}
                    />
                    <label htmlFor="prescription-yes" className="ml-2 text-gray-700">
                      Prescription Required
                    </label>
                  </div>
                </div>
              </div>

              <button
                onClick={clearFilters}
                className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Products */}
          <div className="flex-1">
            {/* Sort Options */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-center">
              <p className="text-gray-600 mb-3 sm:mb-0">
                <span className="font-medium">{medicines.length}</span> medicines found
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Sort by:</span>
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-pharmacy-500 focus:border-pharmacy-500"
                  >
                    <option value="recommended">Recommended</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="discount">Biggest Discount</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {medicines.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {medicines.map((medicine) => (
                  <div key={medicine.id} className="bg-white rounded-lg shadow-sm overflow-hidden card-hover">
                    <div className="relative">
                      <img src={medicine.image} alt={medicine.name} className="w-full h-48 object-cover" />
                      {medicine.discount > 0 && (
                        <div className="absolute top-2 right-2 bg-pharmacy-600 text-white text-xs font-bold px-2 py-1 rounded">
                          {medicine.discount}% OFF
                        </div>
                      )}
                      {medicine.prescription_required && (
                        <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">
                          Rx
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-lg font-semibold text-pharmacy-800">{medicine.name}</h3>
                        <div className="flex items-center bg-green-50 px-2 py-0.5 rounded">
                          <Star size={14} className="text-yellow-500 fill-yellow-500" />
                          <span className="text-sm ml-1 text-gray-700">{medicine.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{medicine.description}</p>
                      <p className="text-xs text-gray-500 mb-3">Category: {medicine.category}</p>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-baseline">
                          <span className="text-lg font-bold text-pharmacy-700">${medicine.price.toFixed(2)}</span>
                          {medicine.discount > 0 && (
                            <span className="text-sm text-gray-500 line-through ml-2">
                              ${(medicine.price * (1 + medicine.discount / 100)).toFixed(2)}
                            </span>
                          )}
                        </div>
                        <button 
                          onClick={() => handleAddToCart(medicine.id)}
                          className="bg-pharmacy-600 text-white py-1.5 px-3 rounded-full hover:bg-pharmacy-700 transition-colors flex items-center"
                        >
                          <ShoppingCart size={16} className="mr-1" />
                          <span className="text-sm">Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Medicines Found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria.</p>
                <button
                  onClick={clearFilters}
                  className="btn-pharmacy"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Medicines;
