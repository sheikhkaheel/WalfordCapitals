import React, { useEffect, useRef, useState } from "react";
import './Main.css';
import MovingAnimation from '../../../Components/Common/MovingAnimation/MovingAnimation';

export default function Main() {
    const cursorRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 2, y: 2 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (event) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
            if (cursorRef.current) {
                cursorRef.current.style.left = `${event.clientX}px`;
                cursorRef.current.style.top = `${event.clientY}px`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <main className="h-full w-full flex flex-col md:flex-row lg:flex-row overflow-hidden">
            <div className="slideright md:h-screen text-white pt-16 px-4 md:w-2/3 lg:pl-28 lg:pt-28 lg:w-1/2">
                <h2 
                    className="lg:text-3xl text-3xl expand text-zinc-300" 
                    onMouseEnter={() => setIsHovering(true)} 
                    onMouseLeave={() => setIsHovering(false)}
                >
                    Events
                </h2>
                <div 
                    className="lg:text-sm text-md  content expand mt-4 text-slate-400 leading-5 font-light lg:font-thin"
                    onMouseEnter={() => setIsHovering(true)} 
                    onMouseLeave={() => setIsHovering(false)}
                >
                    Beating Neffly 50 is a thrilling challenge that demands players to master complex levels filled with obstacles. Success requires strategic thinking, quick reflexes, and the ability to adapt to ever-changing gameplay dynamics, making each victory a rewarding achievement.
                </div>
                <button 
                    className="mt-6 btnShadow rounded-full relative px-8 py-3 bg-blue-900 hover:bg-slate-950 transition duration-200 delay-150"
                >
                    <a href="#">Check Out </a>
                    <i className="fa-solid fa-arrow-right pointing absolute pl-6 top-2 text-3xl w-10"></i> 
                </button>
            </div>
            <div className="relative h-80 md:h-screen lg:w-1/2 w-30 lg:h-[82vh] lg-absolute animation">
                <MovingAnimation />
            </div>
            <div ref={cursorRef} className={`cursor`} style={{ transform: isHovering ? 'scale(6)' : 'scale(1)',}} ></div>
        </main>
    );
}
