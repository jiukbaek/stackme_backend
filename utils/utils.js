import bcrypt from "bcrypt";

export const makeHash = password => {
  if (!password) return false;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};
