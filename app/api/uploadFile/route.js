import path from "path";
import { promises as fs } from "fs";
import sharp from "sharp";
import { verifyAuth } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request) {
  const auth = verifyAuth(request);
  if (auth.error) return auth.error;

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file.arrayBuffer !== "function") {
      return Response.json(
        { success: 0, message: "No file uploaded" },
        { status: 400 }
      );
    }

    const inputBuffer = Buffer.from(await file.arrayBuffer());
    const originalName = file.name || "upload";
    const safeName = originalName.replace(/[^a-zA-Z0-9.-]/g, "-");
    const outputName = `${Date.now()}-${safeName.replace(
      path.extname(safeName),
      ".webp"
    )}`;
    const outputDir = path.join(process.cwd(), "public", "uploads", "compressed");
    const outputPath = path.join(outputDir, outputName);

    await fs.mkdir(outputDir, { recursive: true });
    await sharp(inputBuffer)
      .rotate()
      .resize({ width: 1000, height: 1000, fit: "inside" })
      .webp({ quality: 100 })
      .toFile(outputPath);

    return Response.json({
      success: 1,
      file: {
        url: `/uploads/compressed/${outputName}`,
      },
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: 0, message: "File compression failed." },
      { status: 500 }
    );
  }
}
