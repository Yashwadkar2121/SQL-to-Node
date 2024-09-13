const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  // Log the entire Authorization header
  const authHeader = req.headers.authorization;
  // console.log("Authorization Header:", authHeader);

  // Ensure the header exists and contains 'Bearer'
  if (authHeader && authHeader.startsWith("Bearer ")) {
    // Extract the token from Bearer <token>
    const token = authHeader.split(" ")[1];
    // console.log("Token Extracted:", token);

    if (token) {
      try {
        // Verify the token
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET || "your_jwt_secret"
        );
        req.user = decoded; // Attach user info to req
        return next();
      } catch (error) {
        console.error("Token verification error:", error);
        return res.status(400).json({ error: "Invalid token" });
      }
    } else {
      return res
        .status(401)
        .json({ error: "Access denied, no token provided" });
    }
  } else {
    return res.status(401).json({ error: "Access denied, no token provided" });
  }
};

module.exports = authenticate;
