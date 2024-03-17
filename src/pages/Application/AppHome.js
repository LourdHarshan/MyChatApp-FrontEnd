import { Link, json, useLocation, useNavigate, useParams } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import scenery from "./Images/scenery.jpg";
function AppHome(){
    const [users,setUsers] = useState([]);
    const navigate = useNavigate();
    let location = useLocation();
    console.log(location);
    let urlParams = new URLSearchParams(location.search).get("user");
    let user = urlParams.replace(/^["'](.+(?=["']$))["']$/, '$1');
    function handleLogout(){
        axios.get("http://localhost:8000/logout").then(function(response){
            if(response.data=="Logged Out"){
              navigate("/");  
            }
        }).catch(function(error){
            console.log(error);
        })
    }
    useEffect(()=>{
        axios.get("http://localhost:8000/getUsers",{params:{user:user}}).then((response)=>{
            setUsers(response.data);
        }).catch((error)=>{
            console.log(error);
        })
    },[]);
    console.log(users);
    return (
        <>
        <header>
        <FaUser style={{width:50+"px",height:50+"px",borderRadius:50+"%",marginRight:30+"px",marginTop:10+"px",backgroundColor:"white",marginBottom:10+"px"}} title="logout" onClick={handleLogout}/>
        </header>
        <div id="main">
        <div>
        <datalist></datalist>
        {users.map((o)=>{
            return (<a style={{textDecorationLine:"none",padding:"10px 10px 10px 10px",boxShadow:"2px 1px 2px 2px black",display:"block"}} href={"/chat/?from="+user+"&to="+o.userName}>{o.userName}</a>)
        })}
        </div>
        
<img src={scenery} alt="img"></img>

        </div>
        </>
    )
}
export default AppHome;