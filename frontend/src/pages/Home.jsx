import { Cursor, useTypewriter } from 'react-simple-typewriter'
import Cleansy_Full from '/Cleansy_Full.png'
import bannerImg from '/bannerImg.jpg'
import clensySite from '/clensySite.png'
import { Link } from 'react-router-dom'
import { Button } from 'flowbite-react'
import { useEffect, useState } from 'react'
import ApartmentListingCard_02 from '../components/IT22577160_Components/ApartmentListingCard_02'


const Home = () => {
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [text] = useTypewriter({
    words: ["seamless environments.", "secure surroundings.", "a symbol of reliability.", "elevated spaces of distinction."],
    loop: true,
    typeSpeed: 60,
    deleteSpeed: 40,
    delaySpeed: 2000,
  })

  useEffect(() => {
    const fetchListings = async () => {
      const res = await fetch(`/api/apartmentListing/getListings`);
      const data = await res.json();
      if (data.length > 8) {
         setShowMore(true);
      } else {
         setShowMore(false);
      }
      setListings(data);
   }

   fetchListings();
  }, [])

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/apartmentListing/getListings?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
       setShowMore(false);
    }
    setListings([...listings, ...data]);
  }

  return (
    <div>
      {/* banner section */}
      <img src={bannerImg} alt="" className='object-cover relative opacity-55 dark:opacity-40 h-screen w-full'/>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-full mx-auto absolute top-20 md:top-28 ">
        {/* <h1 className='text-slate-700 dark:text-teal-500 font-bold text-3xl lg:text-6xl text-center [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]'>Cleansy Facility Management Services (Pvt) Ltd.</h1> */}
        <img src={Cleansy_Full} alt="" className='h-auto' />
        {/* <h3 className="text-orange-500 font-bold text-3xl text-center font-mono [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">"Nothing Is Impossible"</h3> */}
        <h2 className='text-center text-slate-400 text-3xl lg:text-4xl font-bold [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] homeText'>WHERE EXCELLENCE MEETS EVERY NEED</h2>
        <h3 className='text-xl md:text-3xl font-bold text-center [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] text-slate-500 homeText'>We Create <span className='text-orange-500 font-mono [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] homeText'>{text}</span>
          <Cursor
            cursorBlinking="false"
            cursorStyle="|"
            cursorColor="#ff0000"
          /></h3>
          <div className='flex justify-center'>
            <Button className='w-[250px] rounded-tl-2xl rounded-br-2xl' gradientDuoTone="purpleToPink">
              <a href="#listing" className='transition duration-100 ease-in-out'>
                Get Started
              </a>
            </Button>
          </div>
      </div>
      {/* card section */}
      <div className="p-3 bg-amber-100 dark:bg-slate-700">
          <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
            <div className="flex justify-center flex-col flex-1">
              <h2 className="text-2xl">Want To Get More Details About Cleansy</h2>
              <p className="text-gray-500 my-2">Checkout Our WebSite</p>
              <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
                <a href="https://cleansyfm.com/" target='_blank' rel='noopener noreferrer'>Cleansy</a>
              </Button>
            </div>
            <div className="flex-1 p-7">
              <img src={clensySite} alt="" className='rounded-md opacity-80'/>
            </div>
          </div>
      </div>
      {/* listing section */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10' id='listing'>
        <div>
          <h2 className='text-2xl font-semibold text-slate-600'>Recent Listing</h2>
          <Link className='text-sm text-blue-800 hover:underline' to={'/searchApartments'}>Show more listing</Link>
        </div>
        <div className="p-7 flex flex-wrap gap-4">
          {listings && listings.length > 0 && (
            listings.map((listing) => (
              <ApartmentListingCard_02 key={listing._id} listing={listing} />
            ))
          )}
          {showMore && (
            <button onClick={onShowMoreClick} className='text-teal-500 hover:underline p-7 text-center w-full'>Show More</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home