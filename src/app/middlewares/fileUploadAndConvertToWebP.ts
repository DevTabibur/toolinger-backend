/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express'
import multer from 'multer'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

function deleteFileWithRetry(
  filePath: string,
  maxRetries: number,
  delay: number,
) {
  let retries = 0

  function attemptDeletion() {
    fs.unlink(filePath, error => {
      if (error) {
        if (error.code === 'EBUSY' && retries < maxRetries) {
          console.log(
            `File is busy or locked. Retrying deletion in ${delay}ms...`,
          )
          retries++
          setTimeout(attemptDeletion, delay)
        } else {
          console.error(`Failed to delete file: ${error.message}`)
        }
      } else {
        console.log(`File deleted successfully: ${filePath}`)
      }
    })
  }

  attemptDeletion()
}

const storage = multer.diskStorage({
  destination: './upload',
  filename: (
    req: Request,
    file: any,
    cb: (error: Error | null, filename: string) => void,
  ) => {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')
    const date = String(currentDate.getDate()).padStart(2, '0')
    const milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0')

    const uniqueSuffix = `${year}${month}${date}${milliseconds}`
    const extension = file.originalname.split('.').pop()
    // console.log('extension', extension);
    // console.log('uniqueSuffix', uniqueSuffix);

    // Check if the file extension is valid
    if (
      extension !== 'webp' &&
      extension !== 'jpg' &&
      extension !== 'jpeg' &&
      extension !== 'png'
    ) {
      const error = new Error(
        'Invalid file format. Only images webp, jpg, jpeg, png are allowed.',
      )
      cb(error, '')
    } else if (extension === 'webp') {
      cb(null, `${uniqueSuffix}-${file.originalname.replace(/\s/g, '-')}`)
    } else {
      cb(
        null,
        `${uniqueSuffix}-${file.originalname
          .split('.')[0]
          .replace(/\s/g, '')}.${extension}`,
      )
    }
  },
})

