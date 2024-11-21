import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'food-images', // Folder name in Cloudinary
        allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed image formats
    },
});

// Create multer instance
const upload = multer({ storage });

export default upload;
