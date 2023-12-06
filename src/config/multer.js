import multer from 'multer';

// config handle image file and save in memory
const storage = multer.memoryStorage();
export const upload = multer({ storage })