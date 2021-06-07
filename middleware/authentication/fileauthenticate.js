var Magic = require('mmmagic').Magic;
var magic = new Magic();

class authenticated {
    authenfile(file, unzipPath) {
        const filepath = (unzipPath + "/" + file)
        magic.detectFile(filepath, function(err, result) {
            if (err) throw err;
            if (result === "DICOM medical imaging data") {
                return "Authorization is failed";
            } else if (result !== "DICOM medical imaging data") {
                return "Authorization is failed"
            }
        });
    }
}
module.exports = authenticated;