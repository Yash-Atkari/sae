import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import CategoryFilter from './components/CategoryFilter';
import SearchBar from './components/SearchBar';
import SortFilter from './components/SortFilter';
import ProductGrid from './components/ProductGrid';
import Button from '../../components/ui/Button';
import { fetchProducts } from '../../lib/productsService';

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');

   useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };
    load();
  }, []);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered?.filter(product => product?.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered?.filter(product =>
        product?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        product?.features?.some(feature => 
          feature?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        )
      );
    }

    // Sort products
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a?.name?.localeCompare(b?.name);
        case 'price-low':
          return a?.price - b?.price;
        case 'price-high':
          return b?.price - a?.price;
        case 'rating':
          return b?.rating - a?.rating;
        case 'newest':
          return b?.isNew - a?.isNew;
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, activeCategory, searchQuery, sortBy]);

  // Calculate product counts
  const productCounts = useMemo(() => {
    const counts = {
      all: products?.length,
      mobiles: products?.filter(p => p?.category === 'mobiles')?.length,
      appliances: products?.filter(p => p?.category === 'appliances')?.length
    };
    return counts;
  }, [products]);

  const handleWhatsAppOrder = (product) => {
    console.log('WhatsApp order initiated for:', product?.name);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Product Catalog - ElectroMart PWA</title>
        <meta name="description" content="Browse our extensive collection of electronics and appliances. Find the best deals on mobiles, TVs, refrigerators, and more with easy WhatsApp ordering." />
        <meta name="keywords" content="electronics, appliances, mobiles, smartphones, TV, refrigerator, vacuum, kitchen appliances" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="container mx-auto px-4 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Product Catalog</h1>
              <p className="text-muted-foreground">
                Discover our wide range of electronics, appliances, and mobile phones with easy WhatsApp ordering
              </p>
            </div>

            {/* Search Bar */}
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onClearSearch={handleClearSearch}
            />

            {/* Category Filter */}
            <CategoryFilter
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              productCounts={productCounts}
            />

            {/* Sort and View Options */}
            {/* <SortFilter
              sortBy={sortBy}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            /> */}

            {/* Results Summary */}
            {!loading && (
              <div className="mb-6">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredAndSortedProducts?.length} of {productCounts?.all} products
                  {searchQuery && ` for "${searchQuery}"`}
                  {activeCategory !== 'all' && ` in ${activeCategory}`}
                </p>
              </div>
            )}

            {/* Product Grid */}
            <ProductGrid
              products={filteredAndSortedProducts}
              loading={loading}
              onWhatsAppOrder={handleWhatsAppOrder}
            />

            {/* Scroll to Top Button */}
            {filteredAndSortedProducts?.length > 8 && (
              <div className="fixed bottom-6 right-6 z-50">
                <Button
                  variant="default"
                  size="icon"
                  iconName="ArrowUp"
                  onClick={scrollToTop}
                  className="shadow-elevation-2"
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default ProductCatalog;