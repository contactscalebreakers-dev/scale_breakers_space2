import { useState } from "react";
import Header from "@/components/Header";
import { trpc } from "@/lib/trpc";
import { Loader, Filter, ExternalLink } from "lucide-react";
import GlitchTitle from "@/components/GlitchTitle";

const CATEGORIES = [
  { id: "all", label: "All Work" },
  { id: "mural", label: "Murals" },
  { id: "3d-model", label: "3D Models" },
  { id: "canvas", label: "Canvases" },
  { id: "diorama", label: "Dioramas" },
  { id: "other", label: "Other" },
];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const { data: portfolioItems, isLoading } = trpc.portfolio.list.useQuery({
    category: selectedCategory === "all" ? undefined : selectedCategory,
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <GlitchTitle as="h1" className="text-4xl md:text-5xl font-bold mb-4">Portfolio</GlitchTitle>
          <p className="text-lg text-gray-600">
            Explore our collection of completed projects and artistic creations. From vibrant murals to intricate 3D models and original canvases.
          </p>
        </div>
      </section>

      {/* Portfolio Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Categories */}
            <div className="lg:w-48 flex-shrink-0">
              <div className="bg-gray-50 p-6 rounded-lg sticky top-20">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter by Type
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

            {/* Portfolio Grid */}
            <div className="flex-1">
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Loader className="w-8 h-8 animate-spin text-gray-400" />
                </div>
              ) : portfolioItems && portfolioItems.length > 0 ? (
                <>
                  <p className="text-gray-600 mb-6">
                    Showing {portfolioItems.length} piece{portfolioItems.length !== 1 ? "s" : ""}
                  </p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {portfolioItems.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
                      >
                        {item.imageUrl && (
                          <div className="relative overflow-hidden h-64 bg-gray-100">
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                            />
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition duration-300 flex items-center justify-center">
                              <ExternalLink className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition" />
                            </div>
                          </div>
                        )}
                        <div className="p-6">
                          <h3 className="text-lg font-bold mb-2 line-clamp-2">{item.title}</h3>
                          {item.description && (
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                              {item.description}
                            </p>
                          )}
                          <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                            {item.category.replace("-", " ")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-4">No portfolio items in this category.</p>
                  <p className="text-gray-500">Check back soon for more work!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Modal for Full View */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedItem.imageUrl && (
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.title}
                className="w-full h-auto"
              />
            )}
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-4">{selectedItem.title}</h2>
              <p className="text-gray-600 mb-6 text-lg">{selectedItem.description}</p>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">
                  Category: {selectedItem.category.replace("-", " ")}
                </p>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                <li><a href="/workshops" className="hover:text-white">Workshops</a></li>
                <li><a href="/shop" className="hover:text-white">Shop</a></li>
                <li><a href="/portfolio" className="hover:text-white">Portfolio</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/mural-service" className="hover:text-white">Mural Service</a></li>
                <li><a href="/mural-service" className="hover:text-white">Custom Orders</a></li>
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

