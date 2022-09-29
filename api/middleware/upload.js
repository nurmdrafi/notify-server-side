const multer = require("multer");
const path = require("path");

const Uploads_Folder = "../../uploads/";

// configure diskStorage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, Uploads_Folder);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();
  },
});

// setup multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only .png, .jpg, or jpeg format allowed."));
    }
  },
});

module.exports = multer({ upload });
