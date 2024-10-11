import React from "react";
import './Main.css'

export default function Main() {
    return (
        <>
        <main>
            <div className="slideright content text-white pl-28 pt-24 w-1/2">
                <h2 className="text-5xl font-bold">
                    Events
                </h2>
                <div className="text-sm mt-4 leading-5 font-thin">
                Beating Neffly 50 is a thrilling challenge that demands players to master complex levels filled with obstacles. Success requires strategic thinking, quick reflexes, and the ability to adapt to ever-changing gameplay dynamics, making each victory a rewarding achievement.
                </div>
                <button className="mt-4 rounded-full px-8 py-2 bg-blue-900">
                    <a href="#">Check Out </a>
                    <i class="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </main>
        </>
    )
}