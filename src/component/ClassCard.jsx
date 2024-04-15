import React from "react";
import { FaGlobe, FaUsers } from "react-icons/fa";
import ClassCate from "./ClassCate";

export default function ClassCard(props) {
  return (
    <div className="w-full sm:w-[345px] h-full flex flex-col rounded-2xl mx-auto select-none mb-3">
      {/* 사진 */}
      <div onClick={() => props.openModal(props.imageUrl, props.desc)} className="w-full h-[265px] rounded-2xl overflow-hidden classCard cursor-pointer mb-3">
        <img className="w-full h-full bg-gray-200 object-cover" src={props.img} alt="클래스 이미지" />
      </div>
      {/* 정보 */}
      <div className="w-full flex justify-between px-2 items-center mb-3">
        <ClassCate txt={props.type} />
        <div className="flex gap-x-5">
          <div className=" flex gap-x-1 items-center">
            <FaGlobe />
            {props.line}
          </div>
          <div className="flex gap-x-1 items-center">
            <FaUsers />
            {props.people}명
          </div>
        </div>
      </div>
      {/* 이름 */}
      <div className="w-full flex px-2 text-xl font-semibold">
        <p>{props.name}</p>
      </div>
      {/* 가격 */}
      <div className="grid px-2 text-lg">
        <div className="justify-self-end">{props.price}원</div>
      </div>
    </div>
  );
}
