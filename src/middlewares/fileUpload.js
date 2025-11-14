// const multer = require("multer");
// const path = require("path");

// module.exports = function (UPLOADS_FOLDER) {
//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, UPLOADS_FOLDER); // Use the provided destination folder
//     },
//     filename: (req, file, cb) => {
//       const fileExt = path.extname(file.originalname);
//       const filename =
//         file.originalname
//           .replace(fileExt, "")
//           .toLocaleLowerCase()
//           .split(" ")
//           .join("-") +
//         "-" +
//         Date.now();

//       cb(null, filename + fileExt);
//     },
//   });

//   const upload = multer({
//     storage: storage,
//     limits: {
//       fileSize: 200000000000000000000000000, 
//     },
//     fileFilter: (req, file, cb) => {
//       if (
//         file.mimetype == "image/jpg" ||
//         file.mimetype == "image/png" ||
//         file.mimetype == "image/jpeg" ||
//         file.mimetype == "image/heic" ||
//         file.mimetype == "image/heif"
//       ) {
//         cb(null, true);

//       } else {
//         cb(new Error("Only jpg, png, jpeg format allowed!"));
//       }
//     },
//   });

//   return upload; // Return the configured multer upload middleware
// };


const multer = require("multer");
const path = require("path");

module.exports = function (UPLOADS_FOLDER) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOADS_FOLDER); // Use the provided destination folder
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
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/heic",
    "image/heif",
    "audio",
    "video"
  ];

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 15 * 1024 * 1024 * 1024, 
    },
    fileFilter: (req, file, cb) => {
      const fileType = file.mimetype.split("/")[0]; 

      if (allowedTypes.includes(file.mimetype) || allowedTypes.includes(fileType)) {
        cb(null, true);
      } else {
        cb(new Error("Invalid file type"));
      }
    },
  });

  return upload; // Return the configured multer upload middleware
};

