//frontend\src\components\IT22196460_Components\CreateAnnouncement.jsx
import React,{useState} from 'react';
import axios from 'axios';

export default function AddInventory(){

    const [Announcement_ID,id]= useState("");
    const [Title,setTitle]= useState("");
    const [Content,setContent]= useState("");
    const [Category_ID,setCategory_ID]= useState("");
    const [Attachment_URL,setAttachment_URL]= useState("");
    const [Create_At,setCreate_At]= useState("");

    function sendData(e){
        e.preventDefault();
        
        const newAnnouncements ={
            Announcement_ID,
            Title,
            Content,
            Category_ID,
            Attachment_URL,
            Create_At
        }
        
        axios.post("http://localhost:3000/api/announcements/create",newAnnouncements).then(()=> {
            alert("Item Announcement")
        }).catch((err)=>{
            alert(err)
        })

    }
        

    return(
    
        <div className="container">
            <form onSubmit={sendData}>

  <div class="mb-3">
      <label for="name" class="form-label">Announcement_ID</label>
      <input type="text" class="form-control" id="name" placeholder="Enter Inventory name"
      onChange={(e)=> {

        setName(e.target.value);
      }}/>

  </div>

<div class="mb-3">
      <label for="type" class="form-label">Title</label>
      <input type="text" class="form-control" id="type" placeholder="Enter Inventory Type"
            onChange={(e)=> {

                setType(e.target.value);
              }}/>
  </div>

  <div class="mb-3">
      <label for="id" class="form-label">Content</label>
      <input type="text" class="form-control" id="id" placeholder="Enter Inventory ID"
            onChange={(e)=> {

                setId(e.target.value);
              }}/>
  </div>

  <div class="mb-3">
      <label for="type" class="form-label">Category_ID</label>
      <input type="text" class="form-control" id="type" placeholder="Enter Inventory Type"
            onChange={(e)=> {

                setType(e.target.value);
              }}/>
  </div>

  <div class="mb-3">
      <label for="type" class="form-label">Attachment_URL</label>
      <input type="text" class="form-control" id="type" placeholder="Enter Inventory Type"
            onChange={(e)=> {

                setType(e.target.value);
              }}/>
  </div>

  <div class="mb-3">
      <label for="type" class="form-label">Create_At</label>
      <input type="text" class="form-control" id="type" placeholder="Enter Inventory Type"
            onChange={(e)=> {

                setType(e.target.value);
              }}/>
  </div>
 
 
  <button type="submit" class="btn btn-primary">Submit</button>
</form>

        </div>
    )
}