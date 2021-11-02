const GoogleStrategy = require("passport-google-oauth2").Strategy;
require("dotenv").config();
const passport = require("passport");
const User = require("../model/user.model");
const { v4: uuid } = require("uuid");
const { newToken } = require("../controller/user.controller");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:2345/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        let user = await User.findOne({ email: profile?._json?.email })
          .lean()
          .exec();
        if (!user) {
          user = await User.create({
            email: profile?._json?.email,
            name: profile?._json?.name,
            password: uuid(),
          });
        }
        const token = newToken(user);
        user.token = token;
        return done(null, user);
      } catch (err) {
        return done(null, err.message);
      }
    }
  )
);

module.exports = passport;
