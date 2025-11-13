const { Storage } = require("../models");

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

// Folder tree (nested)
const getFolderTree = async (userId, parentId = null) => {
  const folders = await Storage.find({ createdBy: userId, parentId, type: "folder" }).lean();
  for (let folder of folders) {
    folder.children = await getFolderTree(userId, folder._id);
  }
  return folders;
};

// Calculate total used storage by user
const getUserStorageUsage = async (userId) => {
  const files = await Storage.find({ createdBy: userId, type: "file" });
  const used = files.reduce((acc, file) => acc + (file.fileSize || 0), 0);
  const limit = 15 * 1024 * 1024 * 1024; // 15 GB in bytes
  return { used, remaining: limit - used, limit };
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
