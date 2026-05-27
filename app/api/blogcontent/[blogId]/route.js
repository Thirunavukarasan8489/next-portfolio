import { decrypt } from "@/lib/server-encryptdecrypt";
import { getBlogMetaByUrl } from "@/lib/blog-content";

export const runtime = "nodejs";

export async function GET(_request, { params }) {
  const { blogId } = await params;

  try {
    const decodedUrl = decrypt(blogId);
    const data = await getBlogMetaByUrl(decodedUrl);

    if (!data) {
      return Response.json({ message: "Blog not found" }, { status: 404 });
    }

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
