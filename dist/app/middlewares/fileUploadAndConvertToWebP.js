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
const multer_1 = __importDefault(require("multer"));
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function deleteFileWithRetry(filePath, maxRetries, delay) {
    let retries = 0;
    function attemptDeletion() {
        fs_1.default.unlink(filePath, (error) => {
            if (error) {
                if (error.code === "EBUSY" && retries < maxRetries) {
                    console.log(`File is busy or locked. Retrying deletion in ${delay}ms...`);
                    retries++;
                    setTimeout(attemptDeletion, delay);
                }
                else {
                    console.error(`Failed to delete file: ${error.message}`);
                }
            }
            else {
                console.log(`File deleted successfully: ${filePath}`);
            }
        });
    }
    attemptDeletion();
}
const storage = multer_1.default.diskStorage({
    destination: "./upload",
    filename: (req, file, cb) => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const date = String(currentDate.getDate()).padStart(2, "0");
        const milliseconds = String(currentDate.getMilliseconds()).padStart(3, "0");
        const uniqueSuffix = `${year}${month}${date}${milliseconds}`;
        const extension = file.originalname.split(".").pop();
        // console.log('extension', extension);
        // console.log('uniqueSuffix', uniqueSuffix);
        // Check if the file extension is valid
        if (extension !== "webp" &&
            extension !== "jpg" &&
            extension !== "jpeg" &&
            extension !== "png") {
            const error = new Error("Invalid file format. Only images webp, jpg, jpeg, png are allowed.");
            cb(error, "");
        }
        else if (extension === "webp") {
            cb(null, `${uniqueSuffix}-${file.originalname.replace(/\s/g, "-")}`);
        }
        else {
            cb(null, `${uniqueSuffix}-${file.originalname
                .split(".")[0]
                .replace(/\s/g, "")}.${extension}`);
        }
    },
});
const uploadMiddleware = (req, res, next) => {
    const maxSize = 100 * 1024 * 1024; // 100MB
    const upload = (0, multer_1.default)({
        storage,
        limits: {
            fileSize: maxSize,
        },
    }).fields([
        { name: "blogFeaturedImage", maxCount: 1 },
        { name: "ogImage", maxCount: 1 },
    ]);
    upload(req, res, (error) => __awaiter(void 0, void 0, void 0, function* () {
        if (error instanceof multer_1.default.MulterError) {
            if (error.code === "LIMIT_FILE_SIZE") {
                error.message = "File size exceeds the allowed limit of 10MB.";
            }
        }
        if (error) {
            next(error);
            return;
        }
        const uploadedFiles = req.files;
        // console.log('uploadedFiles', uploadedFiles)
        // console.log('uploadedFiles?.frontImage', uploadedFiles?.frontImage)
        // ! blogFeaturedImage  to WebP
        if (uploadedFiles === null || uploadedFiles === void 0 ? void 0 : uploadedFiles.blogFeaturedImage) {
            const blogFeaturedImage = uploadedFiles === null || uploadedFiles === void 0 ? void 0 : uploadedFiles.blogFeaturedImage[0];
            const blogFeaturedImagePath = blogFeaturedImage.path;
            const blogFeaturedImageExtension = path_1.default
                .extname(blogFeaturedImagePath)
                .toLowerCase();
            const restImage4WebPPath = path_1.default.join(path_1.default.dirname(blogFeaturedImagePath), `${path_1.default.basename(blogFeaturedImagePath, blogFeaturedImageExtension)}.webp`);
            // Check if the blogCover is already in WebP format
            if (blogFeaturedImageExtension === ".webp") {
                // Skip conversion, use the original WebP image
                fs_1.default.rename(blogFeaturedImagePath, restImage4WebPPath, (error) => {
                    if (error) {
                        console.error("Failed to rename the file:", error);
                    }
                });
            }
            else {
                // Convert restImage1 to WebP
                yield (0, sharp_1.default)(blogFeaturedImagePath)
                    .toFormat("webp")
                    .toFile(restImage4WebPPath);
                // Remove original blogCover
                setTimeout(() => {
                    deleteFileWithRetry(blogFeaturedImagePath, 3, 3000);
                }, 5000);
            }
        }
        // ! ogImage  to WebP
        if (uploadedFiles === null || uploadedFiles === void 0 ? void 0 : uploadedFiles.ogImage) {
            const ogImage = uploadedFiles === null || uploadedFiles === void 0 ? void 0 : uploadedFiles.ogImage[0];
            const ogImagePath = ogImage.path;
            const ogImageExtension = path_1.default.extname(ogImagePath).toLowerCase();
            const restImage4WebPPath = path_1.default.join(path_1.default.dirname(ogImagePath), `${path_1.default.basename(ogImagePath, ogImageExtension)}.webp`);
            // Check if the blogCover is already in WebP format
            if (ogImageExtension === ".webp") {
                // Skip conversion, use the original WebP image
                fs_1.default.rename(ogImagePath, restImage4WebPPath, (error) => {
                    if (error) {
                        console.error("Failed to rename the file:", error);
                    }
                });
            }
            else {
                // Convert restImage1 to WebP
                yield (0, sharp_1.default)(ogImagePath).toFormat("webp").toFile(restImage4WebPPath);
                // Remove original blogCover
                setTimeout(() => {
                    deleteFileWithRetry(ogImagePath, 3, 3000);
                }, 5000);
            }
        }
        next();
    }));
};
exports.default = uploadMiddleware;
