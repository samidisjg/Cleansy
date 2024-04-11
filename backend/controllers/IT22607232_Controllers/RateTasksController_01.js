import TaskRating from '../../models/IT22607232_Models/RateCompeletdTasksModel_01.js';

// Create a new rating
export const createRating = async (req, res) => {
    const { TaskID, Category, Name, Description, WorkGroupID, Location, DurationDays, Ratings } = req.body; 
    const newRating = new TaskRating({
        TaskID, 
        Category,
        Name,
        Description,
        WorkGroupID,
        Location,
        DurationDays,
        Ratings: Ratings.map(rating => ({  
            user: rating.user,
            value: rating.value,
            review_Text: rating.review_Text,
            Date: rating.Date
        }))
    });

    try {
        await newRating.save();
        res.status(201).json(newRating);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};
