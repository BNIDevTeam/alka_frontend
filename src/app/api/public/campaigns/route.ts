import { NextResponse } from "next/server";
const apiBaseUrl = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;
export async function GET() {
  if (!apiBaseUrl) return NextResponse.json({ success: false, message: "API base URL not configured" }, { status: 500 });
  try {
    const response = await fetch(`${apiBaseUrl}/campaigns`, { cache: "no-store" });
    const data = await response.json();
    if (!response.ok) return NextResponse.json({ success: false, message: data?.message || 'Unable to fetch campaigns' }, { status: response.status });
    const publishedCampaigns = (Array.isArray(data) ? data : []).filter((item) => (item.status ?? item.Status) === 'Published');
    return NextResponse.json({ success: true, data: publishedCampaigns });
  } catch {
    return NextResponse.json({ success: false, message: "Unable to fetch campaigns" }, { status: 500 });
  }
}
