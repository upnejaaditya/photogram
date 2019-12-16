import React from 'react';
import 'antd/dist/antd.css';
import './Add.css';

import { Form,Input,Button } from 'antd';

const firebase = require ("firebase");
require("firebase/firestore");

function Add(props) {
    let title;
    let cap;
    let image;
    let ifile;

    return (
    <div class="bg-img"> 
    <div class="format">
       <Form>
       <Form.Item label="Title">
          <Input placeholder="Title" id="title" onChange={(e)=>{title=e.target.value}} />
        </Form.Item>
        <Form.Item label="Caption"> 
          <Input placeholder="Caption" id= "description" onChange={(e)=> {cap=e.target.value}}  />
        </Form.Item>
        <Form.Item label="Image">
        
        {/* <Input  placeholder="image"  id="image" onChange={(e)=>{image=e.target.value}} /> */}
        
        <input  type="file"  id="image" onChange={(e)=>{ifile=e.target.files[0];
                                                        var storageRef = firebase.storage().ref('/lol/'+ifile.name);
                                                        var uploadTask = storageRef.put(ifile);
                                                        // Register three observers:
                                                         // 1. 'state_changed' observer, called any time the state changes
                                                        // 2. Error observer, called on failure
                                                        // 3. Completion observer, called on successful completion
                                                        
                                                        uploadTask.on('state_changed', function(snapshot){
                                                          
                                                          // Observe state change events such as progress, pause, and resume
                                                         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                                                         
                                                         var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                                      console.log('Upload is ' + progress + '% done');
                                                       
                                                      // eslint-disable-next-line 
                                                      switch (snapshot.state) {
                                                      case firebase.storage.TaskState.PAUSED: // or 'paused'
                                                        console.log('Upload is paused');
                                                           break;
                                                      case firebase.storage.TaskState.RUNNING: // or 'running'
                                                       console.log('Upload is running');
                                                      break;
                                                       }
                                                       }, function(error) {
                                                     // Handle unsuccessful uploads
                                                      }, function() {
                                                     // Handle successful uploads on complete
                                                      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                                                     uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                                                        console.log('File available at', downloadURL);
                                                        image=downloadURL;
                                                       });
                                                       });
           
                                                        }} ></input>
        </Form.Item>
       
        


        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
          
        <Button class="btn" type="primary" onClick={()=>{props.savePhoto({image,cap,title})}}>
            Submit
          </Button>
        </Form.Item>
       </Form>
       </div>
    </div>)
    
   
}

export default Add;