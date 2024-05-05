import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Contact() {
    const [message, setMessage] = useState('');

    const onChange = (e) => {
        setMessage(e.target.value);
    };

  return (
    <>
    <textarea 
                name='message'
                id='message'
                rows='2'
                value={message}
                onChange={onChange}
                placeholder='Enter your message here...'
                className='w-full border p-3 rounded-lg mb-4'
    ></textarea>

<Link
    to={`mailto:dinethrasulakshana@gmail.com?subject=Regarding requset car parking slot&body=${message}`}
    className='bg-red-500 text-white text-center p-3 uppercase rounded-lg hover:opacity-95 inline-block w-full max-w-xs'
>Send Message</Link>

    </>
  )
}
