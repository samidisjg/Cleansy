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
