import { Button, Table } from 'flowbite-react';
import { useEffect, useState } from 'react'
import { GrResources } from 'react-icons/gr';
import { HiAnnotation, HiArrowNarrowUp } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const PropertyAdminDashboard_02 = () => {
   const [comments, setComments] = useState([])
   const [sharedResources, setSharedResources] = useState([]);
   const [totalResources, setTotalResources] = useState(0);
   const [totalComments, setTotalComments] = useState(0)
   const [lastMonthResources, setLastMonthResources] = useState(0)
   const [lastMonthComments, setLastMonthComments] = useState(0)
   const { currentUser } = useSelector((state) => state.user)

   useEffect(() => {
      const fetchResources = async () => {
         try {
            const res = await fetch(`/api/sharedResourcesListing/getSharedResources?limit=5`)
            const data = await res.json()
            if(res.ok) {
               setSharedResources(data.resources);
               setTotalResources(data.totalResources)
               setLastMonthResources(data.lastMonthResources)
            }
         } catch (error) {
            console.log(error.message)
         }
      }
      const fetchComments = async () => {
         try {
            const res = await fetch(`/api/comment/getComments?limit=6`)
            const data = await res.json()
            if(res.ok) {
               setComments(data.comments)
               setTotalComments(data.totalComments)
               setLastMonthComments(data.lastMonthComments)
            }
         } catch (error) {
            console.log(error.message)
         }
      }

      if(currentUser.isPropertyAdmin) {
         fetchResources()
         fetchComments()
      }
   }, [currentUser])

  return (
    <div className='p-3 md:mx-auto'>
      <div className="flex flex-wrap gap-4 justify-center">
         <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-96 rounded-md shadow-md w-full">
            <div className="flex justify-between">
               <div className="">
                  <h3 className='text-gray-500 text-md uppercase'>Total Shared Resources</h3>
                  <p className='text-2xl'>{totalResources}</p>
               </div>
               <GrResources className='bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg' />
            </div>
            <div className="flex gap-2 text-sm">
               <span className='text-green-500 flex items-center'>
                  <HiArrowNarrowUp />
                  {lastMonthResources}
               </span>
               <div className="text-gray-500">Last Month</div>
            </div>
         </div>
         <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-96 rounded-md shadow-md w-full">
            <div className="flex justify-between">
               <div className="">
                  <h3 className='text-gray-500 text-md uppercase'>Total Comments</h3>
                  <p className='text-2xl'>{totalComments}</p>
               </div>
               <HiAnnotation className='bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg' />
            </div>
            <div className="flex gap-2 text-sm">
               <span className='text-green-500 flex items-center'>
                  <HiArrowNarrowUp />
                  {lastMonthComments}
               </span>
               <div className="text-gray-500">Last Month</div>
            </div>
         </div>
      </div>
      <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
         <div className="flex flex-col w-full md:w-auto shadow-md p-2 dark:bg-gray-800 rounded-md overflow-x-scroll scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
            <div className="flex justify-between p-3 text-sm font-semibold">
               <h1 className='text-center p-2'>Recent Resources</h1>
               <Button gradientDuoTone='purpleToPink' outline>
                  <Link to={"/dashboard?tab=properties"}>
                     See All
                  </Link>
               </Button>
            </div>
            <Table hoverable>
               <Table.Head>
                  <Table.HeadCell>Resource Image</Table.HeadCell>
                  <Table.HeadCell>Resource Title</Table.HeadCell>
                  <Table.HeadCell>Category</Table.HeadCell>
               </Table.Head>
               {
                  sharedResources && sharedResources.map((resource) => (
                     <Table.Body key={resource._id} className="divide-y">
                        <Table.Row className='bg-white border dark:border-gray-700 dark:bg-gray-800'>
                           <Table.Cell>
                              <img src={resource.image} alt="resource" className='w-14 h-10 rounded-md bg-gray-500' />
                           </Table.Cell>
                           <Table.Cell className="line-clamp-2">{resource.title}</Table.Cell>
                           <Table.Cell>{resource.category}</Table.Cell>
                        </Table.Row>
                     </Table.Body>
                  ))
               }
            </Table>
         </div>
         <div className="flex flex-col w-full md:w-auto shadow-md p-2 dark:bg-gray-800 rounded-md overflow-x-scroll scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
            <div className="flex justify-between p-3 text-sm font-semibold">
               <h1 className='text-center p-2'>Recent Comments</h1>
               <Button gradientDuoTone='purpleToPink' outline>
                  <Link to={"/dashboard?tab=comments"}>
                     See All
                  </Link>
               </Button>
            </div>
            <Table hoverable>
               <Table.Head>
                  <Table.HeadCell>Comment Content</Table.HeadCell>
                  <Table.HeadCell>Likes</Table.HeadCell>
               </Table.Head>
               {
                  comments && comments.map((comment) => (
                     <Table.Body key={comment._id} className="divide-y">
                        <Table.Row className='bg-white border dark:border-gray-700 dark:bg-gray-800'>
                           <Table.Cell>
                              <p className="line-clamp-2">{comment.content}</p>
                           </Table.Cell>
                           <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                        </Table.Row>
                     </Table.Body>
                  ))
               }
            </Table>
         </div>
      </div>
    </div>
  )
}

export default PropertyAdminDashboard_02