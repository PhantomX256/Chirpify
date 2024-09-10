import { verifyToken } from "../utils/jwtUtils.js";

const authMiddleware = (req, res, next) => {
  const date = new Date();

  // get the token from the cookies
  const token = req.cookies.token;

  if (!token) {
    console.log(
      `No token was provided  (authMiddleware)  (${date.getHours()} : ${date.getMinutes()})`
    );
    return res.status(401).json({ error: "No token found" });
  }

  // decoding the jwt
  const decoded = verifyToken(token);

  // Token is invalid
  if (!decoded) {
    console.log(
      `Token was invalid  (authMiddleware)  (${date.getHours()} : ${date.getMinutes()})`
    );
    return res.status(401).json({ error: "Invalid token" });
  }

  // send the userId
  req.userId = decoded.userId;
  next();
};

export default authMiddleware;
