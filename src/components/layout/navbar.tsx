"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, LogIn, Menu, X } from "lucide-react";

const navigation = [
  { label: "Beranda", href: "/#home" },
  { label: "Tentang Kami", href: "/#about" },
  { label: "Menu", href: "/#menu" },
  { label: "Lokasi", href: "/#locations" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className='sticky top-0 z-50 w-full border-b border-border/60 bg-background/90 backdrop-blur-xl'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-[72px] sm:px-6 lg:px-8'>
        <Link
          href='/'
          onClick={closeMenu}
          className='group flex shrink-0 items-center gap-3'
          aria-label='Kopilogi — Beranda'
        >
          <div className='relative size-10 overflow-hidden rounded-xl'>
            <Image
              src='/logo/kopilogi-no-bg.png'
              alt='Logo Kopilogi'
              fill
              sizes='40px'
              className='object-contain transition-transform duration-300 group-hover:scale-105'
              priority
            />
          </div>

          <div className='hidden sm:block'>
            <p className='text-sm font-bold tracking-[0.18em] sm:text-base'>KOPILOGI</p>
            <p className='mt-0.5 text-[10px] uppercase tracking-[0.16em] text-muted-foreground'>
              Kopi & Momen Baik
            </p>
          </div>
        </Link>

        <nav className='hidden items-center gap-7 lg:flex xl:gap-9' aria-label='Navigasi utama'>
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className='text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground'
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className='hidden items-center gap-2 lg:flex'>
          <Link
            href='/login'
            className='inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground'
          >
            <LogIn className='size-4' />
            Masuk
          </Link>

          <Link
            href='/menu'
            className='group inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90'
          >
            Lihat Menu
            <ArrowUpRight className='size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
          </Link>
        </div>

        <button
          type='button'
          onClick={() => setIsMenuOpen((open) => !open)}
          className='inline-flex size-10 items-center justify-center rounded-full border border-border/80 transition-colors hover:bg-muted lg:hidden'
          aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={isMenuOpen}
          aria-controls='mobile-navigation'
        >
          {isMenuOpen ? <X className='size-5' /> : <Menu className='size-5' />}
        </button>
      </div>

      {isMenuOpen && (
        <div id='mobile-navigation' className='border-t border-border/60 bg-background lg:hidden'>
          <nav
            className='mx-auto flex max-w-7xl flex-col px-5 py-4 sm:px-6'
            aria-label='Navigasi seluler'
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className='border-b border-border/60 py-4 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground'
              >
                {item.label}
              </Link>
            ))}

            <Link
              href='/login'
              onClick={closeMenu}
              className='mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border text-sm font-medium transition-colors hover:bg-muted'
            >
              <LogIn className='size-4' />
              Masuk
            </Link>

            <Link
              href='/menu'
              onClick={closeMenu}
              className='mt-3 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90'
            >
              Lihat Menu
              <ArrowUpRight className='size-4' />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
