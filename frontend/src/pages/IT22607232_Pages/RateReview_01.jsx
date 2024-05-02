import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { FaTasks, FaStar } from "react-icons/fa";

const RateReview_01 = () => {
  const [showTasksError, setShowTasksError] = useState(false);
  const [showTasks, setShowTasks] = useState([]);
  const dispatch = useDispatch();
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  

  const navigate = useNavigate();
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    TaskID: "",
    Category: "",
    Name: "",
    Ratings: "",
    WorkGroupID: "",
    Location: "",
    DurationDays: "2",
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);

  useEffect(() => {
    const fetchTask = async () => {
      const taskid = params.taskid;
      const res = await fetch(`/api/taskAssign/one/${taskid}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData({
        TaskID: data.TaskID,
        Category: data.Category, 
        Name: data.Name,
        Ratings: data.Ratings,
        WorkGroupID: data.WorkGroupID,
        Location: data.Location,
        DurationDays: data.DurationDays.toString(),
      });
    };
    fetchTask();
  }, []);

  const handleClick = (value) => {
    if (rating === value) {
      // If the same star is clicked again, reset the rating
      setRating(null);
    } else {
      setRating(value);
    }
  };

  const handleChange = (e) => {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: boolean !== null ? boolean : e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!rating) {
        setError("Please provide a rating");
        return;
      }
      
      setLoading(true);
      setError(false);
  
      const res = await fetch("/api/taskRating/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Ratings: rating, 
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (!data.success) {
        setError(data.error);
        return;
      }
  
      navigate("/star-ratingWorkers");
    } catch (error) {
      setError("Internal Server Error");
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen mt-20" style={{ backgroundImage: "url('./components/IT22607232_Components/images_01/man2.jpeg')" }}>

      <main>
        <h1 className="text-3xl text-center mt-6 font-extrabold underline text-blue-950 dark:text-slate-300">
          Task Rating And Review
        </h1>
      </main>
      <div className="flex p-3 w-[40%] mx-auto flex-col md:flex-row md:items-center gap-20 md:gap-20 mt-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full justify-center"
        >
          <div>
            <Label value="TaskID: " />
              {formData.TaskID}
            
            
          </div>
          <div>
            <Label value="Category: " />
            
              
              {formData.Category}
            
          </div>
          <div>
            <Label value="Location:  " />
        
              {formData.Location}
         
          </div>
          <div>
            <Label value="Duration (Days):  " />
          
              {formData.DurationDays}
           
          </div>

          <div>
            <Label value="Name" />
            <p className="text-sm text-black-500 dark:text-slate-300">
              {formData.Name}
            </p>
          </div>

          <div>
            <Label value="WorkGroupID" />
            <p className="text-sm text-black-500 dark:text-slate-300">
              {formData.WorkGroupID}
            </p>
          </div>

         

        
          <div>
            <Label value="Review" />
            <Textarea
              type="textarea"
              name="Ratings"
              placeholder="Add a Review..."
              rows="3"
              maxLength="200"
              required
              onChange={handleChange}
              value={formData.review_Text}
            />
          </div>
          <div>
          <Label value="Rating" />
          <div className="flex justify-center items-center">
          
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <FaStar
          name="Ratings"
            key={i}
            className="cursor-pointer"
            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
            size={35}
            onClick={() => handleClick(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
            required
          />
          
        );
      })}
      <p className="ml-4">The rating is {rating || 'not rated'}.</p>
    </div>
    </div>
          <div>
            <div></div>
          </div>
          <Button
            type="submit"
            gradientDuoTone="purpleToBlue"
            className="uppercase"
          >
            {loading ? "Rating..." : "Rate & Review"}
          </Button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default RateReview_01;
