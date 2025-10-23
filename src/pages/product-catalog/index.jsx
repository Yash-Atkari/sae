import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ProductsPage from './components/ProductsPage';

const ProductCatalog = () => {
  return (
    <>
      <Helmet>
        <title>Sahil Mobiles & Enterprises – Premium Electronics & Smartphones on Easy EMI</title>
        <meta name="description" content="Browse our extensive collection of electronics and appliances. Find the best deals on mobiles, TVs, refrigerators, and more with easy WhatsApp ordering." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <ProductsPage />
        </main>
      </div>
    </>
  );
};

export default ProductCatalog;