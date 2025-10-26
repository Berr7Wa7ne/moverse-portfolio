'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import RippleButton from '../ui/RippleButton';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // ✅ get current route

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Our Works', href: '/projects' },
    { label: 'Blogs', href: '/blog' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between py-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/moverse logo.png"
              alt="Moverse Logo"
              width={120}
              height={120}
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-2xl font-medium transition-all duration-300 relative group
                    ${
                      isActive
                        ? 'text-[var(--accent-blue)] underline underline-offset-8 decoration-[3px] decoration-[var(--accent-blue)]'
                        : 'text-[var(--gray-700)] hover:text-[var(--accent-blue)] hover:scale-105'
                    }`}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--accent-blue)] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <RippleButton variant="primary" className="inline-flex items-center gap-2">
              <span>Get a Quote</span>
              <ArrowRight className="w-5 h-5" />
            </RippleButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex flex-col gap-1 w-6 h-6"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span
              className={`w-full h-0.5 bg-[var(--gray-700)] transition-transform ${
                isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
            ></span>
            <span
              className={`w-full h-0.5 bg-[var(--gray-700)] transition-opacity ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            ></span>
            <span
              className={`w-full h-0.5 bg-[var(--gray-700)] transition-transform ${
                isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`font-medium transition-all duration-300 ${
                      isActive
                        ? 'text-[var(--accent-blue)] underline underline-offset-8 decoration-[3px] decoration-[var(--accent-blue)]'
                        : 'text-[var(--gray-700)] hover:text-[var(--accent-blue)] hover:scale-105'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <RippleButton variant="primary" className="inline-flex items-center justify-center gap-2 mt-2">
                <span>Get a Quote</span>
                <ArrowRight className="w-5 h-5" />
              </RippleButton>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
