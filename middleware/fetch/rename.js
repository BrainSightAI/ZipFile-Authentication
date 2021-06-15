const AdmZip = require('adm-zip');
const fs = require('fs');
const admzip = require('adm-zip')
var count = 5415;
class renamefile {
    renamefile(files) {
        const currentPath = files;
        const newPath = (process.cwd() + "/diacomfolder/" + count++)
        fs.renameSync(currentPath, newPath)
        console.log("Successfully moved the file!")
    }
    zipfiy() {
        var dcmfile = fs.readdirSync((process.cwd() + "/diacomfolder"));
        var zip = new admzip();
        var outputFilePath = "output.zip";
        dcmfile.forEach(file => {
            var dcmpat = (process.cwd() + "/diacomfolder/" + file)
            zip.addLocalFile(dcmpat)
        })
        fs.writeFileSync(outputFilePath, zip.toBuffer());
    }
}


module.exports = renamefile;