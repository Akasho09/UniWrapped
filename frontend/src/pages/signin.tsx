import { BottomWarning } from "../components/bottomWarning"
import { Button } from "../components/button"
import { Heading } from "../components/heading"
import { InputBox } from "../components/inputBox"
import { SubHeading } from "../components/subHeading"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import React, { useState } from "react"

export const Signin = () => {
   const [email,setEmail]= useState("");
   const [password,setPassword]=useState("");
   const [error,setError] = useState("")
   const navigate=useNavigate();
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
           setEmail(e.target.value);
        }} placeholder="tahir@gmail.com" label={"Email"} />
      <InputBox onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
        setPassword(e.target.value);
      }}  placeholder ="1w3e45r4" label ={"Password"} />
        <div className="pt-4">
          <Button onClick=
            {async (e:React.MouseEvent<HTMLButtonElement>)=>{
                e.preventDefault();
                if(!email || ! password){
                 setError("Both fields are Required");
                 return;
                }
                try {
                    const response = await axios.post<{ token: string }>(
                      "http://localhost:4000/signin",
                      { email, password }
                    );
                    localStorage.setItem("token", response.data.token);
                    navigate("/dashboard");
                  } catch (err: any) {
                    setError(err.response?.data?.message || "Sign-in failed. Try again.");
                  }
              navigate("/dashboard");
            }}  
          label={"Sign in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} ButtonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}