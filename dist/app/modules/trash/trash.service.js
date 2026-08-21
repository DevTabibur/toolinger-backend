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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrashService = exports.getAllTrashItems = void 0;
const mongoose_1 = require("mongoose");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const trash_model_1 = __importDefault(require("./trash.model"));
const blog_model_1 = __importDefault(require("../blog/blog.model"));
// Get All Trash Items
const getAllTrashItems = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield trash_model_1.default.find();
});
exports.getAllTrashItems = getAllTrashItems;
// Get Trash Item by ID
const getTrashItemById = (trashId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(trashId)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Trash is invalid");
    }
    const result = yield trash_model_1.default.findOne({ _id: trashId });
    return result;
});
// DELETE Trash Item by ID
const deleteTrashItem = (trashId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(trashId)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Trash is invalid");
    }
    const result = yield trash_model_1.default.findByIdAndDelete({ _id: trashId });
    return result;
});
// ALL Trash DELETED
const deleteAllTrashItems = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield trash_model_1.default.deleteMany({});
});
// RESTORE Items from Trash
const restoreItemFromTrash = (model, trashId) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the deleted item in Trash based on model and itemId
    // console.log('model', model)
    // console.log('trashId', trashId)
    const trashItem = yield trash_model_1.default.findOne({
        _id: trashId,
        model,
    });
    // console.log('trashItem', trashItem)
    if (!trashItem) {
        throw new ApiError_1.default(http_status_1.default.BAD_GATEWAY, "Item not found in trash");
    }
    let restoredItem;
    // Dynamically restore the item based on the model type
    switch (model) {
        case "BlogPost":
            restoredItem = new blog_model_1.default(trashItem.data);
            yield restoredItem.save();
            break;
        // case "profile":
        //   restoredItem = new ProfileModel(trashItem.data);
        //   await restoredItem.save();
        //   break;
        default:
            throw new ApiError_1.default(http_status_1.default.BAD_GATEWAY, "Invalid model type");
    }
    // Remove the item from the Trash collection after restoring
    yield trash_model_1.default.deleteOne({ _id: trashId, model });
    return restoredItem;
});
exports.TrashService = {
    getAllTrashItems: exports.getAllTrashItems,
    getTrashItemById,
    deleteTrashItem,
    deleteAllTrashItems,
    restoreItemFromTrash,
};
