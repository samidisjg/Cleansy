import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Modal, Table, Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import jsPDF from 'jspdf'
import "jspdf-autotable";

const DashSharedResourcesList_02 = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [sharedResources, setSharedResources] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [resourceIdToDelete, setResourceIdToDelete] = useState('');

  useEffect(() => {
    const fetchSharedResources = async () => {
      try {
        const res = await fetch(`/api/sharedResourcesListing/getSharedResources?userId=${currentUser._id}`)
        const data = await res.json()
        if(res.ok) {
          setSharedResources(data.resources);
          if(data.resources.length < 9) {
            setShowMore(false)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchSharedResources()
  }, [currentUser._id])

  const handleShowMore = async () => {
    const startIndex = sharedResources.length;
    try {
      const res = await fetch(`/api/sharedResourcesListing/getSharedResources?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok) {
        setSharedResources((prev) => [...prev, ...data.resources]);
        if(data.resources.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleDeleteResources = async () => {
    try {
      const res = await fetch(`/api/sharedResourcesListing/deleteSharedResource/${resourceIdToDelete}/${currentUser._id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if(!res.ok) {
        console.log(data.message);
      } else {
        setSharedResources((prev) => prev.filter((resource) => resource._id !== resourceIdToDelete));
        setShowModal(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const resourceGeneratePDF = async () => {
    const payDoc = new jsPDF();
    const tableColumn = ["Date Updated", "Resource Title", "Category", "Quantity", "Sale/Rent", "Price"];
    const tableRows = [];

    sharedResources.forEach(resource => {
      const rowData = [
        new Date(resource.updatedAt).toLocaleDateString(),
        resource.title,
        resource.category,
        resource.quantity,
        resource.type,
        resource.regularPrice - resource.discountPrice
      ];
      tableRows.push(rowData);
    })

    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const date = d.getDate();

    const logo = "/cleansyBG.png";

    const imgWidth = 160;
    const imgHeight = 120;

    const centerX = (payDoc.internal.pageSize.getWidth() - imgWidth / 0.9);
    const centerY = (payDoc.internal.pageSize.getHeight() - imgHeight /0.5);

    payDoc.text(
      "Cleansy Sustainable Community Management System Pvt Ltd",
      14,
      15
    )

    const addWatermark = () => {
      payDoc.addImage(logo, "JPEG", centerX, centerY, imgWidth, imgHeight);
    }

    payDoc.text(`Shared Resources Report - ${year}/${month}/${date}`, 14, 25);
    payDoc.autoTable(tableColumn, tableRows, { startY: 40, addPageContent: addWatermark});
    payDoc.save(`sharedResources_Report_${year}_${month}_${date}.pdf`);
  }

  return (
    <div className="w-full table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {
        currentUser.isPropertyAdmin && sharedResources.length >  0 ? (
          <>
            <Table hoverable className='shadow-md'>
                <Table.Head>
                  <Table.HeadCell>Date Updated</Table.HeadCell>
                  <Table.HeadCell>Resource Image</Table.HeadCell>
                  <Table.HeadCell>Resource Title</Table.HeadCell>
                  <Table.HeadCell>Category</Table.HeadCell>
                  <Table.HeadCell>Quantity</Table.HeadCell>
                  <Table.HeadCell>Sale/Rent</Table.HeadCell>
                  <Table.HeadCell>Price</Table.HeadCell>
                  <Table.HeadCell>Delete</Table.HeadCell>
                  <Table.HeadCell>
                    <span>Edit</span>
                  </Table.HeadCell>
                  <Table.HeadCell>
                      <Button gradientDuoTone='purpleToBlue' onClick={resourceGeneratePDF}>
                        Report
                      </Button>
                    </Table.HeadCell>
                </Table.Head>
                {sharedResources.map((resources) => (
                  <>
                    <Table.Body className='divide-y'>
                      <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                        <Table.Cell>
                          {new Date(resources.updatedAt).toLocaleDateString()}
                        </Table.Cell>
                        <Table.Cell>
                          <Link to={`/sharedResource/${resources.slug}`}>
                            <img src={resources.image} alt={resources.title} className='w-20 h-10 object-cover bg-gray-500' />
                          </Link>
                        </Table.Cell>
                        <Table.Cell>
                          <Link className="font-medium text-gray-900 dark:text-white" to={`/sharedResource/${resources.slug}`}>
                            {resources.title}
                          </Link>
                        </Table.Cell>
                        <Table.Cell>{resources.category}</Table.Cell>
                        <Table.Cell>{resources.quantity}</Table.Cell>
                        <Table.Cell>{resources.type}</Table.Cell>
                        <Table.Cell>{resources.regularPrice - resources.discountPrice}</Table.Cell>
                        <Table.Cell>
                          <span onClick={() => {
                            setShowModal(true)
                            setResourceIdToDelete(resources._id)
                          }} className='font-medium text-red-500 hover:underline cursor-pointer'>
                            Delete
                          </span>
                        </Table.Cell>
                        <Table.Cell>
                          <Link className="text-teal-500 hover:underline" to={`/update-sharedResourceListing/${resources._id}`}>
                            <span >Edit</span>
                          </Link>
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </>
                ))}
            </Table>
            {
              showMore && (
                <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>Show More</button>
              )
            }
          </>
        ) : (
          <h2>You have not created any shared resources yet</h2>
        )
      }
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this post?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteResources}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default DashSharedResourcesList_02