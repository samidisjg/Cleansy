import { Alert, Button, Textarea } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import Comment_02 from './Comment_02';

const CommentSection_02 = ({resourceId}) => {
   const { currentUser } = useSelector((state) => state.user);
   const [comment, setComment] = useState('')
   const [commentError, setCommentError] = useState(null)
   const [comments, setComments] = useState([])

   const handleSubmit = async (e) => {
      e.preventDefault();
      if(comment.length > 200) {
         return;
      }
      try {
         const res = await fetch('/api/comment/create', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               content: comment,
               resourceId,
               userId: currentUser._id
            })
         })
         const data = await res.json();
         if(res.ok) {
            setComment('');
            setCommentError(null);
            setComments([data, ...comments]);
         }    
      } catch (error) {
         setCommentError(error.message);
      }
   }

   useEffect(() => {
      const fetchComments = async () => {
         try {
            const res = await fetch(`/api/comment/getPostComments/${resourceId}`);
            const data = await res.json();
            if(res.ok) {
               setComments(data);
            }
         } catch (error) {
            console.log(error.message);
         }
      }
      fetchComments();
   }, [resourceId])

  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
      {currentUser ? (
         <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
            <p>Signed in as:</p>
            <img src={currentUser.profilePicture} alt="" className='h-5 w-5 object-cover rounded-full'/>
            <Link to={'/dashboard?tab=profile'} className='text-xs text-cyan-600 hover:underline'>
               @{currentUser.username}
            </Link>
         </div>
      ) : (
         <div className="text-teal-500 my-5 flex gap-1">
            You must be signed in to comment
            <Link className='text-blue-500 hover:underline' to={'/sign-in'}>
               Sign In
            </Link>
         </div>
      )}
      {
         currentUser && (
            <form action="" className='border border-teal-500 rounded-md p-3' onSubmit={handleSubmit}>
               <Textarea placeholder='Add a comment...' rows='3' maxLength='200' onChange={(e) => setComment(e.target.value)} value={comment}/>
               <div className="flex justify-between items-center mt-5">
                  <p className='text-gray-500 text-xs'>{200 - comment.length} characters remaining</p>
                  <Button gradientDuoTone='purpleToBlue' type='submit' outline>Submit</Button>
               </div>
               {
                  commentError && (
                     <Alert color='failure' className='mt-5'>{commentError}</Alert>
                  )
               }
            </form>
         )
      }
      {
         comments.length === 0 ? (
            <p className='className="text-sm my-5"'>No Comments Yet!</p>
         ) : (
            <>
               <div className='text-sm my-5 flex items-center gap-1'>
                  <p>Comments</p>
                  <div className='border border-gray-400 py-1 px-2 rounded-sm'>
                     <p>{comments.length}</p>
                  </div>
               </div>
               {
                  comments.map(comment => (
                     <Comment_02 key={comment._id} comment={comment} />
                  ))
               }
            </>
         )
      }
    </div>
  )
}

export default CommentSection_02