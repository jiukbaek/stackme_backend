import bcrypt from "bcrypt";

export const makeHash = password => {
  if (!password) return false;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};

export const compareId = (targetId, requestId) => {
  return parseInt(targetId) === parseInt(requestId);
};

export const genApiKey = () => {
  let apiKey = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (var i = 0; i < 30; i++) {
    apiKey += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return apiKey;
};
