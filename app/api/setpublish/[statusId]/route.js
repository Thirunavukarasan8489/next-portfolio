import connectDb from "@/lib/db";
import { readEncryptedJson } from "@/lib/api-utils";
import { verifyAuth } from "@/lib/auth";
import { decrypt } from "@/lib/server-encryptdecrypt";
import BlogContent from "@/models/BlogContent";

export const runtime = "nodejs";

export async function PUT(request, { params }) {
  const auth = verifyAuth(request);
  if (auth.error) return auth.error;

  const { statusId } = await params;

  try {
    await connectDb();
    const id = decrypt(statusId);
    const { ispublished } = await readEncryptedJson(request, "enData");
    const data = await BlogContent.updateOne(
      { _id: id },
      { $set: { ispublished } },
      { new: true }
    );

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
