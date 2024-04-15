import React from "react";
import bell from "../img/bannerBell.png";
import useUser from "./useUser";

export default function Banner() {
  const userData = useUser();
  const userName = userData;
  return (
    <section>
      {userName ? ( // 유저 아이디가 있으면 로그아웃 링크 표시
        <div className="w-full flex flex-col items-center justify-center py-10">
          <div className="w-full py-8 px-2 bg-mainBlue">
            <div className="w-full max-w-[800px] mx-auto flex text-white md:max-h-[85px]">
              <span className="">
                <p className="text-[30px] w-fit font-medium ">하루만클래스와 즐겁게 원데이클래스 체험하기</p>
                <p className="text-4xl w-fit font-semibold">수강신청 하시면 알림톡을 보내드려요!</p>
              </span>
              <img src={bell} alt="종이미지" className="hidden md:inline-block h-[180px] w-[180px] relative -top-[52px] -right-8" />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center py-10">
          <div className="w-full py-8 px-2 bg-mainBlue">
            <div className="w-full max-w-[800px] mx-auto flex text-white md:max-h-[85px]">
              <span className="">
                <p className="text-[30px] w-fit font-medium ">지금 회원가입하고</p>
                <p className="text-4xl w-fit font-semibold">원하는 클래스의 알림을 받아보세요!</p>
              </span>
              <img src={bell} alt="종이미지" className="hidden md:inline-block h-[180px] w-[180px] relative -top-[52px] -right-8" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
