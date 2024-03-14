import { Alert, Button, FileInput, TextInput, Textarea } from "flowbite-react"
import { useState } from "react"
import { app } from "../../firebase"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"

const CreateApartmentListing = () => {
   const [files, setFiles] = useState([])
   const [formData, setFormData] = useState({
      imageUrls: [],
   })
   const [imageUploadError, setImageUploadError] = useState(false);
   const [uploading, setUploading] = useState(false);

   const handleImageSubmit = () => {
      if(files.length > 0 && files.length + formData.imageUrls.length < 7) {
         setUploading(true);
         setImageUploadError(false);
         const promises = [];

         for (let i = 0; i < files.length; i++) {
            promises.push(storeImage(files[i]));
         }

         Promise.all(promises).then((urls) => {
            setFormData({
               ...formData,
               imageUrls: formData.imageUrls.concat(urls)
            })
            setImageUploadError(false);
            setUploading(false);
         }).catch((err) => {
            setImageUploadError('Image Upload failed (2mb max per Image)');
            setUploading(false);
         })
      } else {
         setImageUploadError('You can only upload 6 Images per listing')
         setUploading(false);
      }
   }

   const storeImage = async (file) => {
      return new Promise((resolve, reject) => {
         const storage = getStorage(app);
         const fileName = new Date().getTime() + file.name;
         const storageRef = ref(storage, fileName);
         const uploadTask = uploadBytesResumable(storageRef, file);
         uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`Upload is ${progress}% done`);
            },
            (error) => {
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL);
              })
            }
          )
      })
   }

   const handleRemoveImage = (index) => {
      setFormData({
        ...formData,
        imageUrls: formData.imageUrls.filter((_, i) => i !== index),
      })
   }

  return (
    <main className="p-3 max-w-4xl mx-auto mb-10">
      <h1 className="text-3xl text-center my-7 font-extrabold underline text-blue-950 dark:text-slate-300">Create Apartment Listing</h1>
      <form className="flex flex-col sm:flex-row gap-4">
         <div className="flex flex-col gap-4 flex-1">
            <TextInput type="text" placeholder='Apartment Owner Name' id="name" maxLength={62} minLength={10} required  />
            <TextInput type="text" placeholder='Apartment Owner Contact Number' id="contact" maxLength={15}  required  />
            <Textarea type="text" placeholder='Add a Description...' rows='3' maxLength='200' id="description" required />
            <TextInput type="text" placeholder='Apartment Block Number' id="blockNb" maxLength={15}  required  />
            <div className="flex flex-wrap gap-6">
               <div className="flex items-center gap-2">
                  <TextInput type="number" id="bedrooms" min='1' max='10' required />
                  <p className="font-semibold">Beds</p>
               </div>
               <div className="flex items-center gap-2">
                  <TextInput type="number" id="bathrooms" min='1' max='10' required />
                  <p className="font-semibold">Bath</p>
               </div>
            </div>
            <p className='text-lg font-semibold'>Sell / Rent</p>
            <div className="flex">
               <button type='button' id='type' value="sale" className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full bg-slate-600 text-white `}> 
               {/* ${type === "rent" ? "bg-white text-black" : "bg-slate-600 text-white"} */}
                  Sell
               </button>
               <button type='button' id='type' value="rent" className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full bg-white text-black `}> 
               {/* ${type === "rent" ? "bg-white text-black" : "bg-slate-600 text-white"} */}
                  Sell
               </button>
            </div>
            <p className='text-lg font-semibold'>Parking Spot</p>
            <div className="flex">
               <button  type='button' id='parking' value="true" className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full bg-slate-600 text-white`}> 
               {/* ${type === "rent" ? "bg-white text-black" : "bg-slate-600 text-white"} */}
                  Yes
               </button>
               <button type='button' id='parking' value="false" className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full bg-white text-black`}> 
               {/* ${type === "rent" ? "bg-white text-black" : "bg-slate-600 text-white"} */}
                  No
               </button>
            </div>
            <p className='text-lg font-semibold'>Furnished</p>
            <div className="flex">
               <button type='button' id='furnished' value="true" className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full bg-slate-600 text-white `}> 
               {/* ${type === "rent" ? "bg-white text-black" : "bg-slate-600 text-white"} */}
                  Yes
               </button>
               <button type='button' id='furnished' value="false" className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full bg-white text-black `}> 
               {/* ${type === "rent" ? "bg-white text-black" : "bg-slate-600 text-white"} */}
                  No
               </button>
            </div>
            <p className='text-lg font-semibold'>Offer</p>
            <div className="flex">
               <button type='button' id='offer' value="true" className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full bg-slate-600 text-white `}> 
               {/* ${type === "rent" ? "bg-white text-black" : "bg-slate-600 text-white"} */}
                  Yes
               </button>
               <button type='button' id='offer' value="false" className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full bg-white text-black `}> 
               {/* ${type === "rent" ? "bg-white text-black" : "bg-slate-600 text-white"} */}
                  No
               </button>
            </div>
            {/* <div className="flex flex-column gap-6"> */}
               <div className="flex items-center gap-2">
                  <TextInput type="number" id="regularPrice" min='50' max='10000000' className="w-[50%]" required />
                  <div>
                     <p className="font-semibold">Regular Price</p>
                     <span className="text-xs">(Rs / month)</span>
                  </div>
               </div>
               <div className="flex items-center gap-2">
                  <TextInput type="number" id="discountPrice" min='0' max='10000000' className="w-[50%]" required />
                  <div>
                     <p className="font-semibold">Discount Price</p>
                     <span className="text-xs">(Rs / month)</span>
                  </div>
               </div>
            </div>
         {/* </div> */}
         <div className="flex flex-col gap-4 flex-1">
            <p className="font-semibold">Images: <span className="font-normal text-gray-600 ml-2">The first image will be the cover (max 6)</span></p>
            <div className="flex gap-4">
               <FileInput onChange={(e) => setFiles(e.target.files)} type='file' id="image" accept="image/*" multiple className="w-full" />
               <button onClick={handleImageSubmit} type="button" disabled={uploading} className="p-1 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">{uploading ? 'Uploading...' : 'Upload'}</button>
            </div>
            <p className="text-red-700">{imageUploadError && imageUploadError}</p>
            {
               formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                  <>
                     <div key={url} className="flex justify-between p-3 border items-center">
                        <img src={url} alt="listing image" className='w-20 h-20 object-contain rounded-lg' />
                        <Button type="button" onClick={() => handleRemoveImage(index)} gradientDuoTone="pinkToOrange">Delete</Button>
                     </div>
                  </>
               ))
            }
            <Button gradientDuoTone='purpleToBlue' className="uppercase">Create Apartment Listing</Button>
            
         </div>
      </form>
    </main>
  )
}

export default CreateApartmentListing