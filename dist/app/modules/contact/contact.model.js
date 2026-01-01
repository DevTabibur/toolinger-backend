"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const contactMailSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
const ContactMailModel = (0, mongoose_1.model)("ContactMail", contactMailSchema);
exports.default = ContactMailModel;
