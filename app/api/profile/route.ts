import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";

export async function GET() {
    try {
        const profile = await db.profile.findFirst();
        if (!profile) {
            return NextResponse.json(
                { error: "Profile not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(profile);
    } catch (error) {
        console.error("Error fetching profile data:", error);
        return NextResponse.json(
            { error: "Failed to fetch profile data" },
            { status: 500 }
        );
    }
}
