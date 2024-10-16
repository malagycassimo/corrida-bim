import jwt, { type JwtPayload } from "jsonwebtoken";

const generateToken = (payload: User.Response): string => {
  try {
    return jwt.sign(payload, process.env.JWT_SECRET || "secret", {
      expiresIn: "30d",
    });
  } catch (error) {
    throw new Error(error as string);
  }
};

const verifyToken = (token: string): JwtPayload | string => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "secret");
  } catch (error) {
    throw new Error(error as string);
  }
};

export { generateToken, verifyToken };
