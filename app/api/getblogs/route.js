import connectDb from "@/lib/db";
import { encryptedText } from "@/lib/api-utils";
import { encrypt } from "@/lib/server-encryptdecrypt";
import BlogContent from "@/models/BlogContent";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectDb();
    const data = await BlogContent.find({ ispublished: "Published" }).sort({
      updatedDate: 1,
    });

    return encryptedText(encrypt(JSON.stringify(data)), 201);
  } catch (error) {
    console.error(error);
    return encryptedText("Internal Server Error", 500);
  }
}
