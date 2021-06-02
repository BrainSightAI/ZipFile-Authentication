const express = require('express');
const router = express.Router();
const fs = require('fs')
const multer = require('multer')
const authenticate = require('../middleware/authenticate')
    // const MulterAzureStorage = require('multer-azure-blob-storage').MulterAzureStorage;

const { ShareServiceClient, StorageSharedKeyCredential } = require("@azure/storage-file-share");
// Enter your storage account name and shared key
const account = "zipfilestorages";
const accountKey = "etf5UNKhZK/XBoXxvo4tGAKE3hRoqAuABQaOawjOvEYrhnyl/rVZ9tTEkpDMfAl1OrunymaPC5iz/XujMU1lig==";

// Use StorageSharedKeyCredential with storage account and account key
// StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
const credential = new StorageSharedKeyCredential(account, accountKey);
const serviceClient = new ShareServiceClient(
    // When using AnonymousCredential, following url should include a valid SAS
    `https://${account}.file.core.windows.net`,
    credential
);

async function main() {
    let shareIter = serviceClient.listShares();
    let i = 1;
    for await (const share of shareIter) {
        console.log(`Share${i}: ${share.name}`);
        i++;
    }
}

main();


var dir = "public";
var subDirectory = "public/compressed";
var subDirectory = "public/compressed";
var sub2Directory = "public/unzip";

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    fs.mkdirSync(subDirectory)
    fs.mkdirSync(sub2Directory);
}

var storage = multer.diskStorage({
    destination: function(req, file, cb) {

        cb(null, "public/compressed");
    },
    filename: function(req, file, cb) {
        cb(
            null,
            (file.originalname)
        );
    },
});
var compressfilesupload = multer({ storage: storage });


// const yourCustomLogic = (req, file) => {
//     return Date.now().toString() + "." + file.originalname.toLowerCase().split(" ").join("-")
// }

// const resolveBlobName = (req, file) => {
//     return new Promise((resolve, reject) => {
//         const blobName = yourCustomLogic(req, file);
//         resolve(blobName);
//     });
// };

// const azureStorage = new MulterAzureStorage({
//     connectionString: 'DefaultEndpointsProtocol=https;AccountName=vuestorage1;AccountKey=w8hTY+1EWs9ox+NhL2JrM9cl6P129UqVNKmfaRubgveU06VlaIVODdhn1157QyO2nDoeM6stfDcG9UuBGWhGaQ==;EndpointSuffix=core.windows.net',
//     accessKey: 'w8hTY+1EWs9ox+NhL2JrM9cl6P129UqVNKmfaRubgveU06VlaIVODdhn1157QyO2nDoeM6stfDcG9UuBGWhGaQ==',
//     accountName: 'vuestorage1',
//     containerName: 'vue-js-mri',
//     blobName: resolveBlobName,
//     containerAccessLevel: 'blob',
//     urlExpirationTime: 60
// });

// const upload = multer({
//     storage: azureStorage
// });

router.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/index.html")
})

router.post("/zip_authrozation", compressfilesupload.array("file", 100), authenticate, (req, res) => {
    var dirPath = process.cwd() + "/public/compressed/" + req.files[0].originalname;
    var destPath = process.cwd() + "/public/unzip";
    fs.readdir(destPath, function(err, files) {
        files.forEach((file) => {
            fs.unlinkSync(destPath + "/" + file)
        });
        fs.unlinkSync(dirPath)
    })
});
module.exports = router;