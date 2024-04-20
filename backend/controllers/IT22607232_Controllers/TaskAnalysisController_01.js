import TaskAnalysisModel from '../../models/IT22607232_Models/TaskAnalysisModel_01.js';

// Create Task Analysis
export const createTaskAnalysis = async (req, res, next) => {
    try {
        const newTaskAnalysis = await TaskAnalysisModel.create(req.body);
    
        if (!newTaskAnalysis) {
            return res.status(404).json({ msg: "Task analysis creation failed" });
        }
        
        return res.status(200).json({ TaskAnalysis: newTaskAnalysis, msg: "Task analysis created successfully" });
    } catch (error) {
        next(error);
    }
};
// Get ALL TasksAnlysis
export const allTasksAnalysis = async (req, res, next) => {
    try {
        const Analysis = await TaskAnalysisModel.find();
        if (!Analysis || Analysis.length === 0) {
            return res.status(404).json({ msg: "Tasks not found" });
        }
        res.status(200).json(Analysis);
    } catch (error) {
        next(error); // Forward the error to the error handling middleware
    }
};


// Delete Task Analysis
export const deleteTaskAnalysis = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).json({ msg: "Task ID is required" });
      }
  
      const deletedTaskAnalysis = await TaskAnalysisModel.findByIdAndDelete(id);
  
      if (!deletedTaskAnalysis) {
        return res.status(404).json({ msg: "Task analysis not found" });
      }
  
      return res.status(200).json({ msg: "Task analysis deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
  

