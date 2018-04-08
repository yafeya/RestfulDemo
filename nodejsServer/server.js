var utils = require('./utils');
var User = require('./user');
var path = require('path');
var express = require('express');

let filename = 'users.json';//path.join(__dirname, 'users.json');

var app = express();

app.get('/getUserList', function (request, response) {
    let users = utils.getUserList(filename);
    let json = utils.toJsonContent(users);
    response.end(json);
});

app.post('/addUser', function (request, response) {
    let suc = addOrUpdateUser(request);
    response.end({ Succeed: suc });
});

app.put('/updateUser', function (request, response) {
    let suc = addOrUpdateUser(request);
    response.end({ Succeed: suc });
});

app.delete('/deleteUser', function (request, response) {
    let id = request.param('id', -1);
    let suc = false;
    if (id > 0) {
        let user = new User();
        user.setId(id);
        utils.deleteUser(filename, user);
        suc = true;
    }
    response.end({ Succeed: suc });
});

function addOrUpdateUser(request) {
    let name = request.param('name', '');
    let password = request.param('password', '');
    let profession = request.param('profession', '');
    let suc = false;
    if (name != '') {
        let user = new User();
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
