import TaskAssign from "../../models/IT22607232_Models/s1_AssignTasksModel.js";

export const TaskAssigning = async (req, res, next) => {
   try {
      const newTaskAssign = await  TaskAssign.create(req.body);
      return res.status(201).json(newTaskAssign);
   } catch (error) {
      next(error);
   }
}