const path = require("path");
const multer = require("multer")
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, "../my_uploads"))
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now()
        cb(null, uniqueSuffix + '-' + file.orginalname);
    }
})

function fileFilter(req, file, cb) {

    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        // To reject this file pass `false`, like so:
        cb(null, true)
    } else {
        // To accept the file pass `true`, like so:
        cb(new Error("Incorrect mime type"), false)
    }
}

const options = {
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
}
const uploads = multer(options)
module.exports = uploads;