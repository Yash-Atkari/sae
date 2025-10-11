import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import CategoryFilter from './components/CategoryFilter';
import SearchBar from './components/SearchBar';
import SortFilter from './components/SortFilter';
import ProductGrid from './components/ProductGrid';
import Button from '../../components/ui/Button';


const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');

  // Mock product data
  const mockProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro Max 256GB",
      price: 1199,
      originalPrice: 1299,
      category: "mobiles",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 2847,
      inStock: true,
      isNew: true,
      discount: 8,
      features: ["A17 Pro chip", "48MP camera system", "Titanium design", "USB-C connector"]
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra 512GB",
      price: 1299,
      originalPrice: 1399,
      category: "mobiles",
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop",
      rating: 4.7,
      reviews: 1923,
      inStock: true,
      isNew: true,
      discount: 7,
      features: ["200MP camera", "S Pen included", "AI-powered features", "5000mAh battery"]
    },
    {
      id: 3,
      name: "Google Pixel 8 Pro 128GB",
      price: 899,
      originalPrice: 999,
      category: "mobiles",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
      rating: 4.6,
      reviews: 1456,
      inStock: true,
      isNew: false,
      discount: 10,
      features: ["Google Tensor G3", "Magic Eraser", "Night Sight", "7 years of updates"]
    },
    {
      id: 4,
      name: "OnePlus 12 256GB",
      price: 799,
      originalPrice: 899,
      category: "mobiles",
      image: "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=400&h=300&fit=crop",
      rating: 4.5,
      reviews: 987,
      inStock: true,
      isNew: false,
      discount: 11,
      features: ["Snapdragon 8 Gen 3", "100W fast charging", "Hasselblad cameras", "OxygenOS 14"]
    },
    {
      id: 5,
      name: "LG OLED C3 65-inch 4K Smart TV",
      price: 1899,
      originalPrice: 2199,
      category: "appliances",
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop",
      rating: 4.9,
      reviews: 3421,
      inStock: true,
      isNew: true,
      discount: 14,
      features: ["OLED evo technology", "Dolby Vision IQ", "webOS 23", "Gaming features"]
    },
    {
      id: 6,
      name: "Samsung 28 cu. ft. French Door Refrigerator",
      price: 2299,
      originalPrice: 2599,
      category: "appliances",
      image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=300&fit=crop",
      rating: 4.4,
      reviews: 892,
      inStock: true,
      isNew: false,
      discount: 12,
      features: ["FlexZone drawer", "Twin Cooling Plus", "Wi-Fi connectivity", "Energy Star certified"]
    },
    {
      id: 7,
      name: "Dyson V15 Detect Absolute Vacuum",
      price: 749,
      originalPrice: 849,
      category: "appliances",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      rating: 4.7,
      reviews: 1567,
      inStock: true,
      isNew: false,
      discount: 12,
      features: ["Laser dust detection", "60 minutes runtime", "5-stage filtration", "LCD screen"]
    },
    {
      id: 8,
      name: "KitchenAid Artisan Stand Mixer",
      price: 429,
      originalPrice: 499,
      category: "appliances",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 2134,
      inStock: false,
      isNew: false,
      discount: 14,
      features: ["5-quart bowl", "10 speeds", "Tilt-head design", "Multiple attachments"]
    },
    {
      id: 9,
      name: "Xiaomi 13 Pro 256GB",
      price: 699,
      originalPrice: 799,
      category: "mobiles",
      image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=300&fit=crop",
      rating: 4.3,
      reviews: 756,
      inStock: true,
      isNew: false,
      discount: 13,
      features: ["Snapdragon 8 Gen 2", "Leica cameras", "120W charging", "MIUI 14"]
    },
    {
      id: 10,
      name: "Bosch 800 Series Dishwasher",
      price: 1199,
      originalPrice: 1399,
      category: "appliances",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      rating: 4.6,
      reviews: 1089,
      inStock: true,
      isNew: true,
      discount: 14,
      features: ["42 dBA quiet operation", "3rd rack", "AutoAir dry", "WiFi connectivity"]
    },
    {
      id: 11,
      name: "Nothing Phone (2) 256GB",
      price: 599,
      originalPrice: 699,
      category: "mobiles",
      image: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=400&h=300&fit=crop",
      rating: 4.2,
      reviews: 543,
      inStock: true,
      isNew: false,
      discount: 14,
      features: ["Glyph Interface", "Snapdragon 8+ Gen 1", "50MP dual cameras", "Nothing OS 2.0"]
    },
    {
      id: 12,
      name: "Instant Pot Duo 7-in-1 Pressure Cooker",
      price: 99,
      originalPrice: 129,
      category: "appliances",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      rating: 4.5,
      reviews: 4567,
      inStock: true,
      isNew: false,
      discount: 23,
      features: ["7-in-1 functionality", "6-quart capacity", "Smart programs", "Safe and easy"]
    }
  ];

  // Simulate API loading
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProducts(mockProducts);
      setLoading(false);
    };

    loadProducts();
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
                Discover our wide range of electronics and appliances with easy WhatsApp ordering
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
            <SortFilter
              sortBy={sortBy}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />

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