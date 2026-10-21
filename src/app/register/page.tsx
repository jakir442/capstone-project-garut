import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Coffee } from "lucide-react";
import { RegisterForm } from "@/features/users/components/register-form";

export const metadata: Metadata = {
  title: "Daftar",
  description: "Buat akun pelanggan Kopilogi.",
};

export default function RegisterPage() {
  return (
    <main className='relative flex min-h-screen flex-col bg-background'>
      <header className='flex h-20 items-center justify-between px-5 sm:px-8 lg:px-12'>
        <Link
          href='/'
          aria-label='Kembali ke beranda Kopilogi'
          className='flex items-center gap-2.5'
        >
          <Image
            src='/logo/kopilogi-no-bg.png'
            alt='Kopilogi'
            width={40}
            height={40}
            className='size-10 object-contain'
          />

          <span className='text-lg font-bold tracking-tight'>KOPILOGI</span>
        </Link>

        <Link
          href='/'
          className='inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground'
        >
          <ArrowLeft className='size-4' />
          Kembali ke beranda
        </Link>
      </header>

      <section className='flex flex-1 items-center justify-center px-5 py-12'>
        <div className='w-full max-w-md'>
          <div className='mb-8 text-center'>
            <div className='mx-auto mb-5 flex size-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground'>
              <Coffee className='size-7' />
            </div>

            <p className='text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground'>
              Bergabung dengan Kopilogi
            </p>

            <h1 className='mt-3 text-3xl font-semibold tracking-tight sm:text-4xl'>
              Buat akun baru
            </h1>

            <p className='mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground'>
              Buat akun untuk mendapatkan pengalaman layanan Kopilogi yang lebih mudah.
            </p>
          </div>

          <div className='rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8'>
            <RegisterForm />
          </div>

          <p className='mt-6 text-center text-xs leading-5 text-muted-foreground'>
            Dengan membuat akun, kamu menyetujui penggunaan akun untuk mengakses layanan Kopilogi.
          </p>
        </div>
      </section>

      <footer className='px-5 py-5 text-center text-xs text-muted-foreground'>
        © {new Date().getFullYear()} Kopilogi. Semua hak dilindungi.
      </footer>
    </main>
  );
}
