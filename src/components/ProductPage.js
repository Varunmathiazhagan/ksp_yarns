import React, { useState, useEffect } from "react";
import { FaRupeeSign, FaSearch, FaStar } from "react-icons/fa";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import useProducts from "../hooks/useProducts";

const ProductPage = ({ addToCart }) => {
  const [products] = useState([
    {
      id: 1,
      name: "Recycled Fibers",
      description: "Eco-friendly recycled fibers for sustainable textile production.",
      price: 5.99,
      image: "/images/recycled-fibers.webp",
      category: "Fibers",
      rating: 4.5,
    },
    {
      id: 2,
      name: "OE Yarn",
      description: "High-quality open-end yarn for various textile applications.",
      price: 7.99,
      image: "/images/oe.jpg",
      category: "Yarn",
      rating: 4.0,
    },
    {
      id: 3,
      name: "Ring Spun Yarn",
      description: "Premium ring spun yarn known for its softness and durability.",
      price: 9.99,
      image: "/images/rs.avif",
      category: "Yarn",
      rating: 5.0,
    },
    {
      id: 4,
      name: "Vortex Yarn",
      description: "Innovative vortex yarn combining quality and cost-effectiveness.",
      price: 8.99,
      image: "/images/vortex-yarn.jpg",
      category: "Yarn",
      rating: 3.5,
    },
    {
      id: 5,
      name: "Greige Fabric",
      description: "Unfinished fabric ready for dyeing and further processing.",
      price: 12.99,
      image: "/images/greige-fabric.jpg",
      category: "Fabric",
      rating: 4.7,
    },
    {
      id: 6,
      name: "Knitted Fabric",
      description: "Versatile knitted fabric for various garment applications.",
      price: 14.99,
      image: "/images/knitted-fabric.jpg",
      category: "Fabric",
      rating: 4.3,
    },
  ]);

  const {
    products: filteredProducts,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    loading,
    error,
  } = useProducts(products);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const controls = useAnimation();

  useEffect(() => {
    if (selectedProduct) {
      controls.start("visible");
    }
  }, [controls, selectedProduct]);

  if (loading) return <div className="text-center text-2xl mt-8">Loading products...</div>;
  if (error) return <div className="text-center text-red-500 text-2xl mt-8">{error}</div>;

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <>
        {[...Array(fullStars)].map((_, idx) => (
          <FaStar key={`full-${idx}`} className="text-yellow-400" />
        ))}
        {halfStar && <FaStar className="text-yellow-400" style={{ clipPath: "inset(0 50% 0 0)" }} />}
        {[...Array(emptyStars)].map((_, idx) => (
          <FaStar key={`empty-${idx}`} className="text-gray-300" />
        ))}
      </>
    );
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-12 text-center">Our Products</h1>
      <div className="mb-12">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="p-4 pl-12 border border-gray-300 rounded w-full mb-6"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-4 top-4 text-gray-400" />
        </div>
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-3 rounded transition-colors duration-200 ${selectedCategory === null ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            All
          </button>
          {["Fibers", "Yarn", "Fabric"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded transition-colors duration-200 ${selectedCategory === category ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="flex justify-end mb-6">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-4 border border-gray-300 rounded"
          >
            <option value="name">Sort by Name</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>
      <AnimatePresence>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              className="border rounded-lg overflow-hidden shadow-lg transition-transform duration-200 hover:scale-105 cursor-pointer relative"
              onClick={() => handleProductClick(product)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">{product.name}</h2>
                <p className="text-gray-600 mb-6">{product.description}</p>
                <div className="flex items-center mb-6">
                  <div className="flex">{renderStars(product.rating)}</div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">
                    <FaRupeeSign className="inline-block mr-1" />
                    {(product.price * 82.23).toFixed(2)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      {selectedProduct && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, scale: 1 },
              hidden: { opacity: 0, scale: 0.8 },
            }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-lg max-w-2xl w-full"
          >
            <h2 className="text-2xl font-bold mb-8">{selectedProduct.name}</h2>
            <img
              src={selectedProduct.image || "/placeholder.svg"}
              alt={selectedProduct.name}
              className="w-full h-64 object-cover mb-8 rounded cursor-pointer"
              onClick={() => window.open(selectedProduct.image, "_blank")}
            />
            <p className="text-gray-600 mb-8">{selectedProduct.description}</p>
            <p className="text-xl font-bold mb-8">
              <FaRupeeSign className="inline-block mr-1" />
              {(selectedProduct.price * 82.23).toFixed(2)}
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => addToCart(selectedProduct)}
                className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700 transition-colors duration-200"
              >
                Add to Cart
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-800 px-8 py-3 rounded hover:bg-gray-400 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ProductPage;