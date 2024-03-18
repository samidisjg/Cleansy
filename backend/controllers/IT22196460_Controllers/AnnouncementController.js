import Announcement from "../../models/IT22196460_Models/AnnouncementModel";

// create a new announcement 
export const createAnnouncement = async(req, res, Next) => {
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
        res.status(201).json(savedAnnouncement);
    } catch(error){
        console.error("Error creating announcement : ", error.message);
        res.status(500).json({message: "Faild to create announcement"});
    }
}

// Read all announcements
export const getAnnouncements = async(req, res, next) => {
    try{
        const announcement = await Announcement.find();
        res.status(200).json(announcement);
    } catch(error){
        console.error("Error fetching announcements: ",error.message);
        res.status(500).json({message: "Failed to fetch announcements"});
    }
}

// Update announcement
export const updateAnnouncement = async(req, res, next) => {

    const {Announcement_ID, Title, Content, Category_ID, Attachment_URL, Create_At} = req.body;

    const updateAnnouncement = {
        Announcement_ID, 
        Title, 
        Content,
        Category_ID, 
        Attachment_URL, 
        Create_At
    };

    try{
        const updateAnnouncement = await Announcement.findByIdAndUpdate(
            req.params.id,
            updatedFields,
            {new: true}
        );
        if(!updateAnnouncement){
            return res.status(404).json({message: "Announcement not found" });
        }

        res.status(200).json(updateAnnouncement);

    }catch{

        console.error("Error updating announcement:", error.message);
        res.status(500).json({message: "Failed to update announcement"});
    }
}

//Delete announcement
export const deleteAnnouncement = async(req, res, next) => {

    try {
        const deleteAnnouncement = await Announcement.findByIdAndDelete(req.params.id);

        if(!deleteAnnouncement){
            return res.status(404).json({ message: "Announcement not found"});
        }
        res.status(200).json({message: "Announcement deleted successfully"});
    } catch(error){

        console.error("Error deleting announcement:", error.message);
        res.status(500).json({message: "Failed to delete announcement "});
    }
}

//Read announcement
export const getAnnouncement = async(req, res, next) => {

    try{
        const announcement = await Announcement.findById(req.params.id);

        if(!announcement) {
            return res.status(404).json({message: "Announcement not found"});
        }
        res.status(200).json(announcement);
    }catch(error){

        console.error("Error fetching announcement:", error.message);
        res.status(500).json({message: "Failed to fetch announcemen"});
    }
}


module.exports = router;
