"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const category_interface_1 = require("./category.interface");
// Only include fields defined in ICategory interface
const CategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    slug: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: Object.values(category_interface_1.CategoryStatus),
        required: true,
        default: category_interface_1.CategoryStatus.ACTIVE,
    },
}, {
    timestamps: true, // Automatically manages createdAt and updatedAt
});
// Create the model
const CategoryModel = (0, mongoose_1.model)("Category", CategorySchema);
exports.default = CategoryModel;
