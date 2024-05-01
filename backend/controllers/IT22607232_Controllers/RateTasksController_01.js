import TaskRating from '../../models/IT22607232_Models/RateCompeletdTasksModel_01.js';


const createRating = async (req, res) => {
    try {
      const { Ratings } = req.body;
  
      // Check if the required fields are provided
      if (!Ratings) {
        return res.status(400).json({ success: false, error: 'Rating value is required' });
      }
  
      // Create a new rating document
      const newRating = await TaskRating.create({ Ratings });
  
      res.status(201).json({ success: true, data: newRating });
    } catch (error) {
      console.error('Error creating rating:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  };
  
  export { createRating };


  //get ratings
  const getRatings = async (req, res) => {
    try {
      const ratings = await TaskRating.find();
  
      res.status(200).json({ success: true, data: ratings });
    } catch (error) {
      console.error('Error fetching ratings:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }

    export { getRatings };