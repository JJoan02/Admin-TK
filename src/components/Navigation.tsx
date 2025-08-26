'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/', icon: '🏠' },
    { name: 'Servidores', href: '/servers', icon: '🖥️' },
    { name: 'Bots', href: '/bots', icon: '🤖' },
    { name: 'Tienda', href: '/store', icon: '🛒' },
    { name: 'TK-Coins', href: '/coins', icon: '💰' },
    { name: 'Perfil', href: '/profile', icon: '👤' },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="desktop-nav">
        <div className="nav-container">
          <Link href="/" className="nav-logo">
            <span className="logo-text">TK-HOST</span>
            <span className="logo-badge">PREMIUM</span>
          </Link>
          
          <div className="nav-links">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="nav-link"
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="nav-actions">
            <button className="btn-primary">Iniciar Sesión</button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="mobile-nav">
        <div className="mobile-header">
          <Link href="/" className="nav-logo">
            <span className="logo-text">TK-HOST</span>
          </Link>
          <button
            className="mobile-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="mobile-link"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-text">{item.name}</span>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <style jsx>{`
        .desktop-nav {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(26, 26, 26, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0, 188, 212, 0.2);
          z-index: 1000;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 70px;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: white;
          font-weight: 800;
          font-size: 1.5rem;
        }

        .logo-badge {
          background: linear-gradient(135deg, #00bcd4, #0097a7);
          color: white;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .nav-links {
          display: flex;
          gap: 32px;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: #b3b3b3;
          font-weight: 500;
          transition: all 0.3s ease;
          padding: 8px 16px;
          border-radius: 8px;
        }

        .nav-link:hover {
          color: #00bcd4;
          background: rgba(0, 188, 212, 0.1);
          transform: translateY(-2px);
        }

        .nav-icon {
          font-size: 1.2rem;
        }

        .btn-primary {
          background: linear-gradient(135deg, #00bcd4, #0097a7);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 188, 212, 0.3);
        }

        .mobile-nav {
          display: block;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(26, 26, 26, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0, 188, 212, 0.2);
          z-index: 1000;
        }

        .mobile-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
        }

        .mobile-toggle {
          display: flex;
          flex-direction: column;
          gap: 4px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
        }

        .mobile-toggle span {
          width: 24px;
          height: 2px;
          background: #00bcd4;
          transition: all 0.3s ease;
        }

        .mobile-menu {
          background: rgba(26, 26, 26, 0.98);
          border-top: 1px solid rgba(0, 188, 212, 0.2);
        }

        .mobile-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 24px;
          text-decoration: none;
          color: #b3b3b3;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .mobile-link:hover {
          background: rgba(0, 188, 212, 0.1);
          color: #00bcd4;
        }

        @media (min-width: 768px) {
          .desktop-nav {
            display: block;
          }
          .mobile-nav {
            display: none;
          }
        }

        .main-content {
          padding-top: 70px;
          min-height: 100vh;
        }
      `}</style>
    </>
  );
}
