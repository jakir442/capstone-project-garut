import { Branch } from "../models/branch.model";
import { connectToDatabase } from "@/lib/mongodb";

export async function getBranchBySlug(slug: string) {
  await connectToDatabase();

  return Branch.findOne({
    slug,
  })
    .select("_id name slug concept isActive")
    .lean();
}