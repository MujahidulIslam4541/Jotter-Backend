
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

// Delete item (soft delete recommended)
const deleteStorage = async (id) => {
  return Storage.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
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

// ======================
// 📌 Calculate total used storage (Type Wise)
// ======================
const getUserStorageUsage = async (userId) => {
  const items = await Storage.find({ createdBy: userId, isDeleted: false });

  let fileUsed = 0;
  let imageUsed = 0;
  let noteUsed = 0;

  items.forEach((item) => {
    // File space
    if (item.type === "file") {
      fileUsed += item.fileSize || 0;

      if (item.fileType && item.fileType.startsWith("image/")) {
        imageUsed += item.fileSize || 0;
      }
    }

    // Note space (assumption: content length in bytes)
    if (item.type === "note" && item.content) {
      noteUsed += Buffer.byteLength(item.content, "utf8");
    }
  });

  const used = fileUsed + noteUsed;
  const limit = 15 * 1024 * 1024 * 1024; // 15 GB
  const remaining = limit - used;

  const toGB = (b) => (b / (1024 ** 3)).toFixed(2);

  return {
    totalUsedGB: toGB(used),
    fileUsedGB: toGB(fileUsed),
    imageUsedGB: toGB(imageUsed),
    noteUsedGB: toGB(noteUsed),
    remainingGB: toGB(remaining),
    limitGB: 15,
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
