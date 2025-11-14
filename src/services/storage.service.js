const Storage = require("../models/storage.model");

// Create folder/file/note
const createStorage = async (data) => {
  return Storage.create(data);
};

// Get all items of a user
const getAllStorage = async (filter) => {
  return Storage.find(filter).sort({ createdAt: -1 });
};

// Get single item
const getStorageById = async (id) => {
  return Storage.findById(id);
};

// Update item
const updateStorage = async (id, data) => {
  return Storage.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

// Delete item
const deleteStorage = async (id) => {
  return Storage.findByIdAndDelete(id);
};

// Folder tree (Google Drive style)
const getFolderTree = async (userId, parentId = null) => {
  const items = await Storage.find({
    createdBy: userId,
    parentId,
    isDeleted: false,
  }).lean();

  for (let item of items) {
    if (item.type === "folder") {
      item.children = await getFolderTree(userId, item._id);
    }
  }

  return items;
};

// Calculate total used storage by user
const getUserStorageUsage = async (userId) => {
  const files = await Storage.find({ createdBy: userId, type: "file" });
  const used = files.reduce((acc, file) => acc + (file.fileSize || 0), 0);
  const limit = 15 * 1024 * 1024 * 1024; // 15GB in bytes

  return {
    used,
    remaining: limit - used,
    limit,
  };
};

module.exports = {
  createStorage,
  getAllStorage,
  getStorageById,
  updateStorage,
  deleteStorage,
  getFolderTree,
  getUserStorageUsage,
};
