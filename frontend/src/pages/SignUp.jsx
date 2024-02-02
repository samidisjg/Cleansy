import { Button, Label, TextInput } from "flowbite-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="min-h-screen mt-20">
      <h1 className='text-3xl text-center mt-6 font-bold underline text-blue-950'>Sign Up</h1>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-10 md:gap-20">
        {/* left side */}
        <div className="flex-1">
          <img src="signup.webp" alt="signUp" />
          <p className="text-sm font-semibold capitalize mb-5">Unlock a hassle-free living experience with Cleansy! Simplify apartment management and embrace the ease of organized living. Join us today!</p>
          <Link to='/' className="self-center">
            <img src="cleansy.png" alt="logo" width='150' />
          </Link>
        </div>
        {/* right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div className="">
              <Label value="Your Username"/>
              <TextInput type="text" placeholder="Username" id="username" />
            </div>
            <div className="">
              <Label value="Your Email"/>
              <TextInput type="text" placeholder="name@gmail.com" id="email" />
            </div>
            <div className="relative">
              <Label value="Your Password"/>
              <TextInput type={showPassword ? "text" : "password"} placeholder="*************" id="password" />
              {showPassword ? (<BsFillEyeSlashFill className='absolute right-3 top-9 text-md cursor-pointer' onClick={() => setShowPassword((prevState) => !prevState)}/>) : (<BsFillEyeFill className='absolute right-3 top-9 text-md cursor-pointer' onClick={() => setShowPassword((prevState) => !prevState)}/>)}
            </div>
            <Button type="submit" className="bg-gradient-to-r from-sky-600 to-blue-900 uppercase" >Sign Up</Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to='/sign-in' className="text-blue-700">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp