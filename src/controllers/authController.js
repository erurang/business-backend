const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

// 회원가입 로직
const registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 데이터베이스에 사용자 저장
    const [result] = await pool.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hashedPassword]
    );

    res
      .status(201)
      .json({
        message: "User registered successfully!",
        userId: result.insertId,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error registering user." });
  }
};

// 로그인 로직
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 사용자 조회
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    const user = rows[0];

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // 비밀번호 검증
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password." });
    }

    // JWT 토큰 생성
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful!", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error logging in." });
  }
};

module.exports = { registerUser, loginUser };
