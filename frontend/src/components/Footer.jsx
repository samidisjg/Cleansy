import { Footer } from "flowbite-react"
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter, BsWhatsapp } from "react-icons/bs"
import { Link } from "react-router-dom"
import cleancy from '/cleansy.png'

const FooterComponent = () => {
  return (
    <Footer container className="border border-t-8 border-orange-500 shadow-md">
      <div className="w-full max-w-7xl mx-auto">
         <div className="grid w-full justify-between sm:flex md:grid-cols-1">
            <div className="mt-5">
               <Link to='/' className="self-center">
                  <img src={cleancy} alt="logo" width='150' />
               </Link>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 md:grid-cols-4 sm:gap-6">
               <div className="">
                  <Footer.Title title="About"/>
                  <Footer.LinkGroup col>
                     <Footer.Link href="#" target="_blank" rel="noopener noreferrer">Projects</Footer.Link>
                     <Footer.Link href="#" target="_blank" rel="noopener noreferrer">Projects</Footer.Link>
                  </Footer.LinkGroup>
               </div>
               <div className="">
                  <Footer.Title title="Follow Us"/>
                  <Footer.LinkGroup col>
                     <Footer.Link href="#" target="_blank" rel="noopener noreferrer">Projects</Footer.Link>
                     <Footer.Link href="#" target="_blank" rel="noopener noreferrer">Projects</Footer.Link>
                  </Footer.LinkGroup>
               </div>
               <div className="">
                  <Footer.Title title="Legal"/>
                  <Footer.LinkGroup col>
                     <Footer.Link href="#" target="_blank" rel="noopener noreferrer">Privacy Policy</Footer.Link>
                     <Footer.Link href="#" target="_blank" rel="noopener noreferrer">Terms & Condition</Footer.Link>
                  </Footer.LinkGroup>
               </div>
               <div className="">
                  <Footer.Title title="Business Services"/>
                  <Footer.LinkGroup col>
                     <Footer.Link href="#" target="_blank" rel="noopener noreferrer">Privacy Policy</Footer.Link>
                     <Footer.Link href="#" target="_blank" rel="noopener noreferrer">Terms & Condition</Footer.Link>
                  </Footer.LinkGroup>
               </div>
            </div>
         </div>
         <Footer.Divider />
         <div className="w-full sm:flex sm:items-center sm:justify-between">
            <Footer.Copyright href="#" by="Cleansy" year={new Date().getFullYear()} />
            <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
               <Footer.Icon href="#" icon={BsFacebook} />
               <Footer.Icon href="#" icon={BsInstagram} />
               <Footer.Icon href="#" icon={BsTwitter} />
               <Footer.Icon href="#" icon={BsLinkedin} />
               <Footer.Icon href="#" icon={BsWhatsapp} />
            </div>
         </div>
      </div>
    </Footer>
  )
}

export default FooterComponent