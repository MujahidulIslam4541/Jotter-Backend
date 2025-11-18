const { AboutUs } = require("../models");

// Create AboutUs Only If Not Exists
const createAboutUs = async (data) => {
  const exists = await AboutUs.findOne();
  if (exists) {
    return null; // Already exists
  }

  const about = await AboutUs.create(data);
  return about;
};

// Update
const updateAbout = async (id, data) => {
  const about = await AboutUs.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return about;
};

// Delete
const deleteAbout = async (id) => {
  const about = await AboutUs.findByIdAndDelete(id);
  return about;
};

// Get All
const getAbout = async () => {
  const about = await AboutUs.find().sort({ createdAt: -1 }).lean();
  return about;
};

module.exports = {
  createAboutUs,
  deleteAbout,
  updateAbout,
  getAbout,
};
