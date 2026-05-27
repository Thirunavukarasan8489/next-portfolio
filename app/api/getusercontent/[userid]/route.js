import connectDb from "@/lib/db";
import { encryptedText } from "@/lib/api-utils";
import { verifyAuth } from "@/lib/auth";
import { decrypt, encrypt } from "@/lib/server-encryptdecrypt";
import BlogContent from "@/models/BlogContent";

export const runtime = "nodejs";

export async function GET(request, { params }) {
  const auth = verifyAuth(request);
  if (auth.error) return auth.error;

  const { userid } = await params;

  try {
    await connectDb();
    const id = decrypt(userid);
    const data = await BlogContent.find({ uid: id }).sort({ updatedDate: 1 });

    return encryptedText(encrypt(JSON.stringify(data)));
  } catch (error) {
    console.error(error);
    return encryptedText("Internal Server Error", 500);
  }
}
