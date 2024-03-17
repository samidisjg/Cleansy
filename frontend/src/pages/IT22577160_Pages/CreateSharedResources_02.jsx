import { Button, FileInput, Select, TextInput } from "flowbite-react"

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
            <TextInput type="number" id="regularPrice" min='50' max='10000000' className="w-[50%]" required />
            <TextInput type="number" id="regularPrice" min='50' max='10000000' className="w-[50%]" required />
         </div>
      </form>
    </div>
  )
}

export default CreateSharedResources_02