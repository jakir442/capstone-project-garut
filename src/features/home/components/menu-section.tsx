import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import type { PublicMenu, PublicMenuCategory } from "@/features/menu/types";

const categories: Array<{
  title: PublicMenuCategory;
  description: string;
}> = [
  {
    title: "Kopi",
    description: "Pilihan kopi untuk menemani pagi, sore, maupun waktu bersantai.",
  },
  {
    title: "Minuman",
    description: "Beragam pilihan minuman untuk dinikmati sesuai suasana hati.",
  },
  {
    title: "Makanan",
    description: "Pilihan makanan yang cocok dinikmati bersama kopi dan minuman favorit.",
  },
];

type MenuSectionProps = {
  menus: PublicMenu[];
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function MenuSection({ menus }: MenuSectionProps) {
  return (
    <section id='menu' className='border-t border-border/60'>
      <Container className='py-20 sm:py-28'>
        <SectionHeading
          label='Menu'
          title='Temukan pilihan untuk setiap momen.'
          description='Jelajahi pilihan kopi, minuman, dan makanan yang tersedia di Kopilogi.'
        />

        {/* Category */}
        <div className='mt-12 grid gap-4 md:grid-cols-3'>
          {categories.map((category, index) => {
            const categoryMenus = menus.filter((menu) => menu.category === category.title);

            return (
              <Link
                key={category.title}
                href={`/menu?category=${encodeURIComponent(category.title)}`}
                className='group relative overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-lg'
              >
                <div className='flex items-start justify-between gap-4'>
                  <span className='text-sm font-medium text-muted-foreground'>0{index + 1}</span>

                  <span className='rounded-full border border-border/80 px-3 py-1 text-xs font-medium text-muted-foreground'>
                    {categoryMenus.length} {categoryMenus.length === 1 ? "menu" : "menu"}
                  </span>
                </div>

                <h3 className='mt-16 text-2xl font-semibold tracking-tight'>{category.title}</h3>

                <p className='mt-3 max-w-sm text-sm leading-6 text-muted-foreground'>
                  {category.description}
                </p>

                <div className='mt-8 flex items-center gap-2 text-sm font-medium'>
                  Lihat pilihan
                  <ArrowUpRight className='size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Menu dari database */}
        {menus.length > 0 && (
          <div className='mt-16'>
            <div className='flex items-end justify-between gap-6'>
              <div>
                <p className='text-sm font-medium text-muted-foreground'>Pilihan Kopilogi</p>

                <h3 className='mt-2 text-2xl font-semibold tracking-tight sm:text-3xl'>
                  Menu yang tersedia
                </h3>
              </div>

              <Link
                href='/menu'
                className='hidden items-center gap-2 text-sm font-medium transition-colors hover:text-muted-foreground sm:flex'
              >
                Lihat semua
                <ArrowUpRight className='size-4' />
              </Link>
            </div>

            <div className='mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
              {menus.slice(0, 6).map((menu) => (
                <Link
                  key={menu.id}
                  href={`/menu/${menu.slug}`}
                  className='group overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-lg'
                >
                  <div className='aspect-[4/3] overflow-hidden bg-muted'>
                    {menu.image ? (
                      <img
                        src={menu.image}
                        alt={menu.name}
                        className='size-full object-cover transition-transform duration-500 group-hover:scale-105'
                      />
                    ) : (
                      <div className='flex size-full items-center justify-center text-sm text-muted-foreground'>
                        Tidak ada gambar
                      </div>
                    )}
                  </div>

                  <div className='p-5'>
                    <div className='flex items-center justify-between gap-4'>
                      <span className='text-xs font-medium text-muted-foreground'>
                        {menu.category}
                      </span>

                      {menu.featured && (
                        <span className='rounded-full border border-border px-2.5 py-1 text-[11px] font-medium'>
                          Favorit
                        </span>
                      )}
                    </div>

                    <h4 className='mt-3 text-lg font-semibold tracking-tight'>{menu.name}</h4>

                    <p className='mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground'>
                      {menu.description}
                    </p>

                    <div className='mt-5 flex items-center justify-between gap-4'>
                      <span className='text-sm font-semibold'>{formatPrice(menu.price)}</span>

                      <span className='flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground'>
                        Detail
                        <ArrowUpRight className='size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <Link
              href='/menu'
              className='mt-8 flex items-center justify-center gap-2 text-sm font-medium sm:hidden'
            >
              Lihat semua menu
              <ArrowUpRight className='size-4' />
            </Link>
          </div>
        )}

        {/* Empty state */}
        {menus.length === 0 && (
          <div className='mt-12 rounded-3xl border border-dashed border-border p-10 text-center'>
            <p className='text-sm text-muted-foreground'>
              Menu sedang dipersiapkan. Silakan kembali lagi nanti.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
