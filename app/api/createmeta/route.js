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
    const data = await readEncryptedJson(request);
    const {
      metatitle,
      metadescription,
      keywords,
      ogimg,
      schema,
      ogtitle,
      ogdescription,
      ogurl,
      ogalt,
      ismetapublished,
    } = data;

    await BlogContent.updateOne(
      { _id: data.blogid },
      {
        $set: {
          metatitle,
          metadescription,
          keywords,
          schema,
          ogtitle,
          ogdescription,
          ogurl,
          ogimg,
          ogalt,
          ismetapublished,
          ipAddress: getIpAddress(request),
        },
      },
      { new: true }
    );

    return textResponse("Blog Meta Data Saved Succefully");
  } catch (error) {
    console.error(error);
    return textResponse("Internal Server Error", 500);
  }
}
