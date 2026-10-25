import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Coffee, MapPin } from "lucide-react";

import { RegisterForm } from "@/features/users/components/register-form";
import { ScrollbarTheme } from "@/components/layout/scrollbar-theme";

export const metadata: Metadata = {
  title: "Daftar | Kopilogi",
  description: "Buat akun pelanggan Kopilogi dan nikmati pengalaman yang lebih personal.",
};

const locations = [
  { name: "Garut", detail: "Kopilogi & Waroeng Kopilogi" },
  { name: "Tasikmalaya", detail: "Kopilogi Tasik" },
];

export default function RegisterPage() {
  return (
    <>
      <ScrollbarTheme theme='landing-theme' />

      <main className='min-h-screen bg-[#faf8f4] text-[#28231e]'>
        <div className='grid min-h-screen lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]'>
          {/* BRAND PANEL: desktop only */}
          <section className='register-panel-left relative isolate hidden overflow-hidden bg-[#211b16] text-[#f8f3eb] lg:block'>
            {/* Background atmosphere */}
            <div className='pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_38%,rgba(193,145,91,0.17),transparent_48%)]' />

            <div className='pointer-events-none absolute -left-32 top-1/3 size-80 rounded-full border border-white/[0.045]' />

            <div className='pointer-events-none absolute -left-20 top-[38%] size-56 rounded-full border border-white/[0.04]' />

            <div className='pointer-events-none absolute -right-40 -top-40 size-96 rounded-full border border-amber-100/[0.05]' />

            {/* Blend menuju register panel */}
            <div className='register-blend pointer-events-none absolute inset-y-0 right-0 z-20 w-14 bg-gradient-to-r from-transparent via-[#211b16]/30 to-[#faf8f4] xl:w-20' />

            {/* Ambient breathing glow */}
            <div className='register-ambient-glow pointer-events-none absolute -right-20 top-1/2 z-20 h-[65%] w-40 -translate-y-1/2 rounded-full bg-[#d6b58b]/25 blur-[75px] xl:w-52' />

            {/* Ambient floating orb */}
            <div className='register-ambient-orb pointer-events-none absolute -right-12 top-1/2 z-20 size-64 -translate-y-1/2 rounded-full bg-[#c9a77c]/15 blur-[90px]' />

            <div className='relative mx-auto flex min-h-screen w-full max-w-[720px] flex-col px-6 py-6 sm:px-10 sm:py-8 lg:px-12 xl:px-16'>
              {/* Header */}
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

              {/* Brand content */}
              <div className='register-brand-content flex flex-1 flex-col justify-center py-10'>
                <div className='mx-auto w-full max-w-[490px]'>
                  <p className='text-[10px] font-medium uppercase tracking-[0.28em] text-[#d6b58b]'>
                    Your story starts here
                  </p>

                  <h1 className='mt-4 max-w-md font-serif text-4xl font-normal leading-[1.12] tracking-[-0.04em] xl:text-5xl'>
                    Jadikan setiap momen lebih{" "}
                    <span className='italic text-[#d6b58b]'>berarti.</span>
                  </h1>

                  <p className='mt-5 max-w-sm text-sm leading-6 text-white/55'>
                    Bergabung dengan Kopilogi untuk menemukan menu favorit, mengenal cabang kami,
                    dan menikmati pengalaman yang lebih personal.
                  </p>

                  {/* Decorative coffee illustration */}
                  <div className='relative mt-10 flex h-[210px] items-center justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025]'>
                    <div className='pointer-events-none absolute left-1/2 top-1/2 size-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c18e54]/15 blur-[65px]' />

                    <div className='relative flex flex-col items-center'>
                      <div className='flex size-24 items-center justify-center rounded-[2rem] border border-[#d6b58b]/25 bg-[#d6b58b]/[0.08] text-[#d6b58b] shadow-2xl'>
                        <Coffee className='size-11' strokeWidth={1.2} />
                      </div>

                      <p className='mt-5 text-[9px] uppercase tracking-[0.24em] text-white/40'>
                        The Kopilogi experience
                      </p>

                      <p className='mt-2 font-serif text-xl italic text-white/85'>
                        Your coffee, your story.
                      </p>
                    </div>

                    <span className='absolute right-5 top-5 flex size-9 items-center justify-center rounded-full border border-[#d6b58b]/25 text-[#d6b58b]'>
                      <ArrowUpRight className='size-4' />
                    </span>
                  </div>

                  {/* Locations */}
                  <div className='mt-8'>
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

          {/* REGISTER PANEL */}
          <section className='register-panel-right relative flex min-h-screen min-w-0 items-center justify-center overflow-hidden bg-[#faf8f4] px-5 py-6 sm:px-8 sm:py-10 lg:px-10 xl:px-14'>
            {/* Background atmosphere */}
            <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(201,167,124,0.10),transparent_30%),radial-gradient(circle_at_20%_85%,rgba(201,167,124,0.06),transparent_28%)]' />

            <div className='pointer-events-none absolute right-0 top-0 size-64 rounded-full bg-[#c9a77c]/[0.07] blur-[90px]' />

            {/* Blend dari sisi kiri */}
            <div className='register-blend pointer-events-none absolute bottom-0 left-0 top-0 z-10 hidden w-12 bg-gradient-to-l from-transparent via-[#faf8f4]/55 to-[#faf8f4] lg:block xl:w-16' />

            {/* Ambient glow dari panel kanan */}
            <div className='register-ambient-glow pointer-events-none absolute -left-20 top-1/2 z-10 hidden h-[65%] w-40 -translate-y-1/2 rounded-full bg-[#d6b58b]/20 blur-[80px] lg:block xl:w-52' />

            <div className='register-ambient-orb pointer-events-none absolute -left-12 top-1/2 z-10 hidden size-64 -translate-y-1/2 rounded-full bg-[#c9a77c]/10 blur-[95px] lg:block' />

            <div className='register-form-content relative z-20 w-full max-w-[440px]'>
              {/* Mobile header */}
              <div className='mb-8 flex items-center justify-between lg:hidden'>
                <Link
                  href='/#home'
                  aria-label='Kembali ke beranda Kopilogi'
                  className='inline-flex items-center gap-2 rounded-full border border-[#28231e]/10 bg-white/70 px-4 py-2.5 text-sm font-medium text-[#51473d] transition-colors hover:bg-white'
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

              {/* Form heading */}
              <div className='mb-8'>
                <h2 className='mt-3 font-serif text-3xl font-medium tracking-[-0.04em] sm:text-4xl'>
                  Buat akun baru
                </h2>

                <p className='mt-3 max-w-sm text-sm leading-6 text-[#766d63]'>
                  Mulai perjalananmu bersama Kopilogi dan nikmati pengalaman yang lebih personal.
                </p>
              </div>

              {/* Register form */}
              <div className='register-form-card rounded-2xl border border-[#28231e]/[0.08] bg-white/80 p-5 shadow-[0_12px_45px_rgba(40,35,30,0.045)] sm:p-8'>
                <RegisterForm />
              </div>

              <p className='mt-5 text-center text-[11px] leading-5 text-[#8b8176]'>
                Dengan membuat akun, kamu menyetujui penggunaan akun untuk mengakses layanan
                Kopilogi.
              </p>

              <footer className='mt-8 text-center text-[11px] text-[#a0978d]'>
                © {new Date().getFullYear()} Kopilogi. Semua hak dilindungi.
              </footer>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
