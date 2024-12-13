const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const router = express.Router();

const authenticateToken = require("../middleware/auth");

router.get("/protected", authenticateToken, (req, res) => {
  res.json({
    message: `Hello, ${req.user.username}! This is a protected route.`,
  });
});

// 회원가입 API
router.post("/register", registerUser);

// 로그인 API
router.post("/login", loginUser);

module.exports = router;
