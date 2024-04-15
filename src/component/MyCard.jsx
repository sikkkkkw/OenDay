import React from "react";

export default function MyCard(props) {
  return (
    <div className={`w-full sm:w-[345px] h-full flex flex-col rounded-2xl mb-3 mx-auto select-none cursor-pointer ${props.dark && "text-white"}`}>
      {/* class img */}
      <div onClick={() => props.openModal(props.imageUrl, props.desc)} className="w-full h-[265px] rounded-2xl overflow-hidden classCard mb-4">
        <img className="w-full h-full bg-gray-200 object-cover" src={props.img} alt="클래스 이미지" />
      </div>
      <div className="px-2 text-xl font-semibold mb-1">{props?.name}</div>
      <div className="flex px-2 justify-between text-lg">
        {/* 예약날짜 */}
        <div>예약날짜: {props?.date}</div>
        {/* 예약인원 */}
        <div>예약인원: {props?.number}명</div>
      </div>
    </div>
  );
}
