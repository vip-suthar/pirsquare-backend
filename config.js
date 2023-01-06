require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 8000,
    MONGO_CONNECTION_URL: process.env.MONGO_CONNECTION_URL || "mongodb://localhost:27017",
    DEST: process.env.DEST || "public/upload/",
    UPLOAD_FILES_LIST: process.env.UPLOAD_FILES_LIST || "list.txt"
}