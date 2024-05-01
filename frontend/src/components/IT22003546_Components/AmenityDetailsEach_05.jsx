import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { MdEventAvailable } from "react-icons/md";
import { IoIosPricetag } from "react-icons/io";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const AmenityDetails = () => {
  const { amenityId } = useParams();
  const [amenity, setAmenity] = useState(null);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const fetchAmenityDetails = async () => {
      try {
        const res = await fetch(`/api/amenitiesListing/get/${amenityId}`);
        const data = await res.json();
        if (data.success === false) {
          console.error("Error fetching amenity details");
          return;
        }
        setAmenity(data);
      } catch (error) {
        console.error("Error fetching amenity details", error);
      }
    };

    fetchAmenityDetails();
  }, [amenityId]);

  if (!amenity) {
    return <p className="text-center mt-8 text-gray-600">Loading...</p>;
  }

  

  const onChange = (selectedDate) => {
    setDate(selectedDate);
  };

  return (
    <div className="font-sans">
      <div className="pl-4 pt-0">
        <Link
          to={"/amenity-User:amenityID"}
          className="text-black-500 font-semibold hover:underline"
          style={{ display: "block", paddingTop: "1px" }}
        >
          ← Amenity
        </Link>
      </div> 
      
      <div className="max-w-5xl mx-auto px-1 py-0">
        
        <div className="max-w-5xl mx-auto px-1 py-8 flex flex-col items-start justify-center">
          {/* Transparent Image Overlay */}
          <img
            src={amenity.imageURLs[0]}
            alt="Transparent Image"
            className="absolute inset-0 w-full opacity-10"

            style={{ pointerEvents: "none", zIndex: -1 }}
          />
    
          <div className="max-w-5xl mx-auto px-1 py-0 flex items-center">
            <div>
              <div className="flex items-center justify-center gap-2">
                <h1 className="text-5xl font-semibold text-gray-800 mb-4 dark:text-white">
                  {amenity.amenityTitle}
                </h1>
              </div>

              <img
                src={amenity.imageURLs[1]}
                alt={amenity.amenityTitle}
                className="w-full h-80 object-cover rounded-md mb-6"
              />
              
              <div className="border border-gray-300 p-5 rounded-md shadow-md mt-5 relative">
                <p className="text-lg text-gray-600 mb-6 dark:text-white text-center" >{amenity.amenityDescription}</p>
              </div>
              <div className="grid grid-cols-2 pt-5">
                <div className="pt-4">
                  <div className="bg-white border border-gray-200 rounded-md p-6" >
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Other Details</h2>
                    
                    <p className="text-gray-600 flex items-center mb-4">
                      <FaLocationDot className="mr-2" size={20} />
                      Location : {amenity.amenityLocation}
                    </p>

                    <p className="text-gray-600 flex item-center mb-4">
                      <IoIosPeople className="mr-1" size={23}/>
                      Capacity : {amenity.amenityCapacity}
                    </p>

                    <p className="text-gray-600 flex items-center mb-4"> 
                      <MdEventAvailable className="mr-2" size={23}/>
                      Availability : {amenity.amenityAvailableTimes}
                    </p>

                    <p className="text-gray-600 flex items-center">
                    <IoIosPricetag className="mr-2" size={23}/>
                      Price: LKR {amenity.amenityPrice}
                    </p>
                  </div>
                  </div> 
                  <div className="pl-20 ">
                    <div>
                      <div>
                        <div>
                          <Calendar onChange={onChange} value={date} />
                        </div>
                        <div style={{ visibility: "hidden" }}> 
                        {date.toLocaleDateString()}
                        </div>
                      </div>
                      <div className="mt-3 flex justify-right pl-32">
                        <Link
                          to={`/book-amenity/${amenityId}`}
                          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                  </div> 
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 

export default AmenityDetails;
