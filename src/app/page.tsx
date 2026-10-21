import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/features/home/components/hero-section";
import { LocationsSection } from "@/features/home/components/locations-section";
import { MenuSection } from "@/features/home/components/menu-section";
import { StorySection } from "@/features/home/components/story-section";
import { HomeFooter } from "@/features/home/components/home-footer";
import { getPublicMenus } from "@/features/menu/queries/public-menu.queries";
import { MenuShowcaseSection } from "@/features/home/components/menu-showcase-section";

export default async function HomePage() {
  const menus = await getPublicMenus();

  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
        <MenuSection menus={menus} />
        <MenuShowcaseSection />
        <StorySection />
        <LocationsSection />
      </main>

      <HomeFooter />
    </>
  );
}
