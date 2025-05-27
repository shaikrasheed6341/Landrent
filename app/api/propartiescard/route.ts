import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (id) {
            // If ID is provided, find the specific property
            const property = await db.property.findUnique({
                where: { 
                    id: id 
                },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    price: true,
                    location: true,
                    status: true,
                    image: true,
                    paragraph: true,
                    createdAt: true
                }
            });

            if (!property) {
                return NextResponse.json({ error: "Property not found" }, { status: 404 });
            }

            return NextResponse.json(property);
        }

        // If no ID is provided, return all properties
        const properties = await db.property.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                price: true,
                location: true,
                status: true,
               image: true,
                paragraph: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return NextResponse.json(properties);
    } catch (error) {
        console.error("Error fetching properties:", error);
        return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const property = await db.property.create({
            data: body
        });
        return NextResponse.json(property);
    } catch (error) {
        console.error("Error creating property:", error);
        return NextResponse.json({ error: "Failed to create property" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const body = await request.json();

        if (!id) {
            return NextResponse.json({ error: "Property ID is required" }, { status: 400 });
        }

        const property = await db.property.update({
            where: { id },
            data: body
        });
        return NextResponse.json(property);
    } catch (error) {
        console.error("Error updating property:", error);
        return NextResponse.json({ error: "Failed to update property" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: "Property ID is required" }, { status: 400 });
        }

        await db.property.delete({
            where: { id }
        });
        return NextResponse.json({ message: "Property deleted successfully" });
    } catch (error) {
        console.error("Error deleting property:", error);
        return NextResponse.json({ error: "Failed to delete property" }, { status: 500 });
    }
}
