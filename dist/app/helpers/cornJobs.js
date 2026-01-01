"use strict";
// /* eslint-disable no-console */
// import cron from 'node-cron'
// // import CurrencyModel from '../modules/currency/currency.model'
// // import { CurrencyService } from '../modules/currency/currency.service'
// import ApiError from '../../errors/ApiError'
// import httpStatus from 'http-status'
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
exports.scheduleCornJobs = void 0;
// export const scheduleCornJobs = () => {
//   cron.schedule('0 */1 * * *', async () => {
//     try {
//     } catch (error) {
//       console.log(
//         'Something went wrong while scheduling updating currency rates',
//         error
//       )
//     }
//   })
// }
const node_cron_1 = __importDefault(require("node-cron"));
const scheduleCornJobs = (callback, time, date) => {
    const [year, month, day] = date.split("-");
    const [hour, minute] = time.split(":");
    const cronExpression = `${minute} ${hour} ${day} ${month} *`;
    console.log(`Scheduling job with cron expression: ${cronExpression}`);
    node_cron_1.default.schedule(cronExpression, () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("Scheduled task executed at", new Date().toISOString());
            callback(); // Execute the callback when the schedule matches
        }
        catch (error) {
            console.error("Error in scheduled task:", error);
        }
    }));
};
exports.scheduleCornJobs = scheduleCornJobs;
