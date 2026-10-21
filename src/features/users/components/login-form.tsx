"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import { Eye, EyeOff, LoaderCircle, LockKeyhole, Mail } from "lucide-react";
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
    <form onSubmit={handleSubmit} className='space-y-5'>
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
            autoComplete='current-password'
            placeholder='Masukkan password'
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

      <Button
        type='submit'
        disabled={isLoading}
        className='h-12 w-full rounded-xl text-sm font-semibold'
      >
        {isLoading ? (
          <>
            <LoaderCircle className='mr-2 size-4 animate-spin' />
            Memproses login...
          </>
        ) : (
          "Masuk ke Akun"
        )}
      </Button>

      <p className='text-center text-sm text-muted-foreground'>
        Belum punya akun?{" "}
        <Link
          href='/register'
          className='font-semibold text-foreground underline-offset-4 hover:underline'
        >
          Daftar sekarang
        </Link>
      </p>
    </form>
  );
}
