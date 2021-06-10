const fs = require('fs');
var count = 5415;
class renamefile {
    renamefile(files) {
        const currentPath = files
        const newPath = (process.cwd() + "/diacomfolder/" + count++)
        fs.renameSync(currentPath, newPath)
        console.log("Successfully moved the file!")
            // this.removefolder()
    }

    // async removefolder() {
    //     const dir = process.cwd() + "/zipyfy/unzip";

    //     // delete directory recursively
    //     try {
    //         await fs.rmdirSync(dir, { recursive: true });

    //         console.log(`${dir} is deleted!`);
    //     } catch (err) {
    //         console.error(`Error while deleting ${dir}.`);
    //     }
    // }
}
module.exports = renamefile;