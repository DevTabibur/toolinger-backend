import { model, Schema } from "mongoose";
import { IContactMail } from "./contact.interface";

const contactMailSchema = new Schema<IContactMail>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}/, // Basic email validation
    },
    subject: {
      type: String,
      required: false, // Subject is optional
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const ContactMailModel = model<IContactMail>("ContactMail", contactMailSchema);

export default ContactMailModel;
