import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';

dotenv.config();

let upload;

try {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  const storage = new GridFsStorage({
    url: process.env.MONGODB_URI,
    options: { useNewUrlParser: true },
    file: (request, file) => {
      const match = ["image/png", "image/jpeg"];

      if (match.indexOf(file.mimetype) === -1) {
        return `${Date.now()}-blog-${file.originalname}`;
      }

      return {
        bucketName: "photos",
        filename: `${Date.now()}-blog-${file.originalname}`
      }
    }
  });

  upload = multer({ storage });
} catch (error) {
  console.error('Error initializing multer storage:', error);
  process.exit(1);
}

export default upload;