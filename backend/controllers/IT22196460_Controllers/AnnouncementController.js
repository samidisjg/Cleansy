//backend\controllers\IT22196460_Controllers\AnnouncementController.js
import Announcement from "../../models/IT22196460_Models/AnnouncementModel.js";
import nodemailer from 'nodemailer';

//Function to send email notification
const sendEmailNotification = (announcement) => {
  // Create a transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'uvinduudakara001@gmail.com', // your email address
      pass: 'uvindu#%@123', // your email password
    },
  });

  // Setup email data
  let mailOptions = {
    from: '"Your Name" <uvinduudakara001@gmail.com>', // sender address
    to: 'hewageuvindu@gmail.com', // receiver address (announcement manager)
    subject: 'New Announcement Created', // subject line
    html: `<p>A new announcement has been created:</p>
           <p>Announcement ID: ${announcement.Announcement_ID}</p>
           <p>Title: ${announcement.Title}</p>
           <p>Content: ${announcement.Content}</p>
           <p>Create At: ${announcement.Create_At}</p>`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};



// create a new announcement 
export const createAnnouncement = async(req, res) => {
    const {Announcement_ID, Title, Content, Category_ID, Attachment_URL, Create_At} = req.body;

    const newAnnouncement = new Announcement({

        Announcement_ID,
        Title,
        Content,
        Category_ID,
        Attachment_URL,
        Create_At,
    });
    try{
        const savedAnnouncement = await newAnnouncement.save();

        sendEmailNotification(savedAnnouncement);
        res.status(201).json(savedAnnouncement);
    } catch(error){
        console.error("Error creating announcement : ", error.message);
        res.status(500).json({message: "Faild to create announcement"});
    }
};

// Read all announcements
export const getAnnouncements = async(req, res, next) => {
    try{
        const announcement = await Announcement.find();
        res.status(200).json(announcement);
    } catch(error){
        console.error("Error fetching announcements: ",error.message);
        res.status(500).json({message: "Failed to fetch announcements"});
    }
};

// Update announcement
export const updateAnnouncement = async(req, res) => {
    const { Announcement_ID, Title, Content, Category_ID, Attachment_URL, Create_At } = req.body;

    try {
        const updatedAnnouncement = await Announcement.findByIdAndUpdate(
            req.params.id,
            {
                Announcement_ID,
                Title,
                Content,
                Category_ID,
                Attachment_URL,
                Create_At
            },
            { new: true } // Return the updated document
        );

        if (!updatedAnnouncement) {
            return res.status(404).json({ message: "Announcement not found" });
        }
        sendEmailNotification(updateAnnouncement);

        res.status(200).json(updatedAnnouncement);
    } catch (error) {
        console.error("Error updating announcement:", error.message);
        res.status(500).json({ message: "Failed to update announcement" });
    }

}; 

//Delete announcement
export const deleteAnnouncement = async(req, res, next) => {

    try {
        const deleteAnnouncement = await Announcement.findByIdAndDelete(req.params.id);

        if(!deleteAnnouncement){
            return res.status(404).json({ message: "Announcement not found"});
        }
        sendEmailNotification(deleteAnnouncement);

        res.status(200).json({message: "Announcement deleted successfully"});
    } catch(error){

        console.error("Error deleting announcement:", error.message);
        res.status(500).json({message: "Failed to delete announcement "});
    }
};

//Read announcement
export const getAnnouncement = async(req, res, next) => {

    try{
        const announcement = await Announcement.findById(req.params.id);

        if(!announcement) {
            return res.status(404).json({message: "Announcement not found"});
        }
        res.status(200).json(announcement);
    }catch(error){

        // console.error("Error fetching announcement:", error.message);
        // res.status(500).json({message: "Failed to fetch announcemen"});
        next(error)
    }
};

// Generate report of announcements generated today
export const generateDailyReport = async (req, res) => {
    try {
        // Fetch announcements generated today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const announcements = await Announcement.find({ Create_At: { $gte: today } });

        // Return the report
        res.status(200).json({
            count: announcements.length,
            announcements: announcements
        });
    } catch (error) {
        console.error("Error generating daily report:", error.message);
        res.status(500).json({ message: "Failed to generate daily report" });
    }
};

// Fetch announcements generated today
export const getAnnouncementsToday = async (req, res) => {
    try {
        // Fetch announcements generated today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const announcements = await Announcement.find({ Create_At: { $gte: today } });

        // Return the announcements
        res.status(200).json({
            count: announcements.length,
            announcements: announcements
        });
    } catch (error) {
        console.error("Error fetching announcements today:", error.message);
        res.status(500).json({ message: "Failed to fetch announcements today" });
    }
};

// Fetch all announcements
export const getAllAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find();
        res.status(200).json(announcements);
    } catch (error) {
        console.error("Error fetching all announcements:", error.message);
        res.status(500).json({ message: "Failed to fetch announcements" });
    }
};




