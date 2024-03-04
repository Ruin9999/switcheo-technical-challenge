import { useState } from "react";

import { FaHome } from "react-icons/fa";
import { FaArrowRightArrowLeft, FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

import NavbarItem from './NavbarItem';

function Navbar() {
    const [active, setActive] = useState([false, true, false, false]);

    function handleClick(index: number) {
        let newActive = [false, false, false, false];
        newActive[index] = true;
        setActive(newActive);
    }

    return(
        <nav className='fixed flex justify-between items-center w-screen h-16 px-10 text-white font-bold shadow-lg'>
            <h1 className='text-xl'>CrypoConv</h1>
            <ul className="flex flex-row gap-4">
                <a href="#" onClick={() => handleClick(0)}><NavbarItem title='Home' active={active[0]} icon={<FaHome size="28" />}/></a>
                <a href="#" onClick={() => handleClick(1)}><NavbarItem title='Trade' active={active[1]} icon={<FaArrowRightArrowLeft size="28" />} /></a>
                <a href="#" onClick={() => handleClick(2)}><NavbarItem title='Buy' active={active[2]} icon={<FaArrowLeftLong size="28" />}/></a>
                <a href="#" onClick={() => handleClick(3)}><NavbarItem title='Sell' active={active[3]} icon={<FaArrowRightLong size="28" />}/></a>
            </ul>
        </nav>
    )
}

export default Navbar;