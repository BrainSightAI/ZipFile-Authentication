class azure {

    fileconnection() {

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
        return serviceClient;
    }
    storage(req) {
        var shareName = "zip-file";
        var directoryName = "zipfiledata";
        // zipfile = (req.files[0].originalname, zip.toBuffer());
        var zipfile = req;
        const directoryClent = this.fileconnection();
        async function main() {
            const directoryClient = directoryClent
                .getShareClient(shareName)
                .getDirectoryClient(directoryName);

            const content = "Hello World!hhhh";
            const fileName = zipfile;
            const fileClient = directoryClient.getFileClient(fileName);
            await fileClient.create(content.length);
            console.log(`Create file ${fileName} successfully`);

            // Upload file range
            await fileClient.uploadRange(content, 0, content.length);
            console.log(
                `Upload file range "${content}" to ${fileName} successfully`
            );

            let shareIter = directoryClent.listShares();
            let i = 1;
            for await (const share of shareIter) {
                console.log(`Share${i}: ${share.name}`);
                i++;
            }
        }
        main();
    }

}



module.exports = azure;