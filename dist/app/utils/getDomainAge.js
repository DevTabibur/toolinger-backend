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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDomainAge = void 0;
const getDomainAge = (domain) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const result = await whois(domain);
        // const creationDate = new Date(result?.creationDate || result.createdDate);
        // const now = new Date();
        // const ageInYears = (now.getTime() - creationDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
        // return Math.floor(ageInYears);
    }
    catch (error) {
        return 0; // if failed, assume new domain
    }
});
exports.getDomainAge = getDomainAge;
