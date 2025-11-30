// Server/config/passport.js
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import { User } from "../models/user_model.js";

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/v1/user/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists
        let user = await User.findOne({ 
          provider: "google", 
          providerId: profile.id 
        });

        if (!user) {
          // Check if email already exists with different provider
          user = await User.findOne({ email: profile.emails[0].value });
          
          if (user) {
            return done(null, false, { message: "Email already registered with different method" });
          }

          // Create new user
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            photoUrl: profile.photos[0]?.value || "",
            provider: "google",
            providerId: profile.id,
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/api/v1/user/auth/github/callback",
      scope: ["user:email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ 
          provider: "github", 
          providerId: profile.id 
        });

        if (!user) {
          const email = profile.emails?.[0]?.value || `${profile.username}@github.local`;
          
          user = await User.findOne({ email });
          
          if (user) {
            return done(null, false, { message: "Email already registered with different method" });
          }

          user = await User.create({
            name: profile.displayName || profile.username,
            email,
            photoUrl: profile.photos[0]?.value || "",
            provider: "github",
            providerId: profile.id,
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

export default passport; 