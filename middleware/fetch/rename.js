const fs = require('fs');
var count = 5415;
class renamefile {
    renamefile(files) {
        const currentPath = files
        const newPath = (process.cwd() + "/diacomfolder/" + count++)
        fs.renameSync(currentPath, newPath)
        console.log("Successfully moved the file!")
    }
}
module.exports = renamefile;