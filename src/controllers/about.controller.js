const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const response = require("../config/response");
const { createAboutUs, updateAbout, deleteAbout, getAbout } = require("../services/about.service");


// Only admin can create AboutUs
const createAboutController = catchAsync(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(httpStatus.UNAUTHORIZED).json(
      response({
        message: "Access denied: only admin can create About Us",
        status: "FAIL",
        statusCode: httpStatus.UNAUTHORIZED,
      })
    );
  }

  const about = await createAboutUs(req.body);
  res.status(httpStatus.CREATED).json(
    response({
      message: "About Us created successfully",
      status: "OK",
      statusCode: httpStatus.CREATED,
      data: about,
    })
  );
});

// Admin Update
const updateAboutController = catchAsync(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(httpStatus.UNAUTHORIZED).json(
      response({
        message: "Access denied: only admin can update About Us",
        status: "FAIL",
        statusCode: httpStatus.UNAUTHORIZED,
      })
    );
  }

  const about = await updateAbout(req.params.id, req.body);
  if (!about) {
    return res.status(httpStatus.NOT_FOUND).json(
      response({
        message: "About Us not found",
        status: "FAIL",
        statusCode: httpStatus.NOT_FOUND,
      })
    );
  }

  res.status(httpStatus.OK).json(
    response({
      message: "About Us updated successfully",
      status: "OK",
      statusCode: httpStatus.OK,
      data: about,
    })
  );
});

// Admin Delete
const deleteAboutController = catchAsync(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(httpStatus.UNAUTHORIZED).json(
      response({
        message: "Access denied: only admin can delete About Us",
        status: "FAIL",
        statusCode: httpStatus.UNAUTHORIZED,
      })
    );
  }

  const about = await deleteAbout(req.params.id);
  if (!about) {
    return res.status(httpStatus.NOT_FOUND).json(
      response({
        message: "About Us not found",
        status: "FAIL",
        statusCode: httpStatus.NOT_FOUND,
      })
    );
  }

  res.status(httpStatus.OK).json(
    response({
      message: "About Us deleted successfully",
      status: "OK",
      statusCode: httpStatus.OK,
      data: [],
    })
  );
});

// Get all (Client / Employee)
const getAboutController = catchAsync(async (req, res) => {
  const about = await getAbout();
  res.status(httpStatus.OK).json(
    response({
      message: "About Us fetched successfully",
      status: "OK",
      statusCode: httpStatus.OK,
      data: about,
    })
  );
});

module.exports = {
  createAboutController,
  updateAboutController,
  deleteAboutController,
  getAboutController,
};
