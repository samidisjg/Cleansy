import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ResidentServiceView = ({ service }) => {
  return (
    <div className="bg-white border border-gray-300 p-4 rounded-md shadow-md mt-4 relative">
      <Link to={`/book-service/${service._id}`}>
        <img src={service.imageUrls} alt={service.serviceName} className="w-full h-60 object-cover rounded-md mb-2" />
      </Link>  
      <div className="absolute bottom-5 left-5 right-0 text-black p-3" style={{ textShadow: "0 0 2px white, 0 0 2px white, 0 0 2px white, 0 0 2px white" }}>
        <h1 className="text-2xl font-bold">{service.serviceName}</h1>
      </div>

      
    </div>
  );
  
};

const ResidentView = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/serviceListing/read");
      const data = await res.json();
      if (data.success === false) {
        console.error("Error fetching services");
        return;
      }
      setServices(data);
    } catch (error) {
      console.error("Error fetching services", error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {services.map((service) => (
        <ResidentServiceView key={service._id} service={service} />
      ))}
      {services.length === 0 && <p>No service available</p>}
      
    </div>
    
  );
};

export default ResidentView;