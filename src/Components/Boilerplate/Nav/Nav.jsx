import React, { useState } from "react";
import './Nav.css';

export default function Nav() {
    const [openMenu, setOpenMenu] = useState(false);

    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    };

    return (
        <>
            <nav>
                <div className="header slideDown lg:py-8 lg:px-10 flex justify-between text-zinc-300">
                    <h2 className="text-2xl orbitron-unique font-semibold pt-8 pl-4 lg:p-0">
                        Walford Capitals
                    </h2>
                    <div className="lg:hidden pt-10" onClick={toggleMenu}>
                        <i className={` ${ openMenu ?  'fa-solid fa-xmark text-2xl' : 'fa-solid fa-bars'} z-20 absolute right-4`}></i>
                    </div>
                    <div className={`orbitron-unique links flex lg:flex-row ${openMenu ? 'bg-black bg-opacity-30 backdrop-blur-lg p-8 rounded-lg shadow-lg py-48 flex-col h-dvh z-10 items-center justify-around text-xl absolute w-dvw' : 'hidden lg:block'}`}>
                        <a className="mr-6 active" href="#">Home</a>
                        <a className="mr-6" href="#">Events</a>
                        <a className="mr-6" href="#">About US</a>
                        <a className="mr-6" href="#">Dashboard</a>
                    </div>
                </div>
            </nav>
        </>
    );
}
