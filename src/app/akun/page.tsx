import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, LogOut, Mail, UserRound } from "lucide-react";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "Akun Saya",
  description: "Kelola akun dan akses layanan Kopilogi.",
};

async function handleSignOut() {
  "use server";

  await signOut({
    redirectTo: "/login",
  });
}

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className='min-h-screen bg-background'>
      <header className='border-b border-border bg-background/95'>
        <Container className='flex h-20 items-center justify-between gap-4'>
          <Link href='/' className='text-lg font-bold tracking-tight'>
            KOPILOGI
          </Link>

          <div className='flex items-center gap-3'>
            <Link
              href='/'
              className='hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:block'
            >
              Beranda
            </Link>

            <form action={handleSignOut}>
              <Button type='submit' variant='outline' className='rounded-xl'>
                <LogOut className='size-4' />
                Keluar
              </Button>
            </form>
          </div>
        </Container>
      </header>

      <section className='py-12 sm:py-16'>
        <Container>
          <div className='max-w-3xl'>
            <p className='inline-flex rounded-full border border-border bg-accent/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-label'>
              Akun Saya
            </p>

            <h1 className='mt-4 text-3xl font-semibold tracking-tight sm:text-4xl'>
              Selamat datang, {session.user.name?.split(" ")[0] ?? "Kamu"}.
            </h1>

            <p className='mt-3 max-w-2xl text-base leading-7 text-muted-foreground'>
              Kelola informasi akun dan akses layanan Kopilogi dari satu tempat.
            </p>
          </div>

          <div className='mt-10 grid gap-5 md:grid-cols-2'>
            <div className='rounded-2xl border border-border bg-card p-6'>
              <div className='flex size-11 items-center justify-center rounded-xl bg-accent'>
                <UserRound className='size-5' />
              </div>

              <p className='mt-5 text-sm text-muted-foreground'>Nama</p>

              <p className='mt-1 text-lg font-semibold'>{session.user.name ?? "-"}</p>
            </div>

            <div className='rounded-2xl border border-border bg-card p-6'>
              <div className='flex size-11 items-center justify-center rounded-xl bg-accent'>
                <Mail className='size-5' />
              </div>

              <p className='mt-5 text-sm text-muted-foreground'>Email</p>

              <p className='mt-1 break-all text-lg font-semibold'>{session.user.email ?? "-"}</p>
            </div>
          </div>

          <div className='mt-5 rounded-2xl border border-border bg-card p-6'>
            <div className='flex flex-col justify-between gap-5 sm:flex-row sm:items-center'>
              <div>
                <p className='text-sm font-semibold'>Jelajahi Kopilogi</p>

                <p className='mt-1 text-sm leading-6 text-muted-foreground'>
                  Lihat menu dan informasi Kopilogi.
                </p>
              </div>

              <Button className='rounded-xl'>
                <Link href='/menu'>
                  Lihat Menu
                  <ArrowRight className='size-4' />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
