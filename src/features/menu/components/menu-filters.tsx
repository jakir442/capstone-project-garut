'use client';

import { Search, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { MenuCategory } from '../types';

type MenuFiltersProps = {
  search: string;
  category: 'Semua' | MenuCategory;
  onSearchChange: (value: string) => void;
  onCategoryChange: (category: 'Semua' | MenuCategory) => void;
};

const categories: Array<'Semua' | MenuCategory> = ['Semua', 'Kopi', 'Minuman', 'Makanan'];

export function MenuFilters({
  search,
  category,
  onSearchChange,
  onCategoryChange,
}: MenuFiltersProps) {
  return (
    <div className='space-y-5'>
      <div className='relative max-w-xl'>
        <Search className='pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />

        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder='Cari menu...'
          aria-label='Cari menu'
          className='h-12 rounded-full border-border bg-card pl-11 pr-11'
        />

        {search && (
          <Button
            type='button'
            variant='ghost'
            size='icon'
            onClick={() => onSearchChange('')}
            className='absolute right-1 top-1/2 size-10 -translate-y-1/2 rounded-full'
            aria-label='Hapus pencarian'
          >
            <X className='size-4' />
          </Button>
        )}
      </div>

      <div className='flex flex-wrap items-center gap-2'>
        {categories.map((item) => {
          const active = category === item;

          return (
            <button
              key={item}
              type='button'
              onClick={() => onCategoryChange(item)}
              aria-pressed={active}
              className='rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
            >
              <Badge
                variant={active ? 'default' : 'outline'}
                className='cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors'
              >
                {item}
              </Badge>
            </button>
          );
        })}
      </div>
    </div>
  );
}