const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const maxSize = 10 * 1024 * 1024 // 10MB

  const upload = multer({
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
  ])

  upload(req, res, async error => {
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        error.message = 'File size exceeds the allowed limit of 10MB.'
      }
    }

    if (error) {
      next(error)
      return
    }

    const uploadedFiles = req.files as {
      [fieldname: string]: Express.Multer.File[]
    }

    // console.log('uploadedFiles', uploadedFiles)
    // console.log('uploadedFiles?.frontImage', uploadedFiles?.frontImage)
    // console.log('uploadedFiles?.backImage', uploadedFiles?.backImage)
    // console.log('uploadedFiles?.restImage1', uploadedFiles?.restImage1)

    // ! Convert frontImage to WebP
    if (uploadedFiles?.frontImage) {
      const frontImage = uploadedFiles?.frontImage[0]
      const frontImagePath = frontImage.path
      const frontImageExtension = path.extname(frontImagePath).toLowerCase()
      const blogCoverImageWebPPath = path.join(
        path.dirname(frontImagePath),
        `${path.basename(frontImagePath, frontImageExtension)}.webp`,
      )

      // Check if the blogCover is already in WebP format
      if (frontImageExtension === '.webp') {
        // Skip conversion, use the original WebP image
        fs.rename(frontImagePath, blogCoverImageWebPPath, error => {
          if (error) {
            console.error('Failed to rename the file:', error)
          }
        })
      } else {
        // Convert blogCover to WebP
        await sharp(frontImagePath)
          .toFormat('webp')
          .toFile(blogCoverImageWebPPath)

        // Remove original blogCover
        setTimeout(() => {
          deleteFileWithRetry(frontImagePath, 3, 3000)
        }, 5000)
      }
    }

    // ! Convert backImage to WebP
    if (uploadedFiles?.backImage) {
      const backImage = uploadedFiles?.backImage[0]
      const backImagePath = backImage.path
      const backImageExtension = path.extname(backImagePath).toLowerCase()
      const blogCoverImageWebPPath = path.join(
        path.dirname(backImagePath),
        `${path.basename(backImagePath, backImageExtension)}.webp`,
      )

      // Check if the blogCover is already in WebP format
      if (backImageExtension === '.webp') {
        // Skip conversion, use the original WebP image
        fs.rename(backImagePath, blogCoverImageWebPPath, error => {
          if (error) {
            console.error('Failed to rename the file:', error)
          }
        })
      } else {
        // Convert blogCover to WebP
        await sharp(backImagePath)
          .toFormat('webp')
          .toFile(blogCoverImageWebPPath)

        // Remove original blogCover
        setTimeout(() => {
          deleteFileWithRetry(backImagePath, 3, 3000)
        }, 5000)
      }
    }

    // ! Convert restImage1 to WebP
    if (uploadedFiles?.restImage1) {
      const restImage1 = uploadedFiles?.restImage1[0]
      const restImage1Path = restImage1.path
      const restImage1Extension = path.extname(restImage1Path).toLowerCase()
      const restImage1WebPPath = path.join(
        path.dirname(restImage1Path),
        `${path.basename(restImage1Path, restImage1Extension)}.webp`,
      )

      // Check if the blogCover is already in WebP format
      if (restImage1Extension === '.webp') {
        // Skip conversion, use the original WebP image
        fs.rename(restImage1Path, restImage1WebPPath, error => {
          if (error) {
            console.error('Failed to rename the file:', error)
          }
        })
      } else {
        // Convert restImage1 to WebP
        await sharp(restImage1Path).toFormat('webp').toFile(restImage1WebPPath)

        // Remove original blogCover
        setTimeout(() => {
          deleteFileWithRetry(restImage1Path, 3, 3000)
        }, 5000)
      }
    }

    // ! Convert restImage2 to WebP
    if (uploadedFiles?.restImage2) {
      const restImage2 = uploadedFiles?.restImage2[0]
      const restImage2Path = restImage2.path
      const restImage2Extension = path.extname(restImage2Path).toLowerCase()
      const restImage2WebPPath = path.join(
        path.dirname(restImage2Path),
        `${path.basename(restImage2Path, restImage2Extension)}.webp`,
      )

      // Check if the blogCover is already in WebP format
      if (restImage2Extension === '.webp') {
        // Skip conversion, use the original WebP image
        fs.rename(restImage2Path, restImage2WebPPath, error => {
          if (error) {
            console.error('Failed to rename the file:', error)
          }
        })
      } else {
        // Convert restImage1 to WebP
        await sharp(restImage2Path).toFormat('webp').toFile(restImage2WebPPath)

        // Remove original blogCover
        setTimeout(() => {
          deleteFileWithRetry(restImage2Path, 3, 3000)
        }, 5000)
      }
    }

    // ! Convert restImage3 to WebP
    if (uploadedFiles?.restImage3) {
      const restImage3 = uploadedFiles?.restImage3[0]
      const restImage3Path = restImage3.path
      const restImage3Extension = path.extname(restImage3Path).toLowerCase()
      const restImage3WebPPath = path.join(
        path.dirname(restImage3Path),
        `${path.basename(restImage3Path, restImage3Extension)}.webp`,
      )

      // Check if the blogCover is already in WebP format
      if (restImage3Extension === '.webp') {
        // Skip conversion, use the original WebP image
        fs.rename(restImage3Path, restImage3WebPPath, error => {
          if (error) {
            console.error('Failed to rename the file:', error)
          }
        })
      } else {
        // Convert restImage1 to WebP
        await sharp(restImage3Path).toFormat('webp').toFile(restImage3WebPPath)

        // Remove original blogCover
        setTimeout(() => {
          deleteFileWithRetry(restImage3Path, 3, 3000)
        }, 5000)
      }
    }

    // ! Convert restImage4 to WebP
    if (uploadedFiles?.restImage4) {
      const restImage4 = uploadedFiles?.restImage4[0]
      const restImage4Path = restImage4.path
      const restImage4Extension = path.extname(restImage4Path).toLowerCase()
      const restImage4WebPPath = path.join(
        path.dirname(restImage4Path),
        `${path.basename(restImage4Path, restImage4Extension)}.webp`,
      )

      // Check if the blogCover is already in WebP format
      if (restImage4Extension === '.webp') {
        // Skip conversion, use the original WebP image
        fs.rename(restImage4Path, restImage4WebPPath, error => {
          if (error) {
            console.error('Failed to rename the file:', error)
          }
        })
      } else {
        // Convert restImage1 to WebP
        await sharp(restImage4Path).toFormat('webp').toFile(restImage4WebPPath)

        // Remove original blogCover
        setTimeout(() => {
          deleteFileWithRetry(restImage4Path, 3, 3000)
        }, 5000)
      }
    }

    next()
  })
}

export default uploadMiddleware
