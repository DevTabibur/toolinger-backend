// /* eslint-disable no-console */
// import cron from 'node-cron'
// // import CurrencyModel from '../modules/currency/currency.model'
// // import { CurrencyService } from '../modules/currency/currency.service'
// import ApiError from '../../errors/ApiError'
// import httpStatus from 'http-status'

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

import cron from "node-cron";

export const scheduleCornJobs = (
  callback: () => void,
  time: string,
  date: string,
) => {
  const [year, month, day] = date.split("-");
  const [hour, minute] = time.split(":");

  const cronExpression = `${minute} ${hour} ${day} ${month} *`;

  console.log(`Scheduling job with cron expression: ${cronExpression}`);

  cron.schedule(cronExpression, async () => {
    try {
      console.log("Scheduled task executed at", new Date().toISOString());
      callback(); // Execute the callback when the schedule matches
    } catch (error) {
      console.error("Error in scheduled task:", error);
    }
  });
};
