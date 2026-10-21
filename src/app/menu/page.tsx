import type { Metadata } from "next";

import { Navbar } from "@/components/layout/navbar";
import { HomeFooter } from "@/features/home/components/home-footer";
import { MenuPage } from "@/features/menu/components/menu-page";
import { getPublicMenus } from "@/features/menu/queries/public-menu.queries";
import type { PublicMenuCategory } from "@/features/menu/types";

export const metadata: Metadata = {
  title: "Menu Kopilogi",
  description: "Jelajahi pilihan kopi, minuman, dan makanan yang tersedia di Kopilogi.",
};

type MenuRouteProps = {
  searchParams: Promise<{
    category?: string;
  }>;
};

function getInitialCategory(category?: string): "Semua" | PublicMenuCategory {
  if (category === "Kopi" || category === "Minuman" || category === "Makanan") {
    return category;
  }

  return "Semua";
}

export default async function MenuRoute({ searchParams }: MenuRouteProps) {
  const [{ category }, menus] = await Promise.all([searchParams, getPublicMenus()]);

  return (
    <>
      <Navbar />
      <MenuPage menus={menus} initialCategory={getInitialCategory(category)} />
      <HomeFooter />
    </>
  );
}
