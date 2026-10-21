import { ArrowUpRight, CheckCircle2, Clock3, MapPin } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";

const locations = [
  {
    name: "Kopilogi Cikuray",
    branch: "Cabang 01",
    city: "Garut, Jawa Barat",
    address: "Jl. Cikuray No.42, Regol, Kec. Garut Kota, Kabupaten Garut, Jawa Barat 44114",
    concept: "Modern Futuristic",
    description:
      "Perpaduan desain modern dan nuansa futuristik untuk menikmati kopi, makanan, atau menghabiskan waktu bersama.",
    status: "active",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Kopilogi+Cikuray+Garut",
    featured: true,
  },
  {
    name: "Waroeng Kopilogi",
    branch: "Cabang 02",
    city: "Garut, Jawa Barat",
    address: "Jl. Guntur No.14, Paminggir, Kec. Garut Kota, Kabupaten Garut, Jawa Barat 44118",
    concept: "Traditional Heritage",
    description:
      "Karakter tradisional dengan suasana hangat yang menghadirkan pengalaman berbeda dari cabang Kopilogi lainnya.",
    status: "active",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Waroeng+Kopilogi+Jl+Guntur+Garut",
    featured: false,
  },
  {
    name: "Kopilogi Tasik",
    branch: "Cabang 04",
    city: "Tasikmalaya, Jawa Barat",
    address: "Jl. Dr. Sukarjo No. 34, Tawangsari, Kec. Tawang, Kota Tasikmalaya, Jawa Barat 46112.",
    concept: "Cozy & Relaxed",
    description:
      "Suasana nyaman untuk menikmati sajian Kopilogi, berbincang santai, dan meluangkan waktu bersama.",
    status: "active",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Kopilogi+Tasikmalaya",
    featured: false,
  },
];

export function LocationsSection() {
  return (
    <section id='locations' className='border-t border-border/60 bg-background'>
      <Container className='py-20 sm:py-28'>
        <div className='flex flex-col gap-8 md:flex-row md:items-end md:justify-between'>
          <SectionHeading
            label='Lokasi Kopilogi'
            title='Temukan tempat untuk cerita berikutnya.'
            description='Setiap cabang memiliki karakter dan suasana tersendiri. Pilih lokasi yang sesuai dengan perjalanan dan momen yang ingin kamu nikmati.'
          />

          <div className='flex shrink-0 items-center gap-2 self-start rounded-full border border-border bg-muted/40 px-3.5 py-2 md:mb-1'>
            <CheckCircle2 className='size-4 text-foreground' aria-hidden='true' />
            <span className='text-xs font-medium text-muted-foreground'>3 lokasi aktif</span>
          </div>
        </div>

        <div className='mt-12 grid gap-5 lg:grid-cols-3'>
          {locations.map((location) => (
            <article
              key={location.name}
              className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/[0.04] sm:p-7 ${
                location.featured ? "border-foreground/20 bg-muted/30" : "border-border/70 bg-card"
              }`}
            >
              <div className='flex items-start justify-between gap-3'>
                <div className='flex size-12 items-center justify-center rounded-2xl border border-border/70 bg-background transition-transform duration-300 group-hover:scale-105'>
                  <MapPin className='size-5' aria-hidden='true' />
                </div>

                <span className='inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground'>
                  <span className='size-1.5 rounded-full bg-emerald-500' />
                  Sedang beroperasi
                </span>
              </div>

              <div className='mt-8'>
                <p className='text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground'>
                  {location.branch}
                </p>

                <h3 className='mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl'>
                  {location.name}
                </h3>

                <div className='mt-3 flex items-start gap-2 text-sm leading-6 text-muted-foreground'>
                  <MapPin className='mt-1 size-4 shrink-0' aria-hidden='true' />
                  <div>
                    <p>{location.address}</p>
                    <p>{location.city}</p>
                  </div>
                </div>
              </div>

              <div className='mt-6'>
                <span className='inline-flex rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-foreground'>
                  {location.concept}
                </span>

                <p className='mt-4 text-sm leading-7 text-muted-foreground'>
                  {location.description}
                </p>
              </div>

              <div className='mt-auto pt-7'>
                <div className='mb-5 border-t border-border/70' />

                <a
                  href={location.mapUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group/link inline-flex min-h-11 w-full items-center justify-between gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                  aria-label={`Lihat petunjuk arah ke ${location.name} di Google Maps`}
                >
                  <span>Lihat petunjuk arah</span>
                  <ArrowUpRight
                    className='size-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5'
                    aria-hidden='true'
                  />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Informasi lokasi yang telah tutup */}
        <div className='mt-10 rounded-2xl border border-border/70 bg-muted/30 p-5 sm:p-6'>
          <div className='flex flex-col gap-4 sm:flex-row sm:items-start'>
            <div className='flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background'>
              <Clock3 className='size-5 text-muted-foreground' aria-hidden='true' />
            </div>

            <div className='flex-1'>
              <div className='flex flex-wrap items-center gap-2'>
                <h3 className='font-semibold text-foreground'>Kopilogi Hallway</h3>
                <span className='rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-muted-foreground'>
                  Tutup permanen
                </span>
              </div>

              <p className='mt-2 max-w-3xl text-sm leading-6 text-muted-foreground'>
                Kopilogi Hallway merupakan bagian dari perjalanan Kopilogi di Garut. Lokasi ini
                telah tutup secara permanen dan tidak lagi melayani pelanggan. Informasi ini
                dicantumkan agar pengunjung tidak keliru menganggap Hallway sebagai cabang yang
                masih beroperasi.
              </p>
            </div>
          </div>
        </div>

        <div className='mt-10 flex flex-col gap-4 rounded-3xl border border-border/70 bg-card p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8'>
          <div className='max-w-xl'>
            <h3 className='text-lg font-semibold tracking-tight text-foreground'>
              Sudah menentukan tujuanmu?
            </h3>
            <p className='mt-2 text-sm leading-6 text-muted-foreground'>
              Jelajahi pilihan kopi, minuman, makanan, dan dessert sebelum berkunjung ke cabang
              pilihanmu.
            </p>
          </div>

          <Link
            href='/menu'
            className='inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg'
          >
            Jelajahi menu
            <ArrowUpRight className='size-4' aria-hidden='true' />
          </Link>
        </div>
      </Container>
    </section>
  );
}
