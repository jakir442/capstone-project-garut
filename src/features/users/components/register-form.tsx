"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LoaderCircle, LockKeyhole, Mail, UserRound } from "lucide-react";
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result.message ?? "Gagal membuat akun. Silakan coba lagi.");
        return;
      }

      setSuccessMessage("Akun berhasil dibuat. Mengarahkan ke halaman login...");

      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch {
      setErrorMessage("Terjadi kesalahan koneksi. Silakan coba beberapa saat lagi.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-5'>
      <div className='space-y-2'>
        <label htmlFor='name' className='text-sm font-medium text-foreground'>
          Nama lengkap
        </label>

        <div className='relative'>
          <UserRound className='absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />

          <Input
            id='name'
            name='name'
            type='text'
            autoComplete='name'
            placeholder='Nama lengkap kamu'
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            disabled={isLoading}
            className='h-12 rounded-xl pl-10'
          />
        </div>
      </div>

      <div className='space-y-2'>
        <label htmlFor='email' className='text-sm font-medium text-foreground'>
          Email
        </label>

        <div className='relative'>
          <Mail className='absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />

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
            className='h-12 rounded-xl pl-10'
          />
        </div>
      </div>

      <div className='space-y-2'>
        <div className='flex items-center justify-between gap-3'>
          <label htmlFor='password' className='text-sm font-medium text-foreground'>
            Password
          </label>

          <span className='text-xs text-muted-foreground'>Minimal 8 karakter</span>
        </div>

        <div className='relative'>
          <LockKeyhole className='absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />

          <Input
            id='password'
            name='password'
            type={showPassword ? "text" : "password"}
            autoComplete='new-password'
            placeholder='Buat password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            disabled={isLoading}
            className='h-12 rounded-xl pl-10 pr-12'
          />

          <button
            type='button'
            onClick={() => setShowPassword((current) => !current)}
            aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
            className='absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground'
          >
            {showPassword ? <EyeOff className='size-4' /> : <Eye className='size-4' />}
          </button>
        </div>
      </div>

      {errorMessage && (
        <p
          role='alert'
          className='rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-sm text-destructive'
        >
          {errorMessage}
        </p>
      )}

      {successMessage && (
        <p
          role='status'
          className='rounded-lg border border-border bg-accent/50 px-3 py-2.5 text-sm text-foreground'
        >
          {successMessage}
        </p>
      )}

      <Button
        type='submit'
        disabled={isLoading}
        className='h-12 w-full rounded-xl text-sm font-semibold'
      >
        {isLoading ? (
          <>
            <LoaderCircle className='mr-2 size-4 animate-spin' />
            Membuat akun...
          </>
        ) : (
          "Buat Akun"
        )}
      </Button>

      <p className='text-center text-sm text-muted-foreground'>
        Sudah punya akun?{" "}
        <Link
          href='/login'
          className='font-semibold text-foreground underline-offset-4 hover:underline'
        >
          Masuk sekarang
        </Link>
      </p>
    </form>
  );
}
