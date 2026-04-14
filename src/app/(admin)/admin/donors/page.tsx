import Link from "next/link";
import { getDonors } from "@/lib/api/admin";
import { Users, Mail, Phone, MapPin, ArrowRight, UserRound } from "lucide-react";

type DonorsPageProps = {
  searchParams?: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    sortBy?: "name" | "email" | "createdAt";
    sortOrder?: "asc" | "desc";
  }>;
};

export default async function DonorsPage({ searchParams }: DonorsPageProps) {
  const params = (await searchParams) ?? {};
  const page = Number(params.page ?? 1);
  const limit = Number(params.limit ?? 10);
  const search = params.search ?? "";
  const sortBy = params.sortBy ?? "createdAt";
  const sortOrder = params.sortOrder ?? "desc";

  const donors = await getDonors({
    page,
    limit,
    search,
    sortBy,
    sortOrder,
  });

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 px-6 py-4 text-white shadow-xl">
        <h1 className="text-xl font-bold tracking-tight">Donors</h1>
        <p className="mt-0.5 text-xs text-blue-100">
          View donor records and open their donation history
        </p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <form className="grid gap-3 md:grid-cols-[1fr_auto_auto_auto]">
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Search by donor name or email"
            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
          />

          <select
            name="sortBy"
            defaultValue={sortBy}
            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
          >
            <option value="createdAt">Newest</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
          </select>

          <select
            name="sortOrder"
            defaultValue={sortOrder}
            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
          >
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>

          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            Apply
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-blue-100 p-2">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {donors.pagination.total}
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-500">Total Donors</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Donor</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Location</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Created</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {donors.data.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-sm text-gray-500">
                    No donors found.
                  </td>
                </tr>
              ) : (
                donors.data.map((donor) => (
                  <tr key={donor.id} className="border-b border-gray-100 hover:bg-blue-50/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100">
                          <UserRound className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{donor.name}</p>
                          <p className="text-xs text-gray-500">ID #{donor.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5 text-gray-400" />
                          <span>{donor.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5 text-gray-400" />
                          <span>{donor.phone || "-"}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      <div className="flex items-start gap-1.5">
                        <MapPin className="mt-0.5 h-3.5 w-3.5 text-gray-400" />
                        <span>
                          {[donor.city, donor.state, donor.pincode].filter(Boolean).join(", ") || "-"}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {donor.createdAt
                        ? new Date(donor.createdAt).toLocaleDateString("en-IN")
                        : "-"}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/donations?donorId=${donor.id}&donorName=${encodeURIComponent(donor.name)}`}
                        className="inline-flex items-center gap-2 rounded-lg border border-blue-200 px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-50"
                      >
                        View Donations
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}