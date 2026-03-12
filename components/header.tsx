'use client';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import '../styles/header.css';

const Header = () => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleLocale = () => {
    const currentLocale = pathname.split('/')[1];
    const newLocale = currentLocale === 'sk' ? 'en' : 'sk';
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  };

  useEffect(() => {
    const handleKey = (e: any) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const navLinks = [
    { href: '/', label: t('navbar_home') },
    { href: '/about', label: t('navbar_about') },
    { href: '/gallery', label: t('navbar_gallery') },
    { href: '/contact', label: t('navbar_contact') },
  ];

  return (
    <>
      <header className="fixed right-0 top-0 w-full z-40">
        {/* Inner div handles flex, padding, and visibility */}
        <div className="nav-desktop items-center justify-end gap-4 p-4 bg-transparent backdrop-blur-md">
          {/* Desktop nav links - hidden on small screens */}
          <nav className="nav-desktop flex gap-4">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-white text-sm uppercase relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white hover:after:w-full after:transition-all after:duration-300">
                {link.label}
              </a>
            ))}
          </nav>
          {/* Desktop reservations button - hidden on small screens */}
          <button className="btn-res nav-desktop border border-white text-white text-sm uppercase leading-none  px-5 py-2 hover:bg-white hover:text-black transition-all duration-300">
            {t("navbar_reservations")}
          </button>
          {/* Desktop locale toggle - hidden on small screens */}
          <button onClick={toggleLocale} className="nav-desktop text-white text-sm uppercase hover:text-black cursor-pointer">
            {t("toggle")}
          </button>
        </div>

        {/* Hamburger button - only visible on small screens */}
        <div className='flex items-center justify-end gap-4 p-4'>
          <button
            onClick={() => setIsOpen(true)}
            className="nav-mobile flex-col justify-center gap-1.5 p-4 rounded-md bg-background drop-shadow-2xl"
            aria-label="Open menu"
          >
            <span className="block w-6 h-0.5 bg-black rounded" />
            <span className="block w-6 h-0.5 bg-black rounded" />
            <span className="block w-4 h-0.5 bg-black rounded" />
          </button>
        </div>
      </header>
      
      {/* Mobile menu - only visible when isOpen is true */}
        <div className={`mobile-menu fixed top-0 right-0 bottom-0 w-64 backdrop-blur-2xl shadow-2xl flex flex-col items-center justify-between p-4 gap-6 z-50
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="self-end p-4"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {/* Mobile nav links */}
          <div className='flex flex-col items-center justify-center gap-6'>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-white text-md uppercase" onClick={() => setIsOpen(false)}>
                {link.label}
              </a>
            ))}
          </div>
          {/* Mobile reservations button and locale toggle */}
          <div className='flex flex-col gap-3'>
            <button className="btn-res border border-white text-white text-md uppercase leading-none  px-5 py-2" onClick={() => setIsOpen(false)}>
              {t("navbar_reservations")}
            </button>
            <button onClick={() => { toggleLocale(); setIsOpen(false); }} className="text-white text-md">
              {t("toggle")}
            </button>
          </div>
        </div>
    </>
  );
};

export default Header;