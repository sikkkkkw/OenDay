import React, { useState } from "react";
import logo from "../img/logo.svg";
import { Link } from "react-router-dom";
import { IoGameController } from "react-icons/io5";
import { HiMiniPuzzlePiece } from "react-icons/hi2";
import { PiEggCrack } from "react-icons/pi";
import notf from "../img/NotFound.png";

export default function NotFound404() {
  const [showContent, setShowContent] = useState(false);

  const toggleContent = () => {
    setShowContent(!showContent);
  };

  return (
    <div className="w-full h-full flex justify-center relative">
      <Link to="/">
        <img src={logo} alt="하루만 로고" className="absolute top-4 left-[20px] w-[114px]" />
      </Link>
      <div className="w-full max-w-[80%] h-screen flex flex-col justify-center items-center">
        <img src={notf} alt="404 not found" className="w-full max-w-[700px]" />
        <p className="font-bold text-[34px] mt-8 mb-6">페이지를 찾을 수 없습니다.</p>
        <button>
          <Link to="/" className="bg-mainBlue font-semibold py-3 px-6 text-white rounded-full text-xl">
            홈페이지 바로가기
          </Link>
          <div className="mt-10 flex flex-col items-center gap-y-1">
            <PiEggCrack size={80} onClick={toggleContent} />
            {showContent && (
              <div>
                <div className="flex gap-x-5">
                  <div className="flex flex-col items-center">
                    <a href="https://harryproject03.netlify.app/" target="_blank"><IoGameController size={80} /></a>
                    <p className="text-[10px] w-[20px]">출처: https://github.com/haesoo-y/React_Basic_Project</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <a href="../test.html" target="_blank"><HiMiniPuzzlePiece size={80} color="blue" /></a>
                    <p>출처: </p>
                  </div>
                </div>
              </div>
            )}
        
          </div>
        </button>
      </div>
    </div>
  );
}
