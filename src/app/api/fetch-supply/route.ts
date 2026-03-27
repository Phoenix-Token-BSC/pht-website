import { NextResponse } from "next/server";

const API_URL =
  "https://www.firescreener.com/api/bsc/token-metrics/0x885c99a787BE6b41cbf964174C771A9f7ec48e04";

export async function GET() {
  try {
    const res = await fetch(API_URL, { next: { revalidate: 300 } }); // cache 5 min
    if (!res.ok) {
      throw new Error(`Firescreener API responded with ${res.status}`);
    }

    const data = await res.json();

    return NextResponse.json({
      totalSupply: data.totalSupply,
      circulatingSupply: data.circulatingSupply,
      lockedSupply: data.lockedSupply,
      burnedSupply: data.burnedSupply,
      lastUpdated: data.lastUpdated,
    });
  } catch (error) {
    console.error("Error fetching supply data:", error);
    return NextResponse.json(
      { error: "Failed to fetch supply data" },
      { status: 500 }
    );
  }
}
