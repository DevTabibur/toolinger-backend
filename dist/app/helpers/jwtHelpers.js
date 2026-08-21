"use strict";
// import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtHelpers = void 0;
// const createToken = (
//   payload: Record<string, unknown>,
//   secret: Secret,
//   expireTime: string,
// ): string => {
//   return jwt.sign(payload, secret, {
//     expiresIn: expireTime,
//   })
// }
// // ! send this token with mail to user to change the password / forgot password
// const createResetToken = (
//   payload: Record<string, unknown>,
//   secret: Secret,
//   expireTime: string,
// ): string => {
//   return jwt.sign(payload, secret, {
//     algorithm: 'HS256',
//     expiresIn: expireTime,
//   })
// }
// const verifyToken = (token: string, secret: Secret): JwtPayload => {
//   return jwt.verify(token, secret) as JwtPayload
// }
// // const regenerateToken = async (
// //   refreshToken: string,
// //   accessSecret: Secret,
// //   refreshSecret: Secret,
// // ) => {
// //   const { _id } = verifyToken(refreshToken, refreshSecret)
// //   const newToken = createToken({ _id }, accessSecret)
// //   return newToken
// // }
// export const jwtHelpers = {
//   createToken,
//   createResetToken,
//   verifyToken,
// }
// new code
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (payload, secret, expireTime) => {
    const options = {
        expiresIn: expireTime, // Pass the expireTime directly as a string
    };
    return jsonwebtoken_1.default.sign(payload, secret, options);
};
// ! Send this token with mail to user to change the password / forgot password
const createResetToken = (payload, secret, expireTime) => {
    const options = {
        algorithm: "HS256",
        expiresIn: expireTime, // Pass the expireTime directly as a string
    };
    return jsonwebtoken_1.default.sign(payload, secret, options);
};
const verifyToken = (token, secret) => {
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.jwtHelpers = {
    createToken,
    createResetToken,
    verifyToken,
};
