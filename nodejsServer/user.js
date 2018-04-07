function User() {
    var _name = '';
    var _password = '';
    var _profession = '';
    var _id = -1;

    this.getName = function () {
        return this._name;
    }

    this.setName = function (name) {
        this._name = name;
    }

    this.getPassword = function () {
        return this._password;
    }

    this.setPassword = function (password) {
        this._password = password;
    }

    this.getProfession = function () {
        return this._profession;
    }

    this.setProfession = function (profession) {
        this._profession = profession;
    }

    this.getId = function () {
        return this._id;
    }

    this.setId = function (id) {
        this._id = id;
    }
}

module.exports = User;