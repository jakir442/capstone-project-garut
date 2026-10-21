"use client";

import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Boxes,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/layout/container";
import { IceCoffee3D } from "./models/coffee-3d";
import { FrenchFries3D } from "./models/french-fries-3d";
import { Cake3D } from "./models/cake-3d";
import { Pasta3D } from "./models/pasta-3d";

const SLIDE_INTERVAL = 3000;

const models = [
  {
    name: "Ice Coffee",
    category: "SIGNATURE DRINK",
    description: "Kesegaran kopi untuk menemani setiap momen.",
  },
  {
    name: "French Fries",
    category: "FAVORITE SNACK",
    description: "Camilan renyah yang cocok dinikmati kapan saja.",
  },
  {
    name: "Cake",
    category: "SWEET SELECTION",
    description: "Pilihan manis untuk melengkapi waktu santaimu.",
  },
  {
    name: "Pasta",
    category: "SAVORY FAVORITE",
    description: "Hidangan lezat untuk menemani momen bersama.",
  },
];

function ActiveModel({ index }: { index: number }) {
  switch (index) {
    case 0:
      return <IceCoffee3D />;
    case 1:
      return <FrenchFries3D />;
    case 2:
      return <Cake3D />;
    case 3:
      return <Pasta3D />;
    default:
      return <IceCoffee3D />;
  }
}

