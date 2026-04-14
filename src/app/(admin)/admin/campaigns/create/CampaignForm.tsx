"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  campaignSchema,
  type CampaignFormInput,
} from "@/lib/validations/campaigns";
import { slugify } from "@/lib/utils/slugify";
import {
  AlertCircle,
  CheckCircle,
  X,
  Upload,
  Loader2,
  Calendar,
  DollarSign,
} from "lucide-react";

type CampaignFormProps = {
  accessToken: string;
  defaultValues: CampaignFormInput;
  formAction: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
};

export default function CampaignForm({
  accessToken,
  defaultValues,
  formAction,
  submitLabel,
}: CampaignFormProps) {
  const [imagePreview, setImagePreview] = useState<string>(
    defaultValues.coverImageUrl || "",
  );
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>(
    defaultValues.galleryImageUrls || [],
  );
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isPending, startTransition] = useTransition();

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const {
    register,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<CampaignFormInput>({
    resolver: zodResolver(campaignSchema),
    defaultValues,
  });

  const titleValue = watch("title");
  const slugValue = watch("slug");
  const coverImageUrlValue = watch("coverImageUrl");

  useEffect(() => {
    reset(defaultValues);
    setImagePreview(defaultValues.coverImageUrl || "");
    setGalleryPreviews(defaultValues.galleryImageUrls || []);
  }, [defaultValues, reset]);

  useEffect(() => {
    if (!slugValue || slugValue === slugify(defaultValues.title || "")) {
      setValue("slug", slugify(titleValue || ""), { shouldValidate: true });
    }
  }, [titleValue, slugValue, setValue, defaultValues.title]);

  useEffect(() => {
    setImagePreview(coverImageUrlValue || "");
  }, [coverImageUrlValue]);

async function uploadSingleFile(file: File): Promise<string> {
  if (!apiBaseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
  }

  if (!accessToken) {
    throw new Error("Your session has expired. Please sign in again.");
  }

  console.log("API_BASE_URL", apiBaseUrl);
  console.log("Uploading file", {
    name: file.name,
    type: file.type,
    size: file.size,
  });

  let presignResponse: Response;

  try {
    presignResponse = await fetch(`${apiBaseUrl}/uploads/presign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        folder: "campaigns",
        fileName: file.name,
        contentType: file.type,
      }),
    });
  } catch (error) {
    console.error("Presign fetch failed", error);
    throw new Error(
      "Unable to reach upload service. Please check API URL/CORS/backend.",
    );
  }

  let presignData: any = null;

  try {
    presignData = await presignResponse.json();
  } catch {
    throw new Error("Upload service returned invalid JSON.");
  }

  console.log("Presign response", {
    ok: presignResponse.ok,
    status: presignResponse.status,
    data: presignData,
  });

  if (!presignResponse.ok) {
    throw new Error(presignData?.message || "Unable to prepare upload");
  }

  if (!presignData?.uploadUrl || !presignData?.fileUrl) {
    throw new Error("Upload URL was not returned by backend.");
  }

  let uploadResponse: Response;

  try {
    uploadResponse = await fetch(presignData.uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type || "application/octet-stream",
      },
      body: file,
    });
  } catch (error) {
    console.error("S3 upload fetch failed", error);
    throw new Error(
      "Unable to upload file to storage. Check bucket CORS and presigned URL.",
    );
  }

  console.log("Upload response", {
    ok: uploadResponse.ok,
    status: uploadResponse.status,
  });

  if (!uploadResponse.ok) {
    throw new Error("File upload failed");
  }

  return presignData.fileUrl;
}
  async function handleCoverUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadError("");
    setIsUploadingCover(true);

    try {
      const url = await uploadSingleFile(file);
      setValue("coverImageUrl", url, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setImagePreview(url);
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : "Cover image upload failed",
      );
    } finally {
      setIsUploadingCover(false);
      event.target.value = "";
    }
  }

  async function handleGalleryUpload(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    setUploadError("");
    setIsUploadingGallery(true);

    try {
      const uploadedUrls: string[] = [];

      for (const file of files) {
        const url = await uploadSingleFile(file);
        uploadedUrls.push(url);
      }

      const currentGallery = getValues("galleryImageUrls") || [];
      const nextGallery = [...currentGallery, ...uploadedUrls];

      setValue("galleryImageUrls", nextGallery, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setGalleryPreviews(nextGallery);

      if (!getValues("coverImageUrl") && uploadedUrls[0]) {
        setValue("coverImageUrl", uploadedUrls[0], {
          shouldValidate: true,
          shouldDirty: true,
        });
        setImagePreview(uploadedUrls[0]);
      }
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : "Gallery upload failed",
      );
    } finally {
      setIsUploadingGallery(false);
      event.target.value = "";
    }
  }

  function removeGalleryImage(index: number) {
    const currentGallery = getValues("galleryImageUrls") || [];
    const nextGallery = currentGallery.filter((_, i) => i !== index);

    setValue("galleryImageUrls", nextGallery, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setGalleryPreviews(nextGallery);
  }

  const onSubmit = async (data: CampaignFormInput) => {
    setSubmitError("");
    setUploadError("");

    const formData = new FormData();
    formData.set("title", data.title ?? "");
    formData.set("slug", data.slug ?? "");
    formData.set("shortDescription", data.shortDescription ?? "");
    formData.set("description", data.description ?? "");
    formData.set("coverImageUrl", data.coverImageUrl ?? "");
    formData.set(
      "galleryImageUrls",
      JSON.stringify(data.galleryImageUrls ?? []),
    );
    formData.set(
      "goalAmount",
      data.goalAmount === null || data.goalAmount === undefined
        ? ""
        : String(data.goalAmount),
    );
    formData.set("status", data.status ?? "Draft");
    formData.set("isFeatured", data.isFeatured ? "true" : "false");
    formData.set("sortOrder", String(data.sortOrder ?? 0));
    formData.set("startDate", data.startDate ? String(data.startDate) : "");
    formData.set("endDate", data.endDate ? String(data.endDate) : "");

    startTransition(async () => {
      try {
        await formAction(formData);
      } catch (error) {
        setSubmitError(
          error instanceof Error ? error.message : "Failed to save campaign",
        );
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-xl border border-gray-100 bg-white p-5 shadow-md"
    >
      {(submitError || uploadError) && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <div className="flex items-start gap-2">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{submitError || uploadError}</span>
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-600">
            Campaign Title *
          </label>
          <input
            {...register("title")}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20"
            placeholder="Enter campaign title"
          />
          {errors.title && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
              <AlertCircle className="h-3 w-3" />
              {errors.title.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-600">
            URL Slug *
          </label>
          <input
            {...register("slug")}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20"
            placeholder="campaign-url-slug"
          />
          {errors.slug && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
              <AlertCircle className="h-3 w-3" />
              {errors.slug.message}
            </p>
          )}
          <p className="mt-1 text-xs text-gray-400">
            Auto-generated from title
          </p>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-gray-600">
          Short Description *
        </label>
        <textarea
          {...register("shortDescription")}
          rows={2}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20"
          placeholder="Brief summary of the campaign..."
        />
        {errors.shortDescription && (
          <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
            <AlertCircle className="h-3 w-3" />
            {errors.shortDescription.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-gray-600">
          Full Description
        </label>
        <textarea
          {...register("description")}
          rows={4}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20"
          placeholder="Detailed description of the campaign..."
        />
      </div>

      <div className="space-y-3">
        <label className="block text-xs font-medium text-gray-600">
          Cover Image
        </label>

        <div className="flex gap-2">
          <input
            {...register("coverImageUrl")}
            className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20"
            placeholder="Cover image URL"
          />

          <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
            {isUploadingCover ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            Upload
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleCoverUpload}
              disabled={isUploadingCover}
            />
          </label>

          {imagePreview && (
            <button
              type="button"
              onClick={() => {
                setValue("coverImageUrl", "", {
                  shouldValidate: true,
                  shouldDirty: true,
                });
                setImagePreview("");
              }}
              className="rounded-lg border border-gray-200 px-3 py-2 text-gray-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {imagePreview && (
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <img
              src={imagePreview}
              alt="Cover preview"
              className="h-32 w-full object-cover"
              onError={() => setImagePreview("")}
            />
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-medium text-gray-600">
            Gallery Images
          </label>

          <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
            {isUploadingGallery ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            Upload Multiple
            <input
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleGalleryUpload}
              disabled={isUploadingGallery}
            />
          </label>
        </div>

        {galleryPreviews.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {galleryPreviews.map((url, index) => (
              <div
                key={`${url}-${index}`}
                className="relative overflow-hidden rounded-lg border border-gray-200"
              >
                <img
                  src={url}
                  alt={`Gallery ${index + 1}`}
                  className="h-28 w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeGalleryImage(index)}
                  className="absolute right-2 top-2 rounded-full bg-white/90 p-1 text-red-600 shadow"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-gray-300 p-4 text-sm text-gray-500">
            No gallery images uploaded yet.
          </div>
        )}

        {errors.galleryImageUrls && (
          <p className="flex items-center gap-1 text-xs text-red-600">
            <AlertCircle className="h-3 w-3" />
            {errors.galleryImageUrls.message as string}
          </p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-600">
            Goal Amount
          </label>
          <div className="relative">
            <DollarSign className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              step="0.01"
              {...register("goalAmount", {
                setValueAs: (v) => (v === "" ? null : Number(v)),
              })}
              className="w-full rounded-lg border border-gray-200 pl-8 pr-3 py-2 text-sm text-gray-900 transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20"
              placeholder="0.00"
            />
          </div>
          {errors.goalAmount && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
              <AlertCircle className="h-3 w-3" />
              {errors.goalAmount.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-600">
            Status
          </label>
          <select
            {...register("status")}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20"
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
            <option value="Archived">Archived</option>
            <option value="Completed">Completed</option>
          </select>
          {errors.status && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
              <AlertCircle className="h-3 w-3" />
              {errors.status.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-600">
            Sort Order
          </label>
          <input
            type="number"
            {...register("sortOrder", { valueAsNumber: true })}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20"
            placeholder="0"
          />
          {errors.sortOrder && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
              <AlertCircle className="h-3 w-3" />
              {errors.sortOrder.message}
            </p>
          )}
        </div>

        <div className="flex items-center">
          <label className="flex cursor-pointer items-center gap-1.5 text-xs font-medium text-gray-600">
            <input
              type="checkbox"
              {...register("isFeatured")}
              className="h-3.5 w-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Featured Campaign
          </label>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-600">
            Start Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              {...register("startDate")}
              className="w-full rounded-lg border border-gray-200 pl-8 pr-3 py-2 text-sm text-gray-900 transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20"
            />
          </div>
          {errors.startDate && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
              <AlertCircle className="h-3 w-3" />
              {errors.startDate.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-600">
            End Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              {...register("endDate")}
              className="w-full rounded-lg border border-gray-200 pl-8 pr-3 py-2 text-sm text-gray-900 transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20"
            />
          </div>
          {errors.endDate && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
              <AlertCircle className="h-3 w-3" />
              {errors.endDate.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 border-t border-gray-100 pt-4">
        <Link
          href="/admin/campaigns"
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-all hover:border-gray-300 hover:bg-gray-50"
        >
          Cancel
        </Link>

        <button
          type="submit"
          disabled={isPending || isUploadingCover || isUploadingGallery}
          className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 text-sm font-medium text-white transition-all hover:from-blue-700 hover:to-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <CheckCircle className="h-3.5 w-3.5" />
              {submitLabel}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
