import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BoxTile = ({ amenity }) => {
  return (
    <div className="bg-white border border-gray-300 p-4 rounded-md shadow-md mt-4">
      <h3 className="text-xl font-semibold mb-2">{amenity.amenityTitle}</h3>
      
      <Link
        to={`/each-amenity/${amenity._id}`}
        className="mt-2 inline-block text-blue-500 hover:underline"
      >
        View Details
      </Link>
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
