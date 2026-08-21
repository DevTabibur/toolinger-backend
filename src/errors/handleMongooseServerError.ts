import httpStatus from "http-status";
import { MongoServerError } from "mongodb";
import {
  IGenericErrorMessage,
  IGenericErrorResponse,
} from "../interfaces/errorInterface";

const handleMongoServerError = (
  error: MongoServerError,
): IGenericErrorResponse => {
  //! keyPattern only exists on duplicate-key errors (code 11000); other
  //! MongoServerErrors (invalid namespace, auth, etc.) have no keyPattern.
  const firstKey = error.keyPattern ? Object.keys(error.keyPattern)[0] : "";
  const errors: IGenericErrorMessage[] = [
    {
      path: firstKey,
      message: error.message,
    },
  ];
  const statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  return {
    status: "false",
    statusCode,
    message: error.message,
    errorMessages: errors,
  };
};

export default handleMongoServerError;
