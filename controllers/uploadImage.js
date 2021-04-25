const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { v1: uuidv1, v4: uuidv4 } = require("uuid");

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, req.s3Key);
    },
  }),
});

const singleFileUpload = upload.single("image");

function uploadToS3(req, res) {
  req.s3Key = uuidv4();
  let downloadUrl = `https://s3-us-west-2.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${req.s3Key}`;
  return new Promise((resolve, reject) => {
    return singleFileUpload(req, res, (err) => {
      if (err) return reject(err);
      return resolve(downloadUrl);
    });
  });
}

function uploadImage(req, res) {
  uploadToS3(req, res)
    .then((downloadUrl) => {
      console.log(downloadUrl);
      return res.status(200).send({ downloadUrl });
    })
    .catch((e) => {
      console.log(e);
    });
}

module.exports = {
  uploadImage,
};
