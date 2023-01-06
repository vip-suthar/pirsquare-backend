const express = require('express');
const path = require('path');
const config  = require('./config');

const createStorageRoute = require('./src/createStorageRoute');
const uploadRoute = require('./src/uploadRoute');
const downloadRoute = require('./src/downloadRoute');
const uploadFilesListRoute = require('./src/uploadFilesListRoute');
const operationsRoute = require('./src/operationsRoute');

 
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use("/create_new_storage", createStorageRoute);
app.use("/upload_file", uploadRoute);
app.use("/download_file", downloadRoute);
app.use("/my_upload_file", uploadFilesListRoute);
app.use("/", operationsRoute);

app.listen(config.PORT, ()=> {
    console.log(`listening on port ${config.PORT}`);
})