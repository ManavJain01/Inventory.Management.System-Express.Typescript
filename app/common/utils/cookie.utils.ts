import { type Response, type Request } from "express"

export const setCookieTokens = (req: Request, res: Response, accessToken: String, refreshToken: String) => {
  // Check if tokens are undefined
  if (!accessToken || !refreshToken) {
    return res.status(400).json({ message: "Tokens are missing" });
  }

  // Set cookies
  if(process.env.NODE_ENV === "production"){
    res.cookie("accessToken", accessToken, {
      httpOnly: true, // Prevents JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Only set cookie over HTTPS in production
      maxAge: 15 * 60 * 1000, // Access token expiration time (15 minutes)
      sameSite: "strict", // Prevents cross-site request forgery (CSRF)
    });
  
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000, // Refresh token expiration time (30 days)
      sameSite: "strict",
    });
  }
  
  return;
};