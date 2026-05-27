import bcrypt from "bcrypt";
import connectDb from "@/lib/db";
import { readEncryptedJson, textResponse } from "@/lib/api-utils";
import User from "@/models/User";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    await connectDb();
    const reqBody = await readEncryptedJson(request);

    if (!reqBody) {
      return textResponse("Invalid user", 401);
    }

    const { email, name, phone, password } = reqBody;
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return textResponse(
          "An account with this email already exists. Please login.",
          409
        );
      }

      if (existingUser.phone === phone) {
        return textResponse(
          "An account with this phone number already exists. Please login.",
          409
        );
      }
    }

    const hashpassword = await bcrypt.hash(password, 10);
    await User.create({
      email,
      name,
      phone,
      password: hashpassword,
    });

    return textResponse("Account Created Successfully");
  } catch (error) {
    console.error(error);
    return textResponse("Internal Server Error", 500);
  }
}
