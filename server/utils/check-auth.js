const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

module.exports = context => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const token = authHeader.splite("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch {
        throw new AuthenticationError("Invalid/ expired token");
      }
    }
    throw new Error('Athentication token must be "Bearer [token]"');
  }
  throw new Error("Authorization header must be provided");
};
