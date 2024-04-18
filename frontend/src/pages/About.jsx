import aboutUS from '/aboutUS.jpg'

const About = () => {
  return (
    <div className="p-3 bg-amber-100 dark:bg-slate-700 min-h-screen border border-teal-500 rounded-tl-3xl rounded-br-3xl m-5">
          <h1 className='text-3xl text-center mt-6 font-extrabold underline '>About Cleansy</h1>
          <h1 className='text-center my-2 text-xl font-medium'>At Cleansy, we turn care into precision, creating spaces where excellence thrives.</h1>
          <div className="flex flex-col sm:flex-row p-3  justify-center items-center rounded-tl-3xl rounded-br-3xl">
            <div className="flex justify-center flex-col flex-1">
              <h2 className="text-3xl font-semibold">We provide great services and ideas.</h2>
              <p className="text-gray-500 my-2 text-justify">
                Cleansy Facility Management Services (Pvt) Ltd is your trusted partner in creating safe and convenient living and working environments. Our team of seasoned experts is committed to delivering a diverse range of services, ensuring the highest quality and respect in every interaction.
                <br></br><br></br>
                Our key services encompass building management, janitorial, security, auditing, pool maintenance, landscape and gardening, handyman services, air-conditioning, plumbing, and electrical system maintenance, fire fighting, elevator and generator maintenance, waste management, and pest control.
                <br></br><br></br>
                With our innovative and personalized approach, we tailor solutions to meet the unique needs of each client, going above and beyond to exceed expectations. At Cleansy Facility Management Services, we are dedicated to shaping spaces that thrive.</p>
            </div>
            <div className="flex-1 p-7">
              <img src={aboutUS} alt="" className='rounded-md'/>
            </div>
          </div>
      </div>
  )
}

export default About