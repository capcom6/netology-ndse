const passport = require("passport");
const LocalStrategy = require("passport-local");

const UsersModule = require("../modules/users/service");

passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
}, async (email, password, done) => {
    const user = await UsersModule.authenticate(email, password);
    if (!user) {
        return done(null, false, { message: "Incorrect email or password" });
    }
    return done(null, user);
}));

passport.serializeUser((user, done) => {
    process.nextTick(() => {
        done(null, { id: user.id, name: user.name });
    });

});

passport.deserializeUser(async (user, done) => {
    UsersModule.get(user.id)
        .then((user) => {
            done(null, user);
        });
});

module.exports = {
    authByCredentials: ({ failureRedirect, successRedirect }) => passport.authenticate("local", { successRedirect, failureRedirect, failureMessage: true }),
    authBySession: () => passport.authenticate("session"),
    protectedArea: ({ loginUrl }) => {
        return (req, res, next) => {
            if (!req.isAuthenticated()) {
                return res.redirect(loginUrl);
            }
            next();
        };
    }
};