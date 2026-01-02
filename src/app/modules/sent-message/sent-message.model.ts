import { Model, Schema, model } from "mongoose";
import { ISentMessage } from "./sent-message.interface";

type SentMessageModel = Model<ISentMessage>;

const sentMessageSchema = new Schema<ISentMessage>(
  {
    recipientEmail: {
      type: String,
      required: true,
    },
    recipientName: {
      type: String,
    },
    subject: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["sent", "failed"],
      default: "sent",
    },
    errorMessage: {
      type: String,
    },
    sentAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const SentMessageModel = model<ISentMessage, SentMessageModel>(
  "SentMessage",
  sentMessageSchema,
);

export default SentMessageModel;
