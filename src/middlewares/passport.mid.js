import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { compareHash } from "../helpers/hash.util.js";
import usersRepository from "../repositories/users.repository.js";
import { createToken } from "../helpers/token.util.js";
import verifyUserEmail from "../helpers/verifyUser.helper.js";

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
          return done(null, null, { message: "Invalid data", statusCode: 400 });
        }
        /* validar si el usuario ya fue registrado */
        let user = await usersRepository.readBy({ email });
        if (user) {
          return done(null, null, {
            message: "Invalid credentials",
            statusCode: 401,
          });
        }
        /* registrar al usuario (crearlo) con la contraseña protegida! */
        //el repositorio se encarga de encriptar la contraseña
        user = await usersRepository.createOne(req.body);
        await verifyUserEmail(user.email, user.verifyCode);
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
        let user = await usersRepository.readBy({ email });
        if (!user) {
          return done(null, null, {
            message: "Invalid credentials",
            statusCode: 401,
          });
        }
        /* validar si la contraseña es correcta */
        const verify = compareHash(password, user?.password);
        if (!verify) {
          return done(null, null, {
            message: "Invalid credentials",
            statusCode: 401,
          });
        }
        const verifyAccount = user.isVerified
        if (!verifyAccount) {
          return done(null, null, {
            message: "Please verify your account!",
            statusCode: 400,
          });
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
        let user = await usersRepository.readBy({ email: id });
        if (!user) {
          user = {
            email: id,
            name: name.givenName,
            avatar: picture,
            password: email,
            city: "Google",
          };
          user = await usersRepository.createOne(user);
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
passport.use(
  "user",
  new JwtStrategy(
    {
      secretOrKey: process.env.SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.signedCookies?.token,
      ]),
    },
    async (data, done) => {
      try {
        const { _id, role, email } = data;
        const user = await usersRepository.readBy({ _id, role, email });
        if (!user) {
          return done(null, null, { message: "Forbidden", statusCode: 403 });
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(
  "admin",
  new JwtStrategy(
    {
      secretOrKey: process.env.SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.signedCookies?.token,
      ]),
    },
    async (data, done) => {
      try {
        const { _id, role, email } = data;
        const user = await usersRepository.readBy({ _id, role, email });
        if (!user || user?.role !== "ADMIN") {
          return done(null, null, { message: "Forbidden", statusCode: 403 });
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
export default passport;
