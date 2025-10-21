import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, loading, onWhatsAppOrder, onProductClick }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)]?.map((_, index) => (
          <div key={index} className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="h-48 bg-muted animate-pulse"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-muted rounded animate-pulse"></div>
              <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
              <div className="h-6 bg-muted rounded w-1/2 animate-pulse"></div>
              <div className="h-8 bg-muted rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products?.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
          <span className="text-2xl">📱</span>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No Products Found</h3>
        <p className="text-muted-foreground">Try adjusting your category filter to see more products.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products?.map((product) => (
        <ProductCard
          key={product?.id}
          product={product}
          onWhatsAppOrder={onWhatsAppOrder}
          onProductClick={onProductClick}
        />
      ))}
    </div>
  );
};

export default ProductGrid;