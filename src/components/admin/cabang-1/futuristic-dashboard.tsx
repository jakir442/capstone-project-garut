"use client";

import Link from "next/link";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  CircleUserRound,
  Coffee,
  Command,
  Cpu,
  ExternalLink,
  Gauge,
  Layers3,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu as MenuIcon,
  MonitorCog,
  Radio,
  ScanLine,
  Settings2,
  ShieldCheck,
  Users,
  Wifi,
  X,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { useState } from "react";
import { MenuManagement, type MenuData } from "@/features/menu/components/admin/menu-management";
import type { BranchDocument } from "@/features/branches/types";

type FuturisticDashboardProps = {
  name: string;
  email: string;
  branch: BranchDocument | null;
  menus: MenuData[];
  onSignOut: () => Promise<void>;
  activeTab: "dashboard" | "menu";
};

const ease = [0.22, 1, 0.36, 1] as const;

const pageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.55, ease },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
    filter: "blur(5px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.65,
      ease,
    },
  },
};

const sideVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -18,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.55,
      ease,
    },
  },
};

const navItems = [
  {
    label: "Dasbor",
    icon: LayoutDashboard,
    href: "/admin/cabang-1",
    tab: "dashboard" as const,
  },
  {
    label: "Kelola Menu",
    icon: Coffee,
    href: "/admin/cabang-1?tab=menu",
    tab: "menu" as const,
  },
  {
    label: "Pelanggan",
    icon: Users,
    disabled: true,
  },
  {
    label: "Konten Website",
    icon: MonitorCog,
    disabled: true,
  },
];

