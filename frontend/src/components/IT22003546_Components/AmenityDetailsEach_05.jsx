import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const AmenityDetails = () => {
  const { amenityId } = useParams();
  const [amenity, setAmenity] = useState(null);

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

  return (
    <div className="max-w-5xl mx-auto px-1 py-8">
      {/* Transparent Image Overlay */}
      <img
        src={amenity.imageURLs[1]}
        alt="Transparent Image"
        className="absolute inset-0 w-full h-full opacity-10"
        style={{ pointerEvents: "none" }} // Prevent interaction with the image
      />
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">
        {amenity.amenityTitle}
      </h1>
      <img src={amenity.imageURLs} alt={amenity.amenityTitle} className="w-full h-64 object-cover rounded-md mb-6 opacity-100" />
      <p className="text-lg text-gray-600 mb-6">{amenity.amenityDescription}</p>
      
      <div className="border-t border-gray-200 pt-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Other Details</h2>
        <p className="text-gray-600">
          Location: {amenity.amenityLocation}
        </p>
        <p className="text-gray-600">
          Capacity: {amenity.amenityCapacity}
        </p>
        <p className="text-gray-600">
            Available Times: <b>{amenity.amenityAvailableTimes}</b>
        </p>
        <p className="text-gray-600">
            Price: LKR {amenity.amenityPrice}
        </p>
        
      </div>

      <div className="mt-8">
        <Link
          to={`/book-amenity/${amenityId}`}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default AmenityDetails;
