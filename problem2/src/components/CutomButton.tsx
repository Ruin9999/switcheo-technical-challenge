import React from "react";

interface CustomButtonProps {
    title?: string,
    onClick: any,
    icon?: React.ReactNode,
    className?: string,
}

function CustomButton(props: CustomButtonProps) {
    return(
        <div onClick={props.onClick} className={`flex w-full h-full justify-center items-center bg-gradient-to-r from-violet-800 to-purple-800 rounded-md opacity-90 hover:shadow-lg hover:opacity-100 transition-all duration-300 ${props.className}`}>
            {props.title} 
            {
            props.icon ? <span className='h-10 w-10 flex justify-center items-center'>{props.icon} </span> : ""
            }
        </div>
    )
}

export default CustomButton;