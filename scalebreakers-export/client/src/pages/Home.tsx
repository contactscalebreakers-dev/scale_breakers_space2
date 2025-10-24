import { Link } from "wouter";
import Header from "@/components/Header";
import { ArrowRight, Palette, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import GlitchTitle from "@/components/GlitchTitle";
import NewsletterSignup from "@/components/NewsletterSignup";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section - Creative & Bold */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white py-24 md:py-40">
        {/* Background distortion effect */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Main Title with Creative Styling */}
            <div className="mb-8">
              <GlitchTitle as="h1" className="hero-title text-6xl md:text-8xl lg:text-9xl font-black text-black mb-2 leading-none">
                Scale Breakers.
              </GlitchTitle>
              <div className="h-1 w-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mx-auto mb-8"></div>
            </div>

            {/* Slogan with Creative Typography */}
            <p className="hero-slogan text-lg md:text-2xl lg:text-3xl text-gray-700 mb-6 font-light">
              Break The Mold. Make Art.
            </p>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Discover creative workshops, unique art pieces, and innovative design. 
              Join Scale Breakers and explore your artistic potential.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/workshops">
                <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-base">
                  Explore Workshops <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/shop">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-gray-900 font-bold text-base hover:bg-gray-50">
                  Visit Shop
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <GlitchTitle className="text-4xl md:text-5xl font-black text-center mb-16">What We Offer</GlitchTitle>
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/workshops">
              <div className="bg-white p-10 rounded-xl border-2 border-gray-300 hover:border-blue-600 hover:shadow-2xl transition duration-300 cursor-pointer h-full transform hover:-translate-y-2">
                <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <GlitchTitle as="h3" className="text-2xl font-black mb-4">Creative Workshops</GlitchTitle>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Fortnightly creative workshops covering various artistic disciplines. Learn from experienced artists and connect with the community.
                </p>
                <span className="text-blue-600 font-bold flex items-center gap-2 hover:gap-3 transition">
                  View Workshops <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            <Link href="/shop">
              <div className="bg-white p-10 rounded-xl border-2 border-gray-300 hover:border-purple-600 hover:shadow-2xl transition duration-300 cursor-pointer h-full transform hover:-translate-y-2">
                <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <Palette className="w-8 h-8 text-purple-600" />
                </div>
                <GlitchTitle as="h3" className="text-2xl font-black mb-4">Unique Artwork</GlitchTitle>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Explore original one-of-one pieces including canvases, 3D models, urban street dioramas, and custom creations.
                </p>
                <span className="text-purple-600 font-bold flex items-center gap-2 hover:gap-3 transition">
                  Shop Now <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            <Link href="/mural-service">
              <div className="bg-white p-10 rounded-xl border-2 border-gray-300 hover:border-pink-600 hover:shadow-2xl transition duration-300 cursor-pointer h-full transform hover:-translate-y-2">
                <div className="bg-pink-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <Zap className="w-8 h-8 text-pink-600" />
                </div>
                <GlitchTitle as="h3" className="text-2xl font-black mb-4">Custom Murals</GlitchTitle>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Commission personalized murals for your space. From concept to completion, we bring your vision to life.
                </p>
                <span className="text-pink-600 font-bold flex items-center gap-2 hover:gap-3 transition">
                  Request Mural <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <GlitchTitle className="text-4xl md:text-5xl font-black text-center mb-6">Featured Work</GlitchTitle>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto text-lg">
            Explore our portfolio of completed projects and artistic creations
          </p>
          <div className="text-center">
            <Link href="/portfolio">
              <Button size="lg" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-base">
                View Full Portfolio <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-900 text-white py-20 md:py-28">
        <div className="container mx-auto px-4">
          <NewsletterSignup variant="full" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h4 className="font-black text-lg mb-4 uppercase tracking-widest">Scale Breakers</h4>
              <p className="text-gray-400 text-sm leading-relaxed">Break the mold. Make art. Explore your creative potential with Scale Breakers.</p>
            </div>
            <div>
              <h4 className="font-black text-lg mb-4 uppercase tracking-widest">Explore</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/workshops" className="text-gray-400 hover:text-white transition">Workshops</Link></li>
                <li><Link href="/shop" className="text-gray-400 hover:text-white transition">Shop</Link></li>
                <li><Link href="/portfolio" className="text-gray-400 hover:text-white transition">Portfolio</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-lg mb-4 uppercase tracking-widest">Services</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/mural-service" className="text-gray-400 hover:text-white transition">Mural Service</Link></li>
                <li><Link href="/mural-service" className="text-gray-400 hover:text-white transition">Custom Orders</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-lg mb-4 uppercase tracking-widest">Connect</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="https://instagram.com/scale.breakers" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">Instagram</a></li>
                <li><a href="https://www.facebook.com/TheScaleBreakers/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">Facebook</a></li>
                <li><a href="mailto:contact.scalebreakers@gmail.com" className="text-gray-400 hover:text-white transition">Email</a></li>
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

