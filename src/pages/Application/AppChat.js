import { Form, useLocation, useNavigate } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import { GrAttachment } from "react-icons/gr";
import { IoIosArrowBack } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { RiShareForwardFill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import chat from "./Images/chatBackground.jpg";


function AppChat() {
    const pRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const from = new URLSearchParams(location.search).get("from");
    const to = new URLSearchParams(location.search).get("to");
    //console.log(from+" "+to);
    const [messages,setMessages]= useState([]);
    const [message, setMessage] = useState("");
    const messageInputRef = useRef(null);
    const [count,setCount] = useState(0);
    
    useEffect(()=>{
        pRef.current.scrollTop = pRef.current.scrollHeight;
        pRef.current?.lastChildElement?.setIntoView();
    },[message,count])

    useEffect(()=>{
axios.get("http://localhost:8000/getMessages?from="+from+"&to="+to).then((res)=>{
    console.log(res.data);
    setMessages(res.data);
    
    var scroller = document.getElementById("chatcontainer");
    
      
}).catch((e)=>{
    console.log(e);
});


    },[messages])

    function handleSubmit(e) {
        setCount(count+1);
        e.preventDefault();
        console.log(message);
        const form = new FormData();
        form.append("message",message);
        form.append("from",from);
        form.append("to",to);
        console.log(form.get("message"));
        if(
        axios.post("http://localhost:8000/uploadMessage",form,{headers:{"Content-Type":"x-www-form-urlencoded"}}).then((res)=>{console.log(res);setCount((count)=>count+1);}).catch((e)=>{})){
        
        console.log(count);
        }

        pRef.current.scollTop = pRef.current.scrollHeight;
        
        messageInputRef.current.value = "";
       
       
        
    }
    function handleInput(e){
let m = document.getElementById("message");
m.style.fontSize = "20px";
m.style.height = "auto";
m.style.height = m.scrollHeight+"px";
if(e.target.value.length<=29){
    m.style.height ="30px";
}
    }
    function handlePClick(){
var menu = document.getElementById("menu");
menu.style.display = "flex";

    }
    function handleClose(){
var menu = document.getElementById("menu");
menu.style.display = "none";
    }
    function handleDelete(){

    }
    function handleForward(){

    }
    function handleBack(){
     navigate('/app/?user='+from);   
    }
    
    return (
        <>
            <div id="appchatmain" style={{}}>
                <div id="chatcontainer" style={{position:"relative",backgroundImage:`url(${chat})`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
                    <header id="menu">
                    <MdDelete onClick={handleDelete}/>
                    <RiShareForwardFill onClick={handleForward} />
                    <IoMdClose onClick={handleClose} />
                    </header>
                    <IoIosArrowBack style={{fontSize:"50px",color:"white",backgroundColor:"transparent",position:"fixed"}} onClick={handleBack}/>
                    <div ref={pRef}>
                {
                messages.map((m)=>{
                    if(m.from==from){
                    return (<p style={{color:"black",backgroundColor:"white",padding:"10px",borderTopLeftRadius:"10px",borderBottomRightRadius:"10px"}} id="from" onClick={handlePClick} >{m.message}</p>)
                    }else if(m.from==to){
                        return (<p style={{color:"black",backgroundColor:"white",padding:"10px",borderTopRightRadius:"10px",borderBottomLeftRadius:"10px"}} id="to" >{m.message}</p>)
                    }
                })}
                 </div>   
                </div>
                <form style={{position:"fixed"}}>
                        <textarea onChange={(e) => { setMessage(e.target.value); }} id="message" onInput={handleInput} style={{height:"40px",color:"black"}} ref={messageInputRef} required></textarea>&nbsp;&nbsp;
                        <IoSend onClick={handleSubmit} style={{color:"white",fontSize:"40px"}}></IoSend>    
                </form>
            </div>
        </>
    );
}
export default AppChat;