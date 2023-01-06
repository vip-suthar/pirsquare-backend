require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 8000,
    DEST: process.env.DEST || "public/upload/",
    UPLOAD_FILES_LIST: process.env.UPLOAD_FILES_LIST || "list.txt"
}