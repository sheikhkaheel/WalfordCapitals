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
            <div
                className="slideright md:h-full text-white pt-16 px-4 md:w-2/3 lg:pl-28 lg:pt-32 lg:w-1/2"
            >
                <div>
                    <h2 onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)} className="lg:text-3xl text-3xl orbitron-unique font-bold text-zinc-300">
                        Events
                    </h2>
                    <div onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)} className="lg:text-xs text-xs orbitron-unique mt-4 text-slate-400 lg:leading-6 font-light lg:font-extralight">
                        Beating Neffly 50 is a thrilling challenge that demands players to master complex levels filled with obstacles. Success requires strategic thinking, quick reflexes, and the ability to adapt to ever-changing gameplay dynamics, making each victory a rewarding achievement.
                    </div>
                </div>
                <button className="mt-6 btnShadow orbitron-unique font-bold rounded-full relative px-8 py-3 bg-blue-900 hover:bg-slate-950 transition duration-200 delay-150">
                    <a href="#">Check Out </a>
                    <i className="fa-solid fa-arrow-right pointing absolute pl-6 top-2 text-3xl w-10"></i>
                </button>
            </div>
            <div className="lg:w-1/2 w-auto animation">
                <MovingAnimation />
            </div>

            <div ref={cursorRef} className={`cursor`} style={{ transform: isHovering ? 'scale(6)' : 'scale(1)', }}></div>
            <div className="socialLinks text-white flex flex-col h-40 absolute justify-around right-2 px-2 text-xl top-2/3 lg:top-1/3 animation">
                <i className="fa-brands fa-linkedin-in"></i>
                <i className="fa-brands fa-instagram"></i>
                <i className="fa-brands fa-twitter"></i>
                <i className="fa-brands fa-facebook-f"></i>
            </div>
        </main>
    );
}
