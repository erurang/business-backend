const express = require("express");
const {
  registerUser,
  loginUser,
  changePassword,
} = require("../controllers/authController");
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

// 비밀번호 변경
router.post("/change-password", authenticateToken, changePassword);

module.exports = router;
