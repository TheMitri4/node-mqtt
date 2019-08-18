const mongoose = require('mongoose');
const crypto = require('crypto');

mongoose.connect('mongodb://127.0.0.1:27017');
let db = mongoose.connection;

db.on('error', err => {
    console.log('Connection error: ', err.message);
});

db.once('open', () => {
    console.log('Connected to DB');
});

let Schema = mongoose.Schema;

let User = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

User.methods.encryptPassword = (password) => {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

User.virtual('userId')
    .get(function () {
        return this.id;
    });

User.virtual('password')
    .set(function(password) {
        this._plainPassword = password;
        this.salt = crypto.randomBytes(32).toString('base64');
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() { return this._plainPassword; });

User.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this/hashedPassword;
}

let UserModel = mongoose.model('User', User);

let Client = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    clientId: {
        type: String,
        unique: true,
        required: true
    },
    clientSecret: {
        type: String,
        required: true
    }
});

let ClientModel = mongoose.model('Client', Client);

let AccessToken = new Schema({
    userId: {
        type: String,
        required: true
    },
    clientId: {
        type: String,
        required: true
    },
    token: {
        type: String,
        unique: true,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

let AccessTokenModel = mongoose.model('AccessToken', AccessToken);

let RefreshToken = new Schema({
    userId: {
        type: String,
        required: true
    },
    clientId: {
        type: String,
        required: true
    },
    token: {
        type: String,
        unique: true,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

let RefreshTokenModel = mongoose.model('RefreshToken', RefreshToken);

module.exports = {
    UserModel: UserModel,
    ClientModel: ClientModel,
    AccessTokenModel: AccessTokenModel,
    RefreshTokenModel: RefreshTokenModel
};