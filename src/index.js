import passport from "../utils/passport";
import userRouter from "./api/user";
import authRouter from "./api/auth";
import projectRouter from "./api/project";
import careerRouter from "./api/career";
import skillRouter from "./api/skill";
import meRouter from "./api/me";
import cors from "cors";

export const setRouter = (server) => {
  server.use("/api/auth", cors(), authRouter);
  server.use("/api/user", cors(), userRouter);
  server.use("/api/project", cors(), projectRouter);
  server.use(
    "/api/career",
    cors(),
    passport.authenticate("jwt", { session: false }),
    careerRouter
  );
  server.use("/api/skill", cors(), skillRouter);
  server.use("/api/me", cors(), meRouter);
};
