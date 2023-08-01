const multer = require('multer');
const { handleUpload } = require("../config/cloudinary");
const movieModel = require('../model/movieModel');

const storage = multer.memoryStorage();
const upload = multer({ storage });
const myUploadMiddleware = upload.single("movieImage");

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}


const handler = async (req, res, next) => {
  try {
    //Upload new image
    await runMiddleware(req, res, myUploadMiddleware);
    const buffer = req.file?.buffer;
    const mimetype = req.file?.mimetype;
    const title = req.body.title;

    // Checking for already existing movie name
    if (req.method === "POST") {
      const isExists = await movieModel.findOne({ title });
      if (isExists) {
        throw new Error("The Movie already exists!");
      }

      if (!buffer) {
        throw new Error("Image cannot be empty!");
      }
    }

    if (buffer) {
      const b64 = buffer && buffer.toString("base64");
      const dataURI = "data:" + mimetype + ";base64," + b64;
      const cldRes = await handleUpload(dataURI);
      res.locals.movieImageData = cldRes;
    }

    next();
  } catch (error) {
    res.status(400).json({
      message: `${error.message}`,
    });
  }
};

const config = {
  api: {
    bodyParser: false,
  },
};


module.exports = {
  handler,
  config
};
