import connectDb from "@/lib/db";
import { getIpAddress, readEncryptedJson, textResponse } from "@/lib/api-utils";
import { verifyAuth } from "@/lib/auth";
import BlogContent from "@/models/BlogContent";

export const runtime = "nodejs";

export async function POST(request) {
  const auth = verifyAuth(request);
  if (auth.error) return auth.error;

  try {
    await connectDb();
    const reqBody = await readEncryptedJson(request);
    const now = new Date();

    await BlogContent.create({
      uid: reqBody.uid,
      url: reqBody.url,
      title: reqBody.title,
      description: reqBody.description,
      author: reqBody.author,
      category: reqBody.category,
      bannerimg: reqBody.bannerimg,
      blogContent: reqBody.blogContent,
      ispublished: reqBody.ispublished,
      ismetapublished: reqBody.ismetapublished,
      date: now,
      updatedDate: now,
      ipAddress: getIpAddress(request),
    });

    return textResponse("Blog Posted Sucessfully");
  } catch (error) {
    console.error(error);
    return textResponse("Internal Server Error", 500);
  }
}
