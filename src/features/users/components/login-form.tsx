"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import {
  ArrowRight,
  CheckCircle2,
  Coffee,
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      });

      if (!result || result.error || !result.ok) {
        setErrorMessage("Email atau password yang kamu masukkan salah.");
        return;
      }

      const session = await getSession();

      if (!session?.user) {
        setErrorMessage(
          "Login berhasil diproses, tetapi sesi belum tersedia. Silakan coba kembali.",
        );
        return;
      }

      const role = session.user.role;

      if (role === "super_admin") {
        router.replace("/admin/super-admin");
      } else if (role === "admin") {
        router.replace("/admin");
      } else {
        router.replace("/akun");
      }

      router.refresh();
    } catch {
      setErrorMessage("Terjadi kesalahan. Silakan coba beberapa saat lagi.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='w-full'>
      {/* Heading */}
      <div className='mb-8'>
        <div className='mb-4 inline-flex items-center gap-2 rounded-full border border-amber-900/10 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-900'>
          <Sparkles className='size-3.5' />
          Selamat datang kembali
        </div>

        <h1 className='text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl'>
          Senang melihatmu
          <br />
          <span className='text-neutral-400'>kembali.</span>
        </h1>

        <p className='mt-3 max-w-sm text-sm leading-6 text-neutral-500'>
          Masuk ke akun Kopilogi untuk menikmati pengalaman yang lebih personal dan menjelajahi
          pilihan favoritmu.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className='space-y-5'>
        {/* Email */}
        <div className='space-y-2'>
          <label htmlFor='email' className='text-sm font-medium text-neutral-800'>
            Alamat email
          </label>

          <div className='group relative'>
            <Mail
              aria-hidden='true'
              className='pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-neutral-400 transition-colors group-focus-within:text-amber-800'
            />

            <Input
              id='email'
              name='email'
              type='email'
              autoComplete='email'
              placeholder='nama@email.com'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              disabled={isLoading}
              aria-invalid={Boolean(errorMessage)}
              className='h-13 rounded-xl border-neutral-200 bg-neutral-50/70 pl-11 text-sm shadow-none transition-all placeholder:text-neutral-400 hover:border-neutral-300 focus-visible:border-amber-800 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-amber-900/10'
            />
          </div>
        </div>

        {/* Password */}
        <div className='space-y-2'>
          <div className='flex items-center justify-between gap-3'>
            <label htmlFor='password' className='text-sm font-medium text-neutral-800'>
              Password
            </label>

            <span className='text-xs text-neutral-400'>Jaga kerahasiaan password</span>
          </div>

          <div className='group relative'>
            <LockKeyhole
              aria-hidden='true'
              className='pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-neutral-400 transition-colors group-focus-within:text-amber-800'
            />

            <Input
              id='password'
              name='password'
              type={showPassword ? "text" : "password"}
              autoComplete='current-password'
              placeholder='Masukkan password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              disabled={isLoading}
              aria-invalid={Boolean(errorMessage)}
              className='h-13 rounded-xl border-neutral-200 bg-neutral-50/70 pl-11 pr-12 text-sm shadow-none transition-all placeholder:text-neutral-400 hover:border-neutral-300 focus-visible:border-amber-800 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-amber-900/10'
            />

            <button
              type='button'
              onClick={() => setShowPassword((current) => !current)}
              disabled={isLoading}
              aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              aria-pressed={showPassword}
              className='absolute right-3.5 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-200/70 hover:text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-800 disabled:cursor-not-allowed disabled:opacity-50'
            >
              {showPassword ? <EyeOff className='size-[18px]' /> : <Eye className='size-[18px]' />}
            </button>
          </div>
        </div>

        {/* Error */}
        {errorMessage && (
          <div
            role='alert'
            aria-live='polite'
            className='flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm text-red-700'
          >
            <span className='mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-red-100'>
              <span className='text-xs font-bold'>!</span>
            </span>

            <p className='leading-5'>{errorMessage}</p>
          </div>
        )}

        {/* Submit */}
        <Button
          type='submit'
          disabled={isLoading}
          className='group relative h-13 w-full overflow-hidden rounded-xl bg-neutral-950 text-sm font-semibold text-white shadow-lg shadow-neutral-950/10 transition-all duration-300 hover:bg-amber-950 hover:shadow-xl hover:shadow-amber-950/15 focus-visible:ring-4 focus-visible:ring-amber-900/20 disabled:cursor-not-allowed disabled:opacity-70'
        >
          <span className='relative z-10 flex items-center justify-center gap-2'>
            {isLoading ? (
              <>
                <LoaderCircle className='size-4 animate-spin' />
                Memproses login...
              </>
            ) : (
              <>
                Masuk ke Akun
                <ArrowRight className='size-4 transition-transform duration-300 group-hover:translate-x-1' />
              </>
            )}
          </span>
        </Button>

        {/* Security note */}
        <div className='flex items-center justify-center gap-2 text-xs text-neutral-400'>
          <ShieldCheck className='size-4 text-emerald-700/70' />
          <span>Masuk dengan akun Kopilogi kamu</span>
        </div>
      </form>

      {/* Register link */}
      <div className='my-7 flex items-center gap-4'>
        <div className='h-px flex-1 bg-neutral-200' />
        <span className='text-xs text-neutral-400'>ATAU</span>
        <div className='h-px flex-1 bg-neutral-200' />
      </div>

      <div className='rounded-2xl border border-neutral-200/80 bg-neutral-50/70 p-4 sm:p-5'>
        <div className='flex items-center gap-3'>
          <div className='flex size-10 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-700'>
            <Coffee className='size-5' />
          </div>

          <div className='min-w-0 flex-1'>
            <p className='text-sm font-semibold text-neutral-900'>Belum punya akun?</p>
            <p className='mt-1 text-xs leading-5 text-neutral-500'>
              Buat akun dan mulai pengalamanmu bersama Kopilogi.
            </p>
          </div>
        </div>

        <Link
          href='/register'
          className='mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white text-sm font-semibold text-neutral-800 transition-all hover:border-neutral-400 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-900/10'
        >
          Buat Akun Baru
          <ArrowRight className='size-4' />
        </Link>
      </div>

      {/* Footer */}
      <div className='mt-7 flex items-center justify-center gap-2 text-center text-xs leading-5 text-neutral-400'>
        <CheckCircle2 className='size-3.5 shrink-0' />
        <span>Pengalaman Kopilogi, lebih dekat dan personal.</span>
      </div>
    </div>
  );
}
