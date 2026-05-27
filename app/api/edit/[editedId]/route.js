import connectDb from "@/lib/db";
import { getIpAddress, readEncryptedJson, textResponse } from "@/lib/api-utils";
import { verifyAuth } from "@/lib/auth";
import { decrypt } from "@/lib/server-encryptdecrypt";
import BlogContent from "@/models/BlogContent";

export const runtime = "nodejs";

export async function PUT(request, { params }) {
  const auth = verifyAuth(request);
  if (auth.error) return auth.error;

  const { editedId } = await params;

  try {
    await connectDb();
    const id = decrypt(editedId);
    const reqBody = await readEncryptedJson(request);

    await BlogContent.updateOne(
      { _id: id },
      {
        $set: {
          title: reqBody.title,
          description: reqBody.description,
          metatitle: reqBody.metatitle,
          metadescription: reqBody.metadescription,
          category: reqBody.category,
          bannerimg: reqBody.bannerimg,
          blogContent: reqBody.blogContent,
          url: reqBody.url,
          ipAddress: getIpAddress(request),
          updatedDate: new Date(),
        },
      },
      { new: true }
    );

    return textResponse("Your Blog Data Updated");
  } catch (error) {
    console.error(error);
    return textResponse("Internal Server Error", 500);
  }
}
