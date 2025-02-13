import { BottomWarning } from "../components/bottomWarning";
import { Button } from "../components/button";
import { Heading } from "../components/heading";
import { InputBox } from "../components/inputBox";
import { SubHeading } from "../components/subHeading";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { useState } from "react";
export const Signup = ()=>{
 const [email,setEmail]=useState("");
 const [username,setUsername]=useState("");
 const [password,setPassword]=useState("");
 const navigate=useNavigate();
  
 return <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
         <Heading label={"Sign up"}/>
         <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
           setEmail(e.target.value);
        }} placeholder="tahir@gmail.com" label={"Email"} />
        <InputBox onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
           setUsername(e.target.value);
        }} placeholder="tahir01" label={"Username"} />
        <InputBox onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
          setPassword(e.target.value);
        }}
         placeholder="123456" label={"Password"} />
        <div className="pt-4">
            <Button onClick=
            {async (e:React.MouseEvent<HTMLButtonElement>)=>{
                e.preventDefault();
             const response= await axios.post<{ token: string }>("http://localhost:4000/signup",{
                email:email,
                username:username,
                password:password
              });
              localStorage.setItem("token", response.data.token);
              navigate("/dashboard");
            }}  
            label={"Sign up"}/>
        </div>
        <BottomWarning label={"Already have an account?"} ButtonText={"Sign in"} to={"/signin"}/>
        </div>
      </div>
 </div>
}
