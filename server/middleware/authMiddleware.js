const jwt = require("jsonwebtoken");

module.exports = function (
  req,
  res,
  next
) {
  const authHeader =
    req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({
      message: "No token",
    });
  }

  try {
    // REMOVE "Bearer "
    const token =
      authHeader.startsWith(
        "Bearer "
      )
        ? authHeader.split(" ")[1]
        : authHeader;

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};