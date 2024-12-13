const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 샘플 사용자 데이터 (DB 대신)
const users = [];

// 회원가입 로직
const registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ id: users.length + 1, username, password: hashedPassword });

  res.status(201).json({ message: "User registered successfully!" });
};

// 로그인 로직
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password." });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(200).json({ message: "Login successful!", token });
};

module.exports = { registerUser, loginUser };
