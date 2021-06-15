const fs = require("fs")

class azure {

    fileconnection() {

        const {
            ShareServiceClient,
            StorageSharedKeyCredential,
        } = require("@azure/storage-file-share");
        // Enter your storage account name and shared key
        const account = "bsstoragedev";
        const accountKey =
            "lsaU/EdeKneKnhdxclsTZzQzZvtpd0brpCDpnMABDxuJXroIVhX9n8dc/xgGJ+oFeimythsYiItany3axV8XVg==";

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
        // const zipfile = (process.cwd() + "/output.zip")
        var shareName = "training";
        var directoryName = "Max/patientABC/ECM/input";
        var zipfile = "dcm.zip";
        const directoryClent = this.fileconnection();
        async function main() {
            const directoryClient = directoryClent
                .getShareClient(shareName)
                .getDirectoryClient(directoryName);
            const fileName = zipfile;
            const fileClient = directoryClient.getFileClient(fileName);
            var dirr = (process.cwd() + "/output.zip")
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