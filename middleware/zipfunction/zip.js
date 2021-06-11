const decompress = require("decompress");
const zippy = require("../fetch/fetching")
const zipobj = new zippy();

async function authenticate(req, res, next) {
    var zipPath = process.cwd() + "/zipyfy/zip/" + req.files[0].originalname;
    var unzipPath = process.cwd() + "/zipyfy/unzip";
    //unzipping the file
    await (async() => {
        try {
            const files = await decompress(zipPath, unzipPath);
            console.log("unziping is done");
        } catch (error) {
            console.log(error);
        }
    })();
    zipobj.recursivecall(unzipPath)
    next();
}
module.exports = authenticate;