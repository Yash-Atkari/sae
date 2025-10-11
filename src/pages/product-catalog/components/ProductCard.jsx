import React from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ProductCard = ({ product, onWhatsAppOrder }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in ordering:\n\n${product?.name}\nPrice: ${formatPrice(product?.price)}\n\nPlease provide more details about availability and delivery.`
    );
    window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
    onWhatsAppOrder(product);
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-elevation-2 transition-smooth">
      <div className="relative overflow-hidden h-48">
        <Image
          src={product?.image}
          alt={product?.name}
          className="w-full h-full object-cover hover:scale-105 transition-layout"
        />
        {product?.isNew && (
          <div className="absolute top-2 left-2 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
            New
          </div>
        )}
        {product?.discount && (
          <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground px-2 py-1 rounded-full text-xs font-medium">
            -{product?.discount}%
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{product?.name}</h3>
        
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-lg font-bold text-primary">{formatPrice(product?.price)}</span>
          {product?.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product?.originalPrice)}
            </span>
          )}
        </div>
        
        {product?.features && product?.features?.length > 0 && (
          <div className="mb-3">
            <ul className="text-sm text-muted-foreground space-y-1">
              {product?.features?.slice(0, 2)?.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <Icon name="Check" size={14} className="text-accent flex-shrink-0" />
                  <span className="line-clamp-1">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={16} className="text-warning fill-current" />
            <span className="text-sm font-medium text-foreground">{product?.rating}</span>
            <span className="text-sm text-muted-foreground">({product?.reviews})</span>
          </div>
          
          {product?.inStock ? (
            <span className="text-sm text-accent font-medium">In Stock</span>
          ) : (
            <span className="text-sm text-destructive font-medium">Out of Stock</span>
          )}
        </div>
        
        <Button
          variant="default"
          size="sm"
          fullWidth
          iconName="MessageCircle"
          iconPosition="left"
          onClick={handleWhatsAppOrder}
          disabled={!product?.inStock}
        >
          Order via WhatsApp
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;