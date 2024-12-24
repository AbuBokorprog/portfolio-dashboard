import React, { useState, useRef, useEffect } from 'react';

const SalesCustomSelect = ({
  allProducts,
  label,
  setSelectedProduct,
  selectedProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Handle search input change and filter products
  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    if (searchValue?.length > 0) {
      const filtered = allProducts?.filter((product) =>
        product.label.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  // Handle dropdown toggle
  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Handle product selection
  const handleProductSelect = (product) => {
    setSelectedProduct((prevSelectedProducts) => [
      ...prevSelectedProducts,
      product,
    ]);
    setSearchTerm(''); // Clear search term after selection
    setDropdownOpen(false); // Close dropdown after selection
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full relative" ref={dropdownRef}>
      <label className="block text-sm text-left font-medium mb-2">
        {label}
      </label>

      {/* Search and Selected Product Input */}
      <div
        onClick={handleDropdownToggle}
        className="border border-gray-300 flex justify-center items-center gap-5 hover:border-black rounded p-3.5 w-full text-left cursor-pointer"
      >
        {selectedProduct?.length > 0 ? (
          selectedProduct?.map((p, index) => <p key={index}>{p?.label}</p>)
        ) : (
          <p className="text-gray-500 ">Select product...</p>
        )}
      </div>

      {/* Dropdown with search and filtered list */}
      {isDropdownOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg">
          {/* Search Input */}
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search for products..."
            className="border-b border-gray-300 px-3 py-2 w-full"
          />

          {/* Filtered Product List */}
          <ul className="max-h-48 overflow-y-auto">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <li
                  key={index}
                  onClick={() => handleProductSelect(product)}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {product.label}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-gray-500 cursor-pointer">
                Product not found!
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SalesCustomSelect;
