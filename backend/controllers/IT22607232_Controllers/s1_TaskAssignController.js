import TaskAssign from "../../models/IT22607232_Models/s1_AssignTasksModel.js";
import nodemailer from 'nodemailer';
import dotenv from "dotenv";
import { text } from "express";
dotenv.config();


//Send Email
/*export const sendEmail = async(req,res)=>{
  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // Your email address from environment variables
        pass: process.env.EMAIL_PASS // Your password from environment variables
      }
    });

    // Send mail with defined transport object
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Sender email address
      to: req.params.email, // Recipient email address
      subject: `New Task Assigned: ${req.params.TaskID}`,
      text : `Category: ${req.params.Category}\nAssignDate: ${req.params.AssignDate}\nName: ${req.params.Name}}`,

    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}*/

//Create Task Assigning
/*export const TaskAssigning = async (req, res, next) => {
  try {
    const newTaskAssign = await TaskAssign.create(req.body);

    if (!newTaskAssign) {
      return res.status(404).json({ msg: "Task Assigning failed" });
    }
    sendEmail(req,res);
    return res
      .status(200)
      .json({ taskAssign: newTaskAssign, msg: "Task Assigned Successfully" });
  } catch (error) {
    next(error);
  }
};*/

// Send Email
export const sendEmail = async (req, res, next) => {
  /*try {*/
    const { to, subject, text } = req.body;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Send mail with defined transport object
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text
    });

    /*console.log('Email sent successfully');*/
    //res.status(200).json({ message: 'Email sent successfully' });
  /*} catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }*/
};


export const TaskAssigning = async (req, res, next) => {
  try {
    const newTaskAssign = await TaskAssign.create(req.body);

    if (!newTaskAssign) {
      return res.status(404).json({ msg: "Task Assigning failed" });
    }

    // Send email notification
    const subject = `New Task Assigned: ${newTaskAssign.TaskID}`;
    const text = `Category: ${newTaskAssign.Category}\nAssignDate: ${newTaskAssign.AssignDate}\nName: ${newTaskAssign.Name}`;
    sendEmail({ body: { to: newTaskAssign.email, subject, text } });

    res.status(200).json({ taskAssign: newTaskAssign, message: 'Task assigned successfully' });
  } catch (error) {
    console.error('Error assigning task:', error);
    res.status(500).json({ error: 'Failed to assign task' });
  }
};


//Get ALL Task Assiged
export const allTasks = async (req, res, next) => {
    try {
      const Scheduling = await TaskAssign.find();
      if (!Scheduling) {
        res.status(404).json({ msg: "Tasks not found" });
      }
      res.status(200).json(Scheduling);
    } catch (error) {
      next(error);
      res.status(500).json({ error: error });
    }
};


//get One Task by TaskID
export const oneTask = async (req, res,next) => {
  try {
    let taskid = req.params.taskid;
    const taskOne = await TaskAssign.findOne({_id: taskid});

    if (!taskOne) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(taskOne);
  } catch (error) {
    console.error("Error retrieving task:", error);
    next(error);
    return res.status(500).json({ error: "Internal server error" });
   
  }
};

/*//Update course by Admin
export const updateTask = async (req,res,next)=>{
  try{
    TaskAssign.findByIdAndUpdate({ taskid: req.params.taskid }, updateTask).then(result => {
      console.log(result);
      res.status(200).json({ message: "Successfully Task Updated" })
  })
}
catch (error) {
  console.error("Error retrieving task:", error);
  next(error);
  return res.status(500).json({ error: "Internal server error" });
 
}
}*/

// Update Task by Facility manager
export const updateTask = async (req, res, next) => {
  try {
    const taskId = req.params.taskid;
    const updateTaskData = req.body; //declaring updated data

    const updatedTask = await TaskAssign.findByIdAndUpdate(taskId, updateTaskData, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Successfully Task Updated", updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    next(error); //pass error to error handling middleware
  }
};


//delete Tasks
export const deleteTask = async(req,res,next)=>{
  try{
    await TaskAssign.findByIdAndDelete(req.params.taskid)
    res.status(200).json({ message: "Successfully Deleted assigned task" })
  }
  catch (error){
    return res.status(500).json({msg: error.message})
  
  }
}
 
 