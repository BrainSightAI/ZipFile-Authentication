const express = require('express');
const router = express.Router();
const fs = require('fs')
const multer = require('multer')
const authenticate = require('../middleware/zipfunction/zip')
var dir = "zipyfy";
var dicomdir = "diacomfolder"
var subDirectory = "zipyfy/zip";
var subDirectory = "zipyfy/zip";
var sub2Directory = "zipyfy/unzip";

if (fs.existsSync(dir)) {
    fs.rmdirSync(dir, { recursive: true });
}

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    fs.mkdirSync(subDirectory);
    fs.mkdirSync(sub2Directory);
}
if (!fs.existsSync(dicomdir)) {
    fs.mkdirSync(dicomdir);
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

    // fs.unlink(process.cwd() + "/" + "zipyfy/zip" + "/" + req.files[0].originalname)
    // fs.rmdir(process.cwd() + "/" + "zipyfy/zip")
});
module.exports = router;