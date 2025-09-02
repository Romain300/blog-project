const express = require('express');
const routes = require('./routes');
require('dotenv').config();
const passport = require('passport');
const jwtStrategy = require('./middlewares/passportJwt');
const { route } = require('./routes/comment');
require('./middlewares/passportLocal');

passport.use(jwtStrategy);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({
        message: 'welcome'
    })
});
app.use('/posts', routes.posts);
app.use('/signIn', routes.signIn);
app.use('/logIn', routes.logIn);
app.use('/comments', routes.comments);
app.get("/protected", passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.status(200).send("YAY! this is a protected Route")
})

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})





