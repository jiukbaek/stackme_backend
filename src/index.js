import passport from "../utils/passport";
import userRouter from "./api/user";
import authRouter from "./api/auth";
import projectRouter from "./api/project";
import careerRouter from "./api/career";
import skillRouter from "./api/skill";

export const setRouter = server => {
  server.use("/api/auth", authRouter);
  server.use("/api/user", userRouter);
  server.use(
    "/api/project",
    passport.authenticate("jwt", { session: false }),
    projectRouter
  );
  server.use(
    "/api/career",
    passport.authenticate("jwt", { session: false }),
    careerRouter
  );
  server.use("/api/skill", skillRouter);
};
