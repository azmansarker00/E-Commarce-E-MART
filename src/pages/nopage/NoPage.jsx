import React from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <div className="min-h-screen bg-[#95c2de] flex items-center justify-center">
      <div className="relative w-[600px] h-[600px] bg-[#95c2de]">
        
        <div className="absolute text-white text-[11rem] left-[20%] top-[8%] font-black">4</div>
        
        {/* HERE is the spinning icon */}
        <FaQuestionCircle className="absolute text-white text-[8.5rem] left-[42%] top-[15%] animate-spin" />
        
        <div className="absolute text-white text-[11rem] left-[68%] top-[8%] font-black">4</div>
        
        <div className="absolute text-center text-white text-[1.6rem] left-[16%] top-[45%] w-[75%] font-semibold">
          Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?
          <p className="mt-4">
            Let&apos;s go <Link to={"/"} className="underline hover:no-underline">home</Link> and try from there.
          </p>
        </div>
         
      </div>
    </div>
  );
}
