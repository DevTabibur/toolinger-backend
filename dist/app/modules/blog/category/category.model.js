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
const mongoose_1 = require("mongoose");
const category_interface_1 = require("./category.interface");
// Only include fields defined in ICategory interface
const CategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        // unique: true,
        maxlength: 100,
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
    parentId: {
        type: mongoose_1.Types.ObjectId,
        ref: "Category",
        default: null,
    },
    isSystem: {
        type: Boolean,
        default: false, // true for Uncategorized
    },
    createdBy: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        default: null,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true, // Automatically manages createdAt and updatedAt
});
CategorySchema.pre("findOneAndUpdate", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const update = this.getUpdate();
        const deletedAt = (update === null || update === void 0 ? void 0 : update.deletedAt) || ((_a = update === null || update === void 0 ? void 0 : update.$set) === null || _a === void 0 ? void 0 : _a.deletedAt);
        if (deletedAt) {
            const category = yield this.model.findOne(this.getQuery());
            if (category === null || category === void 0 ? void 0 : category.isSystem) {
                throw new Error("System category cannot be deleted");
            }
        }
        next();
    });
});
CategorySchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.parentId) {
            const parent = yield this.model("Category")
                .findById(this.parentId)
                .lean();
            if (parent === null || parent === void 0 ? void 0 : parent.parentId) {
                throw new Error("Only one level of sub-category allowed");
            }
        }
        next();
    });
});
// Create the model
const CategoryModel = (0, mongoose_1.model)("Category", CategorySchema);
exports.default = CategoryModel;
