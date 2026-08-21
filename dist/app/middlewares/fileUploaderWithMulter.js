"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const UPLOADS_FOLDER = './upload';
// Define the storage
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
        const fileExt = path_1.default.extname(file.originalname);
        const fileName = file.originalname
            .replace(fileExt, '')
            .toLowerCase()
            .split(' ')
            .join('-') +
            '-' +
            Date.now();
        cb(null, fileName + fileExt);
    },
});
// Upload middleware
const fileUploader = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 3000000, // 3mb
    },
    fileFilter: (req, file, cb) => {
        // console.log('fileFilter', file);
        if (file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg') {
            cb(null, true);
        }
        else {
            cb(new Error('Only .jpg, .png, .jpeg formats are allowed'));
        }
    },
});
module.exports = fileUploader;
