const { promises: fs } = require("fs");

// let directory_name = "DICOM";

// // Open the directory
// let openedDir = fs.opendirSync(directory_name);

// // Print the pathname of the directory
// console.log("\nPath of the directory:", openedDir.path);

// // Get the files present in the directory
// console.log("Files Present in directory:");

// let filesLeft = true;
// while (filesLeft) {
//     // Read a file as fs.Dirent object
//     let fileDirent = openedDir.readSync();

//     // If readSync() does not return null
//     // print its filename
//     if (fileDirent != null)
//         console.log("Name:", fileDirent.name);

//     // If the readSync() returns null
//     // stop the loop
//     else filesLeft = false;
// }


async function getFiles(path = "./DICOM/") {
    const entries = await fs.readdir(path, { withFileTypes: true });

    // Get files within the current directory and add a path key to the file objects
    const files = entries
        .filter(file => !file.isDirectory())
        .map(file => ({...file, path: path + file.name }));

    // Get folders within the current directory
    const folders = entries.filter(folder => folder.isDirectory());

    for (const folder of folders)
    /*
      Add the found files within the subdirectory to the files array by calling the
      current function itself
    */
        files.push(...await getFiles(`${path}${folder.name}/`));
    console.log(files)
    return files;
}
var filess = getFiles();
console.log(filess);