import TaskAnalysisModel from "../../models/IT22607232_Models/TaskAnalysisModel_01.js";

export const createCategories = async (req, res, next) => {
  try {
    const { type, color } = req.body;

    // Check if type and color are provided
    if (!type || !color) {
      return res
        .status(400)
        .json({ msg: "Type and color are required fields" });
    }

    const newCategory = await TaskAnalysisModel.create({ type, color });

    if (!newCategory) {
      return res.status(404).json({ msg: "Category creation failed" });
    }

    return res
      .status(200)
      .json({ category: newCategory, msg: "Category created successfully" });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
    try {
      const categories = await TaskAnalysisModel.find({}, { _id: 0, type: 1, color: 1 });
  
      if (!categories) {
        return res.status(404).json({ msg: "No categories found" });
      }
      
      return res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  };
