import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ResidentServiceView = ({ service }) => {
  return (

<div style={{ display: 'flex', justifyContent: 'center' }}>
<div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-200 bg-opacity-5 border-opacity-75 hover:bg-opacity-100">
      <img className="p-8 rounded-t-lg" src={service.imageUrls} alt={service.serviceName} />
    <div className="px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{service.serviceName}</h5>

      <div className="flex items-center mt-2.5 mb-5">
        
      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded ms-3 ${service.serviceAvailability === 'Available' ? 'bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-800' : 'bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-800'}`}>{service.serviceAvailability}</span>
      </div> 

      <p className="text-gray-600 mt-2 mb-3 dark:text-white">{service.serviceDescription}</p>

      <div className="flex items-center justify-between">
        <span>
          <p className="text-xs text-gray-900 dark:text-white">Starting from </p>
          <p className="text-1xl font-bold text-gray-900 dark:text-white">Rs. {service.servicePrice}</p>
        </span>
        <a href={`/book-service/${service._id}`} className="text-white bg-red-700 hover:bg-black-800 shadow-md focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-maroon-600 dark:hover:bg-maroon-700 dark:focus:ring-red-800">Book now</a>
      </div>
    </div>
  </div>
</div>



/*
    <div className="bg-white border border-gray-300 p-4 rounded-md shadow-md mt-4 relative">
      <Link to={`/each-amenity/${service._id}`}>
        <img src={service.imageUrls} alt={service.serviceName} className="w-full h-60 object-cover rounded-md mb-2" />
      </Link>  
      <div className="absolute bottom-5 left-5 right-0 text-black p-3" style={{ textShadow: "0 0 2px white, 0 0 2px white, 0 0 2px white, 0 0 2px white" }}>
        <h1 className="text-2xl font-bold">{service.serviceName}</h1>
      </div>

      
</div> */
  )
}

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
<div className="mt-8">
      <h1 className="text-3xl font-bold text-center mb-8">Book Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {services.map((service) => (
          <ResidentServiceView key={service._id} service={service} />
        ))}
        {services.length === 0 && <p>No service available</p>}
      </div>
    </div>
    
  );
};

export default ResidentView;