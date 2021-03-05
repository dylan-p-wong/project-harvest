const aws = require("aws-sdk");
const multer = require("multer");
const multers3 = require("multer-s3");

const s3 = new aws.S3();

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(new Error("Only PNG and JPEG"), false);
    }
};

const upload = multer({
    fileFilter,
    storage: multers3({
        s3,
        bucket: "projectharvest",
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        contentType: multers3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(null, new Date().toISOString() + '-' + file.originalname)
        }
    })
});

module.exports = upload;