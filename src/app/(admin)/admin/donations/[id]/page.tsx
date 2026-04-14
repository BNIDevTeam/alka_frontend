import Link from "next/link";
import { notFound } from "next/navigation";
import { getDonationById, getDonationRazorpayDetails } from "@/lib/api/admin";
import { ArrowLeft, CreditCard, Receipt, AlertTriangle } from "lucide-react";

type DonationDetailsPageProps = {
  params: Promise<{ id: string }>;
};

function pretty(value: unknown) {
  if (value === null || value === undefined || value === "") return "-";
  if (typeof value === "object") return JSON.stringify(value, null, 2);
  return String(value);
}

function hasUsableRazorpayPaymentId(paymentId: string | null | undefined) {
  if (!paymentId) return false;
  const normalized = paymentId.trim().toLowerCase();

  if (!normalized) return false;
  if (normalized === "pending") return false;
  if (normalized === "null") return false;
  if (normalized === "undefined") return false;

  return true;
}

export default async function DonationDetailsPage({
  params,
}: DonationDetailsPageProps) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);

  if (!Number.isFinite(id)) {
    notFound();
  }

  const donation = await getDonationById(id);
  if (!donation) {
    notFound();
  }

  let razorpay: any = null;
  let razorpayError: string | null = null;

  if (hasUsableRazorpayPaymentId(donation.paymentId)) {
    try {
      razorpay = await getDonationRazorpayDetails(id);
    } catch (error) {
      razorpayError =
        error instanceof Error
          ? error.message
          : "Unable to fetch Razorpay payment details.";
    }
  } else {
    razorpayError = "Razorpay payment details are not available for this donation yet.";
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/donations"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Donations
        </Link>
      </div>

      <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 px-6 py-4 text-white shadow-xl">
        <h1 className="text-xl font-bold tracking-tight">Donation #{donation.id}</h1>
        <p className="mt-0.5 text-xs text-blue-100">
          Local donation record and Razorpay transaction details
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Receipt className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Local Record</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Donor</p>
              <p className="mt-1 text-sm font-medium text-gray-900">{donation.donorName}</p>
              <p className="text-xs text-gray-500">{donation.donorEmail}</p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Amount</p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                ₹ {donation.amount.toLocaleString("en-IN")} {donation.currency}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Status</p>
              <p className="mt-1 text-sm text-gray-900">{donation.status}</p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Method</p>
              <p className="mt-1 text-sm text-gray-900">{donation.method || "-"}</p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Payment ID</p>
              <p className="mt-1 break-all text-sm text-gray-900">{donation.paymentId || "-"}</p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Order ID</p>
              <p className="mt-1 break-all text-sm text-gray-900">{donation.orderId || "-"}</p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Description</p>
              <p className="mt-1 text-sm text-gray-900">{donation.description || "-"}</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Razorpay Details</h2>
          </div>

          {razorpay ? (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Razorpay Payment ID</p>
                  <p className="mt-1 break-all text-sm text-gray-900">{pretty(razorpay.id)}</p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Status</p>
                  <p className="mt-1 text-sm text-gray-900">{pretty(razorpay.status)}</p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Method</p>
                  <p className="mt-1 text-sm text-gray-900">{pretty(razorpay.method)}</p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Order ID</p>
                  <p className="mt-1 break-all text-sm text-gray-900">{pretty(razorpay.order_id)}</p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Amount</p>
                  <p className="mt-1 text-sm text-gray-900">
                    {typeof razorpay.amount === "number"
                      ? `₹ ${(razorpay.amount / 100).toLocaleString("en-IN")}`
                      : "-"}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Currency</p>
                  <p className="mt-1 text-sm text-gray-900">{pretty(razorpay.currency)}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Raw Razorpay Response</p>
                <pre className="mt-2 max-h-[420px] overflow-auto rounded-xl bg-slate-950 p-4 text-xs text-slate-100">
                  {JSON.stringify(razorpay, null, 2)}
                </pre>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-600" />
                <div>
                  <p className="text-sm font-semibold text-amber-800">
                    Razorpay details unavailable
                  </p>
                  <p className="mt-1 text-sm text-amber-700">
                    {razorpayError}
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}