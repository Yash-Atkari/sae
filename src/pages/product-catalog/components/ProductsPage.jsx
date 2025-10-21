import React, { useState, useEffect } from 'react';
import ProductGrid from './ProductGrid';
import { fetchProducts } from '../../../lib/productsService';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredAndSortedProducts, setFilteredAndSortedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter and sort states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    // Apply filters and sorting whenever products, filters, or sort options change
    applyFiltersAndSorting();
  }, [products, selectedCategory, sortBy, searchQuery]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const productsData = await fetchProducts();
      console.log('Loaded products:', productsData);
      setProducts(productsData || []);
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSorting = () => {
    let filtered = [...products];

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category === selectedCategory
      );
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low-high':
          return a.price - b.price;
        case 'price-high-low':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'newest':
          return new Date(b.created_at) - new Date(a.created_at);
        case 'stock':
          return b.stock - a.stock;
        default:
          return 0;
      }
    });

    setFilteredAndSortedProducts(sorted);
  };

  const handleWhatsAppOrder = (product) => {
    console.log('Ordering product:', product.name);
    const message = encodeURIComponent(
      `Hi! I'm interested in ordering:\n\n${product.name}\nPrice: $${product.price}\n\nPlease provide more details about availability and delivery.`
    );
    window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
  };

  // Get unique categories for filter dropdown
  const categories = ['all', ...new Set(products.map(product => product.category).filter(Boolean))];

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <span className="text-2xl">⚠️</span>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Error Loading Products</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button 
            onClick={loadProducts}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Our Products</h1>
        <p className="text-muted-foreground">Discover our wide range of electronics, appliances, and mobile phones with easy WhatsApp ordering
              </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 bg-card rounded-lg border border-border p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          {/* Search */}
          <div className="flex-1 w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Categories</option>
            {categories.filter(cat => cat !== 'all').map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Sort Options */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="newest">Newest First</option>
            <option value="stock">Stock Level</option>
          </select>
        </div>

        {/* Results count */}
        {!loading && (
          <div className="mt-3 text-sm text-muted-foreground">
            Showing {filteredAndSortedProducts.length} of {products.length} products
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </div>
        )}
      </div>

      {/* Product Grid */}
      <ProductGrid
        products={filteredAndSortedProducts}
        loading={loading}
        onWhatsAppOrder={handleWhatsAppOrder}
      />
    </div>
  );
};

export default ProductsPage;