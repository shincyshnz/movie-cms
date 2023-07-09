const multer = require('multer');
const { handleUpload } = require("../config/cloudinary");

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

const handler = async (req, res,next) => {
    try {
        await runMiddleware(req, res, myUploadMiddleware);
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI);
        res.locals.movieImageData = cldRes;
        next();
    } catch (error) {
        console.log(error);
        res.send({
            message: error.message,
        });
    }
};

const config = {
    api: {
      bodyParser: false,
    },
  };
  

module.exports = { handler, config };
