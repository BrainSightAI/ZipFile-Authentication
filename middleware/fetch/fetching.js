var Magic = require('mmmagic').Magic;
const path = require("path");
const fs = require("fs");
const renamefiles = require('../fetch/rename')
var magic = new Magic();
const data = new renamefiles()

class fetching {

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
            this.detectMimeType(files)
        }))
    }

    detectMimeType(files) {
        (magic.detectFile(files, function(err, result) {
            if (result === "DICOM medical imaging data") {
                data.renamefile(files)
            } else if (result !== "DICOM medical imaging data") {
                fs.unlinkSync(files)
            }
            // const dir = process.cwd() + "/zipyfy/unzip";
            // fs.rmdirSync(dir, { recursive: true });

        }))
    }
}
module.exports = fetching;