const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const response = require("../config/response");
const storageService = require("../services/storage.service");

// Create folder/file/note
const createStorage = catchAsync(async (req, res) => {
  const { type, name, parentId, content } = req.body;
  const userId = req.user.id;

  let data = {
    type,
    name,
    parentId: parentId || null,
    createdBy: userId,
  };

  // Handle file upload
  if (req.file && type === "file") {
    data.filePath = `/uploads/${req.file.filename}`;
    data.fileType = req.file.mimetype;
    data.fileSize = req.file.size;
  }

  // Note
  if (type === "note" && content) {
    data.content = content;
  }

  const result = await storageService.createStorage(data);
  res.status(httpStatus.CREATED).json(
    response({
      message: "Item created successfully",
      data: result,
    })
  );
});

// Get all items for user
const getAllStorage = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const result = await storageService.getAllStorage({ createdBy: userId, isDeleted: false });
  res.status(httpStatus.OK).json(
    response({
      message: "All storage items",
      data: result,
    })
  );
});

// Get folder tree
const getFolderTree = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const result = await storageService.getFolderTree(userId);
  res.status(httpStatus.OK).json(
    response({
      message: "Folder tree fetched successfully",
      data: result,
    })
  );
});

// Get storage usage
const getStorageUsage = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const result = await storageService.getUserStorageUsage(userId);
  res.status(httpStatus.OK).json(
    response({
      message: "Storage usage fetched successfully",
      data: {
        usedGB: (result.used / (1024 ** 3)).toFixed(2),
        remainingGB: (result.remaining / (1024 ** 3)).toFixed(2),
        totalGB: 15,
      },
    })
  );
});

module.exports = {
  createStorage,
  getAllStorage,
  getFolderTree,
  getStorageUsage,
};
