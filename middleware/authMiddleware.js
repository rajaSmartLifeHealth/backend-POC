const jwt = require("jsonwebtoken");

const secret = "5eda7ee2a0f1e180548a5c447157ab26b239572ec27d3c181c5fbd0b101d6f79";

const auth = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
    console.error(err);
  }
};


module.exports = auth;
