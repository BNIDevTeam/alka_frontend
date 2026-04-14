import { apiFetch, publicApiFetch } from "@/lib/api/client";

export type DashboardData = {
  summary: {
    totalCampaigns: number;
    totalContacts: number;
    totalVolunteers: number;
    totalDonations: number;
    totalDonationAmount: number;
  };
  recentContacts: Array<{
    id: number;
    fullName: string;
    email: string;
    status: string;
    createdAt: string;
  }>;
  recentVolunteers: Array<{
    id: number;
    fullName: string;
    email: string;
    status: string;
    createdAt: string;
  }>;
  recentDonations: Array<{
    id: number;
    donorName: string;
    amount: number;
    currency: string;
    status: string;
    createdAt: string;
  }>;
};

export type Campaign = {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  coverImageUrl: string;
  galleryImageUrls: string[];
  goalAmount: number | null;
  raisedAmount: number;
  status: "Draft" | "Published" | "Archived" | "Completed";
  isFeatured: boolean;
  sortOrder: number;
  startDate: string;
  endDate: string;
};

export type CampaignInput = Omit<Campaign, "id" | "raisedAmount">;

export type SiteSetting = {
  settingId: number;
  organizationName: string;
  email: string;
  phone: string;
  address: string;
  websiteUrl: string;
  logoUrl: string;
  footerText: string;
  primaryColor: string;
};

export type AdminRole = {
  roleId: number;
  roleName: string;
  roleCode: string;
  description: string;
};

export type AdminUserSetting = {
  adminUserId: number;
  fullName: string;
  email: string;
  isActive: boolean;
  lastLoginAt: string;
  roleId: number | null;
  roleName: string;
  roleCode: string;
};

export type MyProfile = {
  adminUserId: number;
  fullName: string;
  email: string;
  isActive: boolean;
  lastLoginAt: string;
  roleId: number | null;
  roleName: string;
  roleCode: string;
};

export type Donor = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  createdAt: string | null;
  updatedAt: string | null;
};

export type Donation = {
  id: number;
  donorId: number;
  donorName: string;
  donorEmail: string;
  amount: number;
  currency: string;
  paymentId: string;
  orderId: string;
  status: "pending" | "completed" | "failed" | "refunded" | string;
  method: string | null;
  description: string | null;
  createdAt: string | null;
  updatedAt: string | null;
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
};

function mapCampaign(item: any): Campaign {
  return {
    id: Number(item.id ?? item.CampaignId ?? 0),
    title: item.title ?? item.Title ?? "",
    slug: item.slug ?? item.Slug ?? "",
    shortDescription: item.shortDescription ?? item.ShortDescription ?? "",
    description: item.description ?? item.Description ?? "",
    coverImageUrl: item.coverImageUrl ?? item.CoverImageUrl ?? "",
    galleryImageUrls: Array.isArray(item.galleryImageUrls)
      ? item.galleryImageUrls
      : typeof item.GalleryImageUrls === "string" && item.GalleryImageUrls
        ? JSON.parse(item.GalleryImageUrls)
        : [],
    goalAmount:
      item.goalAmount != null
        ? Number(item.goalAmount)
        : item.GoalAmount != null
          ? Number(item.GoalAmount)
          : null,
    raisedAmount: Number(item.raisedAmount ?? item.RaisedAmount ?? 0),
    status: item.status ?? item.Status ?? "Draft",
    isFeatured: Boolean(item.isFeatured ?? item.IsFeatured ?? false),
    sortOrder: Number(item.sortOrder ?? item.SortOrder ?? 0),
    startDate: item.startDate ?? item.StartDate ?? "",
    endDate: item.endDate ?? item.EndDate ?? "",
  };
}

function mapSiteSettings(item: any): SiteSetting {
  return {
    settingId: Number(item.id ?? item.settingId ?? item.SettingId ?? 1),
    organizationName: item.organizationName ?? item.OrganizationName ?? "",
    email: item.email ?? item.Email ?? "",
    phone: item.phone ?? item.Phone ?? "",
    address: item.address ?? item.Address ?? "",
    websiteUrl: item.websiteUrl ?? item.WebsiteUrl ?? "",
    logoUrl: item.logoUrl ?? item.LogoUrl ?? "",
    footerText: item.footerText ?? item.FooterText ?? "",
    primaryColor: item.primaryColor ?? item.PrimaryColor ?? "",
  };
}

function mapAdminRole(item: any): AdminRole {
  return {
    roleId: Number(item.roleId ?? item.RoleId ?? 0),
    roleName: item.roleName ?? item.RoleName ?? "",
    roleCode: item.roleCode ?? item.RoleCode ?? "",
    description: item.description ?? item.Description ?? "",
  };
}

function mapAdminUser(item: any): AdminUserSetting {
  return {
    adminUserId: Number(item.id ?? item.adminUserId ?? item.AdminUserId ?? 0),
    fullName: item.fullName ?? item.FullName ?? "",
    email: item.email ?? item.Email ?? "",
    isActive: Boolean(item.isActive ?? item.IsActive ?? false),
    lastLoginAt: item.lastLoginAt ?? item.LastLoginAt ?? "",
    roleId: item.roleId ?? item.RoleId ?? null,
    roleName: item.roleName ?? item.RoleName ?? "",
    roleCode: item.roleCode ?? item.RoleCode ?? "",
  };
}

