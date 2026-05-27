import path from "path";
import { promises as fs } from "fs";
import connectDb from "@/lib/db";
import { textResponse } from "@/lib/api-utils";
import { verifyAuth } from "@/lib/auth";
import { decrypt } from "@/lib/server-encryptdecrypt";
import BlogContent from "@/models/BlogContent";

export const runtime = "nodejs";

export async function DELETE(request, { params }) {
  const auth = verifyAuth(request);
  if (auth.error) return auth.error;

  const { id: encryptedId } = await params;

  try {
    await connectDb();
    const id = decrypt(encryptedId);
    const blog = await BlogContent.findOne({ _id: id });

    if (!blog) {
      return textResponse("Blog not found", 404);
    }

    const imagePaths = [];
    blog.blogContent?.forEach((content) => {
      content.blocks?.forEach((block) => {
        const url = block?.data?.file?.url;
        if (block.type === "image" && url && !url.startsWith("data:")) {
          imagePaths.push(
            path.join(
              process.cwd(),
              "public",
              "uploads",
              "compressed",
              path.basename(url)
            )
          );
        }
      });
    });

    await Promise.all(
      imagePaths.map((filePath) =>
        fs.unlink(filePath).catch((error) => {
          console.error(`Failed to delete file: ${filePath}`, error);
        })
      )
    );

    await BlogContent.deleteOne({ _id: id });
    return textResponse("Deleted");
  } catch (error) {
    console.error(error);
    return textResponse("Internal Server Error", 500);
  }
}
