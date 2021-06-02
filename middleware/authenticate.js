const express = require("express");
const fs = require("fs");
const admzip = require("adm-zip");
const path = require("path");
const decompress = require("decompress");
const app = express();

// const MulterAzureStorage = require('multer-azure-blob-storage').MulterAzureStorage;

const {
    ShareServiceClient,
    StorageSharedKeyCredential,
} = require("@azure/storage-file-share");
// Enter your storage account name and shared key
const account = "zipfilestorages";
const accountKey =
    "etf5UNKhZK/XBoXxvo4tGAKE3hRoqAuABQaOawjOvEYrhnyl/rVZ9tTEkpDMfAl1OrunymaPC5iz/XujMU1lig==";

// Use StorageSharedKeyCredential with storage account and account key
// StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
const credential = new StorageSharedKeyCredential(account, accountKey);
const serviceClient = new ShareServiceClient(
    // When using AnonymousCredential, following url should include a valid SAS
    `https://${account}.file.core.windows.net`,
    credential
);

function authenticate(req, res, next) {
    var dirPath =
        process.cwd() + "/public/compressed/" + req.files[0].originalname;
    var destPath = process.cwd() + "/public/unzip";

    //unzipping the file
    (async() => {
        try {
            const files = await decompress(dirPath, destPath);
            console.log("unziping is done");
        } catch (error) {
            console.log(error);
        }
        readFile(destPath);
    })();

    //authorization is process
    function readFile(destPath) {
        fs.readdir(destPath, function(err, files) {
            for (i = 0; i < files.length; i++) {
                var ext = path.extname(destPath + files);
                if (ext === ".json") {
                    //after authorization zip the unzip file again
                    var zip = new admzip();
                    var outputFilePath = "output.zip";
                    if (files) {
                        files.forEach((file) => {
                            zip.addLocalFile(destPath + "/" + file);
                        });
                        fs.writeFileSync(outputFilePath, zip.toBuffer());
                        shareName = "zip-file";
                        directoryName = "zipfiledata";
                        //save the file in azure file
                        async function main() {
                            const directoryClient = serviceClient
                                .getShareClient(shareName)
                                .getDirectoryClient(directoryName);

                            const content = "Hello World!hhhh";
                            const fileName = outputFilePath;
                            const fileClient = directoryClient.getFileClient(fileName);
                            await fileClient.create(content.length);
                            console.log(`Create file ${fileName} successfully`);

                            // Upload file range
                            await fileClient.uploadRange(content, 0, content.length);
                            console.log(
                                `Upload file range "${content}" to ${fileName} successfully`
                            );

                            let shareIter = serviceClient.listShares();
                            let i = 1;
                            for await (const share of shareIter) {
                                console.log(`Share${i}: ${share.name}`);
                                i++;
                            }
                        }

                        main();
                    }
                    console.log("authorization provided");
                    break;
                }
                //authorization is failed
                if (ext != ".json") {
                    return res.status(401).send({ message: "No authorization provided" });
                    break;
                }
            }
        });
        next();
    }
}
module.exports = authenticate;