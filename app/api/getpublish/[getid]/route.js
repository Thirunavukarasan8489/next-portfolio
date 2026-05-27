import connectDb from "@/lib/db";
import { verifyAuth } from "@/lib/auth";
import { decrypt } from "@/lib/server-encryptdecrypt";
import BlogContent from "@/models/BlogContent";

export const runtime = "nodejs";

export async function GET(request, { params }) {
  const auth = verifyAuth(request);
  if (auth.error) return auth.error;

  const { getid } = await params;

  try {
    await connectDb();
    const id = decrypt(getid);
    const data = await BlogContent.find({ uid: id });

    return Response.json(
      data.map((item) => ({
        id: item._id,
        ispublished: item.ispublished,
      }))
    );
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
