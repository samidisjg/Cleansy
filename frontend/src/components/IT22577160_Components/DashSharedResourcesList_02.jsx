import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Modal, Table, Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

const DashSharedResourcesList_02 = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [sharedResources, setSharedResources] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);

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
                          <span className='font-medium text-red-500 hover:underline cursor-pointer'>
                            Delete
                          </span>
                        </Table.Cell>
                        <Table.Cell>
                          <Link className="text-teal-500 hover:underline" to={`/update-resources/${resources._id}`}>
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
    </div>
  )
}

export default DashSharedResourcesList_02