function mapMyProfile(item: any): MyProfile {
  return {
    adminUserId: Number(item.adminUserId ?? item.AdminUserId ?? item.id ?? 0),
    fullName: item.fullName ?? item.FullName ?? "",
    email: item.email ?? item.Email ?? "",
    isActive: Boolean(item.isActive ?? item.IsActive ?? false),
    lastLoginAt: item.lastLoginAt ?? item.LastLoginAt ?? "",
    roleId: item.roleId ?? item.RoleId ?? null,
    roleName: item.roleName ?? item.RoleName ?? "",
    roleCode: item.roleCode ?? item.RoleCode ?? "",
  };
}

function mapDonor(item: any): Donor {
  return {
    id: Number(item.id ?? 0),
    name: item.name ?? "",
    email: item.email ?? "",
    phone: item.phone ?? null,
    address: item.address ?? null,
    city: item.city ?? null,
    state: item.state ?? null,
    pincode: item.pincode ?? null,
    createdAt: item.createdAt ?? null,
    updatedAt: item.updatedAt ?? null,
  };
}

function mapDonation(item: any): Donation {
  return {
    id: Number(item.id ?? 0),
    donorId: Number(item.donorId ?? 0),
    donorName: item.donorName ?? "",
    donorEmail: item.donorEmail ?? "",
    amount: Number(item.amount ?? 0),
    currency: item.currency ?? "INR",
    paymentId: item.paymentId ?? "",
    orderId: item.orderId ?? "",
    status: item.status ?? "",
    method: item.method ?? null,
    description: item.description ?? null,
    createdAt: item.createdAt ?? null,
    updatedAt: item.updatedAt ?? null,
  };
}

export async function getDashboardData() {
  return apiFetch<DashboardData>("/dashboard");
}

export async function getAllCampaigns() {
  const response = await publicApiFetch<any>("/campaigns");
  const rows = Array.isArray(response) ? response : (response?.data ?? []);
  return rows.map(mapCampaign);
}

export async function getCampaignById(id: number) {
  const data = await publicApiFetch<any>(`/campaigns/${id}`);
  return data ? mapCampaign(data) : null;
}

export async function createCampaign(input: CampaignInput) {
  return apiFetch("/campaigns", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function updateCampaign(
  id: number,
  input: Partial<CampaignInput>,
) {
  return apiFetch(`/campaigns/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

export async function deleteCampaign(id: number) {
  return apiFetch(`/campaigns/${id}`, { method: "DELETE" });
}

export async function getSettingsPageData() {
  const [siteSettings, roles, usersResponse] = await Promise.all([
    publicApiFetch<any>("/site-settings", { authRequired: false }),
    apiFetch<any[]>("/admin-roles"),
    apiFetch<any>("/admin-users"),
  ]);

  const users = Array.isArray(usersResponse)
    ? usersResponse
    : (usersResponse?.data ?? []);

  return {
    siteSettings: mapSiteSettings(siteSettings),
    roles: roles.map(mapAdminRole),
    users: users.map(mapAdminUser),
  };
}

export async function updateSiteSettings(input: SiteSetting) {
  return apiFetch(`/site-settings/${input.settingId}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

export async function createAdminUser(input: {
  fullName: string;
  email: string;
  password: string;
  roleId: number;
  isActive: boolean;
}) {
  return apiFetch("/admin-users", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function updateAdminUserRoleStatus(input: {
  adminUserId: number;
  roleId: number;
  isActive: boolean;
}) {
  return apiFetch(`/admin-users/${input.adminUserId}/role-status`, {
    method: "PATCH",
    body: JSON.stringify({ roleId: input.roleId, isActive: input.isActive }),
  });
}

export async function getMyProfile(adminUserId: number) {
  const data = await apiFetch<any>(`/admin-users/${adminUserId}`);
  return mapMyProfile(data);
}

export async function updateMyProfile(input: {
  adminUserId: number;
  fullName: string;
  email: string;
}) {
  return apiFetch(`/admin-users/${input.adminUserId}/profile`, {
    method: "PATCH",
    body: JSON.stringify({
      fullName: input.fullName,
      email: input.email,
    }),
  });
}

export async function changeMyPassword(input: {
  adminUserId: number;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}) {
  return apiFetch(`/admin-users/${input.adminUserId}/password`, {
    method: "PATCH",
    body: JSON.stringify({
      currentPassword: input.currentPassword,
      newPassword: input.newPassword,
      confirmNewPassword: input.confirmPassword,
    }),
  });
}

export async function getDonors(params?: {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: "name" | "email" | "createdAt";
  sortOrder?: "asc" | "desc";
}) {
  const response = await apiFetch<PaginatedResponse<any>>("/donors", {
    searchParams: params,
  });

  return {
    ...response,
    data: (response.data ?? []).map(mapDonor),
  };
}

export async function getDonorById(id: number) {
  const response = await apiFetch<any>(`/donors/${id}`);
  return mapDonor(response);
}

export async function getDonorDonations(
  donorId: number,
  params?: {
    page?: number;
    limit?: number;
  },
) {
  const response = await apiFetch<PaginatedResponse<any>>(
    `/donors/${donorId}/donations`,
    { searchParams: params },
  );

  return {
    ...response,
    data: (response.data ?? []).map(mapDonation),
  };
}

export async function getDonations(params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: "pending" | "completed" | "failed" | "refunded";
  sortBy?: "createdAt" | "amount";
  sortOrder?: "asc" | "desc";
}) {
  const response = await apiFetch<PaginatedResponse<any>>("/donations", {
    searchParams: params,
  });

  return {
    ...response,
    data: (response.data ?? []).map(mapDonation),
  };
}

export async function getDonationById(id: number) {
  const response = await apiFetch<any>(`/donations/${id}`);
  return mapDonation(response);
}

export async function getDonationRazorpayDetails(id: number) {
  return apiFetch<any>(`/donations/${id}/razorpay`);
}