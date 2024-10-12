import React from "react";
import './Main.css';
import MovingAnimation from '../../../Components/Common/MovingAnimation/MovingAnimation';

export default function Main() {
    return (
        <main className="h-full flex flex-row overflow-hidden"> {/* Set to h-screen for full height */}
            <div className="slideright text-white pl-28 pt-28 w-1/2">
                <h2 className="text-3xl text-zinc-300 ">Events</h2>
                <div className="text-sm content mt-4 text-slate-400 leading-5 font-thin">
                    Beating Neffly 50 is a thrilling challenge that demands players to master complex levels filled with obstacles. Success requires strategic thinking, quick reflexes, and the ability to adapt to ever-changing gameplay dynamics, making each victory a rewarding achievement.
                </div>
                <button className="mt-6 rounded-full px-8 py-3 bg-blue-900">
                    <a href="#">Check Out </a>
                    <i className="fa-solid fa-arrow-right absolute pl-6 top-64 pt-5 text-3xl w-10 "></i> 
                </button>
            </div>
            <div className="w-1/2"> {/* Ensure this div wraps the MovingAnimation */}
                <MovingAnimation />
            </div>
        </main>
    );
}
