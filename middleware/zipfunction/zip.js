const decompress = require("decompress");
const zippy = require("../fetch/fetching")
const zipobj = new zippy();

async function authenticate(req, res) {
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
    zipobj.fetch(zipPath, unzipPath)
}

module.exports = authenticate;

//authorization is process
//     async function readFile(destPath) {
//         const destPaths = destPath + "/DICOM";
//         const vaar = fs.readdirSync(destPaths, "utf-8")
//         const filee = fs.readdirSync(destPaths + "/" + vaar, 'utf-8')
//         await filee.forEach(data => {
//             const datas = fs.readdirSync(destPaths + "/" + vaar + "/" + data)
//             datas.forEach(extfile => {
//                 const aa = (destPaths + "/" + vaar + "/" + data + "/" + extfile);
//                 magic.detectFile(aa, function(err, result) {
//                     if (err) throw err;
//                     if (result === "DICOM medical imaging data") {
//                         zip.addLocalFile(aa);
//                         fs.writeFileSync("aaa.zip", zip.toBuffer());
//                         console.log("Authorization is passed")
//                     } else if (result !== "DICOM medical imaging data") {
//                         console.log("Authorization is failed")
//                     }
//                 });
//             });
//         })
//     }
//     next();
// }

//             //after authorization zip the unzip file again
//         var zip = new admzip();
//         var outputFilePath = "output.zip";
//         if (files) {
//             files.forEach((file) => {
//                 zip.addLocalFile(destPath + "/" + file);
//             });
//             fs.writeFileSync(outputFilePath, zip.toBuffer());
//         }
//         connection.storage(req.files[0].originalname);
//         console.log("authorization provided");
//         break;
//     }
//     //authorization is failed
//     if (ext != ".json") {
//         return res.status(401).send({ message: "No authorization provided" });
//         break;
//     }
// }

// next();
// }
// }