import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";

const POST = async (req: Request) => {
    const { name, email, phone, message } = await req.json();
    if (!name || !email || !phone || !message) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }   
    try {
        const contact = await db.contact.create({
            data: {
            name,
            email,
            phone,
            message
        }
    });
        return NextResponse.json(contact);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create contact" }, { status: 500 });
    }
}   

const GET = async () => {
    const contacts = await db.contact.findMany();
    return NextResponse.json(contacts);
}   

export { POST, GET };