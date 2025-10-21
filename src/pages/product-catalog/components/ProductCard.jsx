import React from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ProductCard = ({ product, onWhatsAppOrder, onProductClick }) => {
  const formatPrice = (price) => {
    if (!price) return '₹0.00';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const isNewProduct = () => {
    if (!product?.created_at) return false;
    const createdDate = new Date(product.created_at);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return createdDate > sevenDaysAgo;
  };

  const isInStock = () => {
    return (product?.stock || 0) > 0;
  };

  const handleWhatsAppOrder = (e) => {
    e.stopPropagation(); // Prevent triggering the card click
    if (!product) return;
    onWhatsAppOrder?.(product);
  };

  const handleCardClick = () => {
    if (product && onProductClick) {
      onProductClick(product);
    }
  };

  if (!product) {
    return null;
  }

  return (
    <div 
      className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-elevation-2 transition-smooth cursor-pointer group"
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden h-48">
        <Image
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-layout duration-300"
          fallback="/images/placeholder-product.jpg"
        />
        {isNewProduct() && (
          <div className="absolute top-2 left-2 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
            New
          </div>
        )}
        {product.discount > 0 && (
          <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground px-2 py-1 rounded-full text-xs font-medium">
            -{product.discount}%
          </div>
        )}
        
        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white font-medium bg-black/50 px-3 py-2 rounded-lg">
            Click to view details
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        {/* Category */}
        {product.category && (
          <div className="mb-2">
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
              {product.category}
            </span>
          </div>
        )}
        
        {/* Description */}
        {product.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {product.description}
          </p>
        )}
        
        {/* Pricing */}
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-lg font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          {product.original_price && product.original_price > product.price && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.original_price)}
            </span>
          )}
        </div>
        
        {/* Features */}
        {product.features && product.features.length > 0 && (
          <div className="mb-3">
            <ul className="text-sm text-muted-foreground space-y-1">
              {product.features.slice(0, 2).map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <Icon name="Check" size={14} className="text-accent flex-shrink-0" />
                  <span className="line-clamp-1">{feature}</span>
                </li>
              ))}
              {product.features.length > 2 && (
                <li className="text-xs text-muted-foreground pl-6">
                  +{product.features.length - 2} more features
                </li>
              )}
            </ul>
          </div>
        )}
        
        {/* Stock Information */}
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-muted-foreground">
            Stock: {product.stock || 0}
          </div>
          
          {isInStock() ? (
            <span className="text-sm text-accent font-medium">In Stock</span>
          ) : (
            <span className="text-sm text-destructive font-medium">Out of Stock</span>
          )}
        </div>
        
        {/* Order Button */}
        <Button
          variant="default"
          size="sm"
          fullWidth
          iconName="MessageCircle"
          iconPosition="left"
          onClick={handleWhatsAppOrder}
          disabled={!isInStock()}
        >
          Order via WhatsApp
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;