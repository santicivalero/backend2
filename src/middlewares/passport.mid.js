import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { compareHash, createHash } from "../helpers/hash.util.js";
import { usersManager } from "../data/manager.mongo.js";
import { createToken } from "../helpers/token.util.js";

const callbackURL = "http://localhost:8080/api/auth/google/redirect";

passport.use(
  /* nombre de la estrategia */
  "register",
  /* constructor de la estrategia */
  new LocalStrategy(
    /* objeto de configuración de la estrategia */
    { passReqToCallback: true, usernameField: "email" },
    /* callback de la lógica de la estrategia */
    async (req, email, password, done) => {
      try {
        /* validar algunos datos obligatorios */
        const { city } = req.body;
        if (!city) {
          const error = new Error("Invalid data");
          error.statusCode = 400;
          throw error;
        }
        /* validar si el usuario ya fue registrado */
        let user = await usersManager.readBy({ email });
        if (user) {
          const error = new Error("Invalid credentials");
          error.statusCode = 401;
          throw error;
        }
        /* registrar al usuario (crearlo) con la contraseña protegida! */
        req.body.password = createHash(password);
        user = await usersManager.createOne(req.body);
        /* gracias a este done, se agregan los datos del usuario */
        /* al objeto de requerimientos (req.user) */
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(
  /* nombre de la estrategia */
  "login",
  /* constructor de la estrategia */
  new LocalStrategy(
    /* objeto de configuración de la estrategia */
    { passReqToCallback: true, usernameField: "email" },
    /* callback de la lógica de la estrategia */
    async (req, email, password, done) => {
      try {
        /* validar si el usuario ya fue registrado */
        let user = await usersManager.readBy({ email });
        if (!user) {
          const error = new Error("Invalid credentials");
          error.statusCode = 401;
          throw error;
        }
        /* validar si la contraseña es correcta */
        const verify = compareHash(password, user?.password);
        if (!verify) {
          const error = new Error("Invalid credentials");
          error.statusCode = 401;
          throw error;
        }
        const data = {
          _id: user._id,
          role: user.role,
          email,
        };
        const token = createToken(data);
        user.token = token;
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(
  /* nombre de la estrategia */
  "google",
  /* constructor de la estrategia */
  new GoogleStrategy(
    /* objeto de configuración de la estrategia */
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL,
    },
    /* callback de la lógica de la estrategia */
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile);
        const { email, name, picture, id } = profile;
        let user = await usersManager.readBy({ email: id });
        if (!user) {
          user = {
            email: id,
            name: name.givenName,
            avatar: picture,
            password: createHash(email),
            city: "Google",
          };
          user = await usersManager.createOne(user);
        }
        const data = {
          user_id: user._id,
          role: user.role,
          email,
        };
        const token = createToken(data);
        user.token = token;
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;
