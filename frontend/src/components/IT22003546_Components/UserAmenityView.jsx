import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TextInput, Button } from "flowbite-react";

const BoxTile = ({ amenity }) => {


  const handleClick = (e) => {
    if (amenity.amenityStatus === "Unavailable") {
      e.preventDefault(); // Prevent the Link from navigating
      alert('This amenity is currently unavailable.'); // Show an alert
    }
  };

  const unavailableOverlay = (
    <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <img src="https://png.pngtree.com/png-vector/20220206/ourmid/pngtree-unavailable-grunge-rubber-stamp-retro-isolated-page-vector-png-image_35242026.png" alt="Unavailable" className="w-1/2 opacity-100" />
    </div>
  );

  return (
    <div className={`bg-white border border-gray-300 p-4 rounded-md shadow-md mt-4 relative ${amenity.amenityStatus === "Unavailable" ? "opacity-75" : ""}`}>
      <Link to={`/each-amenity/${amenity._id}`} onClick={handleClick}>
        <img src={amenity.imageURLs[0]} alt={amenity.amenityTitle} className="w-full h-60 object-cover rounded-md mb-2" />
        {amenity.amenityStatus === "Unavailable" && unavailableOverlay}
      </Link>  
      <div className="absolute bottom-5 left-5 right-0 text-black p-3" style={{ textShadow: "0 0 2px white, 0 0 2px white, 0 0 2px white, 0 0 2px white" }}>
        <h1 className="text-2xl font-bold">{amenity.amenityTitle}</h1>
      </div>

      
    </div>
  );
  
};

const ResidentAmenityView = () => {
  const [amenities, setAmenities] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [showUnavailableOnly, setShowUnavailableOnly] = useState(false);

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

  const filteredAmenities = amenities.filter((amenity) => {
    return (
        amenity.amenityTitle.toLowerCase().includes(searchInput.toLowerCase()) ||
        amenity.amenityLocation.toLowerCase().includes(searchInput.toLowerCase())
       ) && (
            (!showAvailableOnly || amenity.amenityStatus === 'Available') &&
            (!showUnavailableOnly || amenity.amenityStatus === 'Unavailable')
    );
  });

  const handleChange = (e) => {
    console.log("Search query:", e.target.value);
    setSearchInput(e.target.value);
  };

  const handleToggleAvailableOnly = () => {
      setShowAvailableOnly(!showAvailableOnly);
  };

  const handleToggleUnavailableOnly = () => {
      setShowUnavailableOnly(!showUnavailableOnly);
  };

  console.log("Table Amenities:", filteredAmenities);
  console.log("Filtered Amenities:", filteredAmenities);

  return (
    <div>
      <h1 className="text-center mt-7 font-extrabold text-3xl underline">Amenities</h1>
      <div className="flex gap-4 mb-4 pt-4 pl-5">
        <TextInput
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange= {handleChange}
        />
        <Button onClick={handleToggleAvailableOnly} className={showAvailableOnly ? 'bg-green-500 text-white' : 'bg-gray-200'}>
            Show Available Amenities
        </Button>
        {/* <Button onClick={handleToggleUnavailableOnly} className={showUnavailableOnly ? 'bg-red-500 text-white' : 'bg-gray-200'}>
            Show Unavailable Amenities
        </Button> */}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {filteredAmenities.map((amenity) => (
          <BoxTile key={amenity._id} amenity={amenity} />
        ))}
        {amenities.length === 0 && <p>No amenities available</p>}
      </div>
    </div>  
  );
};

export default ResidentAmenityView;
