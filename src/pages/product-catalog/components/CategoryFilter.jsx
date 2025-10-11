import React from 'react';
import Button from '../../../components/ui/Button';

const CategoryFilter = ({ activeCategory, onCategoryChange, productCounts }) => {
  const categories = [
    { id: 'all', label: 'All Products', count: productCounts?.all },
    { id: 'mobiles', label: 'Mobiles', count: productCounts?.mobiles },
    { id: 'appliances', label: 'Appliances', count: productCounts?.appliances }
  ];

  return (
    <div className="bg-card rounded-lg p-4 mb-6 border border-border">
      <h2 className="text-lg font-semibold text-foreground mb-4">Product Categories</h2>
      <div className="flex flex-wrap gap-2">
        {categories?.map((category) => (
          <Button
            key={category?.id}
            variant={activeCategory === category?.id ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category?.id)}
            className="flex items-center space-x-2"
          >
            <span>{category?.label}</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              activeCategory === category?.id 
                ? 'bg-primary-foreground text-primary' 
                : 'bg-muted text-muted-foreground'
            }`}>
              {category?.count}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;