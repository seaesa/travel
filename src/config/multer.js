import multer from 'multer';

// config handle image file and save in memory
const storage = multer.memoryStorage();
const upload = multer({ storage })
export { upload }