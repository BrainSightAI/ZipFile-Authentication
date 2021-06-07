const express = require('express');
const router = express.Router();
const fs = require('fs')
const multer = require('multer')
const authenticate = require('../middleware/zipfunction/zip')
var dir = "zipyfy";
var subDirectory = "zipyfy/zip";
var subDirectory = "zipyfy/zip";
var sub2Directory = "zipyfy/unzip";

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    fs.mkdirSync(subDirectory)
    fs.mkdirSync(sub2Directory);
}

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "zipyfy/zip");
    },
    filename: function(req, file, cb) {
        cb(
            null,
            (file.originalname)
        );
    },
});
var compressfilesupload = multer({ storage: storage });

router.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/index.html")
})

router.post("/zip_authrozation", compressfilesupload.array("file", 100), authenticate, (req, res) => {
    var dirPath = process.cwd() + "/zipyfy/zip/" + req.files[0].originalname;
    var destPath = process.cwd() + "/zipyfy/unzip";
    fs.readdir(destPath, function(err, files) {
        files.forEach((file) => {
            fs.unlinkSync(destPath + "/" + file)
        });
        fs.unlinkSync(dirPath)
    })
});
module.exports = router;