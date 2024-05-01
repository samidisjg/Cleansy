import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdLocationOn, MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { Table, Button } from "flowbite-react";
import jsPDF from 'jspdf'
import "jspdf-autotable";


const DashServiceList_06 = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [serviceListing, setServiceListing] = useState([]);
  const [showServiceListingError, setShowServiceListingError] = useState(false);

  useEffect(() => {
    fetchServiceListings();
  }, [currentUser._id]);

  // Fetch service listings from the database
  const fetchServiceListings = async () => {
    try {
      const response = await fetch("/api/serviceListing/read");
      const data = await response.json();
      if (data.success === false) {
        setShowServiceListingError(true);
        return;
      }
      setServiceListing(data);
    } catch (error) {
      setShowServiceListingError(true);
    }
  };


  const handleServiceListingDelete = async (_id) => {
    try {
      // Display confirmation dialog
      const confirmed = window.confirm("Are you sure you want to delete this service listing?");
      if (!confirmed) {
        return;
      }

      // Send DELETE request to delete endpoint
      const response = await fetch(`/api/serviceListing/delete/${_id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      // Update state to remove deleted service listing
      setServiceListing((prev) =>
        prev.filter((service) => service._id !== _id)
      );
      // show success message
      alert("Service listing deleted successfully");

      // Hide modal (if applicable)
      setShowModal(false);
    } catch (error) {
      console.log(error.message);
    }
  };


  const generatePDF = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: '#service-table' });
    doc.save('service_listing.pdf');
  };

  

  return (
    <div className="w-full table-auto">
      <h1 className="text-center mt-7 font-extrabold text-3xl underline">
        Service Listing
      </h1>
      {currentUser.isFacilityServiceAdmin && (
        <>
          <Table hoverable className="w-full">
            <Table.Head>
              <Table.HeadCell>Service ID</Table.HeadCell>
              <Table.HeadCell>Service Name</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
              <Table.HeadCell>Type</Table.HeadCell>
              <Table.HeadCell>Availability</Table.HeadCell>
              <Table.HeadCell>Phone</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Requirements</Table.HeadCell>
              <Table.HeadCell>imageUrls</Table.HeadCell>
              <Table.HeadCell onClick={() => handleServiceListingDelete}>
                Delete
              </Table.HeadCell>
              <Table.HeadCell>Update</Table.HeadCell>
            </Table.Head>

            {serviceListing.map((service) => (
              <Table.Body key={service._id} className="divide-y-0">
                <Table.Row>
                  <Table.Cell>{service.serviceID}</Table.Cell>
                  <Table.Cell>{service.serviceName}</Table.Cell>
                  <Table.Cell>{service.serviceDescription}</Table.Cell>
                  <Table.Cell>{service.servicePrice}</Table.Cell>
                  <Table.Cell>{service.serviceType}</Table.Cell>
                  <Table.Cell>{service.serviceAvailability}</Table.Cell>
                  <Table.Cell>{service.servicePhone}</Table.Cell>
                  <Table.Cell>{service.serviceEmail}</Table.Cell>
                  <Table.Cell>{service.serviceRequirements}</Table.Cell>
                  <Table.Cell>
                    {service.imageUrls.map((imageUrl, index) => (
                      <img
                        key={index}
                        src={imageUrl}
                        alt={`Image ${index}`}
                        style={{ width: "100px", height: "100px" }}
                      />
                    ))}
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      onClick={() =>
                        handleServiceListingDelete(service._id)
                      }
                    >
                      <FaTrash />
                    </Button>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/service-update/${service._id}`}>
                      <Button>
                        <MdEdit />
                      </Button>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </>
      )}
      <Button onClick={generatePDF}>Download PDF</Button>
          <Table id="service-table" hoverable className="w-full">
            {/* Table content */}
          </Table>
    </div>
    
  );
};

export default DashServiceList_06;
