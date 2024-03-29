import { Button, FileInput, Select, TextInput, Textarea } from "flowbite-react"

const CreateSharedResources_02 = () => {
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-3xl text-center my-7 font-extrabold underline text-blue-950 dark:text-slate-300">Create Shared Resources Listing</h1>
      <form className="flex flex-col gap-4">
         <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput type="text" placeholder="Title" required id="title" className="flex-1"/>
            <Select className="">
               <option value="uncategorized">Select a Category</option>
               <option value="equipment">Equipment</option>
               <option value="furniture">Furniture</option>
            </Select>
         </div>
         <div className="flex  gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
            <FileInput type='file' accept="image/*" />
            <Button type="button" gradientDuoTone='purpleToBlue' outline>Upload Image</Button>
         </div>
         <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput type="number" id="quantity" placeholder="Quantity" min='1' max='100' className="w-[50%]" required />
            <TextInput type="number" id="condition" placeholder="Condition" min='1' max='100' className="w-[50%]" required />
         </div>
         <Textarea type="text" placeholder='Add a Description...' rows='3' maxLength='200' id="description" required />
         <p className='text-lg font-semibold'>Offer</p>
         <div className="flex">
            <button type='button' id='offer' value={true} className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full bg-slate-600 text-white`}> 
               {/* ${type === "rent" ? "bg-white text-black" : "bg-slate-600 text-white"} */}
                  Yes
            </button>
            <button type='button' id='offer' value={false} className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full bg-white text-black`}> 
               {/* ${type === "rent" ? "bg-white text-black" : "bg-slate-600 text-white"} */}
                  No
            </button>
         </div>
         <div className="flex items-center gap-2">
            <TextInput type="number" id="regularPrice" min='50' max='10000000' className="w-[50%]" required />
            <div>
               <p className="font-semibold">Regular Price</p>
               <span className="text-xs">($ / month)</span>
            </div>
         </div>
         <div className="flex items-center gap-2">
            <TextInput type="number" id="discountPrice" min='0' max='10000000' className="w-[50%]" required />
            <div>
               <p className="font-semibold">Discount Price</p>
               <span className="text-xs">($ / month)</span>
            </div>
         </div>
         <Button type="submit" gradientDuoTone='purpleToBlue' className="uppercase" >Create Shared Resource Listing</Button>
      </form>
    </div>
  )
}

export default CreateSharedResources_02