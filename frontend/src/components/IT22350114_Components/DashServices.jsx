import { Button, Checkbox, FileInput, Label, Select, TextInput, Textarea } from "flowbite-react"
import { Link } from "react-router-dom"
import React from 'react'


const DashServices = () => {
  return (
    <div>
      {currentUser.isFacilityServiceAdmin && (
        <div>
          <h1>Create Services</h1>

          <div className="flex flex-wrap gap-2"></div>
          <Button pill>
                        <Link to="/service-create">Create Service</Link>
                    </Button>
                    <Button pill>
                        <Link to="service-list/:serviceID">View Service</Link>
                    </Button>
                    <br />
                   
          <br />
        </div>
      )}
    </div>
  )
}

export default DashServices
