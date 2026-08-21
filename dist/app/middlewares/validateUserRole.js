"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserRole = void 0;
const user_constant_1 = require("../modules/user/user.constant");
const validateUserRole = (req, res, next) => {
    const { role } = req.body;
    console.log('role', role);
    if (!role || !Object.values(user_constant_1.USER_ROLE_ENUM).includes(role)) {
        return res.status(400).json({
            status: 'false',
            message: 'Invalid role value',
        });
    }
    next();
};
exports.validateUserRole = validateUserRole;
