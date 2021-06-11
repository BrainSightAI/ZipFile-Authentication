var Magic = require('mmmagic').Magic;
const path = require("path");
const fs = require("fs");
const renamefiles = require('../fetch/rename')
var magic = new Magic();
const data = new renamefiles()

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
        const result = getAllFiles(dipPath);
        this.processdata(result)
    }

    processdata(file) {
            (file.map(files => {
                //send each file for authentication
                this.detectMimeType(files)
            }))
            console.log("processoutside")
        }
        ///authentication of diacom file
    detectMimeType(files) {
        magic.detectFile(files, function(err, result) {
            if (result === "DICOM medical imaging data") {
                //send each file for renaming and moving to new folder
                data.renamefile(files)
            } else if (result !== "DICOM medical imaging data") {
                fs.unlinkSync(files)
            }
        })
    }
}
module.exports = fetching;