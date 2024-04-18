import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BoxTile = ({ amenity }) => {
  return (
    <div className="bg-white border border-gray-300 p-4 rounded-md shadow-md mt-4 relative">
      <Link to={`/each-amenity/${amenity._id}`}>
        <img src={amenity.imageURLs} alt={amenity.amenityTitle} className="w-full h-60 object-cover rounded-md mb-2" />
      </Link>  
      <div className="absolute bottom-5 left-5 right-0 text-black p-3" style={{ textShadow: "0 0 2px white, 0 0 2px white, 0 0 2px white, 0 0 2px white" }}>
        <h1 className="text-2xl font-bold">{amenity.amenityTitle}</h1>
      </div>

      
    </div>
  );
  
};

const ResidentAmenityView = () => {
  const [amenities, setAmenities] = useState([]);

  useEffect(() => {
    fetchAmenities();
  }, []);

  const fetchAmenities = async () => {
    try {
      const res = await fetch("/api/amenitiesListing/get");
      const data = await res.json();
      if (data.success === false) {
        console.error("Error fetching amenities");
        return;
      }
      setAmenities(data);
    } catch (error) {
      console.error("Error fetching amenities", error);
    }
  };

  return (
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {amenities.map((amenity) => (
        <BoxTile key={amenity._id} amenity={amenity} />
      ))}
      {amenities.length === 0 && <p>No amenities available</p>}
    </div>
  );
};

export default ResidentAmenityView;
