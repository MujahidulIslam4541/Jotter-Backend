const upload = require("./fileUpload");
const logger = require("../config/logger");
const response = require("../config/response");

const imageVerification = (req, res, next) => {
  const files = req.files || [];  

  if (!files || files.length === 0) {   
    logger.error("Images not found");
    return res.status(403).json(
      response({
        code: "403",
        message: "Images not found",
      })
    );
  }

  next();
};

module.exports = imageVerification;
