var fs = require('fs');
var User = require('./user');

function toJson(users) {
    let ret = {};

    for (let user of users) {
        let item = {};
        item.id = user.getId();
        item.name = user.getName();
        item.password = user.getPassword();
        item.profession = user.getProfession();
        ret[item.name] = item;
    }

    return ret;
}

function doSaveUsers(users, filename) {
    let raw = toJson(users);
    let content = JSON.stringify(raw, null, 2);
    console.info(content);
    fs.writeFileSync(filename, content);
}

function doGetUserList(filename) {
    let ret = [];
    if (fs.existsSync(filename)) {
        let content = fs.readFileSync(filename).toString();
        let json = JSON.parse(content);
        if (json != undefined) {
            for (let raw in json) {
                let item = json[raw];
                let user = new User();
                user.setName(item.name);
                user.setPassword(item.password);
                user.setProfession(item.profession);
                user.setId(item.id);
                ret.push(user);
            }
        }
    }
    return ret;
}

function doCreateUser(filename, user) {
    if (user != undefined) {
        let username = user.getName();
        if (username != undefined
            && username != ''
            && fs.existsSync(filename)) {
            let users = doGetUserList(filename);
            user.setId(doGetNewId(users));
            users.push(user);

            doSaveUsers(users, filename);
        }
    }
}

function doGetNewId(users) {
    let lastid = users[users.length - 1].getId();
    let newid = lastid + 1;
    return newid;
}

function doUpdateUser(filename, user) {
    if (fs.existsSync(filename)
        && user != undefined) {
        let id = user.getId();
        let users = doGetUserList(filename);
        let noMatched = true;
        for (let existed of users) {
            if (existed.getId() == id) {
                existed.setName(user.getName());
                existed.setPassword(user.getPassword());
                existed.setProfession(user.getProfession());

                noMatched = false;
                break;
            }
        }

        if (noMatched) {
            user.setId(doGetNewId(users));
            users.push(user);
        }

        doSaveUsers(users, filename);
    }
}

function doDeleteUser(filename, user) {
    if (fs.existsSync(filename)
        && user != undefined) {
        let id = user.getId();
        let users = doGetUserList(filename);
        let deleting = 0;
        for (let i = 0; i < users.length; i++) {
            let existed = users[i];
            if (existed.getId() == id) {
                deleting = i;
                break;
            }
        }

        users.splice(deleting, 1);

        doSaveUsers(users, filename);
    }
}

function doClearUsers(filename) {
    if (fs.existsSync(filename)) {
        let users = doGetUserList(filename);
        users.splice(0, users.length);
        doSaveUsers(users, filename);
    }
}

exports.getUserList = function (filename) {
    return doGetUserList(filename);
}

exports.createUser = function (filename, user) {
    doCreateUser(filename, user);
}

exports.updateUser = function (filename, user) {
    doUpdateUser(filename, user);
}

exports.deleteUser = function (filename, user) {
    doDeleteUser(filename, user);
}

exports.clearUsers = function (filename) {
    doClearUsers(filename);
}