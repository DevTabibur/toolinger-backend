/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";

function deleteFileWithRetry(
  filePath: string,
  maxRetries: number,
  delay: number,
) {
  let retries = 0;

  function attemptDeletion() {
    fs.unlink(filePath, (error) => {
      if (error) {
        if (error.code === "EBUSY" && retries < maxRetries) {
          console.log(
            `File is busy or locked. Retrying deletion in ${delay}ms...`,
          );
          retries++;
          setTimeout(attemptDeletion, delay);
        } else {
          console.error(`Failed to delete file: ${error.message}`);
        }
      } else {
        console.log(`File deleted successfully: ${filePath}`);
      }
    });
  }

  attemptDeletion();
}

const storage = multer.diskStorage({
  destination: "./upload",
  filename: (
    req: Request,
    file: any,
    cb: (error: Error | null, filename: string) => void,
  ) => {
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
    if (
      extension !== "webp" &&
      extension !== "jpg" &&
      extension !== "jpeg" &&
      extension !== "png"
    ) {
      const error = new Error(
        "Invalid file format. Only images webp, jpg, jpeg, png are allowed.",
      );
      cb(error, "");
    } else if (extension === "webp") {
      cb(null, `${uniqueSuffix}-${file.originalname.replace(/\s/g, "-")}`);
    } else {
      cb(
        null,
        `${uniqueSuffix}-${file.originalname
          .split(".")[0]
          .replace(/\s/g, "")}.${extension}`,
      );
    }
  },
});

