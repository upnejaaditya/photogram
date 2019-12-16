
import React from 'react';
import Add from './Add';
import Gallery from './Gallery';
import LoginForm from './login';
import SignupForm from './signup';
import {Route,Link} from 'react-router-dom';
import 'antd/dist/antd.css';

import { Menu } from 'antd';
import axios from 'axios';

const firebase = require ("firebase");

class App extends React.Component {

constructor(props){
  super(props)

  this.state = {}
  this.state.db = {
    photos : []
  }

}



componentDidMount(){
  this.checkLogin()

}

getPhotos(uid){
  axios.get("/photos?uid="+uid).then(
    (res)=>{
      let db = this.state.db;
      db.photos = res.data;
      this.setState({
        db:db
      })
      }
  )
}

checkLogin(){
  firebase.auth().onAuthStateChanged((user)=> {
 if (user) {
  this.setState(
    {user:user}
  )
  this.getPhotos(user.uid)
  this.props.history.push("/add");
 } else {
   // No user is signed in.
 }
});
}

addPhoto(photo){
let db  = this.state.db;

photo.uid = this.state.user.uid;


axios.post("/photo",photo).then(
  (res)=>{
      db.photos.push(res.data);
      console.log(db.photos);
      this.setState(
        {db:db}
      )
      this.props.history.push('/gallery')

  }
)




}


logout(){
  firebase.auth().signOut().then(() =>{
  this.setState({
    user:null
  })
  this.props.history.push("/");
  }).catch(function(error) {
  // An error happened.
  });
}

render(){
  return (<div>

{this.state.user?<Menu mode="horizontal">
<Menu.Item key="mail">
  <Link to="/add">Add</Link>
</Menu.Item>
<Menu.Item key="app" >
<Link to="/gallery">Gallery</Link>
</Menu.Item>
<Menu.Item key="app" onClick={this.logout.bind(this)}>
Logout
</Menu.Item>
</Menu> :null }

  <Route exact path="/"  component ={LoginForm}></Route>
  <Route  path='/signup' component ={SignupForm}></Route> 
  <Route path="/gallery" render={()=><Gallery db={this.state.db}></Gallery>}></Route>
  <Route path="/add" render={()=> <Add savePhoto={this.addPhoto.bind(this)}></Add>}></Route>



  </div>)
}

 
   
}

export default App;