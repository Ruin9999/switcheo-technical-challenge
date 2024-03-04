import React from "react";

interface NavbarItemProps {
    title: string;
    icon ?: React.ReactNode,
    active: boolean,
}

function NavbarItem(props : NavbarItemProps) {
    return(
        <li className={`grid grid-rows-1 gap-2 opacity-100 hover:opacity-50 transition-all duration-200 ${props.active ? "text-slate-400" : "text-white"} `}>
            <h1>{props.title}</h1>
        </li>
    )
}

export default NavbarItem;