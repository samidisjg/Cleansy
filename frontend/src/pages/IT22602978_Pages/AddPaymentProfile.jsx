import { Button, Checkbox, FileInput, Label, Select, TextInput, Textarea } from "flowbite-react"
import { Link } from "react-router-dom"

const AddPaymentProfile = () => {
  return (
    <div className="container mx-auto w-[20%]">

        <div className="flex-col h-screen mt-20 justify-center">
        <h1 className=" flex justify-center text-3xl text-center mt-6 font-extrabold underline text-blue-950 dark:text-slate-300">Add Payment Profile</h1>
        <div className="flex p-3 w-[100%] mx-auto flex-col md:flex-row md:items-center gap-20 md:gap-20 mt-10">
          <form className="flex flex-col gap-4 w-full justify-center">
            <div>
              <Label  value="Username"/>
              <TextInput type="text"  placeholder="Username" />
            </div>
            <div>
              <Label  value="Email"/>
              <TextInput type="email"  placeholder="Username" />
            </div>
            <div>
              <Label  value="Gender"/>
              <Select>
                <option value="Select">Select a Category</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="agree" />
              <Label htmlFor="agree" className="flex">
                I agree with the&nbsp;
                <Link href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
                  terms and conditions
                </Link>
              </Label>
            </div>
            <Button type="submit" gradientDuoTone='purpleToBlue' >
                Submit
            </Button>
          </form>
        </div>
    </div>
    </div>

  )
}

export default AddPaymentProfile