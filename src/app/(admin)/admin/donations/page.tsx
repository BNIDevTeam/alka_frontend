import Link from "next/link";
import { getDonationRazorpayDetails, getDonations, getDonorDonations } from "@/lib/api/admin";
import { CreditCard, IndianRupee, CircleCheck, CircleX, Clock3, ArrowRight } from "lucide-react";

type DonationsPageProps = {
  searchParams?: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    status?: "pending" | "completed" | "failed" | "refunded";
    sortBy?: "createdAt" | "amount";
    sortOrder?: "asc" | "desc";
    donorId?: string;
    donorName?: string;
  }>;
};

function getStatusBadge(status: string) {
  if (status === "completed") return "bg-emerald-50 text-emerald-700";
  if (status === "failed") return "bg-red-50 text-red-700";
  if (status === "refunded") return "bg-slate-100 text-slate-700";
  return "bg-amber-50 text-amber-700";
}

export default async function DonationsPage({ searchParams }: DonationsPageProps) {
  const params = (await searchParams) ?? {};
  const page = Number(params.page ?? 1);
  const limit = Number(params.limit ?? 10);
  const donorId = params.donorId ? Number(params.donorId) : null;
  const donorName = params.donorName ?? "";

  const response = donorId
    ? await getDonorDonations(donorId, { page, limit })
    : await getDonations({
        page,
        limit,
        search: params.search ?? "",
        status: params.status,
        sortBy: params.sortBy ?? "createdAt",
        sortOrder: params.sortOrder ?? "desc",
      });

  const donations = response.data;

  const completedCount = donations.filter((d) => d.status === "completed").length;
  const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 px-6 py-4 text-white shadow-xl">
        <h1 className="text-xl font-bold tracking-tight">
          {donorId ? `Donations by ${donorName || `Donor #${donorId}`}` : "Donations"}
        </h1>
        <p className="mt-0.5 text-xs text-blue-100">
          View donation records and open live Razorpay transaction details
        </p>
      </div>

      {!donorId && (
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <form className="grid gap-3 md:grid-cols-[1fr_auto_auto_auto]">
            <input
              type="text"
              name="search"
              defaultValue={params.search ?? ""}
              placeholder="Search by donor, payment ID, order ID"
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            />

            <select
              name="status"
              defaultValue={params.status ?? ""}
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>

            <select
              name="sortBy"
              defaultValue={params.sortBy ?? "createdAt"}
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              <option value="createdAt">Newest</option>
              <option value="amount">Amount</option>
            </select>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              Apply
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-blue-100 p-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {response.pagination.total}
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-500">Total Donations</p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-emerald-100 p-2">
              <CircleCheck className="h-5 w-5 text-emerald-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{completedCount}</span>
          </div>
          <p className="mt-2 text-sm text-gray-500">Completed in Current View</p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-amber-100 p-2">
              <IndianRupee className="h-5 w-5 text-amber-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              ₹ {totalAmount.toLocaleString("en-IN")}
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-500">Amount in Current View</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Donor</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Payment / Order</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {donations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-sm text-gray-500">
                    No donations found.
                  </td>
                </tr>
              ) : (
                donations.map((donation) => (
                  <tr key={donation.id} className="border-b border-gray-100 hover:bg-blue-50/30">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-900">{donation.donorName}</p>
                        <p className="text-xs text-gray-500">{donation.donorEmail}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-gray-900">
                        ₹ {donation.amount.toLocaleString("en-IN")}
                      </div>
                      <div className="text-xs text-gray-500">{donation.currency}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadge(donation.status)}`}>
                        {donation.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">
                      <div>Payment: {donation.paymentId || "-"}</div>
                      <div className="mt-1">Order: {donation.orderId || "-"}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {donation.createdAt
                        ? new Date(donation.createdAt).toLocaleString("en-IN")
                        : "-"}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/donations/${donation.id}`}
                        className="inline-flex items-center gap-2 rounded-lg border border-blue-200 px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-50"
                      >
                        Razorpay Details
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