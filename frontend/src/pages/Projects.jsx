import { Button, Checkbox, FileInput, Label, Select, TextInput, Textarea } from "flowbite-react"
import { Link } from "react-router-dom"

const Projects = () => {
  return (
    <div className="min-h-screen mt-20">
        <h1 className="text-3xl text-center mt-6 font-extrabold underline text-blue-950 dark:text-slate-300">Project templates</h1>
        <div className="flex p-3 w-[40%] mx-auto flex-col md:flex-row md:items-center gap-20 md:gap-20 mt-10">
          <form className="flex flex-col gap-4 w-full justify-center">
            <div>
              <Label  value="Username"/>
              <Button/>
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
            <div>
              <Label  value="Description"/>
              <Textarea placeholder='Add a Description...' rows='3' maxLength='200' />
            </div>
            <div>
              <Label  value="Upload a Image"/>
              <FileInput type='file' accept="image/*" />
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
  )
}

export default Projects