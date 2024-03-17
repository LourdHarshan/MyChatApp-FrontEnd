import { useState } from 'react';
import axios from 'axios';
import logo from './Images/Signupicon.png';
import styles from './SignUp.module.css';
import { useNavigate } from 'react-router-dom';
function SignUp(){
    const [formData,setFormData] = useState({});
    const navigate = useNavigate();
    const handleChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        setFormData(values => ({...values,[name]:value}));
    }
    const handleSubmit = (event) =>{
        event.preventDefault();
        console.log(formData);
        axios.post("http://localhost:8000/addUser",formData).then(function(response){
            console.log(response);
            navigate("/");
        }).catch(function(error){
            console.log(error);
        });
        
    }
    return (
        <>
        <div className={styles.mainContainer}>
            <form onSubmit={handleSubmit}>
                <br></br>
                <h1>SignUp</h1>
                <img src={logo} alt='icon' style={{width:150+"px",height:150+"px",borderRadius:50+"%"}}></img>
                <br></br>
                <div>
                <label>Enter Name &nbsp; &nbsp;&nbsp;: 
                <input type='text' name='userName' onChange={handleChange} value={formData.userName||""} autoComplete='additional-name' /></label>
                </div>
                <div>
                
                <label > Enter Password : 
                <input type='text' name='password'  onChange={handleChange} value={formData.password||""} autoComplete='additional-name' /></label>
                </div>
            
                <div><input type='submit' value={"Signup"} style={{width:350+"px",height:30+"px",fontSize:"larger",color:'white',backgroundColor:"blue"}}/></div>
                If you already have an account <a href='http://localhost:3000/'>login</a>
            </form>
        </div>
        </>
    );
}
export default SignUp;