import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Coffee } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Navbar } from "@/components/layout/navbar";
import { HomeFooter } from "@/features/home/components/home-footer";
import { MenuCard } from "@/features/menu/components/menu-card";
import { getPublicMenuBySlug, getPublicMenus } from "@/features/menu/queries/public-menu.queries";

type MenuDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: MenuDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPublicMenuBySlug(slug);

  if (!item) {
    return {
      title: "Menu Tidak Ditemukan",
    };
  }

  return {
    title: item.name,
    description: item.description,
  };
}

export default async function MenuDetailPage({ params }: MenuDetailPageProps) {
  const { slug } = await params;

  const item = await getPublicMenuBySlug(slug);

  if (!item) {
    notFound();
  }

  const allMenus = await getPublicMenus();

  const relatedItems = allMenus
    .filter((menu) => menu.category === item.category && menu.slug !== item.slug)
    .slice(0, 3);

  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(item.price);

  return (
    <>
      <Navbar />

      <main className='min-h-screen bg-background'>
        <Container className='py-8 sm:py-12'>
          <nav
            aria-label='Breadcrumb'
            className='mb-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground'
          >
            <Link href='/' className='transition-colors hover:text-foreground'>
              Beranda
            </Link>

            <span aria-hidden='true'>/</span>

            <Link href='/menu' className='transition-colors hover:text-foreground'>
              Menu
            </Link>

            <span aria-hidden='true'>/</span>

            <span aria-current='page' className='text-foreground'>
              {item.name}
            </span>
          </nav>

          <section className='grid items-start gap-8 lg:grid-cols-2 lg:gap-16'>
            <div className='relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-muted sm:aspect-[5/4]'>
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  priority
                  sizes='(max-width: 1024px) 100vw, 50vw'
                  className='object-cover'
                />
              ) : (
                <div className='flex size-full items-center justify-center text-sm text-muted-foreground'>
                  Tidak ada gambar
                </div>
              )}
            </div>

            <div className='flex flex-col py-2 sm:py-6 lg:py-10'>
              <Badge variant='secondary' className='w-fit rounded-full px-3 py-1'>
                {item.category}
              </Badge>

              <h1 className='mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl'>
                {item.name}
              </h1>

              <p className='mt-5 text-base leading-8 text-muted-foreground sm:text-lg'>
                {item.description}
              </p>

              <div className='mt-8 border-y border-border py-6'>
                <p className='text-sm text-muted-foreground'>Harga</p>

                <p className='mt-2 text-2xl font-semibold tracking-tight'>{formattedPrice}</p>
              </div>

              <div className='mt-8 flex flex-wrap gap-3'>
                <Button className='h-12 rounded-full px-6'>
                  <Link href='/menu'>
                    <ArrowLeft className='mr-2 size-4' />
                    Kembali ke Menu
                  </Link>
                </Button>

                <Button variant='outline' className='h-12 rounded-full px-6'>
                  <Link href='/#locations'>
                    Kunjungi Kopilogi
                    <ArrowUpRight className='ml-2 size-4' />
                  </Link>
                </Button>
              </div>

              <div className='mt-8 flex items-start gap-3 rounded-2xl border border-border bg-muted/40 p-4'>
                <Coffee className='mt-0.5 size-5 shrink-0 text-muted-foreground' />

                <p className='text-sm leading-6 text-muted-foreground'>
                  Informasi menu dan harga dapat berubah. Silakan konfirmasi ketersediaan dan harga
                  terbaru kepada pihak Kopilogi.
                </p>
              </div>
            </div>
          </section>

          {relatedItems.length > 0 && (
            <section className='mt-20 border-t border-border pt-12 sm:mt-28 sm:pt-16'>
              <div className='mb-8 flex flex-wrap items-end justify-between gap-4'>
                <div>
                  <p className='text-sm font-semibold uppercase tracking-[0.18em] text-accent'>
                    Pilihan lainnya
                  </p>

                  <h2 className='mt-3 text-3xl font-semibold tracking-tight sm:text-4xl'>
                    Kamu mungkin suka.
                  </h2>
                </div>

                <Button variant='ghost' className='rounded-full'>
                  <Link href='/menu'>
                    Lihat semua menu
                    <ArrowUpRight className='ml-2 size-4' />
                  </Link>
                </Button>
              </div>

              <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
                {relatedItems.map((relatedItem) => (
                  <MenuCard key={relatedItem.id} item={relatedItem} />
                ))}
              </div>
            </section>
          )}
        </Container>
      </main>

      <HomeFooter />
    </>
  );
}
