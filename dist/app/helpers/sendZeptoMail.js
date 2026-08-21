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
exports.sendZeptoMail = sendZeptoMail;
const zeptomail_1 = require("zeptomail");
const config_1 = __importDefault(require("../../config"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
function sendZeptoMail(_a) {
    return __awaiter(this, arguments, void 0, function* ({ to, subject, htmlBody, fromName = "Toolinger Admin", fromEmail = "admin@toolinger.com", }) {
        var _b, _c;
        if (!((_b = config_1.default.zeptomail) === null || _b === void 0 ? void 0 : _b.token) || !((_c = config_1.default.zeptomail) === null || _c === void 0 ? void 0 : _c.url)) {
            throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "ZeptoMail configuration missing");
        }
        if (!to || to.length === 0) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Recipient list cannot be empty");
        }
        const client = new zeptomail_1.SendMailClient({
            url: config_1.default.zeptomail.url,
            token: config_1.default.zeptomail.token,
        });
        const recipients = to.map((r) => ({
            email_address: {
                address: r.email,
                name: r.name || "",
            },
        }));
        try {
            return yield client.sendMail({
                from: {
                    address: fromEmail, // MUST be verified in ZeptoMail
                    name: fromName,
                },
                to: recipients,
                subject,
                htmlbody: htmlBody,
            });
        }
        catch (error) {
            throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, (error === null || error === void 0 ? void 0 : error.message) || "ZeptoMail send failed");
        }
    });
}
