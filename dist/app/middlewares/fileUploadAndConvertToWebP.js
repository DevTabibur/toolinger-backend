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
        fs_1.default.unlink(filePath, error => {
            if (error) {
                if (error.code === 'EBUSY' && retries < maxRetries) {
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
    destination: './upload',
    filename: (req, file, cb) => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const date = String(currentDate.getDate()).padStart(2, '0');
        const milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0');
        const uniqueSuffix = `${year}${month}${date}${milliseconds}`;
        const extension = file.originalname.split('.').pop();
        // console.log('extension', extension);
        // console.log('uniqueSuffix', uniqueSuffix);
        // Check if the file extension is valid
        if (extension !== 'webp' &&
            extension !== 'jpg' &&
            extension !== 'jpeg' &&
            extension !== 'png') {
            const error = new Error('Invalid file format. Only images webp, jpg, jpeg, png are allowed.');
            cb(error, '');
        }
        else if (extension === 'webp') {
            cb(null, `${uniqueSuffix}-${file.originalname.replace(/\s/g, '-')}`);
        }
        else {
            cb(null, `${uniqueSuffix}-${file.originalname
                .split('.')[0]
                .replace(/\s/g, '')}.${extension}`);
        }
    },
});
const uploadMiddleware = (req, res, next) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const upload = (0, multer_1.default)({
        storage,
        limits: {
            fileSize: maxSize,
        },
    }).fields([
        { name: 'frontImage', maxCount: 1 },
        { name: 'backImage', maxCount: 1 },
        { name: 'restImage1', maxCount: 1 },
        { name: 'restImage2', maxCount: 1 },
        { name: 'restImage3', maxCount: 1 },
        { name: 'restImage4', maxCount: 1 },
    ]);
    upload(req, res, (error) => __awaiter(void 0, void 0, void 0, function* () {
        if (error instanceof multer_1.default.MulterError) {
            if (error.code === 'LIMIT_FILE_SIZE') {
                error.message = 'File size exceeds the allowed limit of 10MB.';
            }
        }
        if (error) {
            next(error);
            return;
        }
        const uploadedFiles = req.files;
        // console.log('uploadedFiles', uploadedFiles)
        // console.log('uploadedFiles?.frontImage', uploadedFiles?.frontImage)
        // console.log('uploadedFiles?.backImage', uploadedFiles?.backImage)
        // console.log('uploadedFiles?.restImage1', uploadedFiles?.restImage1)
        // ! Convert frontImage to WebP
        if (uploadedFiles === null || uploadedFiles === void 0 ? void 0 : uploadedFiles.frontImage) {
            const frontImage = uploadedFiles === null || uploadedFiles === void 0 ? void 0 : uploadedFiles.frontImage[0];
            const frontImagePath = frontImage.path;
            const frontImageExtension = path_1.default.extname(frontImagePath).toLowerCase();
            const blogCoverImageWebPPath = path_1.default.join(path_1.default.dirname(frontImagePath), `${path_1.default.basename(frontImagePath, frontImageExtension)}.webp`);
            // Check if the blogCover is already in WebP format
            if (frontImageExtension === '.webp') {
                // Skip conversion, use the original WebP image
                fs_1.default.rename(frontImagePath, blogCoverImageWebPPath, error => {
                    if (error) {
                        console.error('Failed to rename the file:', error);
                    }
                });
            }
            else {
                // Convert blogCover to WebP
                yield (0, sharp_1.default)(frontImagePath)
                    .toFormat('webp')
                    .toFile(blogCoverImageWebPPath);
                // Remove original blogCover
                setTimeout(() => {
                    deleteFileWithRetry(frontImagePath, 3, 3000);
                }, 5000);
            }
        }
        // ! Convert backImage to WebP
        if (uploadedFiles === null || uploadedFiles === void 0 ? void 0 : uploadedFiles.backImage) {
            const backImage = uploadedFiles === null || uploadedFiles === void 0 ? void 0 : uploadedFiles.backImage[0];
            const backImagePath = backImage.path;
            const backImageExtension = path_1.default.extname(backImagePath).toLowerCase();
            const blogCoverImageWebPPath = path_1.default.join(path_1.default.dirname(backImagePath), `${path_1.default.basename(backImagePath, backImageExtension)}.webp`);
            // Check if the blogCover is already in WebP format
            if (backImageExtension === '.webp') {
                // Skip conversion, use the original WebP image
                fs_1.default.rename(backImagePath, blogCoverImageWebPPath, error => {
                    if (error) {
                        console.error('Failed to rename the file:', error);
                    }
                });
            }
            else {
                // Convert blogCover to WebP
                yield (0, sharp_1.default)(backImagePath)
                    .toFormat('webp')
                    .toFile(blogCoverImageWebPPath);
                // Remove original blogCover
                setTimeout(() => {
                    deleteFileWithRetry(backImagePath, 3, 3000);
                }, 5000);
            }
        }
        // ! Convert restImage1 to WebP
        if (uploadedFiles === null || uploadedFiles === void 0 ? void 0 : uploadedFiles.restImage1) {
            const restImage1 = uploadedFiles === null || uploadedFiles === void 0 ? void 0 : uploadedFiles.restImage1[0];
            const restImage1Path = restImage1.path;
            const restImage1Extension = path_1.default.extname(restImage1Path).toLowerCase();
            const restImage1WebPPath = path_1.default.join(path_1.default.dirname(restImage1Path), `${path_1.default.basename(restImage1Path, restImage1Extension)}.webp`);
            // Check if the blogCover is already in WebP format
            if (restImage1Extension === '.webp') {
                // Skip conversion, use the original WebP image
                fs_1.default.rename(restImage1Path, restImage1WebPPath, error => {
                    if (error) {
                        console.error('Failed to rename the file:', error);
                    }
                });
            }
            else {
                // Convert restImage1 to WebP
                yield (0, sharp_1.default)(restImage1Path).toFormat('webp').toFile(restImage1WebPPath);
                // Remove original blogCover
                setTimeout(() => {
                    deleteFileWithRetry(restImage1Path, 3, 3000);
                }, 5000);
            }
        }
        // ! Convert restImage2 to WebP
        if (uploadedFiles === null || uploadedFiles === void 0 ? void 0 : uploadedFiles.restImage2) {
            const restImage2 = uploadedFiles === null || uploadedFiles === void 0 ? void 0 : uploadedFiles.restImage2[0];
            const restImage2Path = restImage2.path;
            const restImage2Extension = path_1.default.extname(restImage2Path).toLowerCase();
            const restImage2WebPPath = path_1.default.join(path_1.default.dirname(restImage2Path), `${path_1.default.basename(restImage2Path, restImage2Extension)}.webp`);
            // Check if the blogCover is already in WebP format
            if (restImage2Extension === '.webp') {
                // Skip conversion, use the original WebP image
                fs_1.default.rename(restImage2Path, restImage2WebPPath, error => {
                    if (error) {
                        console.error('Failed to rename the file:', error);
                    }
                });
            }
            else {
                // Convert restImage1 to WebP
                yield (0, sharp_1.default)(restImage2Path).toFormat('webp').toFile(restImage2WebPPath);
                // Remove original blogCover
                setTimeout(() => {
                    deleteFileWithRetry(restImage2Path, 3, 3000);
                }, 5000);
            }
        }
        // ! Convert restImage3 to WebP
        if (uploadedFiles === null || uploadedFiles === void 0 ? void 0 : uploadedFiles.restImage3) {
            const restImage3 = uploadedFiles === null || uploadedFiles === void 0 ? void 0 : uploadedFiles.restImage3[0];
            const restImage3Path = restImage3.path;
            const restImage3Extension = path_1.default.extname(restImage3Path).toLowerCase();
            const restImage3WebPPath = path_1.default.join(path_1.default.dirname(restImage3Path), `${path_1.default.basename(restImage3Path, restImage3Extension)}.webp`);
            // Check if the blogCover is already in WebP format
            if (restImage3Extension === '.webp') {
                // Skip conversion, use the original WebP image
                fs_1.default.rename(restImage3Path, restImage3WebPPath, error => {
                    if (error) {
                        console.error('Failed to rename the file:', error);
                    }
                });
            }
            else {
                // Convert restImage1 to WebP
                yield (0, sharp_1.default)(restImage3Path).toFormat('webp').toFile(restImage3WebPPath);
                // Remove original blogCover
                setTimeout(() => {
                    deleteFileWithRetry(restImage3Path, 3, 3000);
                }, 5000);
            }
        }
        // ! Convert restImage4 to WebP
        if (uploadedFiles === null || uploadedFiles === void 0 ? void 0 : uploadedFiles.restImage4) {
            const restImage4 = uploadedFiles === null || uploadedFiles === void 0 ? void 0 : uploadedFiles.restImage4[0];
            const restImage4Path = restImage4.path;
            const restImage4Extension = path_1.default.extname(restImage4Path).toLowerCase();
            const restImage4WebPPath = path_1.default.join(path_1.default.dirname(restImage4Path), `${path_1.default.basename(restImage4Path, restImage4Extension)}.webp`);
            // Check if the blogCover is already in WebP format
            if (restImage4Extension === '.webp') {
                // Skip conversion, use the original WebP image
                fs_1.default.rename(restImage4Path, restImage4WebPPath, error => {
                    if (error) {
                        console.error('Failed to rename the file:', error);
                    }
                });
            }
            else {
                // Convert restImage1 to WebP
                yield (0, sharp_1.default)(restImage4Path).toFormat('webp').toFile(restImage4WebPPath);
                // Remove original blogCover
                setTimeout(() => {
                    deleteFileWithRetry(restImage4Path, 3, 3000);
                }, 5000);
            }
        }
        next();
    }));
};
exports.default = uploadMiddleware;
