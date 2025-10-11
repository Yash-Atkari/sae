import React from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ searchQuery, onSearchChange, onClearSearch }) => {
  return (
    <div className="bg-card rounded-lg p-4 mb-6 border border-border">
      <div className="flex items-center space-x-3">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search for mobiles, appliances, brands..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full"
          />
        </div>
        {searchQuery && (
          <Button
            variant="outline"
            size="sm"
            iconName="X"
            onClick={onClearSearch}
          >
            Clear
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;