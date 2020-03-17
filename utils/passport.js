import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import User from "../models/User";

const option = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET || "secret"
};

const verifyUser = async (payload, done) => {
  try {
    const result = await User.findOne({ where: { id: payload.userId } });
    if (result) {
      const user = {
        id: result.id,
        email: result.email,
        name: result.name,
        auth: result.auth
      };
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (e) {
    return done(e, false);
  }
};

passport.use(new Strategy(option, verifyUser));
passport.initialize();

export default passport;
