import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, MapPin } from "lucide-react";

import { LoginForm } from "@/features/users/components/login-form";
import { IceCoffee3D } from "@/features/home/components/models/coffee-3d";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Masuk | Kopilogi",
  description: "Masuk ke akun Kopilogi untuk menikmati pengalaman yang lebih personal.",
};

const locations = [
  { name: "Garut", detail: "Kopilogi & Waroeng Kopilogi" },
  { name: "Tasikmalaya", detail: "Kopilogi Tasik" },
];

export default function LoginPage() {
  return (
    <main className='min-h-screen bg-[#faf8f4] text-[#28231e]'>
      <div className='grid min-h-screen lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]'>
        {/* BRAND PANEL: hanya tampil di desktop */}
        <section className='relative hidden isolate overflow-hidden bg-[#211b16] text-[#f8f3eb] lg:block'>
          {/* Background lighting */}
          <div className='pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_38%,rgba(193,145,91,0.17),transparent_48%)]' />
          <div className='pointer-events-none absolute -left-32 top-1/3 size-80 rounded-full border border-white/[0.045]' />
          <div className='pointer-events-none absolute -left-20 top-[38%] size-56 rounded-full border border-white/[0.04]' />
          <div className='pointer-events-none absolute -right-40 -top-40 size-96 rounded-full border border-amber-100/[0.05]' />

          <div className='relative mx-auto flex min-h-screen w-full max-w-[720px] flex-col px-6 py-6 sm:px-10 sm:py-8 lg:px-12 xl:px-16'>
            {/* Top navigation */}
            <header className='flex items-center justify-between'>
              <Link
                href='/#home'
                className='inline-flex items-center gap-2 text-xs text-white/60 transition-colors hover:text-white'
              >
                <ArrowLeft className='size-4' />
                Kembali ke beranda
              </Link>

              <span className='text-[10px] tracking-[0.18em] text-white/40'>EST. 2015</span>
            </header>

            {/* Main brand content */}
            <div className='flex flex-1 flex-col justify-center py-5 sm:py-8'>
              <div className='mx-auto w-full max-w-[490px]'>
                <p className='text-[10px] font-medium uppercase tracking-[0.28em] text-[#d6b58b]'>
                  A place for good moments
                </p>

                <h1 className='mt-4 max-w-md font-serif text-4xl font-normal leading-[1.12] tracking-[-0.04em] sm:text-5xl'>
                  Lebih dari sekadar <span className='italic text-[#d6b58b]'>secangkir kopi.</span>
                </h1>

                <p className='mt-4 max-w-sm text-sm leading-6 text-white/55'>
                  Temukan rasa favorit, suasana yang nyaman, dan cerita baru bersama Kopilogi.
                </p>

                {/* 3D product showcase */}
                <div className='relative mx-auto mt-2 w-full max-w-[440px]'>
                  <div className='pointer-events-none absolute left-1/2 top-1/2 h-40 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c18e54]/15 blur-[65px] sm:h-48 sm:w-72' />

                  <div className='relative h-[300px] w-full lg:h-[min(38vh,350px)] lg:min-h-[280px] lg:-translate-y-45'>
                    <IceCoffee3D />
                  </div>

                  <div className='flex items-center justify-between border-y border-white/10 py-3'>
                    <div>
                      <p className='text-[9px] uppercase tracking-[0.22em] text-white/40'>
                        The Kopilogi experience
                      </p>
                      <p className='mt-1 text-sm font-medium'>Your coffee, your story.</p>
                    </div>

                    <span className='flex size-9 items-center justify-center rounded-full border border-[#d6b58b]/25 text-[#d6b58b]'>
                      <ArrowUpRight className='size-4' />
                    </span>
                  </div>
                </div>

                {/* Locations */}
                <div className='mt-12'>
                  <p className='mb-3 text-[9px] uppercase tracking-[0.22em] text-white/40'>
                    Find your nearest Kopilogi
                  </p>

                  <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
                    {locations.map((location) => (
                      <div
                        key={location.name}
                        className='flex min-w-0 items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.035] p-3'
                      >
                        <MapPin className='mt-0.5 size-4 shrink-0 text-[#d6b58b]' />

                        <div className='min-w-0'>
                          <p className='text-xs font-medium'>{location.name}</p>
                          <p className='mt-1 text-[10px] leading-4 text-white/45'>
                            {location.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer className='flex items-center justify-between gap-3 border-t border-white/10 pt-4 text-[10px] text-white/35'>
              <span>© {new Date().getFullYear()} Kopilogi</span>
              <span>Coffee · Food · Good Moments</span>
            </footer>
          </div>
        </section>

        {/* LOGIN PANEL: tampil di semua ukuran layar */}
        <section className='relative flex min-h-screen min-w-0 items-center justify-center overflow-hidden px-5 py-6 sm:px-8 sm:py-12 lg:px-10 xl:px-14'>
          {/* Subtle background lighting */}
          <div className='pointer-events-none absolute right-0 top-0 size-64 rounded-full bg-[#c9a77c]/[0.07] blur-[90px]' />

          <div className='relative w-full max-w-[440px]'>
            {/* Tombol kembali: khusus mobile dan tablet */}
            <div className='mb-8 flex items-center justify-between lg:hidden'>
              <Link
                href='/#home'
                className='inline-flex items-center gap-2 rounded-full border border-[#28231e]/10 bg-white/70 px-4 py-2.5 text-sm font-medium text-[#51473d] transition-colors hover:bg-white hover:text-[#211b16]'
              >
                <ArrowLeft className='size-4' />
                Kembali ke beranda
              </Link>

              <Link href='/' aria-label='Kopilogi' className='flex items-center gap-2'>
                <Image
                  src='/logo/kopilogi-no-bg.png'
                  alt=''
                  width={32}
                  height={32}
                  className='size-8 object-contain'
                />
                <span className='text-sm font-bold tracking-[0.1em]'>KOPILOGI</span>
              </Link>
            </div>

            <LoginForm />
          </div>
        </section>
      </div>
    </main>
  );
}
