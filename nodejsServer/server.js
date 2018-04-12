var utils = require('./utils');
var User = require('./user');
var path = require('path');
var cors = require('cors');
var express = require('express');
var bodyParser = require('body-parser');

let filename = 'users.json';//path.join(__dirname, 'users.json');

var app = express();
app.use(cors()); // enable cors.
app.use(bodyParser());

app.get('/getUserList', function (request, response) {
    let users = utils.getUserList(filename);
    let json = utils.toJsonContent(users);
    response.end(json);
});

app.post('/updateUser', function (request, response) {
    let body = request.body;
    let suc = addOrUpdateUser(body);
    let result = { Method: 'updateUser', Succeed: suc };
    let json = utils.toJsonRaw(result);
    response.end(json);
});

app.post('/deleteUser', function (request, response) {
    let body = request.body;
    let id = body.Id;
    let suc = false;
    if (id > 0) {
        let user = new User();
        user.setId(id);
        utils.deleteUser(filename, user);
        suc = true;
    }
    let result = { Succeed: suc };
    let json = utils.toJsonRaw(result);
    response.end(json);
});

function addOrUpdateUser(body) {
    let id = body.Id;
    let name = body.Name
    let password = body.Password;
    let profession = body.Profession;
    let suc = false;
    if (name != '') {
        let user = new User();
        user.setId(id);
        user.setName(name);
        user.setPassword(password);
        user.setProfession(profession);
        utils.updateUser(filename, user);
        suc = true;
    }
    return suc;
}

var server = app.listen(8080, function () {
    var port = server.address().port;

    console.log(`listen on port: ${port}`);
});
