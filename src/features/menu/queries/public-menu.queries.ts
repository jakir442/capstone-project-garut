import "server-only";

import { connectToDatabase } from "@/lib/mongodb";
import { findPublicMenuBySlug, findPublicMenus } from "../repositories/menu.repository";

import type { PublicMenu } from "../types";

export async function getPublicMenus(): Promise<PublicMenu[]> {
  try {
    await connectToDatabase();

    const menus = await findPublicMenus();

    return menus
      .filter((menu) => menu.branchId)
      .map((menu) => ({
        id: String(menu._id),
        branchId: String(menu.branchId._id),
        branchName: menu.branchId.name,
        branchSlug: menu.branchId.slug,
        slug: menu.slug,
        name: menu.name,
        description: menu.description,
        category: menu.category,
        price: menu.price,
        image: menu.image ?? null,
        featured: menu.featured,
        priceVerified: menu.priceVerified,
        isAvailable: menu.isAvailable,
      }));
  } catch (error) {
    console.error("[getPublicMenus]", error);
    return [];
  }
}

export async function getPublicMenuBySlug(slug: string): Promise<PublicMenu | null> {
  try {
    await connectToDatabase();

    const menu = await findPublicMenuBySlug(slug);

    if (!menu || !menu.branchId) {
      return null;
    }

    return {
      id: String(menu._id),
      branchId: String(menu.branchId._id),
      branchName: menu.branchId.name,
      branchSlug: menu.branchId.slug,
      slug: menu.slug,
      name: menu.name,
      description: menu.description,
      category: menu.category,
      price: menu.price,
      image: menu.image ?? null,
      featured: menu.featured,
      priceVerified: menu.priceVerified,
      isAvailable: menu.isAvailable,
    };
  } catch (error) {
    console.error("[getPublicMenuBySlug]", error);
    return null;
  }
}
