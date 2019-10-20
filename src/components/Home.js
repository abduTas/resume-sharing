// home.js contains an image — it’s a page we’ll redirect to after login. It’s not authenticated. The username will display with a greeting if they are logged in.

import React, { Component } from 'react';
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";

import {Redirect , Link , withRouter} from "react-router-dom";
class Home extends Component {

    constructor(props) {
        super(props)
        this.state={
            addingExperience :false,
            experience: [],
            designation :null,
            location : null ,
            brief :null,
            position :null,
            skills: '',
            email :'',
            name :'' ,
            profileoverview :'',
            contact :'' , 
            education :'', 
            certification :'' ,
            awards :'',
            username: ''
        }
    }   
    componentDidMount(){
        console.log("object1" , this.props.username)
        axios.get('user/userdetails/').then(response => {
            console.log('Get user response: ')
            console.log(response.data)
            if (response.data.userdetails) {
              console.log('Get User: There is a user saved in the server session: ')
            let {experience , skills,designation , name , email , imageUrl ,profileoverview , contact ,  education, certification ,username, awards} = response.data.userdetails
              this.setState({
                experience,  
                skills : skills.join(),
                name,
                email,
                imageUrl,
                designation,
                profileoverview,
                contact, 
                education, 
                certification ,
                awards,
                username
              })
            } else {
              console.log('Get user: no user');
              this.setState({
                loggedIn: false,
                username: null
              })
            }
          })
    }

     handleInput = (event )=>{
        console.log(event.target.id , event.target.value)
        if(event.target.id == 'skills'){
            let skills = event.target.value.split('/')
            this.setState({[event.target.id] : skills})
        }else
        this.setState({[event.target.id] : event.target.value})
     } 

     handleExperience =(event)=>{
         this.setState({addingExperience:true})
     }

     addExperience =(event)=>{
         event.preventDefault()
         let experience =[]
         let { designation ,location , brief , position ,  project } = this.state;
         let thisExperience =  { designation ,location , brief , project, position }
         experience.push(thisExperience)
         console.table("expereince",experience)
         this.setState({experience},()=>{
             this.setState({designation :'' , location :'' , brief :'' , project :'' , addingExperience :false})
         })

     }
     addField =(event)=>{
         event.preventDefault()
         console.log("hi")
     }
     imageHandler =(event)=>{
         event.preventDefault()
        console.log("this" ,event.target.files[0])

        // this.setState({image:event.target.files[0]},()=>{
        // })
        console.log("imamge, ",this.state.image)
        const data = new FormData() 
        data.append('file',event.target.files[0])
        axios.post('/user/upload',data,{}).then(response => {
            console.log('Get user upload response: ')
            console.log(response)
            console.log(response.statusText)

          })
     }
     submitProfile =(event)=>{
        event.preventDefault();
        // let {} = this.state 
        console.log("submit",this.state)
        axios.put('/user/uploadDetails',this.state,{}).then(response => {
            console.log('Get user uploaded response: ')
            console.log(response)
            console.log(response.statusText)

          })
     }

    render() {
        const imageStyle = {
            width: 400
        }
       let  {
            experience,  
            skills ,
            name,
            email,
            imageUrl,
            designation,
            profileoverview,
            contact, 
            education, 
            certification ,
            awards
          } = this.state
        return (
            <div>
                <img src={"http://localhost:8080/1571511366639-abd.jpg"} height="100px" width = "100px"/>
                <CopyToClipboard
                    text={`http://localhost:3000/public/view/${this.state.username}`}
                    onCopy={(text, result) => {
                        alert("copied sharable url , try inincognito",text, result)
                    }}
                    >
                    <div className="right" style= {{color:"blue" , fontSize:"25px" , cursor:"pointer"}}>Copy Link to share</div>
                </CopyToClipboard>
                <p>Enter you resume details</p>
                <label htmlFor="name">Name <br/>
                    <input type="text" id="name"  value ={name}  onChange={this.handleInput}/>
                </label><br/>
                <label htmlFor="email">Email <br/>
                    <input type="text" id="email" value ={email} onChange={this.handleInput}/>
                </label><br/>
                <label htmlFor="contact">Contact <br/>
                    <input type="text" id="contact" value ={contact} onChange={this.handleInput}/>
                </label><br/>
                {/* <label htmlFor="image">Image <br/>
                <input type="file" name="file" id="image" onChange={this.imageHandler}/>
                </label> */}
                <label htmlFor="profileoverview">Profile Overview <br/>
                    <textarea id="profileoverview"  value ={name} onChange={this.handleInput}/>
                </label>
                {!!experience.length && experience.map((val,index)=>{
                    return (
                    <div>
                        <h4>Experience</h4>
                        <form onSubmit={this.addField}>
                            <label htmlFor="position">Position </label><br/>
                                <input type="text" id="position" value ={val.position} onChange={this.handleInput}/>
                        </form>
                        <form>
                            <label htmlFor="designation">Designation</label><br/>
                            <input type="text" name="Designation" id="designation" value ={val.designation} onChange={this.handleInput} />
                        </form>
                        <form>
                            <label htmlFor="location" >location</label><br/>
                            <input type="text" name="location" id="location"  value ={val.location} onChange={this.handleInput} />
                        </form>
                        <form>
                            <label htmlFor="brief">Brief</label><br/>
                            <input type="text" name="brief" id="brief" value ={val.brief} onChange={this.handleInput} />
                        </form>
                        <form>
                            <label htmlFor="projectdetails" >Project</label><br/>
                            <input type="text" name="projectdetails" id="project" value ={val.project} onChange={this.handleInput} />
                        </form>
                 </div>
                )})
                } 
                <p onClick={this.handleExperience} style={{cursor: "pointer" , color:"blue"}}> Add Experience</p><br/>
                {this.state.addingExperience  &&
                    <div>
                        <form onSubmit={this.addField}>
                            <label htmlFor="position">Position </label><br/>
                                <input type="text" id="position"  onChange={this.handleInput}/>
                        </form>
                        <form>
                            <label htmlFor="designation">Designation</label><br/>
                            <input type="text" name="Designation" id="designation"  onChange={this.handleInput} />
                        </form>
                        <form>
                            <label htmlFor="location" >location</label><br/>
                            <input type="text" name="location" id="location"   onChange={this.handleInput} />
                        </form>
                        <form>
                            <label htmlFor="brief">Brief</label><br/>
                            <input type="text" name="brief" id="brief"  onChange={this.handleInput} />
                        </form>
                        <form>
                            <label htmlFor="projectdetails" >Project</label><br/>
                            <input type="text" name="projectdetails" id="project" onChange={this.handleInput} />
                        </form>
                        <button type="submit" onClick={this.addExperience} >Submit/cancel Experience </button>
                    </div>
                } 
                <label htmlFor="skills">Skills 
                    <input type="text" id="skills" value ={skills} onChange={this.handleInput}/>
                </label><br/>
                <label htmlFor="education">Education 
                    <input type="text" id="education" value ={education}  onChange={this.handleInput}/>
                </label><br/>
                <label htmlFor="certification">Cerification 
                    <input type="text" id="certification" value ={certification}  onChange={this.handleInput}/>
                </label><br/>
                <label htmlFor="awards">Awards 
                    <input type="text" id="awards" value ={awards }  onChange={this.handleInput} />
                </label><br/>
                <button type="submit" className= "btn btn-primary" onClick={this.submitProfile} style={{marginRight : "40px", marginTop:"10px"}} >Submit Profile </button>
                 <Link to={"/view"} >View Resume </Link> 
            </div>  
        )
    }
}

export default withRouter(Home)
