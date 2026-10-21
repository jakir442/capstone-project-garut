"use client";

import { useMemo, useState } from "react";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";

import { MenuCard } from "./menu-card";
import { MenuFilters } from "./menu-filters";

import type { PublicMenu, PublicMenuCategory } from "../types";

type CategoryFilter = "Semua" | PublicMenuCategory;

type MenuPageProps = {
  menus: PublicMenu[];
  initialCategory?: CategoryFilter;
};

export function MenuPage({ menus, initialCategory = "Semua" }: MenuPageProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CategoryFilter>(initialCategory);

  const filteredItems = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return menus.filter((item) => {
      const matchesCategory = category === "Semua" || item.category === category;

      const matchesSearch =
        !normalizedSearch ||
        item.name.toLowerCase().includes(normalizedSearch) ||
        item.description.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [menus, search, category]);

  return (
    <main className='min-h-screen bg-background'>
      <section className='border-b border-border/70'>
        <Container className='py-20 sm:py-24 lg:py-28'>
          <div className='grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end'>
            <SectionHeading
              label='Menu Kopilogi'
              title='Temukan rasa favoritmu.'
              description='Pilihan kopi, minuman, dan makanan untuk menemani setiap momen di Kopilogi.'
            />

            <p className='max-w-xs text-sm leading-6 text-muted-foreground lg:text-right'>
              Nikmati pilihan menu Kopilogi dalam suasana yang nyaman dan modern.
            </p>
          </div>
        </Container>
      </section>

      <section>
        <Container className='py-10 sm:py-12 lg:py-16'>
          <MenuFilters
            search={search}
            category={category}
            onSearchChange={setSearch}
            onCategoryChange={setCategory}
          />

          <div className='mt-10'>
            <div className='mb-6 flex items-center justify-between gap-4'>
              <p className='text-sm text-muted-foreground'>
                Menampilkan{" "}
                <span className='font-medium text-foreground'>{filteredItems.length}</span> menu
              </p>

              {search && (
                <p className='text-sm text-muted-foreground'>
                  Hasil untuk <span className='font-medium text-foreground'>“{search}”</span>
                </p>
              )}
            </div>

            {filteredItems.length > 0 ? (
              <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {filteredItems.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className='flex min-h-72 flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-border bg-muted/30 px-6 text-center'>
                <p className='text-lg font-semibold'>Menu tidak ditemukan</p>

                <p className='mt-2 max-w-md text-sm leading-6 text-muted-foreground'>
                  {menus.length === 0
                    ? "Belum ada menu yang tersedia saat ini."
                    : "Coba gunakan kata kunci lain atau pilih kategori yang berbeda."}
                </p>
              </div>
            )}
          </div>
        </Container>
      </section>
    </main>
  );
}
