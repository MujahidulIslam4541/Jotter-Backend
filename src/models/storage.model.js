const mongoose = require("mongoose");

const storageSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["file", "folder", "note"],
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Storage",
      default: null,
    },

    filePath: {
      type: String,
      default: null,
    },
    fileType: {
      type: String,
      default: null,
    },
    fileSize: {
      type: Number,
      default: 0,
    },

    content: {
      type: String,
      default: null,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// ✅ Virtual for nested folder
storageSchema.virtual("children", {
  ref: "Storage",
  localField: "_id",
  foreignField: "parentId",
});

storageSchema.set("toJSON", { virtuals: true });
storageSchema.set("toObject", { virtuals: true });

const Storage = mongoose.model("Storage", storageSchema);
module.exports = Storage;
