"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    manufacture: {
        type: String,
        required: true,
    },
    carModel: {
        type: String,
    },
    year: {
        type: String
    },
    skills: {
        type: String,
    },
    experience: {
        type: String,
    },
}, {
    timestamps: true,
});
const CategoryModel = (0, mongoose_1.model)('Category', categorySchema);
exports.default = CategoryModel;
