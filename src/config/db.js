const mysql = require("mysql2/promise");
require("dotenv").config(); // 환경 변수 로드

// MySQL 연결 풀 생성
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost", // MySQL 호스트
  user: process.env.DB_USER || "root", // MySQL 사용자
  password: process.env.DB_PASSWORD || "rootpassword", // MySQL 비밀번호
  database: process.env.DB_NAME || "business_db", // 사용할 데이터베이스
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool; // 다른 파일에서 DB 연결을 가져와 사용
