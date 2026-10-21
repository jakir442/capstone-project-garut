"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import { Container } from "@/components/layout/container";

const slides = [
  {
    src: "/gambar/tempat/kopilogi-cikuray.jpg",
    alt: "Suasana Kopilogi Cikuray",
    name: "Kopilogi Cikuray",
    location: "Garut",
  },
  {
    src: "/gambar/tempat/waroeng-kopilogi.png",
    alt: "Suasana Waroeng Kopilogi",
    name: "Waroeng Kopilogi",
    location: "Garut",
  },
  {
    src: "/gambar/tempat/kopilogi-tasik.png",
    alt: "Suasana Kopilogi Tasik",
    name: "Kopilogi Tasik",
    location: "Tasikmalaya",
  },
];

const SLIDE_INTERVAL = 4000;

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    if (isPaused || prefersReducedMotion || slides.length < 2) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, SLIDE_INTERVAL);

    return () => {
      window.clearInterval(interval);
    };
  }, [isPaused, prefersReducedMotion]);

  const activeSlide = slides[activeIndex];

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  return (
    <section id='home' className='relative overflow-hidden border-b border-border/60 bg-background'>
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute -left-32 top-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl' />
        <div className='absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl' />
      </div>

      <Container className='relative'>
        <div className='grid min-h-[calc(100svh-80px)] items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_0.9fr] lg:gap-16 lg:py-24'>
          {/* Content */}
          <div className='max-w-2xl'>
            <div className='mb-6 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3.5 py-2 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur'>
              <span className='h-1.5 w-1.5 rounded-full bg-foreground' />
              Coffee, food & good moments
            </div>

            <h1 className='text-balance text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl md:text-6xl lg:text-7xl'>
              Tempat untuk
              <span className='block text-muted-foreground'>menikmati cerita.</span>
            </h1>

            <p className='mt-6 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8'>
              Kopilogi hadir dengan kopi, makanan, dan suasana yang dirancang untuk menemani setiap
              momen — dari obrolan santai hingga waktu produktif.
            </p>

            <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
              <Link
                href='/menu'
                className='group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg'
              >
                Jelajahi Menu
                <ArrowUpRight
                  className='size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                  aria-hidden='true'
                />
              </Link>

              <Link
                href='/#locations'
                className='inline-flex h-12 items-center justify-center rounded-full border border-border bg-background px-6 text-sm font-medium text-foreground transition-all duration-300 hover:bg-muted'
              >
                Lihat Lokasi
              </Link>
            </div>

            <div className='mt-10 flex items-center gap-8 border-t border-border/70 pt-6'>
              <div>
                <p className='text-2xl font-semibold tracking-tight text-foreground'>2015</p>
                <p className='mt-1 text-xs text-muted-foreground'>Sejak berdiri</p>
              </div>

              <div className='h-9 w-px bg-border' />

              <div>
                <p className='text-2xl font-semibold tracking-tight text-foreground'>4</p>
                <p className='mt-1 text-xs text-muted-foreground'>Lokasi Kopilogi</p>
              </div>

              <div className='h-9 w-px bg-border' />

              <div>
                <p className='text-2xl font-semibold tracking-tight text-foreground'>Garut</p>
                <p className='mt-1 text-xs text-muted-foreground'>& Tasikmalaya</p>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div
            className='relative mx-auto w-full max-w-[540px] lg:justify-self-end'
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setIsPaused(false);
              }
            }}
          >
            <div className='absolute -inset-4 rounded-[2.5rem] bg-muted/40 blur-2xl' />

            <div className='relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border/70 bg-muted shadow-2xl shadow-black/10'>
              {/* Slides */}
              {slides.map((slide, index) => (
                <div
                  key={slide.src}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-out motion-reduce:transition-none ${
                    index === activeIndex ? "z-10 opacity-100" : "z-0 opacity-0"
                  }`}
                  aria-hidden={index !== activeIndex}
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    priority={index === 0}
                    sizes='(max-width: 1024px) 100vw, 540px'
                    className='object-cover'
                  />

                  <div className='absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent' />
                </div>
              ))}

              {/* Top label */}
              <div className='absolute left-5 top-5 z-20'>
                <div className='rounded-full border border-white/20 bg-black/25 px-3.5 py-2 text-[11px] font-medium tracking-wide text-white backdrop-blur-md'>
                  KOPILOGI
                </div>
              </div>

              {/* Bottom information */}
              <div className='absolute inset-x-0 bottom-0 z-20 p-5 sm:p-6'>
                <div className='flex items-end justify-between gap-4'>
                  <div aria-live='polite' aria-atomic='true' className='min-w-0'>
                    <p className='text-xs font-medium uppercase tracking-[0.16em] text-white/65'>
                      Jelajahi suasana
                    </p>

                    <p className='mt-1 truncate text-xl font-semibold tracking-tight text-white sm:text-2xl'>
                      {activeSlide.name}
                    </p>

                    <p className='mt-1 text-sm text-white/70'>{activeSlide.location}</p>
                  </div>

                  {/* Navigation */}
                  <div className='flex shrink-0 gap-2'>
                    <button
                      type='button'
                      onClick={showPrevious}
                      aria-label='Foto sebelumnya'
                      className='flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/25 text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white'
                    >
                      <ArrowLeft className='size-4' aria-hidden='true' />
                    </button>

                    <button
                      type='button'
                      onClick={showNext}
                      aria-label='Foto berikutnya'
                      className='flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/25 text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white'
                    >
                      <ArrowRight className='size-4' aria-hidden='true' />
                    </button>
                  </div>
                </div>

                {/* Progress indicators */}
                <div
                  className='mt-5 flex items-center gap-1.5'
                  aria-label={`Slide ${activeIndex + 1} dari ${slides.length}`}
                >
                  {slides.map((slide, index) => (
                    <button
                      key={slide.src}
                      type='button'
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Lihat ${slide.name}`}
                      aria-current={index === activeIndex ? "true" : undefined}
                      className='group flex h-4 items-center focus-visible:outline-none'
                    >
                      <span
                        className={`block h-1 rounded-full transition-all duration-500 ${
                          index === activeIndex
                            ? "w-8 bg-white"
                            : "w-3 bg-white/40 group-hover:bg-white/70"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative card */}
            <div className='absolute -bottom-5 -left-5 z-30 hidden rounded-2xl border border-border/70 bg-background/90 px-4 py-3 shadow-xl backdrop-blur-md sm:block'>
              <div className='flex items-center gap-3'>
                <div className='flex size-9 items-center justify-center rounded-xl bg-muted'>
                  <ArrowDown className='size-4 text-foreground' aria-hidden='true' />
                </div>

                <div>
                  <p className='text-xs font-medium text-foreground'>Temukan favoritmu</p>
                  <p className='mt-0.5 text-[11px] text-muted-foreground'>Explore our menu</p>
                </div>
              </div>
            </div>

            {/* Decorative border */}
            <div className='pointer-events-none absolute -right-4 -top-4 -z-10 hidden h-32 w-32 rounded-full border border-border/60 sm:block' />
          </div>
        </div>
      </Container>
    </section>
  );
}