export function MenuShowcaseSection() {
  const [activeModel, setActiveModel] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const currentModel = models[activeModel];

  const nextModel = () => {
    setDirection(1);
    setActiveModel((current) => (current + 1) % models.length);
  };

  const previousModel = () => {
    setDirection(-1);
    setActiveModel((current) => (current - 1 + models.length) % models.length);
  };

  const changeModel = (nextIndex: number) => {
    if (nextIndex === activeModel) return;

    // Menentukan arah transisi, termasuk ketika kembali ke slide pertama.
    const isForward =
      (nextIndex - activeModel + models.length) % models.length <= models.length / 2;

    setDirection(isForward ? 1 : -1);
    setActiveModel(nextIndex);
  };

  // Auto-slide dengan interval 3 detik.
  // Timer otomatis di-reset ketika slide berubah atau autoplay dijeda.
  useEffect(() => {
    if (isPaused) return;

    const intervalId = window.setInterval(() => {
      setDirection(1);
      setActiveModel((current) => (current + 1) % models.length);
    }, SLIDE_INTERVAL);

    return () => window.clearInterval(intervalId);
  }, [isPaused, activeModel]);

  const slideVariants = {
    enter: (slideDirection: number) => ({
      x: shouldReduceMotion ? 0 : `${slideDirection * 100}%`,
      opacity: 0,
    }),
    center: {
      x: "0%",
      opacity: 1,
    },
    exit: (slideDirection: number) => ({
      x: shouldReduceMotion ? 0 : `${slideDirection * -100}%`,
      opacity: 0,
    }),
  };

  return (
    <section
      id='menu-showcase'
      aria-label='Showcase menu 3D Kopilogi'
      className='relative isolate overflow-hidden bg-neutral-950 text-white'
    >
      {/* BACKGROUND */}
      <div aria-hidden='true' className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute -right-40 top-0 size-[28rem] rounded-full bg-amber-100/[0.05] blur-[120px]' />
        <div className='absolute -left-40 bottom-0 size-[24rem] rounded-full bg-orange-400/[0.04] blur-[110px]' />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40' />
      </div>

      <Container className='py-20 sm:py-24 lg:py-32'>
        <div className='grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-6'>
          {/* LEFT CONTENT */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className='relative z-10 mx-auto w-full max-w-xl text-center lg:mx-0 lg:text-left'
          >
            <div className='mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-medium tracking-wide text-white/70 backdrop-blur-sm'>
              <Sparkles className='size-3.5 text-amber-200' />
              Kopilogi Menu Experience
            </div>

            <h2 className='text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl'>
              Lebih dekat
              <br />
              dengan <span className='text-white/45'>menu kami.</span>
            </h2>

            <p className='mx-auto mt-6 max-w-md text-sm leading-7 text-white/55 sm:text-base lg:mx-0'>
              Jelajahi pilihan kopi, minuman, dan makanan Kopilogi melalui pengalaman 3D interaktif.
              Temukan menu yang menemani momenmu di setiap cabang.
            </p>

            <div className='mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start'>
              <Link
                href='/menu'
                className='group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950'
              >
                Jelajahi Semua Menu
                <ArrowUpRight className='size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
              </Link>

              <span className='inline-flex items-center gap-2 text-xs text-white/40 sm:text-sm'>
                <Boxes className='size-4' />
                Pengalaman 3D interaktif
              </span>
            </div>

            <div className='mt-10 hidden items-center gap-3 border-t border-white/10 pt-6 lg:flex'>
              <div className='flex -space-x-2'>
                <span className='size-8 rounded-full border border-neutral-950 bg-amber-100/15' />
                <span className='size-8 rounded-full border border-neutral-950 bg-white/10' />
                <span className='size-8 rounded-full border border-neutral-950 bg-orange-200/15' />
              </div>

              <p className='text-xs leading-5 text-white/45'>
                <span className='block font-medium text-white/75'>Pilihan menu Kopilogi</span>
                Jelajahi sajian melalui model 3D interaktif
              </p>
            </div>
          </motion.div>

          {/* RIGHT 3D SHOWCASE */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, delay: 0.1, ease: "easeOut" }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocusCapture={() => setIsPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setIsPaused(false);
              }
            }}
            className='relative mx-auto w-full max-w-2xl lg:max-w-none'
          >
            {/* DECORATIVE CIRCLES */}
            <motion.div
              aria-hidden='true'
              animate={shouldReduceMotion ? undefined : { rotate: 360 }}
              transition={{
                duration: 60,
                repeat: Infinity,
                ease: "linear",
              }}
              className='pointer-events-none absolute left-1/2 top-[38%] size-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06] sm:size-80 lg:size-96'
            />

            <div
              aria-hidden='true'
              className='pointer-events-none absolute left-1/2 top-[38%] size-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/[0.08] sm:size-64 lg:size-80'
            />

            {/* HORIZONTAL MODEL SLIDER */}
            <div className='relative overflow-hidden'>
              <div
                className='relative h-[380px] sm:h-[460px] lg:h-[500px]'
                aria-live='polite'
                aria-atomic='true'
              >
                <AnimatePresence initial={false} custom={direction} mode='sync'>
                  <motion.div
                    key={activeModel}
                    custom={direction}
                    variants={slideVariants}
                    initial='enter'
                    animate='center'
                    exit='exit'
                    transition={{
                      x: {
                        type: "spring",
                        stiffness: 240,
                        damping: 28,
                      },
                      opacity: {
                        duration: shouldReduceMotion ? 0 : 0.25,
                      },
                    }}
                    className='absolute inset-0'
                  >
                    <ActiveModel index={activeModel} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* MODEL INFORMATION */}
              <div className='relative z-10 mx-auto mt-2 max-w-sm text-center'>
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={currentModel.name}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <p className='text-[10px] font-semibold tracking-[0.25em] text-amber-200/70'>
                      {currentModel.category}
                    </p>

                    <h3 className='mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl'>
                      {currentModel.name}
                    </h3>

                    <p className='mt-2 text-sm leading-6 text-white/45'>
                      {currentModel.description}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* NAVIGATION */}
                <div className='mt-6 flex items-center justify-center gap-4'>
                  <button
                    type='button'
                    onClick={previousModel}
                    aria-label='Lihat model sebelumnya'
                    className='inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition hover:border-white/25 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200'
                  >
                    <ChevronLeft className='size-4' />
                  </button>

                  {/* SLIDE INDICATORS */}
                  <div className='flex items-center gap-2'>
                    {models.map((model, index) => (
                      <button
                        key={model.name}
                        type='button'
                        onClick={() => changeModel(index)}
                        aria-label={`Tampilkan ${model.name}`}
                        aria-pressed={activeModel === index}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          activeModel === index
                            ? "w-8 bg-amber-200"
                            : "w-1.5 bg-white/25 hover:bg-white/50"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    type='button'
                    onClick={nextModel}
                    aria-label='Lihat model berikutnya'
                    className='inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition hover:border-white/25 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200'
                  >
                    <ChevronRight className='size-4' />
                  </button>
                </div>

                {/* SLIDE COUNTER + AUTOPLAY STATUS */}
                <div className='mt-4 flex items-center justify-center gap-3'>
                  <p className='text-[10px] tracking-wide text-white/30 sm:text-xs'>
                    {String(activeModel + 1).padStart(2, "0")} /{" "}
                    {String(models.length).padStart(2, "0")}
                  </p>

                  <span className='h-3 w-px bg-white/10' />

                  <button
                    type='button'
                    onClick={() => setIsPaused((paused) => !paused)}
                    aria-label={isPaused ? "Lanjutkan slide otomatis" : "Jeda slide otomatis"}
                    className='inline-flex items-center gap-1.5 text-[10px] text-white/40 transition hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 sm:text-xs'
                  >
                    {isPaused ? (
                      <>
                        <Play className='size-3' />
                        Lanjutkan
                      </>
                    ) : (
                      <>
                        <Pause className='size-3' />
                        Jeda
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* INSTRUCTION */}
            <div className='mt-4 flex items-center justify-center gap-2 text-[11px] text-white/35 sm:text-xs'>
              <ArrowDown className='size-3.5' />
              <span>Putar model dengan drag · Slide berganti otomatis setiap 3 detik</span>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
