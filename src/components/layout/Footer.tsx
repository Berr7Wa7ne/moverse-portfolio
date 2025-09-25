import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {
  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Project', href: '/project' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  const socialIcons = [
    { name: 'Facebook', icon: 'F' },
    { name: 'Twitter', icon: 'T' },
    { name: 'LinkedIn', icon: 'L' },
    { name: 'Instagram', icon: 'I' },
  ];

  return (
    <footer className="bg-[var(--primary-blue)] text-white">
      <div className="container">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/moverse logo.png"
                alt="Moverse Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <span className="text-xl font-bold">IT Company</span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              We transform ideas into digital reality with cutting-edge technology and creative solutions. 
              Your success is our mission.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-2 text-sm text-white/80">
              <p>123 Business Street</p>
              <p>Tech City, TC 12345</p>
              <p>Phone: 1-800-234-5678</p>
              <p>Email: info@company.com</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="space-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-white/80 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Download App */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Download App</h3>
            <div className="space-y-3">
              <button className="w-full bg-black/20 hover:bg-black/30 transition-colors rounded-lg p-3 flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">
                  <span className="text-xs font-bold">📱</span>
                </div>
                <div className="text-left">
                  <div className="text-xs text-white/60">Download on the</div>
                  <div className="text-sm font-medium">App Store</div>
                </div>
              </button>
              <button className="w-full bg-black/20 hover:bg-black/30 transition-colors rounded-lg p-3 flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">
                  <span className="text-xs font-bold">📱</span>
                </div>
                <div className="text-left">
                  <div className="text-xs text-white/60">GET IT ON</div>
                  <div className="text-sm font-medium">Google Play</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/20 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            Copyright © 2023 IT Company. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialIcons.map((social) => (
              <button
                key={social.name}
                className="w-8 h-8 bg-white/20 hover:bg-white/30 transition-colors rounded-full flex items-center justify-center text-sm font-medium"
              >
                {social.icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


