import TaskCategoryModel from "../../models/IT22607232_Models/TaskCategoryModel_01.js";
import TaskAnalysisModel from "../../models/IT22607232_Models/TaskAnalysisModel_01.js";

export const createCategories = async (req, res, next) => {
  try {
    // Define the type and color from the backend
    const type = "Inprogress"; 
    
    const color = "rgb(255, 205, 86)";   



    // Create a new category with the predefined type and color
    const newCategory = await TaskCategoryModel.create({ type, color });

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





//get categories
export const getCategories = async (req, res, next) => {
    try {
      const categories = await TaskCategoryModel.find({}, { _id: 0, type: 1, color: 1 });
  
      if (!categories) {
        return res.status(404).json({ msg: "No categories found" });
      }
      
      return res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  };


  //get labels
  export const getLabels = async (req, res, next) => {
    try {
      const result = await TaskAnalysisModel.aggregate([
        {
          $lookup: {
            from: "taskcategories", 
            localField: 'type',
            foreignField: "type",
            as: "category_info" 
          }
        }
      ]);
  
      const data = result.map(v => ({
        _id: v._id,
        TaskID: v.TaskID,
        type: v.type,
        NumTasks: v.NumTasks,
        color: v.category_info.length > 0 ? v.category_info[0].color : null // Access color from category_info
      }));
  
      res.json(data);
    } catch (error) {
      res.status(400).json("Lookup Collection Error");
    }
  };