import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDb from "@/lib/db";
import { encrypt } from "@/lib/server-encryptdecrypt";
import { readEncryptedJson } from "@/lib/api-utils";
import User from "@/models/User";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    await connectDb();
    const logRes = await readEncryptedJson(request);
    const { email, password } = logRes;
    const user = await User.findOne({ email });

    if (!user) {
      return Response.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return Response.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1d" });
    const enData = encrypt(JSON.stringify(payload));

    return Response.json({
      message: "Login successful",
      token,
      enData,
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
