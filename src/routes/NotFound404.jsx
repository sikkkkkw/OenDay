import React from "react";
import notf from "../img/NotFound.png";
import logo from "../img/logo.svg";
import { Link } from "react-router-dom";

export default function NotFound404() {
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
        </button>
      </div>
    </div>
  );
}
