import React from "react";
import logo from "../img/logo.svg";
import { FaGithub, FaRightToBracket, FaSplotch } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { photoLink } from "../lib/photoLink";

const LinkLi = ({ href, text }) => (
  <li>
    <a href={href} target="_blank" rel="noreferrer">
      {text}
    </a>
  </li>
);

export default function Footer() {
  return (
    <footer className="w-full flex justify-center items-center py-8 px-2 bg-gray-100 mt-14">
      <div className="w-full h-full max-w-[1200px] flex flex-col md:flex-row gap-y-10 justify-between text-[#444]">
        {/* 푸터 왼쪽 */}
        <div className="h-full flex flex-wrap gap-x-12 gap-y-6 items-center">
          <p>
            <img src={logo} alt="하루만 로고" className="h-[50px]" />
          </p>
          <div className="max-w-[550px]">
            <p className="font-semibold uppercase mb-1">Image source</p>
            <ul className="flex flex-wrap gap-x-4">
              {photoLink.map((item, index) => (
                <LinkLi key={index} href={item.href} text={item.text} />
              ))}
            </ul>
          </div>
        </div>
        {/* 푸터 오른쪽 */}
        <ul className="flex items-center gap-6">
          <li>
            <a href="https://github.com/yj4-haruman/oneDay" rel="noreferrer" target="_blank">
              <FaGithub size="35px" color="#239AFF" />
            </a>
          </li>
          <li>
            <FaSplotch size="35px" color="#239AFF" />
          </li>
          <li>
            <Link to="/users/login">
              <FaRightToBracket size="35px" color="#239AFF" />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
