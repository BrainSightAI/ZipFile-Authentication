const express = require("express");
const fs = require("fs");
const app = express();
const fileautehen = require('../authentication/fileauthenticate')
const fileaut = new fileautehen();
const admzip = require("adm-zip");
var zip = new admzip();
var Magic = require('mmmagic').Magic;
var magic = new Magic();
const path = require("path");

class fetching {

    async fetch(zipPath, unzipPath) {
        const mainfolder = fs.readdirSync(unzipPath, "utf-8");
        console.log(mainfolder)
        var dirct = this.filedircheck(mainfolder, unzipPath);
        var dictlavel2 = this.rear(dirct, unzipPath);
        if (dictlavel2.length >= 0) {
            var dirct = this.filedircheck(dictlavel2, unzipPath);
            var dictlavel2 = this.rear(dirct, unzipPath);

        }
    }

    filedircheck(mainfolder, unzipPath) {
        var dir = [];
        for (var i = 0; i < mainfolder.length; i++) {
            var stats = fs.statSync(unzipPath + "/" + mainfolder[i]);
            var status = (stats.isDirectory());

            if (status === true) {
                dir.push(mainfolder[i]);
            } else {
                var status = this.authenfilee(mainfolder[i], unzipPath);
            }
            console.log(status);
        }
        return dir;
    }

    rear(dirct, unzipPath) {
        const destP = (unzipPath + "/" + dirct[0]);
        const mainfol = fs.readdirSync(destP, "utf-8");
        return mainfol;

    }

    authenfilee(file, unzipPath) {
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
module.exports = fetching;