// home.js contains an image — it’s a page we’ll redirect to after login. It’s not authenticated. The username will display with a greeting if they are logged in.

import React, { Component } from 'react';
import axios from "axios";
import {Link  , Redirect}  from "react-router-dom"
class ViewResume extends Component {

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
        }
    }   
    componentDidMount(){
        debugger;
        if(window.location.href.includes("/public")){
            let url = `user/userdetails/public/${window.location.href.substring(window.location.href.lastIndexOf('/')+1)}`
            const options = {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                // credentials: "include",
              };
              console.log(`http://localhost:8080/${url}`)
            fetch(`http://localhost:8080/${url}`, options)
            .then(response => {
              if (response.status == 200) {
                response.json().then(json => {
                  if (json) {
                    let {experience , skills,designation , name , email , imageUrl ,profileoverview , contact ,  education, certification , awards} = json.userdetails
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
                      awards
                    })
                    console.log("fasF")
                  } else {
                    // dispatch({ type: "INSERT_WIKI_FAILURE" });
                    console( "Posts unable to add.");
                  }
                });
              } else {
                console.log("dasfdasdasf")
              }
            })
        }

        axios.get('user/userdetails/').then(response => {
            console.log('Get user response: ')
            console.log(response.data)
            if (response.data.userdetails) {
              console.log('Get User: There is a user saved in the server session: ')
            let {experience , skills,designation , name , email , imageUrl ,profileoverview , contact ,  education, certification , awards} = response.data.userdetails
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
                awards
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
         debugger;
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
            <div >
                {/* <img src={"http://localhost:8080/abdullatasleem.jpeg"} className="left" style= {{float:"left"}} /> */}
                <p>Enter you resume details</p>
                {/* <label htmlFor="image">Image <br/>
                    <input type="file" name="file" onChange={this.imageHandler}/>
                </label> */}
                <label htmlFor="">Name 
                    <input type="text" className="view-type" id="name"  value ={name}  onChange={this.handleInput}/>
                </label><br/>
                <label htmlFor="">Email 
                    <input type="text" className="view-type" id="email" value ={email} onChange={this.handleInput}/>
                </label><br/>
                <label htmlFor="">Contact 
                    <input type="text" className="view-type" id="contact" value ={contact} onChange={this.handleInput}/>
                </label><br/>
                <label htmlFor="">Profile Overview
                    <textarea id="profileoverview"  value ={name} onChange={this.handleInput}/>
                </label>
                {!!experience.length && experience.map((val,index)=>{
                    return (
                    <div>
                        <h4>Experience</h4>
                        <form onSubmit={this.addField}>
                            <label htmlFor="">Position 
                                <input type="text" className="view-type" id="position" value ={val.position} onChange={this.handleInput}/>
                            </label>
                        </form>
                        <form>
                            <label htmlFor="">Designation</label><br/>
                            <input type="text" className="view-type" name="Designation" id="designation" value ={val.designation} onChange={this.handleInput} />
                        </form>
                        <form>
                            <label htmlFor="" >location</label><br/>
                            <input type="text" className="view-type" name="location" id="location"  value ={val.location} onChange={this.handleInput} />
                        </form>
                        <form>
                            <label htmlFor="">Brief</label><br/>
                            <input type="text" className="view-type" name="brief" id="brief" value ={val.brief} onChange={this.handleInput} />
                        </form>
                        <form>
                            <label htmlFor="" >Project</label><br/>
                            <input type="text" className="view-type" name="projectdetails" id="project" value ={val.project} onChange={this.handleInput} />
                        </form>
                 </div>
                )})
                } 
                <p onClick={this.handleExperience} style={{cursor: "pointer"}}> Add Experience</p><br/>
                {this.state.addingExperience  &&
                    <div>
                        <form onSubmit={this.addField}>
                            <label htmlFor="">Position 
                                <input type="text" className="view-type" id="position"  onChange={this.handleInput}/>
                            </label>
                        </form>
                        <form>
                            <label htmlFor="">Designation</label><br/>
                            <input type="text" className="view-type" name="Designation" id="designation"  onChange={this.handleInput} />
                        </form>
                        <form>
                            <label htmlFor="" >location</label><br/>
                            <input type="text" className="view-type" name="location" id="location"   onChange={this.handleInput} />
                        </form>
                        <form>
                            <label htmlFor="">Brief</label><br/>
                            <input type="text" name="brief" id="brief"  onChange={this.handleInput} />
                        </form>
                        <form>
                            <label htmlFor="" >Project</label><br/>
                            <input type="text" name="projectdetails" id="project" onChange={this.handleInput} />
                        </form>
                        <button type="submit" onClick={this.addExperience} >Submit Experience </button>
                    </div>
                } 
                <label htmlFor="">Skills 
                    <input type="text" id="skills" value ={skills}  className="view-type"  onChange={this.handleInput}/>
                </label><br/>
                <label htmlFor="">Education 
                    <input type="text" id="education" value ={education} className="view-type"   onChange={this.handleInput}/>
                </label><br/>
                <label htmlFor="">Cerification 
                    <input type="text" id="certification" value ={certification} className="view-type"   onChange={this.handleInput}/>
                </label><br/>
                <label htmlFor="">Awards 
                    <input type="text" id="awards" value ={awards }  onChange={this.handleInput} />
                </label><br/>
                <Link to={"/"} >Edit Resume </Link>
            </div>  
        )
    }
}

export default ViewResume;