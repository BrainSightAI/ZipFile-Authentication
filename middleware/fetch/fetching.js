var Magic = require('mmmagic').Magic;
const path = require("path");
const fs = require("fs");
const renamefiles = require('../fetch/rename')
var magic = new Magic();
const data = new renamefiles()
    // const fs = require('fs');
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
    }
    async processdata(files) {
            for (var i = 0; i < files.length; i++) {
                await (async() => {
                    const stream = fs.createReadStream(files[i]);
                    const fileExt = await FileType.fromStream(stream);
                    const ext = fileExt.ext;
                    if (ext === "dcm") {
                        //send each file for renaming and moving to new folder
                        data.renamefile(files[i])
                    } else if (ext !== "DICOM medical imaging data") {
                        fs.unlinkSync(files[i])
                    }
                })();
            }
        }
        //=> {ext: 'mp4', mime: 'video/mp4'}

    // processdata(files) {
    //     for (var i = 0; i < files.length; i++) {
    //         this.detectMimeType(files[i])
    //     }
    //     console.log("outside")
    // }

    ///authentication of diacom file
    // magic.detectFile(file, function(err, result) {
    //     if (result === "DICOM medical imaging data") {
    //         //send each file for renaming and moving to new folder
    //         data.renamefile(file)
    //     } else if (result !== "DICOM medical imaging data") {
    //         fs.unlinkSync(files)
    //     }
    // })

}
module.exports = fetching;