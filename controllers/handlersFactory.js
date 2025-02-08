import asyncHandler from "express-async-handler";
import ApiError from "../utils/ApiError.js";
import ApiFeatures from "../utils/apiFeatures.js";

// create a new document
export const createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const newCategory = new Model(req.body);
    try {
      await newCategory.save();
      const result = await Model.findById(newCategory._id).select("-__v");
      res
        .status(201)
        .json({ message: "Document created successfully!", data: result });
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({ message: "Duplicate field value entered" });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  });

// get one document by ID
export const getOne = (Model, popOptions) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    let query = Model.findById(id);

    if (popOptions) query = query.populate(popOptions.path, popOptions.select);

    const document = await query.select("-__v");

    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });

// Update One document by ID
export const updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    try {
      const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      }).select("-__v");

      if (document) {
        await document.save();
        res
          .status(200)
          .json({ message: "Document updated successfully!", data: document });
      } else {
        return next(new ApiError("Document not found", 404));
      }
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({ message: "Duplicate field value entered" });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  });

// Delete one document by ID
export const deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);

    if (!document) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }
    res.status(200).json({ message: "Document deleted successfully!" });
  });
