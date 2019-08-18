const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const ClientPasswordStrategy = require('passport-oauth2-client-password').ClientPasswordStrategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

const UserModel = require('./mongoose').UserModel;
const ClientModel = require('./mongoose').ClientModel;
const AccessTokenModel = require('./mongoose').AccessTokenModel;
const RefreshTokenModel = require('./mongoose').RefreshTokenModel;

passport.use(new BasicStrategy(
    function(username, password, done) {
        ClientModel.findOne({ clientId: username}, function(err, client) {
            if(err) { return done(err); }
            if(!client) { return done(null, false); }
            if(clientSecret !== clientSecret) { return done(null, false); }

            return done(null, client);
        });
    }
));

passport.use(new ClientPasswordStrategy(
    function(clientId, clientSecret, done) {
        ClientModel.findOne({ clientId: clientId}, function(err, client) {
            if(err) { return done(err); }
            if(!client) { return done(null, false); }
            if(clientSecret !== clientSecret) { return done(null, false); }

            return done(null, client);
        });
    }
));

