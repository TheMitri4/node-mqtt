var mongoose            = require('./libs/mongoose').mongoose;
var UserModel           = require('./libs/mongoose').UserModel;
var ClientModel         = require('./libs/mongoose').ClientModel;
var AccessTokenModel    = require('./libs/mongoose').AccessTokenModel;
var RefreshTokenModel   = require('./libs/mongoose').RefreshTokenModel;
var faker               = require('Faker');

UserModel.remove({}, function(err) {
    var user = new UserModel({ username: "themitri4", password: "testpassword" });
    user.save(function(err, user) {
        if(err) return console.log(err);
        else console.log("New user - %s:%s",user.username,user.password);
    });

    for(i=0; i<4; i++) {
        var user = new UserModel({ username: faker.random.first_name().toLowerCase(), password: faker.Lorem.words(1)[0] });
        user.save(function(err, user) {
            if(err) return console.log(err);
            else console.log("New user - %s:%s",user.username,user.password);
        });
    }
});

ClientModel.remove({}, function(err) {
    var client = new ClientModel({ name: "Themitri4AliceHome", clientId: "themitri419203485762574", clientSecret:"91innh1947sdbzk19835mzcl88xcv" });
    client.save(function(err, client) {
        if(err) return console.log(err);
        else console.log("New client - %s:%s",client.clientId,client.clientSecret);
    });
});
AccessTokenModel.remove({}, function (err) {
    if (err) return console.log(err);
});
RefreshTokenModel.remove({}, function (err) {
    if (err) return console.log(err);
});

setTimeout(function() {
    mongoose.disconnect();
}, 3000);
