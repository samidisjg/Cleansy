import { FaGithub, FaLinkedinIn, FaInstagram, FaTwitter } from 'react-icons/fa'
import coder from '/coder.jpg'
import { useEffect, useRef, useState } from 'react'
import soundOn from '/soundon.png'
import soundOff from '/soundoff.png'
import starBoy from '/starBoy.mp3'

const Team = () => {
   const audioRef = useRef(new Audio(starBoy));
   audioRef.current.volume = 0.4;
   audioRef.current.loop = true;
   const [isPlayingMusic, setIsPlayingMusic] = useState(false);

   useEffect(() => {
      const imgBx = document.querySelectorAll('.imgBx');
      const contentBx = document.querySelectorAll('.contentBx');

      const handleMouseOver = (index) => {
         contentBx.forEach((content) => {
           content.className = 'contentBx';
         });
   
         const contentId = `content${index}`;
         const contentElement = document.getElementById(contentId);
   
         if (contentElement) {
           contentElement.className = 'contentBx active';
         }
   
         imgBx.forEach((img, i) => {
           img.className = `imgBx${i + 1 === index ? ' active' : ''}`;
         });
      };

      imgBx.forEach((bx, index) => {
         bx.addEventListener('mouseover', () => handleMouseOver(index + 1));
      });

      // Cleanup event listeners when the component unmounts
      return () => {
         imgBx.forEach((bx, index) => {
           bx.removeEventListener('mouseover', () => handleMouseOver(index + 1));
         });
      };
   }, [])

   useEffect(() => {
      if (isPlayingMusic) {
        audioRef.current.play();
      }
  
      return () => {
        audioRef.current.pause();
      };
   }, [isPlayingMusic]);

  return (
    <div className='m-0 p-0 box-border flex justify-center min-h-screen bg-[rgb(16,23,42)] relative'>
         <div className="relative mt-16 w-[550px] h-[550px] border-2 border-white rounded-full">
            <div className="relative left-[-50%] w-full h-full flex justify-center items-center cursor-pointer icon">
               <div className="imgBx active" style={{ '--i': 1 }} data-id='content1'>
                  <img src={coder} alt="" className='' />
               </div>
               <div className="imgBx" style={{ '--i': 2 }}>
                  <img src={coder} alt="" data-id='content2' />
               </div>
               <div className="imgBx" style={{ '--i': 3 }}>
                  <img src={coder} alt="" data-id='content3' />
               </div>
               <div className="imgBx" style={{ '--i': 4 }}>
                  <img src={coder} alt="" data-id='content4' />
               </div>
               <div className="imgBx" style={{ '--i': 5 }}>
                  <img src={coder} alt="" data-id='content5' />
               </div>
               <div className="imgBx" style={{ '--i': 6 }}>
                  <img src={coder} alt="" data-id='content6' />
               </div>
               <div className="imgBx" style={{ '--i': 7 }}>
                  <img src={coder} alt="" data-id='content7' />
               </div>
               <div className="imgBx" style={{ '--i': 8 }}>
                  <img src={coder} alt="" data-id='content8' />
               </div>
            </div>
            <div className="content">
               <div className="contentBx active" id='content1'>
                  <div className="relative flex justify-center items-center flex-col">
                     <div className="imgBx">
                        <img src={coder} alt="" className='absolute top-0 left-0 w-full h-full object-cover' />
                     </div>
                     <div className="flex items-center justify-center flex-col mt-4">
                        <h2 className='relative text-[1.25em] font-semibold text-teal-500 leading-[1em] uppercase text-center'>Ramindu Nimesh<br /><span className='text-[0.65em] font-medium tracking-widest'>IT22577160</span></h2>
                        <ul className="relative flex gap-2 mt-2">
                           <li className='list-none'><a href="#"><FaGithub className='relative w-5 h-5 text-gray-200 text-xl inline-flex items-center justify-center rounded shadow-shadowOne hover:bg-opacity-40 hover:-translate-y-1 transition-all cursor-pointer duration-300 hover:text-[#ff1d50]' /></a></li>
                           <li className='list-none'><a href="#"><FaLinkedinIn className='relative w-5 h-5 text-gray-200 text-xl inline-flex items-center justify-center rounded shadow-shadowOne hover:bg-opacity-40 hover:-translate-y-1 transition-all cursor-pointer duration-300 hover:text-[#2196f3]' /></a></li>
                           <li className='list-none'><a href="#"><FaInstagram className='relative w-5 h-5 text-gray-200 text-xl inline-flex items-center justify-center rounded shadow-shadowOne hover:bg-opacity-40 hover:-translate-y-1 transition-all cursor-pointer duration-300 hover:text-[#ff1d50]' /></a></li>
                           <li className='list-none'><a href="#"><FaTwitter className='relative w-5 h-5 text-gray-200 text-xl inline-flex items-center justify-center rounded shadow-shadowOne hover:bg-opacity-40 hover:-translate-y-1 transition-all cursor-pointer duration-300 hover:text-[#2196f3]' /></a></li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
            <div className="content">
               <div className="contentBx" id='content2'>
                  <div className="relative flex justify-center items-center flex-col">
                     <div className="imgBx">
                        <img src={coder} alt="" className='absolute top-0 left-0 w-full h-full object-cover' />
                     </div>
                     <div className="flex items-center justify-center flex-col mt-4">
                        <h2 className='relative text-[1.25em] font-semibold text-teal-500 leading-[1em] uppercase text-center'>Ramindu Nimesh<br /><span className='text-[0.65em] font-medium tracking-widest'>IT22577160</span></h2>
                        <ul className="relative flex gap-2 mt-2">
                           <li className='list-none'><a href="#"><FaGithub className='relative w-5 h-5 text-gray-200 text-xl inline-flex items-center justify-center rounded shadow-shadowOne hover:bg-opacity-40 hover:-translate-y-1 transition-all cursor-pointer duration-300 hover:text-[#ff1d50]' /></a></li>
                           <li className='list-none'><a href="#"><FaLinkedinIn className='relative w-5 h-5 text-gray-200 text-xl inline-flex items-center justify-center rounded shadow-shadowOne hover:bg-opacity-40 hover:-translate-y-1 transition-all cursor-pointer duration-300 hover:text-[#2196f3]' /></a></li>
                           <li className='list-none'><a href="#"><FaInstagram className='relative w-5 h-5 text-gray-200 text-xl inline-flex items-center justify-center rounded shadow-shadowOne hover:bg-opacity-40 hover:-translate-y-1 transition-all cursor-pointer duration-300 hover:text-[#ff1d50]' /></a></li>
                           <li className='list-none'><a href="#"><FaTwitter className='relative w-5 h-5 text-gray-200 text-xl inline-flex items-center justify-center rounded shadow-shadowOne hover:bg-opacity-40 hover:-translate-y-1 transition-all cursor-pointer duration-300 hover:text-[#2196f3]' /></a></li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
            <div className="content">
               <div className="contentBx" id='content3'>
                  <div className="relative flex justify-center items-center flex-col">
                     <div className="imgBx">
                        <img src={coder} alt="" className='absolute top-0 left-0 w-full h-full object-cover' />
                     </div>
                     <div className="flex items-center justify-center flex-col mt-4">
                        <h2 className='relative text-[1.25em] font-semibold text-teal-500 leading-[1em] uppercase text-center'>Ramindu Nimesh<br /><span className='text-[0.65em] font-medium tracking-widest'>IT22577160</span></h2>
                        <ul className="relative flex gap-2 mt-2">
                           <li className='list-none'><a href="#"><FaGithub className='relative w-5 h-5 text-gray-200 text-xl inline-flex items-center justify-center rounded shadow-shadowOne hover:bg-opacity-40 hover:-translate-y-1 transition-all cursor-pointer duration-300 hover:text-[#ff1d50]' /></a></li>
                           <li className='list-none'><a href="#"><FaLinkedinIn className='relative w-5 h-5 text-gray-200 text-xl inline-flex items-center justify-center rounded shadow-shadowOne hover:bg-opacity-40 hover:-translate-y-1 transition-all cursor-pointer duration-300 hover:text-[#2196f3]' /></a></li>
                           <li className='list-none'><a href="#"><FaInstagram className='relative w-5 h-5 text-gray-200 text-xl inline-flex items-center justify-center rounded shadow-shadowOne hover:bg-opacity-40 hover:-translate-y-1 transition-all cursor-pointer duration-300 hover:text-[#ff1d50]' /></a></li>
                           <li className='list-none'><a href="#"><FaTwitter className='relative w-5 h-5 text-gray-200 text-xl inline-flex items-center justify-center rounded shadow-shadowOne hover:bg-opacity-40 hover:-translate-y-1 transition-all cursor-pointer duration-300 hover:text-[#2196f3]' /></a></li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
            <div className="content">
               <div className="contentBx" id='content4'>
                  <div className="relative flex justify-center items-center flex-col">
                     <div className="imgBx">
                        <img src={coder} alt="" className='absolute top-0 left-0 w-full h-full object-cover' />
                     </div>
                     <div className="flex items-center justify-center flex-col mt-4">
                        <h2 className='relative text-[1.25em] font-semibold text-teal-500 leading-[1em] uppercase text-center'>Ramindu Nimesh<br /><span className='text-[0.65em] font-medium tracking-widest'>IT22577160</span></h2>
                        <ul className="relative flex gap-2 mt-2">
                           <li className='list-none'><a href="#"><FaGithub className='relative w-5 h-5 text-gray-200 text-xl inline-flex items-center justify-center rounded shadow-shadowOne hover:bg-opacity-40 hover:-translate-y-1 transition-all cursor-pointer duration-300 hover:text-[#ff1d50]' /></a></li>
                           <li className='list-none'><a href="#"><FaLinkedinIn className='relative w-5 h-5 text-gray-200 text-xl inline-flex items-center justify-center rounded shadow-shadowOne hover:bg-opacity-40 hover:-translate-y-1 transition-all cursor-pointer duration-300 hover:text-[#2196f3]' /></a></li>
                           <li className='list-none'><a href="#"><FaInstagram className='relative w-5 h-5 text-gray-200 text-xl inline-flex items-center justify-center rounded shadow-shadowOne hover:bg-opacity-40 hover:-translate-y-1 transition-all cursor-pointer duration-300 hover:text-[#ff1d50]' /></a></li>
                           <li className='list-none'><a href="#"><FaTwitter className='relative w-5 h-5 text-gray-200 text-xl inline-flex items-center justify-center rounded shadow-shadowOne hover:bg-opacity-40 hover:-translate-y-1 transition-all cursor-pointer duration-300 hover:text-[#2196f3]' /></a></li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
            <div className="content">
               <div className="contentBx" id='content5'>
                  <div className="relative flex justify-center items-center flex-col">
                     <div className="imgBx">
                        <img src={coder} alt="" className='absolute top-0 left-0 w-full h-full object-cover' />
                     </div>
                     <div className="flex items-center justify-center flex-col mt-4">
                        <h2 className='relative text-[1.25em] font-semibold text-teal-500 leading-[1em] uppercase text-center'>Thamindu Vimansha<br /><span className='text-[0.65em] font-medium tracking-widest'>IT22003546</span></h2>
                        <ul className="relative flex gap-2 mt-2">
                           <li className='list-none'><a href="#"><FaGithub className='relative w-5 h-5 text-gray-200 text-xl inline-flex items-center justify-center rounded shadow-shadowOne hover:bg-opacity-40 hover:-translate-y-1 transition-all cursor-pointer duration-300 hover:text-[#ff1d50]' /></a></li>
                           <li className='list-none'><a href="#"><FaLinkedinIn className='relative w-5 h-5 text-gray-200 text-xl inline-flex items-center justify-center rounded shadow-shadowOne hover:bg-opacity-40 hover:-translate-y-1 transition-all cursor-pointer duration-300 hover:text-[#2196f3]' /></a></li>
                           <li className='list-none'><a href="#"><FaInstagram className='relative w-5 h-5 text-gray-200 text-xl inline-flex items-center justify-center rounded shadow-shadowOne hover:bg-opacity-40 hover:-translate-y-1 transition-all cursor-pointer duration-300 hover:text-[#ff1d50]' /></a></li>
                           <li className='list-none'><a href="#"><FaTwitter className='relative w-5 h-5 text-gray-200 text-xl inline-flex items-center justify-center rounded shadow-shadowOne hover:bg-opacity-40 hover:-translate-y-1 transition-all cursor-pointer duration-300 hover:text-[#2196f3]' /></a></li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
            <div className="content">
               <div className="contentBx" id='content6'>
                  <div className="relative flex justify-center items-center flex-col">
                     <div className="imgBx">
                        <img src={coder} alt="" className='absolute top-0 left-0 w-full h-full object-cover' />
                     </div>
                     <div className="flex items-center justify-center flex-col mt-4">
                        <h2 className='relative text-[1.25em] font-semibold text-teal-500 leading-[1em] uppercase text-center'>Ramindu Nimesh<br /><span className='text-[0.65em] font-medium tracking-widest'>IT22577160</span></h2>
                        <ul className="relative flex gap-2 mt-2">
                           <li className='list-none'><a href="#"><FaGithub className='relative w-5 h-5 text-gray-200 text-xl inline-flex items-center justify-center rounded shadow-shadowOne hover:bg-opacity-40 hover:-translate-y-1 transition-all cursor-pointer duration-300 hover:text-[#ff1d50]' /></a></li>
                           <li className='list-none'><a href="#"><FaLinkedinIn className='relative w-5 h-5 text-gray-200 text-xl inline-flex items-center justify-center rounded shadow-shadowOne hover:bg-opacity-40 hover:-translate-y-1 transition-all cursor-pointer duration-300 hover:text-[#2196f3]' /></a></li>
                           <li className='list-none'><a href="#"><FaInstagram className='relative w-5 h-5 text-gray-200 text-xl inline-flex items-center justify-center rounded shadow-shadowOne hover:bg-opacity-40 hover:-translate-y-1 transition-all cursor-pointer duration-300 hover:text-[#ff1d50]' /></a></li>
                           <li className='list-none'><a href="#"><FaTwitter className='relative w-5 h-5 text-gray-200 text-xl inline-flex items-center justify-center rounded shadow-shadowOne hover:bg-opacity-40 hover:-translate-y-1 transition-all cursor-pointer duration-300 hover:text-[#2196f3]' /></a></li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
            <div className="content">
               <div className="contentBx" id='content7'>
                  <div className="relative flex justify-center items-center flex-col">
                     <div className="imgBx">
                        <img src={coder} alt="" className='absolute top-0 left-0 w-full h-full object-cover' />
                     </div>
                     <div className="flex items-center justify-center flex-col mt-4">
                        <h2 className='relative text-[1.25em] font-semibold text-teal-500 leading-[1em] uppercase text-center'>Ramindu Nimesh<br /><span className='text-[0.65em] font-medium tracking-widest'>IT22577160</span></h2>
                        <ul className="relative flex gap-2 mt-2">
                           <li className='list-none'><a href="#"><FaGithub className='relative w-5 h-5 text-gray-200 text-xl inline-flex items-center justify-center rounded shadow-shadowOne hover:bg-opacity-40 hover:-translate-y-1 transition-all cursor-pointer duration-300 hover:text-[#ff1d50]' /></a></li>
                           <li className='list-none'><a href="#"><FaLinkedinIn className='relative w-5 h-5 text-gray-200 text-xl inline-flex items-center justify-center rounded shadow-shadowOne hover:bg-opacity-40 hover:-translate-y-1 transition-all cursor-pointer duration-300 hover:text-[#2196f3]' /></a></li>
                           <li className='list-none'><a href="#"><FaInstagram className='relative w-5 h-5 text-gray-200 text-xl inline-flex items-center justify-center rounded shadow-shadowOne hover:bg-opacity-40 hover:-translate-y-1 transition-all cursor-pointer duration-300 hover:text-[#ff1d50]' /></a></li>
                           <li className='list-none'><a href="#"><FaTwitter className='relative w-5 h-5 text-gray-200 text-xl inline-flex items-center justify-center rounded shadow-shadowOne hover:bg-opacity-40 hover:-translate-y-1 transition-all cursor-pointer duration-300 hover:text-[#2196f3]' /></a></li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
            <div className="content">
               <div className="contentBx" id='content8'>
                  <div className="relative flex justify-center items-center flex-col">
                     <div className="imgBx">
                        <img src={coder} alt="" className='absolute top-0 left-0 w-full h-full object-cover' />
                     </div>
                     <div className="flex items-center justify-center flex-col mt-4">
                        <h2 className='relative text-[1.25em] font-semibold text-teal-500 leading-[1em] uppercase text-center'>Ramindu Nimesh<br /><span className='text-[0.65em] font-medium tracking-widest'>IT22577160</span></h2>
                        <ul className="relative flex gap-2 mt-2">
                           <li className='list-none'><a href="#"><FaGithub className='relative w-5 h-5 text-gray-200 text-xl inline-flex items-center justify-center rounded shadow-shadowOne hover:bg-opacity-40 hover:-translate-y-1 transition-all cursor-pointer duration-300 hover:text-[#ff1d50]' /></a></li>
                           <li className='list-none'><a href="#"><FaLinkedinIn className='relative w-5 h-5 text-gray-200 text-xl inline-flex items-center justify-center rounded shadow-shadowOne hover:bg-opacity-40 hover:-translate-y-1 transition-all cursor-pointer duration-300 hover:text-[#2196f3]' /></a></li>
                           <li className='list-none'><a href="#"><FaInstagram className='relative w-5 h-5 text-gray-200 text-xl inline-flex items-center justify-center rounded shadow-shadowOne hover:bg-opacity-40 hover:-translate-y-1 transition-all cursor-pointer duration-300 hover:text-[#ff1d50]' /></a></li>
                           <li className='list-none'><a href="#"><FaTwitter className='relative w-5 h-5 text-gray-200 text-xl inline-flex items-center justify-center rounded shadow-shadowOne hover:bg-opacity-40 hover:-translate-y-1 transition-all cursor-pointer duration-300 hover:text-[#2196f3]' /></a></li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
            <div className="absolute bottom-2 left-2">
               <img src={!isPlayingMusic ? soundOff : soundOn} onClick={() => setIsPlayingMusic(!isPlayingMusic)} className='w-10 h-10 cursor-pointer object-contain'/>
            </div>
    </div>
  )
}

export default Team