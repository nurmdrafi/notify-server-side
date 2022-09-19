require("dotenv").config();
const jwt = require("jsonwebtoken");
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

function verifyRefreshToken(email, token) {
  try {
    const decoded = jwt.verify(token, refreshTokenSecret);
    console.log("refresh token");
    return decoded.email === email;
  } catch (error) {
    console.log(error);
    return false;
  }
}
module.exports = { isAuthenticated, verifyRefreshToken };
