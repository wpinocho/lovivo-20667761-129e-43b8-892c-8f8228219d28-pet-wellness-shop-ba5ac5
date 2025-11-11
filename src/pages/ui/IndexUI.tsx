import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { CollectionCard } from '@/components/CollectionCard';
import { FloatingCart } from '@/components/FloatingCart';
import { NewsletterSection } from '@/components/NewsletterSection';
import { EcommerceTemplate } from '@/templates/EcommerceTemplate';
import { PetSelector } from '@/components/PetSelector';
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex';
import { ArrowRight } from 'lucide-react';
import heroPets from '@/assets/hero-pets.jpg';

/**
 * EDITABLE UI - IndexUI
 * 
 * Minimal Japanese-style pet wellness store homepage
 */

interface IndexUIProps {
  logic: UseIndexLogicReturn;
}

export const IndexUI = ({ logic }: IndexUIProps) => {
  const {
    collections,
    loading,
    loadingCollections,
    selectedCollectionId,
    filteredProducts,
    handleViewCollectionProducts,
    handleShowAllProducts,
  } = logic;

  const scrollToProducts = () => {
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <EcommerceTemplate showCart={true}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground tracking-wider uppercase">
                  Premium Pet Wellness
                </p>
                <h1 className="text-5xl lg:text-6xl font-light text-foreground leading-tight">
                  Nourish Your
                  <br />
                  <span className="font-medium">Best Friend</span>
                </h1>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Carefully curated, science-backed nutrition and supplements for your pet's optimal health and happiness.
              </p>
              <div className="flex gap-4 pt-4">
                <Button size="lg" onClick={scrollToProducts} className="group">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" onClick={scrollToProducts}>
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={heroPets}
                  alt="Happy pets"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-secondary/90 backdrop-blur-sm p-6 rounded-lg shadow-lg max-w-xs">
                <p className="text-sm font-medium text-foreground">
                  ✓ 100% Natural Ingredients
                </p>
                <p className="text-sm font-medium text-foreground mt-2">
                  ✓ Veterinarian Approved
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pet Selector Section */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-foreground mb-3">
              Personalized Recommendations
            </h2>
            <p className="text-muted-foreground">
              Tell us about your pet and we'll help you find the perfect products
            </p>
          </div>
          <PetSelector onSelect={scrollToProducts} />
        </div>
      </section>

      {/* Collections Section */}
      {!loadingCollections && collections.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-foreground mb-3">
                Shop by Category
              </h2>
              <p className="text-muted-foreground">
                Explore our curated collections of premium pet products
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {collections.map((collection) => (
                <CollectionCard 
                  key={collection.id} 
                  collection={collection} 
                  onViewProducts={handleViewCollectionProducts} 
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Section */}
      <section id="products-section" className="py-20 bg-muted/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-light text-foreground mb-2">
                {selectedCollectionId 
                  ? collections.find(c => c.id === selectedCollectionId)?.name || 'Products'
                  : 'Featured Products'
                }
              </h2>
              <p className="text-muted-foreground">
                Premium nutrition for every life stage
              </p>
            </div>
            {selectedCollectionId && (
              <Button 
                variant="outline" 
                onClick={handleShowAllProducts}
              >
                View All
              </Button>
            )}
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-card rounded-lg h-96 animate-pulse"></div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                No products available yet.
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                Check back soon for premium pet products!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />

      <FloatingCart />
    </EcommerceTemplate>
  );
};
