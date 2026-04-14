import { z } from "zod";

export const campaignStatusEnum = z.enum([
  "Draft",
  "Published",
  "Archived",
  "Completed",
]);

const nullableTrimmedString = z.preprocess(
  (value) => {
    const str = String(value ?? "").trim();
    return str === "" ? null : str;
  },
  z.string().nullable(),
);

export const campaignSchema = z
  .object({
    title: z.string().trim().min(3, "Title must be at least 3 characters"),
    slug: z
      .string()
      .trim()
      .min(3, "Slug must be at least 3 characters")
      .regex(
        /^[a-z0-9-]+$/,
        "Slug can contain only lowercase letters, numbers, and hyphens",
      ),
    shortDescription: z
      .string()
      .trim()
      .min(1, "Short description is required")
      .max(500, "Short description must be 500 characters or less"),
    description: z.string().trim().default(""),
    coverImageUrl: z.string().trim().default(""),
    galleryImageUrls: z.array(z.string().trim()).default([]),
    goalAmount: z.union([
      z.number().nonnegative("Goal amount must be 0 or more"),
      z.null(),
    ]),
    status: campaignStatusEnum,
    isFeatured: z.boolean(),
    sortOrder: z.number().int().nonnegative("Sort order must be 0 or more"),
    startDate: nullableTrimmedString,
    endDate: nullableTrimmedString,
  })
  .refine(
    (data) => {
      if (!data.startDate || !data.endDate) return true;
      return new Date(data.endDate) >= new Date(data.startDate);
    },
    {
      message: "End date cannot be earlier than start date",
      path: ["endDate"],
    },
  );

export type CampaignInput = z.infer<typeof campaignSchema>;
export type CampaignFormInput = z.input<typeof campaignSchema>;