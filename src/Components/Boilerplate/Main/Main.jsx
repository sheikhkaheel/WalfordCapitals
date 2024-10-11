import React from "react";
import './Main.css';
import MovingAnimation from '../../../Components/Common/MovingAnimation/MovingAnimation';

export default function Main() {
    return (
        <main className="h-full flex flex-row overflow-hidden"> {/* Set to h-screen for full height */}
            <div className="slideright content text-white pl-28 pt-28 w-1/2">
                <h2 className="text-5xl font-bold">Events</h2>
                <div className="text-sm mt-4 leading-5 font-thin">
                    Beating Neffly 50 is a thrilling challenge that demands players to master complex levels filled with obstacles. Success requires strategic thinking, quick reflexes, and the ability to adapt to ever-changing gameplay dynamics, making each victory a rewarding achievement.
                </div>
                <button className="mt-4 rounded-full px-8 py-2 bg-blue-900">
                    <a href="#">Check Out </a>
                    <i className="fa-solid fa-arrow-right"></i>
                </button>
            </div>
            <div className="w-1/2"> {/* Ensure this div wraps the MovingAnimation */}
                <MovingAnimation />
            </div>
        </main>
    );
}
