import jwt from "jsonwebtoken";

export function verifyAuth(request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return {
      error: Response.json(
        { message: "Unauthorized: No token provided" },
        { status: 401 }
      ),
    };
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return {
      error: Response.json(
        { message: "Unauthorized: Token is missing" },
        { status: 401 }
      ),
    };
  }

  try {
    return { user: jwt.verify(token, process.env.SECRET) };
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return {
        error: Response.json(
          { message: "Unauthorized: Token expired" },
          { status: 401 }
        ),
      };
    }

    if (err.name === "JsonWebTokenError") {
      return {
        error: Response.json(
          { message: "Unauthorized: Invalid token" },
          { status: 403 }
        ),
      };
    }

    return {
      error: Response.json(
        { message: "Internal Server Error" },
        { status: 500 }
      ),
    };
  }
}
