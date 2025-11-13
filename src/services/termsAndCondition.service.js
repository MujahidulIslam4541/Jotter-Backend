const termsConditionsModel = require("../models/termsConditions.model");


// create terms only admin
const createTermsService = async (data) => {
  const task = await termsConditionsModel.create(data);
  return task;
};

//  Update
const updateTerms = async (id, data) => {
  const term = await termsConditionsModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return term;
};

//  Delete
const deleteTerms = async (id) => {
  const term = await termsConditionsModel.findByIdAndDelete(id);
  return term;
};

//  Get all (for client/employ)
const getTerms = async () => {
  const terms = await termsConditionsModel.find().sort({ createdAt: -1 }).lean();
  return terms;
};

module.exports = {
  createTermsService,updateTerms,deleteTerms,getTerms
};
