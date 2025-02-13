import {Link} from "react-router-dom"
// import React from "react"
interface BottomWarningProps {
    label: string;
    ButtonText: string;
    to: string;
  }

export function BottomWarning({label,ButtonText,to}:BottomWarningProps){
return <div  className="py-2 text-sm flex justify-center">
        {label}
    <Link className="pointer underline pl-1 cursor-pointer" to={to}>
  {ButtonText}
    </Link>
</div>
 
}