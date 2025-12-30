"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_FILTER_FIELDS = exports.USER_SEARCH_FIELDS = exports.USER_ROLE_ARRAY = exports.USER_STATUS = exports.USER_ROLE_ENUM = void 0;
var USER_ROLE_ENUM;
(function (USER_ROLE_ENUM) {
    USER_ROLE_ENUM["ADMIN"] = "admin";
    USER_ROLE_ENUM["GUEST"] = "guest";
    USER_ROLE_ENUM["EDITOR"] = "editor";
})(USER_ROLE_ENUM || (exports.USER_ROLE_ENUM = USER_ROLE_ENUM = {}));
var USER_STATUS;
(function (USER_STATUS) {
    USER_STATUS["ACTIVE"] = "active";
    USER_STATUS["INACTIVE"] = "inactive";
    USER_STATUS["BANNED"] = "banned";
    USER_STATUS["BLOCKED"] = "blocked";
})(USER_STATUS || (exports.USER_STATUS = USER_STATUS = {}));
exports.USER_ROLE_ARRAY = Object.values(USER_ROLE_ENUM);
exports.USER_SEARCH_FIELDS = ["firstName", "email", "_id"];
exports.USER_FILTER_FIELDS = ["role", "status"];