const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const maxSize = 100 * 1024 * 1024; // 100MB

  const upload = multer({
    storage,
    limits: {
      fileSize: maxSize,
    },
  }).fields([
    { name: "blogFeaturedImage", maxCount: 1 }, // for blog
    { name: "galleryImages", maxCount: 5 }, // for blog
    { name: "seoImage", maxCount: 1 }, // for blog
    { name: "ogImageUrl", maxCount: 1 },
    { name: "twitterImageUrl", maxCount: 1 },
    { name: "avatar", maxCount: 1 }, // profile
  ]);

  upload(req, res, async (error) => {
    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        error.message = "File size exceeds the allowed limit of 10MB.";
      }
    }

    if (error) {
      next(error);
      return;
    }

    const uploadedFiles = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    // console.log('uploadedFiles', uploadedFiles)
    // console.log('uploadedFiles?.frontImage', uploadedFiles?.frontImage)
    // ! blogFeaturedImage  to WebP
    if (uploadedFiles?.blogFeaturedImage) {
      const blogFeaturedImage = uploadedFiles?.blogFeaturedImage[0];
      const blogFeaturedImagePath = blogFeaturedImage.path;
      const blogFeaturedImageExtension = path
        .extname(blogFeaturedImagePath)
        .toLowerCase();
      const restImage4WebPPath = path.join(
        path.dirname(blogFeaturedImagePath),
        `${path.basename(blogFeaturedImagePath, blogFeaturedImageExtension)}.webp`,
      );

      // Check if the blogCover is already in WebP format
      if (blogFeaturedImageExtension === ".webp") {
        // Skip conversion, use the original WebP image
        fs.rename(blogFeaturedImagePath, restImage4WebPPath, (error) => {
          if (error) {
            console.error("Failed to rename the file:", error);
          }
        });
      } else {
        // Convert restImage1 to WebP
        await sharp(blogFeaturedImagePath)
          .toFormat("webp")
          .toFile(restImage4WebPPath);

        // Remove original blogCover
        setTimeout(() => {
          deleteFileWithRetry(blogFeaturedImagePath, 3, 3000);
        }, 5000);
      }
    }

    // avatar
    if (uploadedFiles?.avatar) {
      const avatar = uploadedFiles?.avatar[0];
      const avatarPath = avatar.path;
      const avatarExtension = path.extname(avatarPath).toLowerCase();
      const restImage4WebPPath = path.join(
        path.dirname(avatarPath),
        `${path.basename(avatarPath, avatarExtension)}.webp`,
      );

      const webpPath = avatarPath.replace(avatarExtension, ".webp");

      // Check if the blogCover is already in WebP format
      if (avatarExtension === ".webp") {
        // Skip conversion, use the original WebP image
        fs.rename(avatarPath, restImage4WebPPath, (error) => {
          if (error) {
            console.error("Failed to rename the file:", error);
          }
        });
      } else {
        // Convert restImage1 to WebP
        await sharp(avatarPath).toFormat("webp").toFile(restImage4WebPPath);

        // Remove original blogCover
        setTimeout(() => {
          deleteFileWithRetry(avatarPath, 3, 3000);
        }, 5000);
      }
      // 🔥 MOST IMPORTANT PART
      avatar.filename = path.basename(webpPath);
      avatar.path = webpPath;
    }

    // seoImage to WebP
    if (uploadedFiles?.seoImage) {
      const seoImage = uploadedFiles?.seoImage[0];
      const seoImagePath = seoImage.path;
      const seoImageExtension = path.extname(seoImagePath).toLowerCase();
      const restImage4WebPPath = path.join(
        path.dirname(seoImagePath),
        `${path.basename(seoImagePath, seoImageExtension)}.webp`,
      );

      // Check if the blogCover is already in WebP format
      if (seoImageExtension === ".webp") {
        // Skip conversion, use the original WebP image
        fs.rename(seoImagePath, restImage4WebPPath, (error) => {
          if (error) {
            console.error("Failed to rename the file:", error);
          }
        });
      } else {
        // Convert restImage1 to WebP
        await sharp(seoImagePath).toFormat("webp").toFile(restImage4WebPPath);

        // Remove original blogCover
        setTimeout(() => {
          deleteFileWithRetry(seoImagePath, 3, 3000);
        }, 5000);
      }
    }

    // ! galleryImages  to WebP
    // if (uploadedFiles?.galleryImages) {
    //   const galleryImages = uploadedFiles?.galleryImages[0];
    //   const blogFeaturedImagePath = blogFeaturedImage.path;
    //   const blogFeaturedImageExtension = path
    //     .extname(blogFeaturedImagePath)
    //     .toLowerCase();
    //   const restImage4WebPPath = path.join(
    //     path.dirname(blogFeaturedImagePath),
    //     `${path.basename(blogFeaturedImagePath, blogFeaturedImageExtension)}.webp`,
    //   );

    //   // Check if the blogCover is already in WebP format
    //   if (blogFeaturedImageExtension === ".webp") {
    //     // Skip conversion, use the original WebP image
    //     fs.rename(blogFeaturedImagePath, restImage4WebPPath, (error) => {
    //       if (error) {
    //         console.error("Failed to rename the file:", error);
    //       }
    //     });
    //   } else {
    //     // Convert restImage1 to WebP
    //     await sharp(blogFeaturedImagePath)
    //       .toFormat("webp")
    //       .toFile(restImage4WebPPath);

    //     // Remove original blogCover
    //     setTimeout(() => {
    //       deleteFileWithRetry(blogFeaturedImagePath, 3, 3000);
    //     }, 5000);
    //   }
    // }

    // ! ogImage  to WebP
    if (uploadedFiles?.ogImageUrl) {
      const ogImageUrl = uploadedFiles?.ogImageUrl[0];
      const ogImageUrlPath = ogImageUrl.path;
      const ogImageUrlExtension = path.extname(ogImageUrlPath).toLowerCase();
      const restImage4WebPPath = path.join(
        path.dirname(ogImageUrlPath),
        `${path.basename(ogImageUrlPath, ogImageUrlExtension)}.webp`,
      );

      // Check if the blogCover is already in WebP format
      if (ogImageUrlExtension === ".webp") {
        // Skip conversion, use the original WebP image
        fs.rename(ogImageUrlPath, restImage4WebPPath, (error) => {
          if (error) {
            console.error("Failed to rename the file:", error);
          }
        });
      } else {
        // Convert restImage1 to WebP
        await sharp(ogImageUrlPath).toFormat("webp").toFile(restImage4WebPPath);

        // Remove original blogCover
        setTimeout(() => {
          deleteFileWithRetry(ogImageUrlPath, 3, 3000);
        }, 5000);
      }
    }

    // ! twitterImageUrl  to WebP
    if (uploadedFiles?.twitterImageUrl) {
      const twitterImageUrl = uploadedFiles?.twitterImageUrl[0];
      const twitterImageUrlPath = twitterImageUrl.path;
      const twitterImageUrlExtension = path
        .extname(twitterImageUrlPath)
        .toLowerCase();
      const restImage4WebPPath = path.join(
        path.dirname(twitterImageUrlPath),
        `${path.basename(twitterImageUrlPath, twitterImageUrlExtension)}.webp`,
      );

      // Check if the blogCover is already in WebP format
      if (twitterImageUrlExtension === ".webp") {
        // Skip conversion, use the original WebP image
        fs.rename(twitterImageUrlPath, restImage4WebPPath, (error) => {
          if (error) {
            console.error("Failed to rename the file:", error);
          }
        });
      } else {
        // Convert restImage1 to WebP
        await sharp(twitterImageUrlPath)
          .toFormat("webp")
          .toFile(restImage4WebPPath);

        // Remove original blogCover
        setTimeout(() => {
          deleteFileWithRetry(twitterImageUrlPath, 3, 3000);
        }, 5000);
      }
    }

    next();
  });
};

export default uploadMiddleware;
