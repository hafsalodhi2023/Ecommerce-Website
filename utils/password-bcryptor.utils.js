import bcrypt from "bcryptjs"; // Import the bcrypt module for hashing passwords

const bcryptor = async (password) => {
  const salt = await bcrypt.genSaltSync(12);
  const hash = await bcrypt.hashSync(password, salt);
  return hash;
};

export default bcryptor;
