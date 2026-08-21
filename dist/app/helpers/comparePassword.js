"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../modules/user/user.model"));
const comparePassword = (loginEmail, givenPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: loginEmail });
    console.log("user", user);
    const hashedPassword = user === null || user === void 0 ? void 0 : user.password;
    if (!user || !(user === null || user === void 0 ? void 0 : user.password)) {
        return false;
    }
    const isPasswordMatch = yield bcryptjs_1.default.compare(givenPassword, hashedPassword);
    console.log("isPasswordMatch", isPasswordMatch);
    return isPasswordMatch;
});
exports.comparePassword = comparePassword;
