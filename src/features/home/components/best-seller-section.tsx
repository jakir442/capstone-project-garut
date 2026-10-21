import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { BestSeller3D } from "./best-seller-3d";

export function BestSellerSection() {
  return (
    <section className='overflow-hidden bg-neutral-950 text-white'>
      <Container className='py-20 sm:py-28 lg:py-32'>
        <div className='grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-4'>
          <div className='relative z-10 max-w-xl'>
            <div className='mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm'>
              <Sparkles className='size-3.5' />
              Best Seller
            </div>

            <h2 className='text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl'>
              Ice Coffee
              <br />
              <span className='text-white/45'>Logi.</span>
            </h2>

            <p className='mt-6 max-w-md text-sm leading-7 text-white/55 sm:text-base'>
              Salah satu menu favorit pelanggan Kopilogi yang menjadi bagian dari pengalaman ngopi
              khas Kopilogi.
            </p>

            <div className='mt-8 flex flex-wrap items-center gap-4'>
              <Link
                href='/menu'
                className='group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-neutral-950 transition-transform hover:scale-[1.02]'
              >
                Lihat Menu
                <ArrowUpRight className='size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
              </Link>

              <span className='text-sm text-white/40'>Favorit pelanggan Kopilogi</span>
            </div>
          </div>

          <div className='relative'>
            <div className='pointer-events-none absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.04] blur-3xl sm:size-96' />

            <BestSeller3D />
          </div>
        </div>
      </Container>
    </section>
  );
}
