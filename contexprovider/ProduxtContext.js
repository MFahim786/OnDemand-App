// ProductContext.js
import React, { createContext, useState, useContext } from 'react';

// Create a context to hold the product data
const ProductContext = createContext();

// Custom hook to use the product context
export const useProductContext = () => {
  return useContext(ProductContext);
};

// Provider component to wrap your application and provide the product data
export const ProductProvider = ({ children }) => {
  // State to hold the product data
  const [products, setProducts] = useState([]);

  // Function to add a new product
  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  // Function to remove a product
  const removeProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  // Value object to provide to consumers of the context
  const value = {
    products,
    addProduct,
    removeProduct,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
