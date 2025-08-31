const express = require('express');
const routes = require('./routes');
require('dotenv').config();
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const bcrypt = require('bcryptjs');
const { getUserByEmail } = require('./db/queries');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({
        message: 'welcome'
    })
});

app.use('/posts', routes.post);
app.use('/signIn', routes.signIn);
app.use('/logIn', routes.logIn);

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


app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})





