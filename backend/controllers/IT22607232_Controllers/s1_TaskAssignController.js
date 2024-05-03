import TaskAssign from "../../models/IT22607232_Models/s1_AssignTasksModel.js";
import nodemailer from 'nodemailer';
import dotenv from "dotenv";
import { text } from "express";
dotenv.config();


//Send Email
export const sendEmail = async(req,res,next)=>{
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
      to: 'samiconquer727@gmail.com', // Recipient email address
      subject: req.params.subject, 
      text: req.params.text 
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
 

//------------------------------------------------------------------------------------------------------------------

/*export const sendEmail = async (req, res, next) => {
//app.post('/send-email', (req, res) => {
    // Extract email data from the request body
    const { to, subject, text } = req.body;

    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'Gmail', // Use your email service provider
        auth: {
            user: process.env.EMAIL_USER, // Your email address from environment variables
            pass: process.env.EMAIL_PASS // Your password from environment variables
        }
    });

    // Create email data
    let mailOptions = {
      from: process.env.EMAIL_USER, // Sender email address
      to: 'sandalirj@gmail.com', // Recipient email address
      subject: 'Hello from Nodemailers Moda Samidi', // Subject line
      text: 'This is a test email sent from Nodemailer!' // Plain text body
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred:', error.message);
            res.status(500).send('Error occurred while sending email.');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Email sent successfully.');
        }
    });
};
*/

//----------------------------------------------------------------------------------------------------------------
/*
// Create a transporter object using SMTP transport
let transporter = nodemailer.createTransport({
  service: 'Gmail', // Use your email service provider
  auth: {
      user: process.env.EMAIL_USER, // Your email address from environment variables
      pass: process.env.EMAIL_PASS // Your password from environment variables
  }
});


// Create email data
let mailOptions = {
    from: process.env.EMAIL_USER, // Sender email address
    to: 'sandalirj@gmail.com', // Recipient email address
    subject: 'Hello from Nodemailer Moda Samidi', // Subject line
    text: 'This is a test email sent from Nodemailer!' // Plain text body
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error occurred:', error.message);
    } else {
        console.log('Email sent:', info.response);
    }
});
*/
//----------------------------------------------------------------------------------------------------------------


//Create Task Assigning
export const TaskAssigning = async (req, res, next) => {
  try {
    const newTaskAssign = await TaskAssign.create(req.body);

    if (!newTaskAssign) {
      return res.status(404).json({ msg: "Task Assigning failed" });
    }
    return res
      .status(200)
      .json({ taskAssign: newTaskAssign, msg: "Task Assigned Successfully" });
  } catch (error) {
    next(error);
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
 
 