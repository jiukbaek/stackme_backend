import bcrypt from "bcrypt";
import sharp from "sharp";
import fs from "fs";
import { adjective, nouns } from "./words";
import nodemailer from "nodemailer";

const sendMail = (email) => {
  const options = {
    service: "naver",
    auth: {
      user: "jiuk205@naver.com",
      pass: "poeing9402",
    },
  };
  const mailer = nodemailer.createTransport(options);
  return mailer.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "jiuk205@naver.com",
    to: address,
    subject: "[Stack Me] 가입 인증 메일",
    html: `안녕하세요, Stack Me 입니다! <br/>
      가입 인증 코드는 <br/>
      <b style="font-size:18px;">${secret}</b><br/> 
      입니다.`,
  };
  return sendMail(email);
};

export const makeHash = (password) => {
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

export const makeThumnail = (images, id) => {
  if (!images) return "default.png";

  const useImage = images[0];
  const ext = useImage.substring(useImage.lastIndexOf("."), useImage.length);
  const thumPath = `static/public/thumnail/${id}${ext}`;

  fs.copyFileSync(useImage, thumPath);
  sharp(useImage).resize({ width: 300 }).toFile(thumPath);
  return `${id}${ext}`;
};

export const getProjectImages = (content) => {
  return content.match(/src=".+?"/g);
};

export const replaceProjectImages = (content) => {
  return content.replace(
    /\/static\/public\/imageTemp/gi,
    "/static/public/projectImage"
  );
};

export const setProjectImage = (images) => {
  if (!images) return;

  const replaceImages = images.map((image) =>
    image.replace(/src=/gi, "").replace(/"/gi, "").substr(1)
  );

  const setImages = [];

  replaceImages.forEach((image) => {
    const movedPath = image.replace(
      "static/public/imageTemp",
      "static/public/projectImage"
    );
    fs.renameSync(image, movedPath);
    setImages.push(movedPath);
  });
  return setImages;
};

export const genPagination = (page, perPage, totalCount) => {
  if (totalCount === 0) return null;

  const groupPerPage = 5;

  const startRowNum = (page - 1) * perPage + 1;
  const endRowNum = page * perPage > totalCount ? totalCount : page * perPage;

  const totalPage =
    totalCount % perPage > 0
      ? parseInt(totalCount / perPage) + 1
      : parseInt(totalCount / perPage);

  const nowPageGroup =
    page % groupPerPage > 0
      ? parseInt(page / groupPerPage) + 1
      : parseInt(page / groupPerPage);

  const nowGroupStartPage = (nowPageGroup - 1) * groupPerPage + 1;
  const nowGroupEndPage =
    nowPageGroup * groupPerPage >= totalPage
      ? totalPage
      : nowPageGroup * groupPerPage;

  return {
    startRowNum,
    endRowNum,
    page,
    totalPage,
    nowGroupStartPage,
    nowGroupEndPage,
  };
};

export const generatorSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjective.length);
  return `${adjective[randomNumber]} ${nouns[randomNumber]}`;
};

export const getProjectType = (type) => {
  const typeNum = parseInt(type);
  switch (typeNum) {
    case 1:
      return "개인프로젝트";
    case 2:
      return "팀 프로젝트";
    case 3:
      return "외주 프로젝트";
  }
};
