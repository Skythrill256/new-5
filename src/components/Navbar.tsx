
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowRight } from "lucide-react";
import { AuthDialog } from "./Auth";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent background scrolling when menu is open
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = '';
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 pt-2 sm:py-3 md:pt-4 md:pb-0 transition-all duration-300",
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <a 
          href="#" 
          className="flex items-center space-x-2"
          onClick={(e) => {
            e.preventDefault();
            scrollToTop();
          }}
          aria-label="Pulse Robot"
        >
          <img 
            src="https://res.cloudinary.com/dhjzu51mb/image/upload/v1747414029/bl6hrupybi6hqqrbfkib.png" 
            alt="Pulse Robot Logo" 
            className="h-12 sm:h-14" // Further increased from h-10 sm:h-12 to h-12 sm:h-14
          />
        </a>

        {/* Desktop Navigation - Added hover-underline-animation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a 
            href="#" 
            className={cn("nav-link font-montserrat font-medium hover-underline-animation", !isScrolled && "text-black")}
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
          >
            Pebbling Protocol
          </a>
          <a href="#features" className={cn("nav-link font-montserrat font-medium hover-underline-animation", !isScrolled && "text-black")}>Hibiscus</a>
          <a href="#details" className={cn("nav-link font-montserrat font-medium hover-underline-animation", !isScrolled && "text-black")}>Community</a>
          <a href="#details" className={cn("nav-link font-montserrat font-medium hover-underline-animation", !isScrolled && "text-black")}>Articles</a>
          <a href="#details" className={cn("nav-link font-montserrat font-medium hover-underline-animation", !isScrolled && "text-black")}>Docs</a>
          <a href="#details" className={cn("nav-link font-montserrat font-medium hover-underline-animation", !isScrolled && "text-black")}>Network Status</a>
          <a href="#details" className={cn("nav-link font-montserrat font-medium hover-underline-animation", !isScrolled && "text-black")}>Network</a>
          
          <AuthDialog view="sign-up">
            <button 
              className="bg-gradient-to-r from-gray-700 to-zinc-900 flex items-center justify-center group ml-4" 
              style={{
                borderRadius: '1440px',
                boxSizing: 'border-box',
                color: '#FFFFFF',
                cursor: 'pointer',
                fontSize: '14px',
                lineHeight: '20px',
                padding: '10px 20px',
                border: '1px solid white',
              }}
            >
              Sign Up
              <ArrowRight className="ml-2 w-0 h-0 transition-all group-hover:w-4 group-hover:h-4" />
            </button>
          </AuthDialog>
        </nav>

        {/* Mobile menu button */}
        <button 
          className={cn("md:hidden p-3 focus:outline-none", !isScrolled ? "text-black" : "text-gray-700")}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation - Added hover-underline-animation class */}
      <div className={cn(
        "fixed inset-0 z-40 bg-white flex flex-col pt-16 px-6 md:hidden transition-all duration-300 ease-in-out",
        isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
      )}>
        <nav className="flex flex-col space-y-8 items-center mt-8">
          <a 
            href="#" 
            className="text-xl font-montserrat font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100 hover-underline-animation" 
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            Home
          </a>
          <a 
            href="#features" 
            className="text-xl font-montserrat font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100 hover-underline-animation" 
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            About
          </a>
          <a 
            href="#details" 
            className="text-xl font-montserrat font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100 hover-underline-animation" 
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            Contact
          </a>
          
          <AuthDialog view="sign-up">
            <button 
              className="bg-gradient-to-r from-gray-700 to-zinc-900 text-white font-montserrat font-medium py-3 px-6 w-full text-center rounded-full mt-4 flex items-center justify-center"
              onClick={() => {
                // The dialog will handle the auth flow
                // We just need to close the mobile menu when clicked
                setIsMenuOpen(false);
                document.body.style.overflow = '';
              }}
            >
              Sign Up
            </button>
          </AuthDialog>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
