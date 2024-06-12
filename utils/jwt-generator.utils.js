import jwt from "jsonwebtoken";

const jwtGenerator = (data) => {
  // Generate a JSON Web Token
  const authToken = jwt.sign(data, process.env.JWT_SECRET);
  return authToken;
};

export default jwtGenerator;
