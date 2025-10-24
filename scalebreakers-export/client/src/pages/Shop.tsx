import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { ShoppingCart, Loader, Filter } from "lucide-react";
import { Link } from "wouter";
import GlitchTitle from "@/components/GlitchTitle";

const CATEGORIES = [
  { id: "all", label: "All Products" },
  { id: "workshop", label: "Workshops" },
  { id: "canvas", label: "Canvases" },
  { id: "3d-model", label: "3D Models" },
  { id: "diorama", label: "Dioramas" },
  { id: "other", label: "Other" },
];

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { data: products, isLoading } = trpc.products.list.useQuery({
    category: selectedCategory === "all" ? undefined : selectedCategory,
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <GlitchTitle as="h1" className="text-4xl md:text-5xl font-bold mb-4">Shop</GlitchTitle>
          <p className="text-lg text-gray-600">
            Discover unique artwork, 3D models, dioramas, and creative pieces. Each item is carefully crafted with artistic vision and attention to detail.
          </p>
        </div>
      </section>

      {/* Shop Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Categories */}
            <div className="lg:w-48 flex-shrink-0">
              <div className="bg-gray-50 p-6 rounded-lg sticky top-20">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`block w-full text-left px-4 py-2 rounded-lg transition ${
                        selectedCategory === category.id
                          ? "bg-black text-white font-medium"
                          : "text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Loader className="w-8 h-8 animate-spin text-gray-400" />
                </div>
              ) : products && products.length > 0 ? (
                <>
                  <p className="text-gray-600 mb-6">
                    Showing {products.length} product{products.length !== 1 ? "s" : ""}
                  </p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
                      >
                        {product.imageUrl && (
                          <div className="relative overflow-hidden bg-gray-100 h-64">
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-full h-full object-cover hover:scale-105 transition duration-300"
                            />
                            {product.isOneOfOne === "true" && (
                              <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                                ✦ One of a Kind
                              </div>
                            )}
                          </div>
                        )}
                        <div className="p-6">
                          <h3 className="text-lg font-bold mb-2 line-clamp-2">{product.name}</h3>
                          {product.description && (
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                              {product.description}
                            </p>
                          )}

                          <div className="mb-4 flex items-center justify-between">
                            <div>
                              <p className="text-2xl font-bold text-black">
                                ${product.price}
                              </p>
                            </div>
                            {product.stock && parseInt(product.stock) > 0 && (
                              <p className="text-xs text-gray-500 text-right">
                                {product.stock} in stock
                              </p>
                            )}
                          </div>

                          <Button 
                            className="w-full flex items-center justify-center gap-2"
                            disabled={!product.stock || parseInt(product.stock) === 0}
                          >
                            <ShoppingCart className="w-4 h-4" />
                            {product.stock && parseInt(product.stock) > 0 ? "Add to Cart" : "Out of Stock"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-4">No products in this category.</p>
                  <p className="text-gray-500">Check back soon for new items!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-4">Scale Breakers</h4>
              <p className="text-gray-400 text-sm">Break the mold. Make art.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Explore</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/workshops"><span className="hover:text-white">Workshops</span></Link></li>
                <li><Link href="/shop"><span className="hover:text-white">Shop</span></Link></li>
                <li><Link href="/portfolio"><span className="hover:text-white">Portfolio</span></Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/mural-service"><span className="hover:text-white">Mural Service</span></Link></li>
                <li><Link href="/mural-service"><span className="hover:text-white">Custom Orders</span></Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="https://instagram.com/scale.breakers" target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a></li>
                <li><a href="https://www.facebook.com/TheScaleBreakers/" target="_blank" rel="noopener noreferrer" className="hover:text-white">Facebook</a></li>
                <li><a href="mailto:contact.scalebreakers@gmail.com" className="hover:text-white">Email</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Scale Breakers. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

