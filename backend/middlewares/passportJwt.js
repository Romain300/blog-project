const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { getUserById } = require('../db/queries');
require('dotenv').config();

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET; 

const jwtStrategy = new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await getUserById(jwt_payload.id);
        if (!user) return done(null, false);
        const safeUser = {
            id: user.id,
            name: user.name,
            email: user.email
        };
        return done(null, safeUser);
    }catch(error) {
        return done(error, false);
    }
});

module.exports = jwtStrategy;




