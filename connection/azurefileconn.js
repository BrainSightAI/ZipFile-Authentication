const fs = require("fs")

class azure {

    fileconnection() {

        const {
            ShareServiceClient,
            StorageSharedKeyCredential,
        } = require("@azure/storage-file-share");
        // Enter your storage account name and shared key
        const account = "diacom";
        const accountKey =
            "II7PuJjAAH71M6u86vgspzpmJ9PVWiAtiMJWuzsVKCe6yD693dUqgL7dtt9z2j043Lybw4u0e0byVZmwxH+smA==";

        // Use StorageSharedKeyCredential with storage account and account key
        // StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
        const credential = new StorageSharedKeyCredential(account, accountKey);
        const serviceClient = new ShareServiceClient(
            // When using AnonymousCredential, following url should include a valid SAS
            `https://${account}.file.core.windows.net`,
            credential
        );
        return serviceClient;
    }

    storage() {
        const zipfile = (process.cwd() + "/output.zip")
        var shareName = "diacom";
        var directoryName = "diacom-images";
        // var zipfile = req;
        const directoryClent = this.fileconnection();
        async function main() {
            const directoryClient = directoryClent
                .getShareClient(shareName)
                .getDirectoryClient(directoryName);
            const fileName = zipfile;
            const fileClient = directoryClient.getFileClient(fileName);
            var dirr = (process.cwd() + "/app.zip")
                //const fileSize = fs.statSync(dirr).size;
                // await fileClient.uploadStream(fs.createReadStream(dirr), fileSize, 4 * 1024 * 1024, 20)
            await fileClient.uploadFile(dirr, {
                rangeSize: 4 * 1024 * 1024, // 4MB range size
                parallelism: 20 // 20 concurrency
            })
        }
        main();
    }
}


module.exports = azure;