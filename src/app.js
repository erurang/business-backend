const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const authRoutes = require("./routes/auth"); // 로그인 관련 라우트

const app = express();

app.use(bodyParser.json());

// 라우트 연결
app.use("/api/auth", authRoutes);

module.exports = app;
