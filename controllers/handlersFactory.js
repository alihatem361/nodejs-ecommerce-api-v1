import asyncHandler from "express-async-handler";
import ApiError from "../utils/ApiError.js";
import ApiFeatures from "../utils/apiFeatures.js";

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

//   Update One document by ID

export const updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await DocumentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (document) {
      await document.save();
      res
        .status(200)
        .json({ message: "Document updated successfully!", data: document });
    } else {
      return next(new ApiError("Document not found", 404));
    }
  });
