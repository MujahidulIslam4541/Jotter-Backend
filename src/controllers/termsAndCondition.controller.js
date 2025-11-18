const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const response = require("../config/response");
const {
  createTermsService,
  updateTerms,
  deleteTerms,
  getTerms,
} = require("../services/termsAndCondition.service");

// Admin Create (Only 1 time allowed)
const createTerms = catchAsync(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(httpStatus.UNAUTHORIZED).json(
      response({
        message: "Access denied: only admin can create terms",
        status: "FAIL",
        statusCode: httpStatus.UNAUTHORIZED,
      })
    );
  }

  const created = await createTermsService(req.body);

  if (!created) {
    return res.status(httpStatus.BAD_REQUEST).json(
      response({
        message: "Terms already exists, you can only update",
        status: "FAIL",
        statusCode: httpStatus.BAD_REQUEST,
      })
    );
  }

  res.status(httpStatus.CREATED).json(
    response({
      message: "Terms created successfully",
      status: "OK",
      statusCode: httpStatus.CREATED,
      data: created,
    })
  );
});

// Admin Update
const updateTermsController = catchAsync(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(httpStatus.UNAUTHORIZED).json(
      response({
        message: "Access denied: only admin can update terms",
        status: "FAIL",
        statusCode: httpStatus.UNAUTHORIZED,
      })
    );
  }

  const term = await updateTerms(req.params.id, req.body);

  if (!term) {
    return res.status(httpStatus.NOT_FOUND).json(
      response({
        message: "Terms not found",
        status: "FAIL",
        statusCode: httpStatus.NOT_FOUND,
      })
    );
  }

  res.status(httpStatus.OK).json(
    response({
      message: "Terms updated successfully",
      status: "OK",
      statusCode: httpStatus.OK,
      data: term,
    })
  );
});

// Admin Delete
const deleteTermsController = catchAsync(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(httpStatus.UNAUTHORIZED).json(
      response({
        message: "Access denied: only admin can delete terms",
        status: "FAIL",
        statusCode: httpStatus.UNAUTHORIZED,
      })
    );
  }

  const term = await deleteTerms(req.params.id);

  if (!term) {
    return res.status(httpStatus.NOT_FOUND).json(
      response({
        message: "Terms not found",
        status: "FAIL",
        statusCode: httpStatus.NOT_FOUND,
      })
    );
  }

  res.status(httpStatus.OK).json(
    response({
      message: "Terms deleted successfully",
      status: "OK",
      statusCode: httpStatus.OK,
      data: [],
    })
  );
});

// Get (Client & Employ)
const getTermsController = catchAsync(async (req, res) => {
  const terms = await getTerms();
  res.status(httpStatus.OK).json(
    response({
      message: "Terms fetched successfully",
      status: "OK",
      statusCode: httpStatus.OK,
      data: terms,
    })
  );
});

module.exports = {
  createTerms,
  updateTermsController,
  deleteTermsController,
  getTermsController,
};
