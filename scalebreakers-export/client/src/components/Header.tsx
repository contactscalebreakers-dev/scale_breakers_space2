import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { APP_LOGO, APP_TITLE } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Menu, X, Instagram, Facebook, Mail } from "lucide-react";
import { useState } from "react";
import GlitchTitle from "./GlitchTitle";

export default function Header() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-gray-900 shadow-lg">
      <nav className="container mx-auto px-4 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <img src="/logo-main.png" alt="Scale Breakers" className="h-14 w-auto hover:scale-105 transition" />
        </Link>

        {/* Desktop Navigation - Centered with Glitch Effects */}
        <div className="hidden lg:flex items-center gap-16 flex-1 justify-center px-8">
          {[
            { label: "Workshops", href: "/workshops" },
            { label: "Shop", href: "/shop" },
            { label: "Portfolio", href: "/portfolio" },
            { label: "Mural Service", href: "/mural-service" },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="relative group">
              <span className="nav-link text-xs font-bold tracking-[0.15em] uppercase text-gray-900 hover:text-blue-600 transition">
                {link.label}
              </span>
              {/* Underline animation */}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </div>

        {/* Auth & Social Links */}
        <div className="hidden lg:flex items-center gap-8">
          {/* Social Media Icons */}
          <div className="flex gap-5">
            <a 
              href="https://instagram.com/scale.breakers" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-700 hover:text-blue-600 transition transform hover:scale-110"
              title="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://www.facebook.com/TheScaleBreakers/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-700 hover:text-blue-600 transition transform hover:scale-110"
              title="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a 
              href="mailto:contact.scalebreakers@gmail.com" 
              className="text-gray-700 hover:text-blue-600 transition transform hover:scale-110"
              title="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Auth */}
          {user ? (
            <>
              <span className="text-xs font-semibold text-gray-600">{user.name}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => logout()}
                className="text-xs font-bold"
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              onClick={() => window.location.href = getLoginUrl()}
              className="text-xs font-bold bg-blue-600 hover:bg-blue-700"
            >
              Login
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t-2 border-gray-900 p-6 space-y-4">
          {[
            { label: "Workshops", href: "/workshops" },
            { label: "Shop", href: "/shop" },
            { label: "Portfolio", href: "/portfolio" },
            { label: "Mural Service", href: "/mural-service" },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="block text-sm font-bold tracking-wide uppercase text-gray-900 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded transition">
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t-2 border-gray-200 space-y-4">
            {/* Mobile Social Icons */}
            <div className="flex gap-4">
              <a 
                href="https://instagram.com/scale.breakers" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-700 hover:text-blue-600 transition"
                title="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.facebook.com/TheScaleBreakers/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-700 hover:text-blue-600 transition"
                title="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="mailto:contact.scalebreakers@gmail.com" 
                className="text-gray-700 hover:text-blue-600 transition"
                title="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

            {/* Mobile Auth */}
            {user ? (
              <>
                <p className="text-xs text-gray-600 font-semibold">{user.name}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => logout()}
                  className="w-full text-xs font-bold"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                onClick={() => window.location.href = getLoginUrl()}
                className="w-full text-xs font-bold bg-blue-600 hover:bg-blue-700"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

