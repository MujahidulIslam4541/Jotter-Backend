const multer = require("multer");
const path = require("path");

module.exports = function (UPLOADS_FOLDER) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const filename =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();

      cb(null, filename + fileExt);
    },
  });

  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];

  const allowedMainTypes = ["image", "audio", "video"];

  const upload = multer({
    storage: storage,

    fileFilter: (req, file, cb) => {
      const fullMime = file.mimetype;          // e.g. image/png
      const mainType = file.mimetype.split("/")[0]; // e.g. image

      if (allowedTypes.includes(fullMime) || allowedMainTypes.includes(mainType)) {
        return cb(null, true);
      }

      cb(new Error("Invalid file type"));
    },
  });

  return upload;
};
