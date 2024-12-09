const express = require("express");
const auth = require("./authMiddleware"); // Import your auth middleware

const router = express.Router();

// Define the GET route to validate the token
router.get("/validate", auth, (req, res) => {
  // Since the token is validated, `req.user` contains the decoded user information
  res.status(200).json({
    success: true,
    message: "Token is valid",
    userId: req.user,  // userId comes from the decoded JWT
  });
});

module.exports = {router};
