const path = require("path");
const fs = require("fs");
const renamefiles = require('../fetch/rename')
const data = new renamefiles()
const FileType = require('file-type');
const azureconn = require('../../connection/azurefileconn')
const connection = new azureconn();

class fetching {
    //recusrsive call for processing each file from sub folder
    async recursivecall(dipPath) {
        const getAllFiles = function(dirPath, arrayOfFiles) {
            var files = fs.readdirSync(dirPath)
            var arrayOfFiles = arrayOfFiles || []
            files.forEach(function(file) {
                if (fs.statSync(dirPath + "/" + file).isDirectory()) {
                    arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
                } else {
                    arrayOfFiles.push(path.join(dirPath, "/", file))
                }
            })
            return arrayOfFiles
        }
        const processedfiles = getAllFiles(dipPath);
        await this.processdata(processedfiles);
        await data.zipfiy();
        await connection.storage()
        fs.rmdirSync((process.cwd() + "/diacomfolder"), { recursive: true })
        fs.unlinkSync((process.cwd() + "/output.zip"))
    }

    async processdata(files) {
        for (var i = 0; i < files.length; i++) {
            await (async() => {
                var stream = fs.createReadStream(files[i]);
                var fileExt = await FileType.fromStream(stream);
                var extension = (fileExt.ext);
                if (extension === 'dcm') {
                    //send each file for renaming and moving to new folder
                    data.renamefile(files[i])
                } else if (extension !== "dcm") {
                    fs.unlinkSync(files[i])
                }
            })();
        }
    }
}
module.exports = fetching;