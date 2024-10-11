import React from "react";
import './Nav.css'

export default function Nav(){
    return (
        <>
        <nav>
            <div className="header slideDown py-8 px-10 flex justify-between text-white">
                <h2 className="text-xl">
                    Walford Capitals
                </h2>
                <div className="">
                    <a className="mr-6" href="#">Events</a>
                    <a className="mr-6" href="#">About US</a>
                    <a className="mr-6" href="#">More</a>
                    <a className="mr-6" href="#">More</a>
                </div>
                <div>
                    <a href="#">Dashboard</a>
                </div>
            </div>
        </nav>
        </>
    )
}