import React from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ProductDetailModal = ({ product, isOpen, onClose, onWhatsAppOrder }) => {
  if (!isOpen || !product) return null;

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

  const handleWhatsAppOrder = () => {
    onWhatsAppOrder?.(product);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-0 animate-in fade-in"
      onClick={handleBackdropClick}
    >
      {/* Full screen modal for all devices */}
      <div className="bg-card w-full h-full overflow-y-auto animate-in fade-in duration-300 flex flex-col">
        
        {/* Header - Sticky */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-foreground">Product Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <Icon name="X" size={20} className="text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Image Section */}
          <div className="relative">
            <div className="aspect-square bg-muted">
              <Image
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
                fallback="/images/placeholder-product.jpg"
              />
            </div>
            <div className="absolute top-3 left-3 flex flex-col space-y-2">
              {isNewProduct() && (
                <div className="bg-accent text-accent-foreground px-3 py-1.5 rounded-full text-xs font-medium shadow-sm">
                  New
                </div>
              )}
              {product.discount > 0 && (
                <div className="bg-destructive text-destructive-foreground px-3 py-1.5 rounded-full text-xs font-medium shadow-sm">
                  -{product.discount}% OFF
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4 space-y-4">
            {/* Title and Category */}
            <div>
              <h1 className="text-xl font-bold text-foreground mb-1">
                {product.name}
              </h1>
              {product.category && (
                <span className="text-sm text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                  {product.category}
                </span>
              )}
            </div>

            {/* Pricing */}
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              {product.original_price && product.original_price > product.price && (
                <>
                  <span className="text-base text-muted-foreground line-through">
                    {formatPrice(product.original_price)}
                  </span>
                  {product.discount > 0 && (
                    <span className="text-sm bg-accent text-accent-foreground px-2 py-1 rounded">
                      Save {formatPrice(product.original_price - product.price)}
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={isInStock() ? "CheckCircle" : "XCircle"} 
                  size={18} 
                  className={isInStock() ? "text-accent" : "text-destructive"} 
                />
                <span className={`font-medium ${isInStock() ? 'text-accent' : 'text-destructive'}`}>
                  {isInStock() ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                {product.stock || 0} available
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Description</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {product.description}
                </p>
              </div>
            )}

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Icon name="Check" size={16} className="text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Specifications</h3>
                <div className="space-y-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b border-border pb-2">
                      <span className="text-muted-foreground text-sm font-medium">{key}:</span>
                      <span className="text-foreground text-sm text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Images */}
            {product.additional_images?.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">More Images</h3>
                <div className="grid grid-cols-3 gap-2">
                  {product.additional_images.map((img, index) => (
                    <div key={index} className="aspect-square rounded-md overflow-hidden border border-border">
                      <Image
                        src={img}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons - Sticky Bottom */}
        <div className="p-4 border-t border-border bg-card/80 backdrop-blur-sm sticky bottom-0 space-y-2">
          <Button
            variant="default"
            size="lg"
            iconName="MessageCircle"
            iconPosition="left"
            onClick={handleWhatsAppOrder}
            disabled={!isInStock()}
            className="w-full"
          >
            {isInStock() ? 'Order via WhatsApp' : 'Out of Stock'}
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={onClose}
            className="w-full"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