export function FuturisticDashboard({
  name,
  email,
  branch,
  menus,
  onSignOut,
  activeTab = "dashboard",
}: FuturisticDashboardProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const firstName = name.trim().split(/\s+/)[0] || "Admin";
  const branchName = branch?.name ?? "Kopilogi Cabang 1";

  return (
    <motion.main
      variants={pageVariants}
      initial='hidden'
      animate='visible'
      className='relative min-h-screen overflow-hidden bg-[#101112] text-[#E7E9EA] selection:bg-white/15 selection:text-white'
    >
      {/* Background industrial grid */}
      <div
        aria-hidden='true'
        className='pointer-events-none fixed inset-0 opacity-[0.28]'
        style={{
          backgroundImage:
            "linear-gradient(rgba(210,216,220,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(210,216,220,0.045) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "linear-gradient(to bottom, black 0%, rgba(0,0,0,0.5) 55%, transparent 100%)",
        }}
      />

      {/* Soft metallic atmosphere */}
      <div
        aria-hidden='true'
        className='pointer-events-none fixed -left-48 top-[-10rem] h-[34rem] w-[34rem] rounded-full bg-white/[0.045] blur-[130px]'
      />

      <motion.div
        aria-hidden='true'
        className='pointer-events-none fixed -right-40 top-[20%] h-[32rem] w-[32rem] rounded-full bg-slate-300/[0.035] blur-[140px]'
        animate={{
          x: [0, -22, 0],
          y: [0, 18, 0],
          scale: [1, 1.06, 1],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        aria-hidden='true'
        className='pointer-events-none fixed -bottom-56 left-[28%] h-[34rem] w-[34rem] rounded-full bg-slate-400/[0.03] blur-[150px]'
        animate={{
          x: [0, 24, 0],
          y: [0, -16, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className='relative mx-auto flex min-h-screen max-w-[1920px]'>
        {/* Desktop navigation */}
        <motion.aside
          variants={sideVariants}
          className='hidden w-[278px] shrink-0 flex-col border-r border-white/[0.085] bg-[#151617]/90 backdrop-blur-2xl lg:flex'
        >
          <Brand />

          <div className='px-4 pt-8'>
            <p className='px-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#8C9195]'>
              Ruang Kerja
            </p>

            <nav className='mt-3 space-y-1.5'>
              {navItems.map((item, index) => (
                <SidebarLink
                  key={item.label}
                  {...item}
                  active={"tab" in item ? item.tab === activeTab : false}
                  index={String(index + 1).padStart(2, "0")}
                />
              ))}
            </nav>
          </div>

          <div className='mt-9 px-4'>
            <p className='px-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#8C9195]'>
              Sistem
            </p>

            <div className='mt-3'>
              <SidebarLink label='Pengaturan' icon={Settings2} disabled index='05' />
            </div>
          </div>

          {/* Access panel */}
          <div className='mt-auto p-4'>
            <div className='relative overflow-hidden rounded-xl border border-[#AEB5B9]/15 bg-gradient-to-br from-[#303335]/80 to-[#191A1B]/80 p-4'>
              <div className='absolute -right-5 -top-7 h-24 w-24 rounded-full border border-white/[0.07]' />

              <div className='absolute -right-1 -top-3 h-16 w-16 rounded-full border border-white/[0.07]' />

              <div className='relative flex items-center gap-2.5'>
                <span className='flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06]'>
                  <ShieldCheck className='h-4 w-4 text-[#D7DCDF]' />
                </span>

                <span className='text-sm font-medium text-[#D4D9DC]'>Akses Cabang</span>
              </div>

              <p className='relative mt-3 text-sm leading-6 text-[#9EA5A9]'>
                Akses sistem dibatasi sesuai dengan hak akses cabang yang diberikan.
              </p>

              <div className='relative mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-[#D0D5D8]'>
                <span className='h-2 w-2 animate-pulse rounded-full bg-[#D5D9DC]' />
                Sesi terlindungi
              </div>
            </div>
          </div>

          <ProfileFooter name={name} email={email} onSignOut={onSignOut} />
        </motion.aside>

        {/* Main content */}
        <section className='min-w-0 flex-1'>
          {activeTab === "menu" ? (
            <MenuManagement
              initialMenus={menus}
              branchId={branch?._id ? String(branch._id) : undefined}
              theme='modern-futuristic'
            />
          ) : (
            <>
              {/* Top navigation */}
              <header className='sticky top-0 z-30 flex min-h-[76px] items-center justify-between gap-3 border-b border-white/[0.08] bg-[#101112]/90 px-4 py-3 backdrop-blur-2xl sm:px-7 lg:px-10'>
                <div className='flex min-w-0 items-center gap-3'>
                  <button
                    type='button'
                    onClick={() => setMobileNavOpen((open) => !open)}
                    aria-label={mobileNavOpen ? "Tutup navigasi" : "Buka navigasi"}
                    className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035] text-[#B8BEC2] transition hover:border-white/20 hover:text-white lg:hidden'
                  >
                    {mobileNavOpen ? <X className='h-5 w-5' /> : <MenuIcon className='h-5 w-5' />}
                  </button>

                  <div className='min-w-0'>
                    <div className='flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-[#8D9397] sm:text-sm'>
                      <Command className='h-4 w-4 shrink-0 text-[#B5BBBE]' />

                      <span className='truncate'>Kopilogi / Sistem Manajemen</span>
                    </div>

                    <div className='mt-1.5 flex items-center gap-2 text-sm text-[#C8CDCF]'>
                      <span className='relative flex h-2 w-2 shrink-0'>
                        <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D5DADC] opacity-30' />

                        <span className='relative inline-flex h-2 w-2 rounded-full bg-[#D5DADC]' />
                      </span>
                      Sistem antarmuka aktif
                    </div>
                  </div>
                </div>

                <div className='flex shrink-0 items-center gap-2 sm:gap-3'>
                  <div className='hidden items-center gap-2 rounded-lg border border-white/[0.09] bg-white/[0.025] px-3 py-2.5 text-xs text-[#A7ADB1] xl:flex'>
                    <Wifi className='h-4 w-4 text-[#D0D5D8]' />
                    Koneksi aman
                  </div>

                  <div className='hidden h-9 w-px bg-white/10 sm:block' />

                  <div className='hidden max-w-44 text-right sm:block'>
                    <p className='truncate text-sm font-medium text-[#E1E4E6]'>{name}</p>

                    <p className='mt-0.5 text-xs text-[#8D9397]'>Admin Cabang</p>
                  </div>

                  <div className='flex h-10 w-10 items-center justify-center rounded-xl border border-[#A8B0B4]/20 bg-gradient-to-br from-[#5A6064]/50 to-[#252728] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]'>
                    <CircleUserRound className='h-5 w-5 text-[#D2D7D9]' />
                  </div>

                  <form action={onSignOut} className='hidden sm:block'>
                    <button
                      type='submit'
                      aria-label='Keluar'
                      title='Keluar'
                      className='flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.09] text-[#A0A6AA] transition duration-200 hover:border-white/20 hover:bg-white/[0.04] hover:text-white'
                    >
                      <LogOut className='h-4 w-4' />
                    </button>
                  </form>
                </div>
              </header>

              {/* Mobile navigation */}
              {mobileNavOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='fixed inset-x-0 top-[76px] z-40 border-b border-white/10 bg-[#151617]/[0.98] p-4 shadow-2xl backdrop-blur-2xl lg:hidden'
                >
                  <div className='mb-4'>
                    <Brand compact />
                  </div>

                  <nav className='space-y-1.5'>
                    {navItems.map((item, index) => (
                      <SidebarLink
                        key={item.label}
                        {...item}
                        active={"tab" in item ? item.tab === activeTab : false}
                        index={String(index + 1).padStart(2, "0")}
                        onNavigate={() => setMobileNavOpen(false)}
                      />
                    ))}

                    <SidebarLink label='Pengaturan' icon={Settings2} disabled index='05' />
                  </nav>

                  <div className='mt-4 border-t border-white/10 pt-4'>
                    <div className='mb-3 min-w-0'>
                      <p className='truncate text-sm font-medium text-[#E1E4E6]'>{name}</p>

                      <p className='mt-1 truncate text-xs text-[#A0A6AA]'>{email}</p>
                    </div>

                    <form action={onSignOut}>
                      <button
                        type='submit'
                        className='flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-3 text-sm text-[#D0D5D8] transition hover:bg-white/[0.07] hover:text-white'
                      >
                        <LogOut className='h-4 w-4' />
                        Keluar dari akun
                      </button>
                    </form>
                  </div>
                </motion.div>
              )}

              <motion.div
                variants={containerVariants}
                initial='hidden'
                animate='visible'
                className='mx-auto max-w-[1600px] px-4 py-7 sm:px-7 sm:py-9 lg:px-10 lg:py-11'
              >
                {/* Page introduction */}
                <motion.div
                  variants={itemVariants}
                  className='mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end'
                >
                  <div>
                    <div className='mb-4 flex items-center gap-2.5'>
                      <span className='h-px w-8 bg-[#C8CDD0]' />

                      <p className='text-xs font-semibold uppercase tracking-[0.18em] text-[#B5BBBE] sm:text-sm'>
                        Cabang 01 / Pusat Kendali
                      </p>
                    </div>

                    <h1 className='text-4xl font-semibold leading-[1.1] tracking-[-0.045em] text-[#F0F2F3] sm:text-5xl lg:text-6xl'>
                      Selamat datang,
                      <br className='sm:hidden' />{" "}
                      <span className='bg-gradient-to-r from-[#F3F4F5] via-[#C7CDD0] to-[#858D92] bg-clip-text text-transparent'>
                        {firstName}.
                      </span>
                    </h1>

                    <p className='mt-4 max-w-2xl text-base leading-7 text-[#A5AAAE] sm:text-lg sm:leading-8'>
                      Kelola informasi cabang, perbarui menu, dan bangun pengalaman digital Kopilogi
                      melalui satu ruang kerja terintegrasi.
                    </p>
                  </div>

                  <div className='flex shrink-0 items-center gap-3 self-start rounded-xl border border-white/[0.09] bg-white/[0.025] px-4 py-3 sm:self-auto'>
                    <span className='flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.06] text-[#D8DCDE]'>
                      <Activity className='h-5 w-5' />
                    </span>

                    <div>
                      <p className='text-xs uppercase tracking-[0.12em] text-[#8D9397]'>
                        Status ruang kerja
                      </p>

                      <p className='mt-1 text-sm font-semibold text-[#D4D8DA]'>Siap digunakan</p>
                    </div>

                    <Check className='ml-1 h-4 w-4 text-[#D8DDDF]' />
                  </div>
                </motion.div>

                {/* Main industrial panel */}
                <motion.section
                  variants={itemVariants}
                  className='group relative isolate overflow-hidden rounded-2xl border border-[#858D92]/25 bg-[#1A1C1E] shadow-[0_24px_80px_rgba(0,0,0,0.22)]'
                >
                  <div className='absolute inset-0 -z-20 bg-gradient-to-br from-[#3A3E41] via-[#202325] to-[#131516]' />

                  <div
                    aria-hidden='true'
                    className='absolute inset-0 -z-10 opacity-50'
                    style={{
                      backgroundImage:
                        "linear-gradient(115deg, transparent 0%, rgba(235,239,241,0.065) 38%, transparent 64%), linear-gradient(rgba(210,217,220,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(210,217,220,0.04) 1px, transparent 1px)",
                      backgroundSize: "auto, 32px 32px, 32px 32px",
                    }}
                  />

                  {/* Large industrial rings */}
                  <div className='absolute right-[-4rem] top-[-8rem] -z-10 h-[26rem] w-[26rem] rounded-full border border-[#D4D9DC]/[0.10] sm:right-[-1rem] sm:top-[-10rem] sm:h-[34rem] sm:w-[34rem]' />

                  <div className='absolute right-[1.5rem] top-[-5rem] -z-10 h-[22rem] w-[22rem] rounded-full border border-white/[0.09] sm:right-[4rem] sm:top-[-7rem] sm:h-[28rem] sm:w-[28rem]' />

                  <motion.div
                    aria-hidden='true'
                    className='absolute right-[5rem] top-[3rem] -z-10 hidden h-40 w-40 rounded-full border border-dashed border-[#C7CED2]/20 xl:block'
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 65,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  <div className='grid min-h-[360px] lg:grid-cols-[1.15fr_0.85fr]'>
                    <div className='relative z-10 flex flex-col justify-center p-6 sm:p-9 lg:p-12'>
                      <div className='flex flex-wrap items-center gap-2.5'>
                        <span className='inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.055] px-3.5 py-2 text-xs font-medium uppercase tracking-[0.12em] text-[#E0E4E6]'>
                          <span className='h-2 w-2 rounded-full bg-[#E0E4E7] shadow-[0_0_12px_rgba(220,225,228,0.55)]' />
                          Industrial Monokrom
                        </span>

                        <span className='rounded-full border border-white/10 px-3.5 py-2 text-xs uppercase tracking-[0.12em] text-[#B6BDC1]'>
                          Cabang 01
                        </span>
                      </div>

                      <h2 className='mt-7 max-w-2xl text-4xl font-medium leading-[1.08] tracking-[-0.045em] text-[#F1F3F4] sm:text-5xl lg:text-6xl'>
                        Ruang industrial
                        <br />
                        untuk kopi terbaik.
                      </h2>

                      <p className='mt-5 max-w-xl text-base leading-7 text-[#B0B5B8] sm:text-lg sm:leading-8'>
                        Satu ruang kerja untuk mengelola identitas cabang, memperbarui informasi
                        menu, dan menghadirkan pengalaman digital yang lebih baik bagi setiap
                        pengunjung Kopilogi.
                      </p>

                      <div className='mt-8 flex flex-wrap gap-3'>
                        <Link
                          href='/admin/cabang-1?tab=menu'
                          className='group/button inline-flex items-center gap-2.5 rounded-lg border border-white/20 bg-gradient-to-b from-[#F0F2F3] to-[#AEB5B9] px-5 py-3.5 text-sm font-semibold text-[#17191A] shadow-[0_6px_24px_rgba(0,0,0,0.16)] transition duration-300 hover:-translate-y-0.5 hover:brightness-110'
                        >
                          Kelola Menu
                          <ArrowUpRight className='h-4 w-4 transition-transform group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5' />
                        </Link>

                        {branch?.googleMapsUrl ? (
                          <a
                            href={branch.googleMapsUrl}
                            target='_blank'
                            rel='noreferrer'
                            className='inline-flex items-center gap-2.5 rounded-lg border border-white/[0.13] bg-white/[0.035] px-5 py-3.5 text-sm font-medium text-[#D0D5D8] transition duration-300 hover:border-white/25 hover:bg-white/[0.07]'
                          >
                            Lihat Lokasi Cabang
                            <ExternalLink className='h-4 w-4' />
                          </a>
                        ) : (
                          <div className='inline-flex items-center gap-2.5 rounded-lg border border-white/[0.09] bg-white/[0.02] px-5 py-3.5 text-sm text-[#A1A7AA]'>
                            <Building2 className='h-4 w-4' />
                            Ruang Kerja Cabang
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Industrial instrument */}
                    <div className='relative hidden min-h-[340px] items-center justify-center overflow-hidden border-l border-white/[0.07] lg:flex'>
                      <div className='absolute inset-0 bg-gradient-to-br from-white/[0.035] to-transparent' />

                      <motion.div
                        className='relative flex h-[280px] w-[280px] items-center justify-center rounded-full border border-[#BFC7CB]/20'
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 48,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <div className='absolute inset-4 rounded-full border border-dashed border-white/15' />

                        <div className='absolute inset-10 rounded-full border border-[#D6DCE0]/15' />

                        <div className='absolute inset-[5.2rem] rounded-full border border-white/15 shadow-[0_0_45px_rgba(220,225,228,0.05)]' />

                        <div className='absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#F0F2F3] shadow-[0_0_14px_rgba(225,230,233,0.65)]' />

                        <div className='absolute bottom-5 right-8 h-2 w-2 rounded-full bg-[#D5DADD]/80' />

                        <div className='absolute left-8 top-14 h-2 w-2 rounded-full bg-[#D5DADD]/60' />
                      </motion.div>

                      <motion.div
                        className='absolute flex h-32 w-32 items-center justify-center rounded-2xl border border-[#D2D8DC]/20 bg-gradient-to-br from-[#666D72]/90 to-[#242729]/95 shadow-[0_20px_70px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.14)]'
                        animate={{
                          y: [0, -7, 0],
                          rotateY: [0, 7, 0],
                        }}
                        transition={{
                          duration: 5.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <div className='absolute inset-2 rounded-xl border border-white/[0.08]' />

                        <div className='flex flex-col items-center gap-2.5'>
                          <Cpu className='h-9 w-9 text-[#E0E5E8]' strokeWidth={1.2} />

                          <span className='text-[10px] font-medium uppercase tracking-[0.17em] text-[#D7DCDF]'>
                            KLG / 01
                          </span>
                        </div>
                      </motion.div>

                      <div className='absolute bottom-6 left-6 right-6 flex items-center justify-between border-t border-white/[0.09] pt-4'>
                        <span className='flex items-center gap-2.5 text-xs uppercase tracking-[0.12em] text-[#9BA2A7]'>
                          <ScanLine className='h-4 w-4 text-[#D0D5D8]' />
                          Modul Antarmuka
                        </span>

                        <span className='font-mono text-xs text-[#A5ABB0]'>01—A</span>
                      </div>
                    </div>
                  </div>
                </motion.section>

                {/* Modules */}
                <motion.div
                  variants={itemVariants}
                  className='mt-9 flex items-center justify-between gap-4'
                >
                  <div>
                    <p className='text-xs font-semibold uppercase tracking-[0.17em] text-[#949B9F] sm:text-sm'>
                      Modul Ruang Kerja
                    </p>

                    <h2 className='mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#E6E9EA] sm:text-3xl'>
                      Kelola Cabang Anda
                    </h2>
                  </div>

                  <span className='hidden items-center gap-2 text-sm text-[#8D9397] sm:flex'>
                    <Layers3 className='h-4 w-4' />3 modul tersedia
                  </span>
                </motion.div>

                <motion.section
                  variants={containerVariants}
                  className='mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3'
                >
                  <motion.div variants={itemVariants}>
                    <ModuleCard
                      index='01'
                      icon={Coffee}
                      title='Kelola Menu'
                      description='Atur nama menu, deskripsi, harga, dan gambar yang akan ditampilkan kepada pengunjung website.'
                      href='/admin/cabang-1?tab=menu'
                      status='Siap digunakan'
                      active
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <ModuleCard
                      index='02'
                      icon={Users}
                      title='Pelanggan'
                      description='Ruang pengembangan untuk kebutuhan informasi, interaksi, dan pengalaman pelanggan Kopilogi.'
                      status='Dalam pengembangan'
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <ModuleCard
                      index='03'
                      icon={MonitorCog}
                      title='Konten Website'
                      description='Pengelolaan informasi dan konten cabang akan tersedia pada tahap pengembangan berikutnya.'
                      status='Dalam pengembangan'
                    />
                  </motion.div>
                </motion.section>

                {/* Branch information and monitoring */}
                <motion.section
                  variants={containerVariants}
                  className='mt-8 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]'
                >
                  <motion.div
                    variants={itemVariants}
                    className='relative overflow-hidden rounded-2xl border border-white/[0.09] bg-gradient-to-br from-[#25282A]/90 to-[#171819]/95 p-5 sm:p-7'
                  >
                    <div className='absolute -right-10 -top-10 h-40 w-40 rounded-full border border-white/[0.045]' />

                    <div className='absolute -right-2 -top-2 h-24 w-24 rounded-full border border-white/[0.06]' />

                    <div className='relative flex items-start justify-between gap-4'>
                      <div>
                        <div className='flex items-center gap-2.5 text-xs uppercase tracking-[0.15em] text-[#A0A6AA] sm:text-sm'>
                          <Building2 className='h-4 w-4 text-[#C1C6C9]' />
                          Informasi Cabang
                        </div>

                        <h3 className='mt-4 text-xl font-semibold tracking-[-0.025em] text-[#E7EAEB] sm:text-2xl'>
                          {branchName}
                        </h3>

                        <p className='mt-2 max-w-lg text-sm leading-7 text-[#A0A6AA] sm:text-base'>
                          {branch?.address ?? "Informasi alamat cabang belum tersedia."}
                        </p>
                      </div>

                      <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#AAB1B5]/15 bg-[#AAB1B5]/[0.06]'>
                        <MapPin className='h-5 w-5 text-[#C1C6C9]' />
                      </div>
                    </div>

                    <div className='relative mt-6 grid gap-4 border-t border-white/[0.08] pt-5 sm:grid-cols-2'>
                      <DetailItem label='Konsep Cabang' value='Modern Futuristik' />

                      <DetailItem
                        label='Jam Operasional'
                        value={branch?.openingHours || "Belum diatur"}
                      />

                      <DetailItem label='Nomor Kontak' value={branch?.phone || "Belum tersedia"} />

                      <DetailItem label='ID Ruang Kerja' value='KLG / BR-01' />
                    </div>

                    {branch?.googleMapsUrl && (
                      <a
                        href={branch.googleMapsUrl}
                        target='_blank'
                        rel='noreferrer'
                        className='relative mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#D9DEE1] transition hover:text-white'
                      >
                        Buka lokasi di Google Maps
                        <ArrowUpRight className='h-4 w-4' />
                      </a>
                    )}
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className='rounded-2xl border border-white/[0.09] bg-[#17191A]/85 p-5 sm:p-7'
                  >
                    <div className='flex items-center justify-between gap-3'>
                      <div>
                        <p className='text-xs uppercase tracking-[0.15em] text-[#A0A6AA] sm:text-sm'>
                          Pemantauan Sistem
                        </p>

                        <h3 className='mt-2 text-xl font-semibold text-[#E6E9EA] sm:text-2xl'>
                          Status Lingkungan
                        </h3>
                      </div>

                      <div className='flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035]'>
                        <Gauge className='h-5 w-5 text-[#D5DADC]' />
                      </div>
                    </div>

                    <div className='mt-5 space-y-3'>
                      <SystemStatus
                        icon={ShieldCheck}
                        label='Otorisasi akun'
                        value='Terverifikasi'
                        color='silver'
                      />

                      <SystemStatus
                        icon={Radio}
                        label='Ruang kerja cabang'
                        value='Terhubung'
                        color='silver'
                      />

                      <SystemStatus
                        icon={Activity}
                        label='Antarmuka dasbor'
                        value='Aktif'
                        color='silver'
                      />
                    </div>

                    <div className='mt-5 rounded-xl border border-white/[0.07] bg-black/15 p-4'>
                      <div className='flex items-center justify-between gap-3'>
                        <div>
                          <p className='text-sm font-semibold text-[#D5DADC]'>Kontrol Akses</p>

                          <p className='mt-1.5 text-sm leading-6 text-[#A0A6AA]'>
                            Akses data mengikuti hak akses cabang yang ditetapkan untuk akun Anda.
                          </p>
                        </div>

                        <ShieldCheck className='h-6 w-6 shrink-0 text-[#D3D9DC]' />
                      </div>
                    </div>
                  </motion.div>
                </motion.section>

                {/* Footer */}
                <motion.footer
                  variants={itemVariants}
                  className='mt-8 flex flex-col justify-between gap-3 border-t border-white/[0.08] py-6 sm:flex-row sm:items-center'
                >
                  <div className='flex flex-wrap items-center gap-2.5 text-xs text-[#92999D] sm:text-sm'>
                    <Coffee className='h-4 w-4 text-[#B0B6BA]' />

                    <span>Sistem Manajemen Kopilogi</span>

                    <span className='text-white/20'>/</span>

                    <span>Cabang 01</span>
                  </div>

                  <div className='flex items-center gap-2.5 text-xs uppercase tracking-[0.12em] text-[#899095]'>
                    <span className='font-mono'>KLG—SYS</span>

                    <span className='h-1 w-1 rounded-full bg-[#778085]' />

                    <span>Industrial Monochrome</span>
                  </div>
                </motion.footer>
              </motion.div>
            </>
          )}
        </section>
      </div>
    </motion.main>
  );
}

type IconType = typeof LayoutDashboard;

type SidebarLinkProps = {
  icon: IconType;
  label: string;
  index: string;
  href?: string;
  active?: boolean;
  disabled?: boolean;
  onNavigate?: () => void;
};

function SidebarLink({
  icon: Icon,
  label,
  index,
  href,
  active,
  disabled,
  onNavigate,
}: SidebarLinkProps) {
  const className = [
    "group flex w-full items-center justify-between rounded-xl border px-3 py-3.5 transition-all duration-200",
    active
      ? "border-white/15 bg-gradient-to-r from-white/[0.09] to-transparent text-[#E6E8E9] shadow-[inset_2px_0_0_rgba(220,225,228,0.8)]"
      : disabled
        ? "cursor-not-allowed border-transparent text-[#687075]"
        : "border-transparent text-[#A0A6AA] hover:border-white/[0.07] hover:bg-white/[0.035] hover:text-[#DCE0E2]",
  ].join(" ");

  const contents = (
    <>
      <span className='flex min-w-0 items-center gap-3'>
        <span
          className={[
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors",
            active
              ? "bg-white/[0.08] text-[#E7EAEC]"
              : "bg-white/[0.025] text-[#A0A6AA] group-hover:text-[#D6DBDE]",
          ].join(" ")}
        >
          <Icon className='h-[18px] w-[18px]' strokeWidth={1.7} />
        </span>

        <span className='truncate text-sm font-medium'>{label}</span>
      </span>

      {disabled ? (
        <span className='rounded-md border border-white/[0.06] px-2 py-1 text-[10px] uppercase tracking-[0.08em] text-[#7F878C]'>
          Segera
        </span>
      ) : active ? (
        <span className='h-1.5 w-1.5 rounded-full bg-[#E1E5E7] shadow-[0_0_9px_rgba(225,230,233,0.45)]' />
      ) : (
        <span className='font-mono text-[10px] text-[#748087] transition-colors group-hover:text-[#AAB1B5]'>
          {index}
        </span>
      )}
    </>
  );

  if (disabled) {
    return <div className={className}>{contents}</div>;
  }

  return (
    <Link href={href ?? "/admin"} onClick={onNavigate} className={className}>
      {contents}
    </Link>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={[
        "flex items-center gap-3",
        compact
          ? "border-b border-white/[0.08] pb-4"
          : "h-[76px] border-b border-white/[0.08] px-6",
      ].join(" ")}
    >
      <div className='relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-[#B8C0C4]/20 bg-gradient-to-br from-[#666D71] via-[#34383B] to-[#1D1F20] shadow-[inset_0_1px_0_rgba(255,255,255,0.17)]'>
        <div className='absolute inset-1 rounded-lg border border-white/[0.08]' />

        <Coffee className='relative h-5 w-5 text-[#E2E6E8]' strokeWidth={1.5} />

        <span className='absolute bottom-1 right-1 h-1 w-1 rounded-full bg-[#E4E7E9] shadow-[0_0_6px_rgba(225,230,233,0.6)]' />
      </div>

      <div className='min-w-0'>
        <p className='text-sm font-semibold tracking-[0.2em] text-[#E3E7E9]'>KOPILOGI</p>

        <p className='mt-1 text-[10px] uppercase tracking-[0.15em] text-[#92999D]'>
          Operasional Digital
        </p>
      </div>
    </div>
  );
}

function ProfileFooter({
  name,
  email,
  onSignOut,
}: {
  name: string;
  email: string;
  onSignOut: () => Promise<void>;
}) {
  return (
    <div className='border-t border-white/[0.08] p-4'>
      <div className='flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3'>
        <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#AAB2B6]/15 bg-gradient-to-br from-[#4B5256] to-[#252829]'>
          <CircleUserRound className='h-5 w-5 text-[#D5DADD]' />
        </div>

        <div className='min-w-0 flex-1'>
          <p className='truncate text-sm font-medium text-[#E0E4E6]'>{name}</p>

          <p className='mt-1 truncate text-xs text-[#9AA1A5]'>{email}</p>
        </div>

        <form action={onSignOut}>
          <button
            type='submit'
            aria-label='Keluar dari akun'
            title='Keluar'
            className='flex h-9 w-9 items-center justify-center rounded-lg text-[#A0A6AA] transition hover:bg-white/[0.05] hover:text-white'
          >
            <LogOut className='h-4 w-4' />
          </button>
        </form>
      </div>
    </div>
  );
}

type ModuleCardProps = {
  index: string;
  icon: IconType;
  title: string;
  description: string;
  href?: string;
  status: string;
  active?: boolean;
};

function ModuleCard({
  index,
  icon: Icon,
  title,
  description,
  href,
  status,
  active,
}: ModuleCardProps) {
  const card = (
    <div
      className={[
        "group relative h-full overflow-hidden rounded-2xl border p-5 transition-all duration-300 sm:p-6",
        active
          ? "border-[#9EADB7]/20 bg-gradient-to-br from-[#2B2F32]/95 to-[#191B1C] hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_18px_45px_rgba(0,0,0,0.18)]"
          : "border-white/[0.075] bg-[#17191A]/70 hover:border-white/[0.13] hover:bg-[#1B1D1E]",
      ].join(" ")}
    >
      {active && (
        <div className='absolute right-0 top-0 h-28 w-28 translate-x-10 -translate-y-10 rounded-full border border-white/[0.07] transition-transform duration-500 group-hover:translate-x-7 group-hover:-translate-y-7' />
      )}

      <div className='relative flex items-start justify-between'>
        <div
          className={[
            "flex h-12 w-12 items-center justify-center rounded-xl border",
            active
              ? "border-[#AEB7BC]/20 bg-gradient-to-br from-[#596166]/60 to-[#2B3033] text-[#E0E5E8]"
              : "border-white/[0.07] bg-white/[0.025] text-[#9AA1A5]",
          ].join(" ")}
        >
          <Icon className='h-5 w-5' strokeWidth={1.6} />
        </div>

        <span className='font-mono text-xs text-[#849095]'>{index}</span>
      </div>

      <div className='relative mt-6'>
        <h3 className='text-xl font-semibold tracking-[-0.02em] text-[#E2E6E8]'>{title}</h3>

        <p className='mt-3 min-h-[84px] text-sm leading-6 text-[#A0A6AA] sm:text-base sm:leading-7'>
          {description}
        </p>
      </div>

      <div className='relative mt-5 flex items-center justify-between gap-3 border-t border-white/[0.07] pt-4'>
        <span
          className={[
            "inline-flex items-center gap-2 text-xs font-medium sm:text-sm",
            active ? "text-[#D9DEE1]" : "text-[#92999D]",
          ].join(" ")}
        >
          <span
            className={[
              "h-2 w-2 shrink-0 rounded-full",
              active ? "bg-[#E0E4E6]" : "bg-[#778085]",
            ].join(" ")}
          />

          {status}
        </span>

        {active ? (
          <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.025] text-[#C3C9CC] transition-all group-hover:border-white/15 group-hover:bg-white/[0.07] group-hover:text-white'>
            <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5' />
          </span>
        ) : (
          <span className='text-[10px] uppercase tracking-[0.1em] text-[#849095]'>
            Direncanakan
          </span>
        )}
      </div>
    </div>
  );

  if (active && href) {
    return (
      <Link
        href={href}
        className='block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50'
      >
        {card}
      </Link>
    );
  }

  return card;
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className='min-w-0'>
      <p className='text-xs font-medium uppercase tracking-[0.1em] text-[#92999D]'>{label}</p>

      <p
        className='mt-2 break-words text-sm font-medium leading-6 text-[#D3D8DB] sm:text-base'
        title={value}
      >
        {value}
      </p>
    </div>
  );
}

function SystemStatus({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: IconType;
  label: string;
  value: string;
  color: "silver";
}) {
  return (
    <div className='flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.018] px-3.5 py-3.5 sm:px-4'>
      <div className='flex min-w-0 items-center gap-3'>
        <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[#D1D6D9]'>
          <Icon className='h-4 w-4' />
        </div>

        <span className='text-sm leading-5 text-[#C0C6C9] sm:text-base'>{label}</span>
      </div>

      <span className='flex shrink-0 items-center gap-1.5 text-xs font-medium text-[#D8DDE0] sm:text-sm'>
        <span className='h-2 w-2 rounded-full bg-[#DDE2E4]' />
        {value}
      </span>
    </div>
  );
}
