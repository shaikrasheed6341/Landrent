import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string[] }> } // Fix: params is a Promise
) {
  try {
    // Await params to resolve the Promise
    const resolvedParams = await params;

    // Check if resolvedParams.id exists and has at least one element
    if (!resolvedParams.id || resolvedParams.id.length === 0) {
      return NextResponse.json({ error: "Property ID is required" }, { status: 400 });
    }

    // Get the first ID from the catch-all route
    const id = resolvedParams.id[0];

    // Validate that ID is a valid UUID (basic regex for UUID format)
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
      return NextResponse.json({ error: "Invalid property ID format. Must be a UUID." }, { status: 400 });
    }

    // Find property with matching ID
    const property = await db.property.findUnique({
      where: {
        id: id // Use string id directly
      }
    });

    // Return 404 if property not found
    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    // Return the property data
    return NextResponse.json(property);
  } catch (error) {
    console.error("Error fetching property:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch property",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}