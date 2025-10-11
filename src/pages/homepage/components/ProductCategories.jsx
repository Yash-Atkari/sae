import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductCategories = ({ trackButtonClick }) => {
  const handleCategoryClick = (categoryName) => {
    trackButtonClick?.(`View ${categoryName}`, 'Product Categories');
  };

  const categories = [
    {
      id: 1,
      title: 'Mobile Phones',
      description: 'Latest smartphones with cutting-edge technology',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop',
      itemCount: '150+ Models',
      startingPrice: '$199',
      features: ['5G Ready', 'AI Camera', 'Fast Charging'],
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      id: 2,
      title: 'Home Appliances',
      description: 'Smart appliances for modern living',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
      itemCount: '200+ Products',
      startingPrice: '$299',
      features: ['Energy Efficient', 'Smart Controls', 'Warranty'],
      gradient: 'from-green-500 to-teal-600'
    }
  ];

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
          Shop by Category
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover our extensive collection of electronics and appliances, carefully curated for quality and value
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {categories?.map((category, index) => (
          <div key={index} onClick={() => handleCategoryClick(category?.title)}>
            <div key={category?.id} className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:shadow-elevation-2 transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={category?.image}
                  alt={category?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${category?.gradient} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-sm font-medium text-foreground">{category?.itemCount}</span>
                </div>
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-accent text-accent-foreground rounded-full px-3 py-1">
                  <span className="text-sm font-semibold">From {category?.startingPrice}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">{category?.title}</h3>
                <p className="text-muted-foreground mb-4">{category?.description}</p>
                
                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {category?.features?.map((feature, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground">
                      <Icon name="Check" size={14} className="mr-1" />
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <Link to="/product-catalog" className="flex-1 mr-3">
                    <Button 
                      variant="default" 
                      size="lg"
                      iconName="ArrowRight"
                      iconPosition="right"
                      fullWidth
                    >
                      Browse {category?.title}
                    </Button>
                  </Link>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    iconName="Heart"
                    className="flex-shrink-0"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategories;