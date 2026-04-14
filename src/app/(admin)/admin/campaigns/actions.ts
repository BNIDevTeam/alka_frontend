"use server";

import { ZodError } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { campaignSchema, type CampaignFormInput } from "@/lib/validations/campaigns";
import {
  createCampaign,
  deleteCampaign,
  updateCampaign,
  type CampaignInput,
} from "@/lib/api/admin";

function getErrorMessage(error: unknown): string {
  if (error instanceof ZodError) {
    return error.issues[0]?.message || "Invalid form data";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong";
}

function getText(formData: FormData, key: string): string {
  return String(formData.get(key) || "").trim();
}

function parseGalleryImageUrls(formData: FormData): string[] {
  const raw = getText(formData, "galleryImageUrls");
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.map((item) => String(item)).filter(Boolean)
      : [];
  } catch {
    return [];
  }
}

function normalizeDate(value: string): string | null {
  const v = value.trim();
  return v ? v : null;
}

function normalizeCampaignInput(formData: FormData): CampaignFormInput {
  const goalAmountRaw = getText(formData, "goalAmount");
  const sortOrderRaw = getText(formData, "sortOrder");

  return {
    title: getText(formData, "title"),
    slug: getText(formData, "slug"),
    shortDescription: getText(formData, "shortDescription"),
    description: getText(formData, "description"),
    coverImageUrl: getText(formData, "coverImageUrl"),
    galleryImageUrls: parseGalleryImageUrls(formData),
    goalAmount: goalAmountRaw ? Number(goalAmountRaw) : null,
    status: (getText(formData, "status") || "Draft") as
      | "Draft"
      | "Published"
      | "Archived"
      | "Completed",
    isFeatured: getText(formData, "isFeatured") === "true",
    sortOrder: sortOrderRaw ? Number(sortOrderRaw) : 0,
    startDate: normalizeDate(getText(formData, "startDate")),
    endDate: normalizeDate(getText(formData, "endDate")),
  };
}

export async function createCampaignAction(formData: FormData): Promise<void> {
  try {
    const parsed = campaignSchema.parse(
      normalizeCampaignInput(formData),
    ) as CampaignInput;

    await createCampaign(parsed);
  } catch (error) {
    redirect(
      `/admin/campaigns/create?error=${encodeURIComponent(getErrorMessage(error))}`,
    );
  }

  revalidatePath("/admin/campaigns");
  redirect("/admin/campaigns?success=created");
}

export async function updateCampaignAction(
  campaignId: number,
  formData: FormData,
): Promise<void> {
  try {
    const parsed = campaignSchema.parse(
      normalizeCampaignInput(formData),
    ) as CampaignInput;

    await updateCampaign(campaignId, parsed);
  } catch (error) {
    redirect(
      `/admin/campaigns/${campaignId}/edit?error=${encodeURIComponent(getErrorMessage(error))}`,
    );
  }

  revalidatePath("/admin/campaigns");
  redirect("/admin/campaigns?success=updated");
}

export async function deleteCampaignAction(formData: FormData): Promise<void> {
  const campaignId = Number(formData.get("campaignId") || "0");

  try {
    await deleteCampaign(campaignId);
  } catch (error) {
    redirect(
      `/admin/campaigns?error=${encodeURIComponent(getErrorMessage(error))}`,
    );
  }

  revalidatePath("/admin/campaigns");
  redirect("/admin/campaigns?success=deleted");
}