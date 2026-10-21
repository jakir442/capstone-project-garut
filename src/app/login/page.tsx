import Link from "next/link";
import type { Metadata } from "next";
import { LoginForm } from "@/features/users/components/login-form";

export const metadata: Metadata = {
  title: "Masuk",
  description: "Masuk ke akun Kopilogi.",
};

export default function LoginPage() {
  return (
    <main className='min-h-screen bg-background px-5 py-16'>
      <div className='mx-auto w-full max-w-md'>
        <Link href='/' className='text-sm text-muted-foreground hover:text-foreground'>
          ← Kembali ke beranda
        </Link>

        <div className='mt-8'>
          <h1 className='text-3xl font-semibold tracking-tight'>Masuk ke Kopilogi</h1>

          <p className='mt-2 text-sm text-muted-foreground'>
            Masuk menggunakan akun Kopilogi kamu.
          </p>
        </div>

        <div className='mt-8 rounded-2xl border border-border bg-card p-6'>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
