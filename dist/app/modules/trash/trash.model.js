"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TrashSchema = new mongoose_1.Schema({
    model: {
        type: String,
        required: true,
    },
    data: {
        type: mongoose_1.Schema.Types.Mixed,
        required: true,
    },
    deletedAt: {
        type: Date,
        required: true,
    },
    expireAt: {
        type: Date,
        required: true,
    },
}, { timestamps: true });
// Create TTL index on `expireAt` field to delete documents after 30 days
TrashSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
const TrashModel = (0, mongoose_1.model)("Trash", TrashSchema);
exports.default = TrashModel;
