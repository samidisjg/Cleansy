import TaskAssign from "../../models/IT22607232_Models/s1_AssignTasksModel.js";

//Create Task Assigning
export const TaskAssigning = async (req, res, next) => {
  try {
    const newTaskAssign = await TaskAssign.create(req.body);

    if (!newTaskAssign) {
      return res.status(404).json({ msg: "Task Assigning failed" });
    }
    return res
      .status(201)
      .json(newTaskAssign, { msg: "Task Assigned Successfully" });
  } catch (error) {
    next(error);
  }
};

//Get ALL Task Assigning
export const allTasks = async (req, res, next) => {
  if (req.User.TaskID === req.params.id || req.User.isAdmin) {
    try {
      const Scheduling = await TaskAssign.find({TaskID: req.params.TaskID});
      if (!Scheduling) {
        res.status(404).json({ msg: "Task not found" });
      }
      res.status(200).json(Scheduling);
    } catch (error) {
      next(error);
      res.status(500).json({ error: error });
    }
  }
};


