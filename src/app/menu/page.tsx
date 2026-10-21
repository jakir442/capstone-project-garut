import type { Metadata } from "next";

import { Navbar } from "@/components/layout/navbar";
import { HomeFooter } from "@/features/home/components/home-footer";
import { MenuPage } from "@/features/menu/components/menu-page";
import { getPublicMenus } from "@/features/menu/queries/public-menu.queries";

export const metadata: Metadata = {
  title: "Menu Kopilogi",
  description: "Jelajahi pilihan kopi, minuman, dan makanan yang tersedia di Kopilogi.",
};

export default async function MenuRoute() {
  const menus = await getPublicMenus();

  return (
    <>
      <Navbar />
      <MenuPage menus={menus} />
      <HomeFooter />
    </>
  );
}
