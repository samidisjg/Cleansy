import TaskRating from "../../models/IT22607232_Models/RateCompeletdTasksModel_01.js";

export const RateTask = async (req, res, next) => {
  try {
    const taskId = req.params.taskid;
    const RateTaskData = req.body; 

    const RatedTask = await TaskRating.findByIdAndUpdate(
      taskId,
      RateTaskData,
      { new: true }
    );

    if (!RatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Successfully Task Rated", RatedTask });
  } catch (error) {
    console.error("Error Rating task:", error);
    next(error); //pass error to error handling middleware
  }
};
