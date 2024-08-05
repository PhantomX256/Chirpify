import { verifyToken } from "../utils/jwtUtils";

const authMiddleware = (req, res, next) => {
  // Getting the auth header
  const authHeaders = req.headers.authorization;

  // Auth headers is empty
  if (!authHeaders) return res.status(401).json({ error: "No token provided" });

  // extracting the token from the header
  const token = authHeaders.split(" ")[1];

  // decoding the jwt
  const decoded = verifyToken(token);

  // Token is invalid
  if (!decoded) return res.status(401).json({ error: "Invalid token" });

  req.userId = decoded.id;
  next();
};

export default authMiddleware;
