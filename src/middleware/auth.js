const SERVER_SECRET = 'ImASecret';

const passport = require('passport');
const passportJwt = require('passport-jwt');

const JWTStrategy = passportJwt.Strategy;
const ExtractJWT = passportJwt.ExtractJwt;

passport.use(
  new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: SERVER_SECRET,
  }, (jwtPayload, done) => {
    const user = jwtPayload;
    return done(null, user);
  }),
);

const jwtValidMDW = passport.authenticate('jwt', { session: false });

const userIsAdminMDW = (req, res, next) => passport.authenticate('jwt', { session: false }, (err, user) => {
  if (err) {
    return next(err);
  }

  if (user.role === 'Admin') {
    req.user = user;
    return next();
  }

  res.status(401).json({ error: 'User not Admin' });
})(req, res, next);

module.exports = { SERVER_SECRET, jwtValidMDW, userIsAdminMDW };
