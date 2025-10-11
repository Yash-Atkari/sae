import React from 'react';
import Button from '../../../components/ui/Button';


const SortFilter = ({ sortBy, onSortChange, viewMode, onViewModeChange }) => {
  const sortOptions = [
    { value: 'name', label: 'Name A-Z', icon: 'ArrowUpAZ' },
    { value: 'price-low', label: 'Price: Low to High', icon: 'ArrowUp' },
    { value: 'price-high', label: 'Price: High to Low', icon: 'ArrowDown' },
    { value: 'rating', label: 'Highest Rated', icon: 'Star' },
    { value: 'newest', label: 'Newest First', icon: 'Clock' }
  ];

  const viewModes = [
    { value: 'grid', icon: 'Grid3X3' },
    { value: 'list', icon: 'List' }
  ];

  return (
    <div className="bg-card rounded-lg p-4 mb-6 border border-border">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-foreground">Sort by:</span>
          <div className="flex flex-wrap gap-2">
            {sortOptions?.map((option) => (
              <Button
                key={option?.value}
                variant={sortBy === option?.value ? "default" : "outline"}
                size="sm"
                iconName={option?.icon}
                iconPosition="left"
                onClick={() => onSortChange(option?.value)}
              >
                {option?.label}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-foreground">View:</span>
          <div className="flex space-x-1">
            {viewModes?.map((mode) => (
              <Button
                key={mode?.value}
                variant={viewMode === mode?.value ? "default" : "outline"}
                size="icon"
                iconName={mode?.icon}
                onClick={() => onViewModeChange(mode?.value)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortFilter;