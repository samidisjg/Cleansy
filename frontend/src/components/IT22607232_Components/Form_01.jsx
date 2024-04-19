
import { useState } from "react";

import {
    Button,
    Label,
    Select,
    TextInput,
  } from "flowbite-react";
  import {useForm} from 'react-hook-form';
  import List_01 from './List_01';


export default function Form_01() {

    const onSubmit = async (data) => {
        console.log(data);
    }

    const {register,handleSubmit,resetField} = useForm();
    const [loading, setLoading] = useState(false);
  return (
    <div className='form max-w-sm mx-auto w-96'>

        <h1 className='font-bold pb-4 text-xl'>Task Analaysis</h1>

        <form id='form' onSubmit={handleSubmit(onSubmit)}>
            <div className='grid gap-4'>
            <div>
            <Label value="TaskID" />
            <TextInput
              type="text" {...register('TaskID')}
              name="TaskID"
              placeholder="TaskID"
              required
            />
          </div>
          <div>
            <Label value="Category" />
            <Select
              className="form-input"
              {...register('type')}
            >
              <option value="Select">Select a Category</option>
              <option value="Pending" defaultValue>Pending</option>
              <option value="Completed">Completed</option>
              <option value="Inprogress">Inprogress</option>
            </Select>

            <div>
            <Label value="Number of Tasks" />
            <TextInput
              type="number"
              {...register('noTasks')}
              name="noTasks"
              placeholder="# of Tasks"
              required
            />
          </div>
            <br></br>
          <Button
            type="submit"
            gradientDuoTone="purpleToBlue"
            className="uppercase"
          >
            {loading ? "Analysing..." : "Annalyse tasks"}
          </Button>
          </div>
            </div>
        </form>
        <List_01></List_01>
    </div>
  )
}
