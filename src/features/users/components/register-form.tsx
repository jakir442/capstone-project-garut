"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, LoaderCircle, LockKeyhole, Mail, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function RegisterForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result.message ?? "Gagal membuat akun. Silakan coba lagi.");
        return;
      }

      setSuccessMessage("Akun berhasil dibuat. Mengalihkan ke halaman login...");

      window.setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch {
      setErrorMessage("Terjadi kesalahan. Silakan coba kembali.");
    } finally {
      setIsLoading(false);
    }
  }

  const inputClassName =
    "h-11 rounded-xl border-neutral-200 bg-neutral-50/70 pl-10 text-sm shadow-none transition-all placeholder:text-neutral-400 hover:border-neutral-300 focus-visible:border-amber-800 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-amber-900/10";

  return (
    <div className='w-full'>
      {/* Heading */}
      <div className='mb-5'>
        <h2 className='text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl'>
          Buat akun baru.
        </h2>

        <p className='mt-2 text-sm leading-5 text-neutral-500'>
          Daftar untuk menjelajahi menu dan pengalaman Kopilogi.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* Nama dan Email: dua kolom di layar lebih besar */}
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {/* Nama */}
          <div className='space-y-1.5'>
            <label htmlFor='register-name' className='text-sm font-medium text-neutral-800'>
              Nama lengkap
            </label>

            <div className='group relative'>
              <UserRound
                aria-hidden='true'
                className='pointer-events-none absolute left-3.5 top-1/2 size-[17px] -translate-y-1/2 text-neutral-400 transition-colors group-focus-within:text-amber-800'
              />

              <Input
                id='register-name'
                name='name'
                type='text'
                autoComplete='name'
                placeholder='Nama lengkap'
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                maxLength={100}
                disabled={isLoading}
                aria-invalid={Boolean(errorMessage)}
                className={inputClassName}
              />
            </div>
          </div>

          {/* Email */}
          <div className='space-y-1.5'>
            <label htmlFor='register-email' className='text-sm font-medium text-neutral-800'>
              Alamat email
            </label>

            <div className='group relative'>
              <Mail
                aria-hidden='true'
                className='pointer-events-none absolute left-3.5 top-1/2 size-[17px] -translate-y-1/2 text-neutral-400 transition-colors group-focus-within:text-amber-800'
              />

              <Input
                id='register-email'
                name='email'
                type='email'
                autoComplete='email'
                placeholder='nama@email.com'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                maxLength={254}
                disabled={isLoading}
                aria-invalid={Boolean(errorMessage)}
                className={inputClassName}
              />
            </div>
          </div>
        </div>

        {/* Password */}
        <div className='space-y-1.5'>
          <div className='flex items-center justify-between gap-3'>
            <label htmlFor='register-password' className='text-sm font-medium text-neutral-800'>
              Password
            </label>

            <span className='text-xs text-neutral-400'>Minimal 8 karakter</span>
          </div>

          <div className='group relative'>
            <LockKeyhole
              aria-hidden='true'
              className='pointer-events-none absolute left-3.5 top-1/2 size-[17px] -translate-y-1/2 text-neutral-400 transition-colors group-focus-within:text-amber-800'
            />

            <Input
              id='register-password'
              name='password'
              type={showPassword ? "text" : "password"}
              autoComplete='new-password'
              placeholder='Buat password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={8}
              disabled={isLoading}
              aria-invalid={Boolean(errorMessage)}
              className={`${inputClassName} pr-12`}
            />

            <button
              type='button'
              onClick={() => setShowPassword((current) => !current)}
              disabled={isLoading}
              aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              aria-pressed={showPassword}
              className='absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-200/70 hover:text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-800 disabled:opacity-50'
            >
              {showPassword ? <EyeOff className='size-[17px]' /> : <Eye className='size-[17px]' />}
            </button>
          </div>
        </div>

        {/* Error */}
        {errorMessage && (
          <div
            role='alert'
            aria-live='polite'
            className='flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700'
          >
            <span className='flex size-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold'>
              !
            </span>
            <p className='leading-5'>{errorMessage}</p>
          </div>
        )}

        {/* Success */}
        {successMessage && (
          <div
            role='status'
            aria-live='polite'
            className='flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800'
          >
            <span className='flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold'>
              ✓
            </span>
            <p className='leading-5'>{successMessage}</p>
          </div>
        )}

        {/* Submit */}
        <Button
          type='submit'
          disabled={isLoading}
          className='group h-11 w-full rounded-xl bg-neutral-950 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-amber-950 hover:shadow-lg hover:shadow-amber-950/10 focus-visible:ring-4 focus-visible:ring-amber-900/20 disabled:cursor-not-allowed disabled:opacity-70'
        >
          {isLoading ? (
            <>
              <LoaderCircle className='size-4 animate-spin' />
              Membuat akun...
            </>
          ) : (
            <>
              Buat Akun
              <ArrowRight className='size-4 transition-transform duration-300 group-hover:translate-x-1' />
            </>
          )}
        </Button>
      </form>

      {/* Login link: lebih ringkas daripada kartu tambahan */}
      <p className='mt-5 text-center text-sm text-neutral-500'>
        Sudah punya akun?{" "}
        <Link
          href='/login'
          className='font-semibold text-amber-900 underline-offset-4 transition-colors hover:text-amber-700 hover:underline'
        >
          Masuk sekarang
        </Link>
      </p>

      <p className='mt-4 text-center text-xs leading-5 text-neutral-400'>
        Dengan mendaftar, kamu dapat menjelajahi pengalaman Kopilogi secara lebih personal.
      </p>
    </div>
  );
}
