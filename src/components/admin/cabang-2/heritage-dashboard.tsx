"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  BookOpen,
  ChevronRight,
  Clock3,
  Coffee,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu as MenuIcon,
  Settings2,
  ShieldCheck,
  Store,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

import type { BranchDocument } from "@/features/branches/types";
import { MenuManagement, type MenuData } from "@/features/menu/components/admin/menu-management";

type HeritageDashboardProps = {
  name: string;
  email: string;
  branch: BranchDocument | null;
  menus: MenuData[];
  onSignOut: () => Promise<void>;
  activeTab?: "dashboard" | "menu";
};

type NavigationItem = {
  label: string;
  description: string;
  icon: LucideIcon;
  href?: string;
  tab?: "dashboard" | "menu";
  active?: boolean;
};

const navigationItems: NavigationItem[] = [
  {
    label: "Dashboard",
    description: "Ringkasan cabang",
    icon: LayoutDashboard,
    href: "/admin/cabang-2",
    tab: "dashboard",
  },
  {
    label: "Kelola Menu",
    description: "Daftar dan informasi menu",
    icon: UtensilsCrossed,
    href: "/admin/cabang-2?tab=menu",
    tab: "menu",
  },
  {
    label: "Profil Cabang",
    description: "Informasi identitas cabang",
    icon: Store,
  },
  {
    label: "Pengaturan",
    description: "Pengaturan sistem",
    icon: Settings2,
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut" as const,
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

function NavigationLink({
  item,
  activeTab,
}: {
  item: NavigationItem;
  activeTab: "dashboard" | "menu";
}) {
  const Icon = item.icon;
  const isActive = item.tab === activeTab;

  if (!item.href) {
    return (
      <div className='group flex cursor-not-allowed items-center gap-3 rounded-xl px-3 py-3 text-[#A99A87]'>
        <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F0E8DC]'>
          <Icon size={18} strokeWidth={1.7} />
        </div>

        <div className='min-w-0 flex-1'>
          <p className='text-sm font-semibold'>{item.label}</p>
          <p className='mt-0.5 text-[11px]'>{item.description}</p>
        </div>

        <span className='rounded-full bg-[#E7DED1] px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-[#9B8B78]'>
          Segera
        </span>
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className={`group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200 ${
        isActive
          ? "bg-[#49372A] text-[#FBF5EB] shadow-[0_8px_20px_rgba(73,55,42,0.12)]"
          : "text-[#76624F] hover:bg-[#F1E8DC] hover:text-[#49372A]"
      }`}
    >
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
          isActive ? "bg-[#604A37]" : "bg-[#F0E8DC]"
        }`}
      >
        <Icon size={18} strokeWidth={1.7} />
      </div>

      <div className='min-w-0 flex-1'>
        <p className='text-sm font-semibold'>{item.label}</p>
        <p className={`mt-0.5 text-[11px] ${isActive ? "text-[#D9CABB]" : "text-[#9A8975]"}`}>
          {item.description}
        </p>
      </div>

      <ChevronRight
        size={15}
        className={`transition-transform duration-200 ${
          isActive ? "text-[#D7C0A6]" : "text-[#B3A392] group-hover:translate-x-0.5"
        }`}
      />
    </Link>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className='text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A7C5D] sm:text-xs'>
      {children}
    </p>
  );
}

function DecorativeArch() {
  return (
    <div className='pointer-events-none absolute inset-y-0 right-0 hidden w-[48%] overflow-hidden lg:block'>
      <div className='absolute right-[-30px] top-1/2 h-[470px] w-[360px] -translate-y-1/2 rounded-t-[180px] border border-[#806348]/20' />
      <div className='absolute right-[35px] top-1/2 h-[390px] w-[300px] -translate-y-1/2 rounded-t-[150px] border border-[#806348]/20' />
      <div className='absolute right-[100px] top-1/2 h-[310px] w-[240px] -translate-y-1/2 rounded-t-[120px] border border-[#806348]/20' />

      <div className='absolute right-[165px] top-1/2 h-[225px] w-[175px] -translate-y-1/2 rounded-t-[90px] bg-[#76573D]/[0.07]' />

      <div className='absolute right-[88px] top-[18%] h-3 w-3 rounded-full bg-[#667451]/40' />
      <div className='absolute right-[195px] bottom-[21%] h-2 w-2 rounded-full bg-[#765239]/30' />
    </div>
  );
}

export function HeritageDashboard({
  name,
  email,
  branch,
  menus,
  onSignOut,
  activeTab = "dashboard",
}: HeritageDashboardProps) {
  const firstName = name.trim().split(/\s+/)[0] || "Admin";

  const branchName = branch?.name ?? "Kopilogi Cabang 2";
  const branchAddress = branch?.address ?? "Informasi alamat belum tersedia";

  return (
    <div className='min-h-screen bg-[#F5F0E7] text-[#49372A] selection:bg-[#B99A72]/30'>
      <div className='pointer-events-none fixed inset-0 z-0 overflow-hidden'>
        <div className='absolute -left-32 top-[-180px] h-[420px] w-[420px] rounded-full bg-[#D9C5AA]/20 blur-3xl' />
        <div className='absolute -right-32 bottom-[-180px] h-[420px] w-[420px] rounded-full bg-[#89936D]/10 blur-3xl' />

        <div className='absolute inset-0 opacity-[0.025] [background-image:radial-gradient(#49372A_0.8px,transparent_0.8px)] [background-size:20px_20px]' />
      </div>

      <div className='relative z-10 flex min-h-screen'>
        {/* SIDEBAR DESKTOP */}
        <aside className='hidden w-[280px] shrink-0 flex-col border-r border-[#DED3C3] bg-[#FBF8F2] px-5 py-7 lg:flex'>
          {/* BRAND */}
          <Link href='/admin/cabang-2' className='group flex items-center gap-3 px-2'>
            <div className='relative flex h-12 w-12 items-center justify-center rounded-xl bg-[#49372A] text-[#F6EBDD] shadow-[0_8px_18px_rgba(73,55,42,0.15)] transition-transform duration-300 group-hover:-rotate-2'>
              <Coffee size={24} strokeWidth={1.5} />

              <span className='absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-[#FBF8F2] bg-[#667451]' />
            </div>

            <div>
              <p className='font-serif text-[22px] font-bold tracking-tight text-[#49372A]'>
                Kopilogi
              </p>

              <p className='mt-0.5 text-[9px] font-bold uppercase tracking-[0.22em] text-[#9A7C5D]'>
                Cabang Heritage
              </p>
            </div>
          </Link>

          {/* BRANCH CARD */}
          <div className='mt-10 overflow-hidden rounded-2xl border border-[#DDCEBB] bg-[#F1E7D8]'>
            <div className='h-1 bg-[#765239]' />

            <div className='p-4'>
              <div className='flex items-center gap-2'>
                <span className='h-2 w-2 rounded-full bg-[#667451]' />

                <span className='text-[9px] font-bold uppercase tracking-[0.18em] text-[#806B55]'>
                  Cabang Aktif
                </span>
              </div>

              <p className='mt-3 font-serif text-lg font-semibold text-[#49372A]'>Cabang 2</p>

              <p className='mt-1 text-xs leading-relaxed text-[#88745E]'>{branchName}</p>
            </div>
          </div>

          {/* NAVIGATION */}
          <div className='mt-9'>
            <p className='mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#AA9278]'>
              Navigasi
            </p>

            <nav className='space-y-1.5'>
              {navigationItems.map((item) => (
                <NavigationLink key={item.label} item={item} activeTab={activeTab} />
              ))}
            </nav>
          </div>

          {/* BOTTOM */}
          <div className='mt-auto pt-8'>
            <div className='rounded-2xl border border-[#DDD0BE] bg-[#F7F1E8] p-4'>
              <div className='flex items-center gap-2 text-[#667451]'>
                <ShieldCheck size={17} strokeWidth={1.7} />

                <span className='text-xs font-semibold'>Akses Terproteksi</span>
              </div>

              <p className='mt-2 text-[11px] leading-relaxed text-[#8C7A66]'>
                Akun hanya dapat mengelola data sesuai kewenangan cabang.
              </p>
            </div>

            <button
              type='button'
              onClick={() => void onSignOut()}
              className='mt-4 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-[#816A55] transition-colors hover:bg-[#F0E6D8] hover:text-[#49372A]'
            >
              <LogOut size={18} strokeWidth={1.7} />
              Keluar dari akun
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <main className='min-w-0 flex-1'>
          {activeTab === "menu" ? (
            <MenuManagement
              initialMenus={menus}
              branchId={branch?._id ? String(branch._id) : undefined}
              theme='traditional-heritage'
            />
          ) : (
            <>
              {/* HEADER */}
              <header className='sticky top-0 z-30 flex min-h-[76px] items-center justify-between border-b border-[#DED3C3]/80 bg-[#F8F4EC]/90 px-5 backdrop-blur-xl sm:px-8 lg:px-10'>
                <div className='flex min-w-0 items-center gap-3'>
                  <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#DED3C3] bg-[#FBF8F2] lg:hidden'>
                    <Coffee size={20} strokeWidth={1.6} className='text-[#49372A]' />
                  </div>

                  <div className='min-w-0'>
                    <p className='truncate text-sm font-semibold text-[#49372A] sm:text-base'>
                      {branchName}
                    </p>

                    <p className='mt-0.5 text-xs text-[#927D67]'>Panel Administrasi Cabang 2</p>
                  </div>
                </div>

                <div className='flex shrink-0 items-center gap-3'>
                  <div className='hidden text-right sm:block'>
                    <p className='text-sm font-semibold text-[#49372A]'>{name}</p>

                    <p className='mt-0.5 max-w-[190px] truncate text-xs text-[#927D67]'>{email}</p>
                  </div>

                  <div className='flex h-10 w-10 items-center justify-center rounded-full border border-[#D4C1A9] bg-[#E9D9C4] font-serif text-base font-bold text-[#49372A]'>
                    {firstName.charAt(0).toUpperCase()}
                  </div>

                  <button
                    type='button'
                    aria-label='Notifikasi'
                    title='Notifikasi'
                    className='hidden h-10 w-10 items-center justify-center rounded-xl border border-[#DED3C3] bg-[#FBF8F2] text-[#806B55] transition-colors hover:bg-[#EFE5D7] sm:flex'
                  >
                    <Bell size={18} strokeWidth={1.7} />
                  </button>
                </div>
              </header>

              {/* CONTENT */}
              <motion.div
                variants={staggerContainer}
                initial='hidden'
                animate='visible'
                className='mx-auto max-w-[1500px] space-y-8 px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10'
              >
                {/* HERO */}
                <motion.section
                  variants={fadeUp}
                  className='relative isolate overflow-hidden rounded-[28px] border border-[#D6C2A7] bg-[#E9D9C3] shadow-[0_16px_40px_rgba(76,53,32,0.07)]'
                >
                  <DecorativeArch />

                  <div className='absolute bottom-0 left-0 h-1 w-28 bg-[#765239]' />

                  <div className='relative z-10 max-w-3xl px-6 py-9 sm:px-9 sm:py-11 lg:px-11 lg:py-14'>
                    <div className='inline-flex items-center gap-2 rounded-full border border-[#B99A76]/50 bg-[#F8F0E4]/70 px-3.5 py-2'>
                      <span className='h-1.5 w-1.5 rounded-full bg-[#667451]' />

                      <span className='text-[9px] font-bold uppercase tracking-[0.18em] text-[#705B46] sm:text-[10px]'>
                        Traditional Heritage · Cabang 02
                      </span>
                    </div>

                    <h1 className='mt-6 max-w-2xl font-serif text-[34px] font-semibold leading-[1.1] tracking-tight text-[#49372A] sm:text-[42px] lg:text-[52px]'>
                      Merawat Tradisi,
                      <br />
                      Menyajikan Cerita.
                    </h1>

                    <p className='mt-5 max-w-xl text-sm leading-7 text-[#735E49] sm:text-base sm:leading-8'>
                      Selamat datang, {firstName}. Kelola informasi Kopilogi Cabang 2 dengan suasana
                      yang hangat, klasik, dan tetap relevan dengan pengalaman pelanggan masa kini.
                    </p>

                    <div className='mt-7 flex flex-wrap gap-3'>
                      <Link
                        href='/admin/cabang-2?tab=menu'
                        className='inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#49372A] px-5 py-3 text-sm font-semibold text-[#FFF8EE] shadow-[0_8px_18px_rgba(73,55,42,0.14)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#604836]'
                      >
                        <UtensilsCrossed size={17} strokeWidth={1.7} />
                        Kelola Menu
                        <ArrowRight size={16} strokeWidth={1.7} />
                      </Link>

                      <div className='inline-flex min-h-12 items-center gap-2 rounded-xl border border-[#CDB69A] bg-[#F8F0E4]/70 px-4 py-3 text-sm font-medium text-[#725C47]'>
                        <Clock3 size={16} strokeWidth={1.7} />
                        Ruang kerja cabang
                      </div>
                    </div>
                  </div>
                </motion.section>

                {/* TITLE */}
                <motion.section variants={fadeUp}>
                  <div className='flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
                    <div>
                      <SectionLabel>Ringkasan Pengelolaan</SectionLabel>

                      <h2 className='mt-2 font-serif text-[27px] font-semibold tracking-tight text-[#49372A] sm:text-[32px]'>
                        Semua berawal dari sini.
                      </h2>

                      <p className='mt-2 max-w-xl text-sm leading-6 text-[#8A7762]'>
                        Kelola informasi yang menjadi wajah digital Kopilogi Cabang 2.
                      </p>
                    </div>

                    <div className='w-fit rounded-full border border-[#DCCDBA] bg-[#FBF8F2] px-3.5 py-2 text-xs font-medium text-[#806B55]'>
                      Panel Cabang 2
                    </div>
                  </div>
                </motion.section>

                {/* CARDS */}
                <motion.section
                  variants={staggerContainer}
                  className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'
                >
                  {/* MENU */}
                  <motion.article
                    variants={fadeUp}
                    className='group rounded-2xl border border-[#E0D4C3] bg-[#FBF8F2] p-5 shadow-[0_5px_18px_rgba(76,53,32,0.025)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C8B08F] hover:shadow-[0_14px_30px_rgba(76,53,32,0.07)] sm:p-6'
                  >
                    <div className='flex items-start justify-between gap-3'>
                      <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEE2D2] text-[#755339]'>
                        <UtensilsCrossed size={22} strokeWidth={1.6} />
                      </div>

                      <ArrowRight
                        size={18}
                        className='text-[#B09A82] transition-transform duration-200 group-hover:translate-x-1'
                      />
                    </div>

                    <h3 className='mt-5 text-lg font-semibold text-[#49372A]'>Informasi Menu</h3>

                    <p className='mt-2 min-h-[48px] text-sm leading-6 text-[#88745F]'>
                      Kelola daftar menu, informasi produk, dan konten yang ditampilkan kepada
                      pelanggan.
                    </p>

                    <Link
                      href='/admin/cabang-2?tab=menu'
                      className='mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#755339] transition-colors hover:text-[#49372A]'
                    >
                      Buka pengelolaan
                      <ChevronRight size={16} />
                    </Link>
                  </motion.article>

                  {/* BRANCH */}
                  <motion.article
                    variants={fadeUp}
                    className='rounded-2xl border border-[#E0D4C3] bg-[#FBF8F2] p-5 shadow-[0_5px_18px_rgba(76,53,32,0.025)] sm:p-6'
                  >
                    <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-[#E5E8DA] text-[#667451]'>
                      <Store size={22} strokeWidth={1.6} />
                    </div>

                    <h3 className='mt-5 text-lg font-semibold text-[#49372A]'>Identitas Cabang</h3>

                    <p className='mt-2 text-sm leading-6 text-[#88745F]'>
                      Informasi dasar cabang yang digunakan untuk memperkenalkan lokasi dan karakter
                      Kopilogi.
                    </p>

                    <div className='mt-5 flex items-start gap-2 text-xs font-medium text-[#667451]'>
                      <ShieldCheck size={15} strokeWidth={1.7} className='mt-0.5 shrink-0' />

                      <span>Terhubung dengan data cabang</span>
                    </div>
                  </motion.article>

                  {/* LOCATION */}
                  <motion.article
                    variants={fadeUp}
                    className='rounded-2xl border border-[#E0D4C3] bg-[#FBF8F2] p-5 shadow-[0_5px_18px_rgba(76,53,32,0.025)] md:col-span-2 xl:col-span-1 sm:p-6'
                  >
                    <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8DDD0] text-[#755339]'>
                      <MapPin size={22} strokeWidth={1.6} />
                    </div>

                    <h3 className='mt-5 text-lg font-semibold text-[#49372A]'>Lokasi Cabang</h3>

                    <p className='mt-2 line-clamp-2 text-sm leading-6 text-[#88745F]'>
                      {branchAddress}
                    </p>

                    <div className='mt-5 flex items-center gap-2 text-xs font-medium text-[#92795E]'>
                      <MapPin size={15} strokeWidth={1.7} />
                      <span>Informasi lokasi cabang</span>
                    </div>
                  </motion.article>
                </motion.section>

                {/* HERITAGE STORY */}
                <motion.section variants={fadeUp} className='grid gap-5 lg:grid-cols-[1.3fr_0.7fr]'>
                  <div className='relative overflow-hidden rounded-2xl border border-[#DCCAB3] bg-[#EFE3D2] p-6 sm:p-8'>
                    <div className='absolute -right-16 -top-16 h-40 w-40 rounded-full border border-[#806348]/10' />
                    <div className='absolute -right-5 -top-5 h-24 w-24 rounded-full border border-[#806348]/10' />

                    <div className='relative'>
                      <div className='flex items-start justify-between gap-4'>
                        <div>
                          <SectionLabel>Karakter Cabang</SectionLabel>

                          <h2 className='mt-2 font-serif text-[25px] font-semibold text-[#49372A] sm:text-[29px]'>
                            Hangat, klasik, dan dekat.
                          </h2>
                        </div>

                        <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#49372A] text-[#F5EBDD]'>
                          <BookOpen size={20} strokeWidth={1.6} />
                        </div>
                      </div>

                      <p className='mt-4 max-w-2xl text-sm leading-7 text-[#79634D]'>
                        Identitas visual Cabang 2 mengambil inspirasi dari suasana tradisional yang
                        hangat: dinding cream, elemen kayu, aksen charcoal, serta sentuhan hijau
                        alami. Keseluruhan elemen dibuat sederhana agar terasa akrab namun tetap
                        memiliki karakter.
                      </p>

                      <div className='mt-7 flex flex-wrap gap-2.5'>
                        <span className='inline-flex items-center gap-2 rounded-full border border-[#D8C5AC] bg-[#F8F0E4]/80 px-3.5 py-2 text-xs font-medium text-[#705B46]'>
                          <span className='h-3.5 w-3.5 rounded-full border border-black/10 bg-[#F3EBDD]' />
                          Cream
                        </span>

                        <span className='inline-flex items-center gap-2 rounded-full border border-[#D8C5AC] bg-[#F8F0E4]/80 px-3.5 py-2 text-xs font-medium text-[#705B46]'>
                          <span className='h-3.5 w-3.5 rounded-full border border-black/10 bg-[#765239]' />
                          Kayu
                        </span>

                        <span className='inline-flex items-center gap-2 rounded-full border border-[#D8C5AC] bg-[#F8F0E4]/80 px-3.5 py-2 text-xs font-medium text-[#705B46]'>
                          <span className='h-3.5 w-3.5 rounded-full border border-black/10 bg-[#292722]' />
                          Charcoal
                        </span>

                        <span className='inline-flex items-center gap-2 rounded-full border border-[#D8C5AC] bg-[#F8F0E4]/80 px-3.5 py-2 text-xs font-medium text-[#705B46]'>
                          <span className='h-3.5 w-3.5 rounded-full border border-black/10 bg-[#667451]' />
                          Olive
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* BRANCH STATUS */}
                  <div className='rounded-2xl border border-[#DDD0BE] bg-[#FBF8F2] p-6 sm:p-8'>
                    <SectionLabel>Status Cabang</SectionLabel>

                    <div className='mt-5 flex items-center gap-3'>
                      <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-[#E5E8DA] text-[#667451]'>
                        <ShieldCheck size={22} strokeWidth={1.6} />
                      </div>

                      <div>
                        <p className='text-base font-semibold text-[#49372A]'>Cabang Aktif</p>

                        <div className='mt-1 flex items-center gap-2'>
                          <span className='h-2 w-2 rounded-full bg-[#667451]' />

                          <span className='text-xs text-[#88745F]'>Sistem siap digunakan</span>
                        </div>
                      </div>
                    </div>

                    <div className='my-6 h-px bg-[#E3D7C6]' />

                    <div className='space-y-4'>
                      <div>
                        <p className='text-[10px] font-bold uppercase tracking-[0.16em] text-[#A18A72]'>
                          Nama Cabang
                        </p>

                        <p className='mt-1.5 text-sm font-medium text-[#5E4A38]'>{branchName}</p>
                      </div>

                      <div>
                        <p className='text-[10px] font-bold uppercase tracking-[0.16em] text-[#A18A72]'>
                          Konsep
                        </p>

                        <p className='mt-1.5 text-sm font-medium text-[#5E4A38]'>
                          Traditional Heritage
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.section>

                {/* INFORMATION */}
                <motion.section
                  variants={fadeUp}
                  className='rounded-2xl border border-[#DED1BF] bg-[#F8F2E9] p-5 sm:p-7'
                >
                  <div className='flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between'>
                    <div className='flex items-start gap-4'>
                      <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8DDD0] text-[#755339]'>
                        <Coffee size={20} strokeWidth={1.6} />
                      </div>

                      <div>
                        <p className='text-sm font-semibold text-[#49372A]'>
                          Jaga informasi tetap akurat.
                        </p>

                        <p className='mt-1 text-xs leading-5 text-[#88745F] sm:text-sm'>
                          Pastikan data menu, lokasi, dan informasi cabang sudah sesuai sebelum
                          ditampilkan kepada pelanggan.
                        </p>
                      </div>
                    </div>

                    <Link
                      href='/admin/cabang-2?tab=menu'
                      className='inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-[#CDB99E] bg-[#FBF8F2] px-4 py-2.5 text-sm font-semibold text-[#6F543C] transition-colors hover:bg-[#EFE5D7]'
                    >
                      Periksa Menu
                      <ArrowRight size={15} strokeWidth={1.7} />
                    </Link>
                  </div>
                </motion.section>

                {/* FOOTER */}
                <motion.footer
                  variants={fadeUp}
                  className='flex flex-col gap-3 border-t border-[#DED3C3] pt-5 text-xs text-[#9B8975] sm:flex-row sm:items-center sm:justify-between'
                >
                  <p>© {new Date().getFullYear()} Kopilogi · Panel Administrasi Cabang 2</p>

                  <div className='flex items-center gap-2'>
                    <MenuIcon size={14} strokeWidth={1.7} />
                    <span>Traditional Heritage Interface</span>
                    <ExternalLink size={13} strokeWidth={1.7} />
                  </div>
                </motion.footer>
              </motion.div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
