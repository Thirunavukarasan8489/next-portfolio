import connectDb from "@/lib/db";
import { textResponse } from "@/lib/api-utils";
import ContactEnquiry from "@/models/ContactEnquiry";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    await connectDb();
    const { name, email, subject, message } = await request.json();
    const existingEnquiry = await ContactEnquiry.findOne({ email }).sort({
      _id: 1,
    });

    if (existingEnquiry) {
      return textResponse("You Have Already Submitted Form", 403);
    }

    await ContactEnquiry.create({
      name,
      email,
      subject,
      message,
      createdAt: new Date(),
    });

    return textResponse("Form Submitted Successfully");
  } catch (error) {
    console.error(error);
    return textResponse("Internal Server Error", 500);
  }
}
