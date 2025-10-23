import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductEMICard = ({ onCalculateForProduct }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const featuredProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      price: 1199,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
      category: "Mobile",
      features: ["256GB Storage", "Pro Camera System", "Titanium Design"]
    },
    {
      id: 2,
      name: "Samsung 65\" QLED TV",
      price: 1899,
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
      category: "Appliance",
      features: ["4K QLED Display", "Smart TV", "HDR10+"]
    },
    {
      id: 3,
      name: "MacBook Pro 16\"",
      price: 2499,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
      category: "Electronics",
      features: ["M3 Pro Chip", "32GB RAM", "1TB SSD"]
    },
    {
      id: 4,
      name: "LG French Door Refrigerator",
      price: 2299,
      image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=400&fit=crop",
      category: "Appliance",
      features: ["28 cu ft", "InstaView Door", "Smart Cooling"]
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    })?.format(amount);
  };

  const calculateQuickEMI = (price, months = 24, rate = 12) => {
    const monthlyRate = rate / 100 / 12;
    const emi = (price * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  const handleCalculateEMI = (product) => {
    onCalculateForProduct(product?.price);
    setSelectedProduct(product);
  };

  const handleWhatsAppOrder = (product) => {
    const message = encodeURIComponent(`Hi! I'm interested in ${product?.name} priced at ${formatCurrency(product?.price)}. Can you help me with EMI options?`);
    window.open(`https://wa.me/919370412299?text=${message}`, '_blank');
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Calculate EMI for Products</h3>
          <p className="text-sm text-muted-foreground">Select a product to calculate EMI instantly</p>
        </div>
        <Icon name="ShoppingBag" size={24} className="text-primary" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {featuredProducts?.map((product) => (
          <div 
            key={product?.id} 
            className={`border rounded-lg p-4 transition-smooth hover:shadow-elevation-1 ${
              selectedProduct?.id === product?.id ? 'border-primary bg-primary/5' : 'border-border'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-sm font-medium text-foreground truncate">{product?.name}</h4>
                    <span className="inline-block px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md mt-1">
                      {product?.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">{formatCurrency(product?.price)}</p>
                    <p className="text-xs text-muted-foreground">
                      EMI from {formatCurrency(calculateQuickEMI(product?.price))}/mo
                    </p>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {product?.features?.slice(0, 2)?.map((feature, index) => (
                      <span key={index} className="text-xs text-muted-foreground">
                        {feature}{index < 1 && ' •'}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Calculator"
                    onClick={() => handleCalculateEMI(product)}
                    className="flex-1"
                  >
                    Calculate EMI
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    iconName="MessageCircle"
                    onClick={() => handleWhatsAppOrder(product)}
                  >
                    Order
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Info" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Product Selected</span>
          </div>
          <p className="text-sm text-foreground">
            EMI calculation will be performed for <strong>{selectedProduct?.name}</strong> with price <strong>{formatCurrency(selectedProduct?.price)}</strong>. 
            Use the calculator above to customize your EMI plan.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductEMICard;