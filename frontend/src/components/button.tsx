// import React from "react"

interface type{
    label : string
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
}


export function Button({label,onClick}:type){
  
    return <button 
    onClick={onClick} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
        {label}
    </button>

}