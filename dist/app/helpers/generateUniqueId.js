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
const generateUniqueID = (model, prefix, idField) => __awaiter(void 0, void 0, void 0, function* () {
    //! Find the last registered document in the collection by sorting by the ID field in descending order
    const lastDocument = yield model.findOne().sort({ [idField]: -1 });
    let nextIdNumber = 1;
    if (lastDocument) {
        //! Extract the numeric part from the last ID and increment it
        const lastIdNumber = parseInt(lastDocument[idField].split('-')[1], 10);
        nextIdNumber = lastIdNumber + 1;
    }
    //! Generate the new ID with the prefix and zero-padded number
    const nextId = `${prefix}-${String(nextIdNumber).padStart(5, '0')}`;
    return nextId;
});
exports.default = generateUniqueID;
