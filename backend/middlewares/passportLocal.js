const LocalStrategy = require('passport-local').Strategy;
const { getUserByEmail } = require('../db/queries');
const bcrypt = require('bcryptjs');
const passport = require('passport');

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
        },

        async (email, password, done) => {
            try{
                const user = await getUserByEmail(email);

                if (!user) {
                    return done(null, false, {message: "Incorrect email"});
                }

                const match = await bcrypt.compare(password, user.password);
                if (!match) {
                    return done(null, false, {message: "Incorrect password"})
                }
                return done(null, user);

            }catch(error) {
                return done(error);
            }
        }
    )
);