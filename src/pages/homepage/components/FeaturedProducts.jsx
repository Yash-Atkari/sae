import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeaturedProducts = ({ trackButtonClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredProducts = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      price: '$1,199',
      originalPrice: '$1,299',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
      rating: 4.8,
      reviews: 1250,
      badge: 'Best Seller',
      emiPrice: '$100/month',
      features: ['256GB Storage', 'Pro Camera', '5G Ready']
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24 Ultra',
      price: '$1,099',
      originalPrice: '$1,199',
      image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop',
      rating: 4.7,
      reviews: 890,
      badge: 'New Arrival',
      emiPrice: '$92/month',
      features: ['512GB Storage', 'S Pen Included', 'AI Features']
    },
    {
      id: 3,
      name: 'LG Smart Refrigerator',
      price: '$899',
      originalPrice: '$999',
      image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=400&fit=crop',
      rating: 4.6,
      reviews: 456,
      badge: 'Energy Star',
      emiPrice: '$75/month',
      features: ['Smart Controls', '25 Cu Ft', 'Ice Maker']
    },
    {
      id: 4,
      name: 'Sony 65" 4K TV',
      price: '$799',
      originalPrice: '$899',
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop',
      rating: 4.9,
      reviews: 2100,
      badge: 'Top Rated',
      emiPrice: '$67/month',
      features: ['4K HDR', 'Smart TV', 'Gaming Mode']
    },
    {
      id: 5,
      name: 'MacBook Air M3',
      price: '$1,299',
      originalPrice: '$1,399',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
      rating: 4.8,
      reviews: 1800,
      badge: 'Editor\'s Choice',
      emiPrice: '$108/month',
      features: ['M3 Chip', '16GB RAM', '512GB SSD']
    }
  ];

  const handleWhatsAppOrder = (product) => {
    const message = encodeURIComponent(`Hi! I'm interested in ordering the ${product?.name} for ${product?.price}. Can you help me with the EMI options?`);
    window.open(`https://wa.me/919370412299?text=${message}`, '_blank');
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(featuredProducts?.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(featuredProducts?.length / 3)) % Math.ceil(featuredProducts?.length / 3));
  };

  const getVisibleProducts = () => {
    const startIndex = currentSlide * 3;
    return featuredProducts?.slice(startIndex, startIndex + 3);
  };

  const handleViewProduct = (productName) => {
    trackButtonClick?.(`View ${productName}`, 'Featured Products');
    // ... keep existing navigation logic ...
  };

  const handleViewAllProducts = () => {
    trackButtonClick?.('View All Products', 'Featured Products');
    // ... keep existing navigation logic ...
  };

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Featured Products
          </h2>
          <p className="text-muted-foreground">
            Handpicked deals and trending electronics
          </p>
        </div>
        
        <div className="hidden lg:flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            iconName="ChevronLeft"
            onClick={prevSlide}
            disabled={currentSlide === 0}
          />
          <Button
            variant="outline"
            size="icon"
            iconName="ChevronRight"
            onClick={nextSlide}
            disabled={currentSlide >= Math.ceil(featuredProducts?.length / 3) - 1}
          />
        </div>
      </div>
      {/* Desktop Carousel */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-6">
        {getVisibleProducts()?.map((product) => (
          <div key={product?.id} className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-elevation-2 transition-all duration-300 group">
            <div className="relative">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Badge */}
              <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                {product?.badge}
              </div>
              
              {/* Wishlist */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Icon name="Heart" size={18} />
              </div>
            </div>

            <div className="p-6">
              <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2">{product?.name}</h3>
              
              {/* Rating */}
              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  {[...Array(5)]?.map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={16}
                      color={i < Math.floor(product?.rating) ? "var(--color-warning)" : "var(--color-muted)"}
                      className="fill-current"
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground ml-2">
                  {product?.rating} ({product?.reviews})
                </span>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-1 mb-4">
                {product?.features?.slice(0, 2)?.map((feature, index) => (
                  <span key={index} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                    {feature}
                  </span>
                ))}
              </div>

              {/* Price */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-2xl font-bold text-foreground">{product?.price}</span>
                  <span className="text-sm text-muted-foreground line-through ml-2">{product?.originalPrice}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm text-accent font-semibold">EMI from</div>
                  <div className="text-sm text-muted-foreground">{product?.emiPrice}</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <Button
                  variant="default"
                  size="sm"
                  iconName="MessageCircle"
                  iconPosition="left"
                  onClick={() => handleWhatsAppOrder(product)}
                  className="flex-1"
                >
                  Order via WhatsApp
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Mobile Horizontal Scroll */}
      <div className="lg:hidden overflow-x-auto">
        <div className="flex space-x-4 pb-4" style={{ width: `${featuredProducts?.length * 280}px` }}>
          {featuredProducts?.map((product, index) => (
            <div key={index} className="flex-shrink-0 w-64 bg-card rounded-2xl border border-border overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-semibold">
                  {product?.badge}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-foreground mb-2 line-clamp-2">{product?.name}</h3>
                
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={14}
                        color={i < Math.floor(product?.rating) ? "var(--color-warning)" : "var(--color-muted)"}
                        className="fill-current"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground ml-1">({product?.reviews})</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-foreground">{product?.price}</span>
                  <span className="text-xs text-accent">{product?.emiPrice}</span>
                </div>

                <Button
                  variant="default"
                  size="sm"
                  iconName="MessageCircle"
                  iconPosition="left"
                  onClick={() => handleWhatsAppOrder(product)}
                  fullWidth
                >
                  WhatsApp Order
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Mobile Navigation Dots */}
      <div className="lg:hidden flex justify-center mt-4 space-x-2">
        {featuredProducts?.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index < 3 ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>
      <button 
        onClick={handleViewAllProducts}
        className="... keep existing classes ..."
      >
        View All Products
      </button>
    </div>
  );
};

export default FeaturedProducts;