import React, { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaCoins, FaLocationDot, FaClock, FaGlobe, FaUsers, FaCarSide } from "react-icons/fa6";
import ClassCate from "../component/ClassCate";
import { motion } from "framer-motion";
import { IoLogoInstagram } from "react-icons/io";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller, useForm } from "react-hook-form";
import useUser from "../component/useUser";
import Swal from 'sweetalert2'

export default function Modal({ modalRef, onClose, content, dark }) {
  const [value, setValue] = useState(dayjs());
  // const [number, setNumber] = useState(1);
  const { handleSubmit, control } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userData = useUser();
  const userName = userData;

  const handleReservation = () => {
    if (!userName) {
      Swal.fire({
        icon: "error",
        title: "회원가입 해주세요.",
        footer: '<a href="../users/SignUp" style="color: blue;">로그인 및 회원가입 하러가기</a>'
      });
    }
  };

  // 알림톡 전송을 위한 버튼 이벤트 핸들러
  const handtest = (newData) =>{

    // BaseURL 지정 
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    // 세션에서 현재 신청한 클래스 이름을 가져옴
    const totalUserData = JSON.parse(sessionStorage.getItem("DataArray") || "[]");
    console.log(totalUserData);


      const name = userName?.user?.username;
      const className = newData.name;
      const year = newData.dateYear;
      const month = newData.dateMonth;
      const day = newData.dateDay;
      const people = newData.number;
      const tel = userName?.user?.phone;
      const LINK = "링크넣어주세요";
      const pfid = process.env.PFID;
      const templateId = process.env.TEMPLATEID;

    //데이터를 서버로 보내는 구성
    const data = {
        name,
        className,
        year,
        month,
        day,
        tel,
        people,
        LINK,
        pfid,
        templateId
    };

    console.log("sdsdsdsd:",data);

    fetch(`${BASE_URL}/users/solap`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json()) // 1번째 then은 API 요청이 완료되었을때 결고값을 JSON 으로 변환해줌 
    .then(data => { //2번째 then은 API 요청이 완료되었을때 페이지를 이동시켜줌  
      Swal.fire({
        position: "top",
        icon: "success",
        title: "수강신청 완료되었습니다.",
        showConfirmButton: false,
        timer: 1500
      });
        
    })
    .catch((error) => {
        console.error('Error:', error);
        //document.getElementById('result-message').innerHTML = 'Error: ' + error.message; // 에러 메시지 출력
    });
  }

  const onsubmit = async (data) => {
    if (!data.date || !data.number) {
      // alert("날짜와 인원수를 모두 입력하세요.");
      Swal.fire({
        position: "top",
        // title: "The Internet?",
        title: "날짜와 인원수를 모두 입력하세요.",
        icon: "question"
      });
      return;
    } else {
      if (isSubmitting) return; // 이미 수강 신청 중이면 함수 종료
  
      setIsSubmitting(true); // 수강 신청 중으로 상태 변경
  
      // console.log(data);
  
      const newData = {
        address: content.address,
        time: content.time,
        name: content.name,
        park: content.park,
        price: content.price,
        type: content.type,
        line: content.line,
        people: content.people,
        desc: content.desc,
        desc2: content.desc2,
        desc3: content.desc3,
        imageUrl: content.imageUrl,
        dateYear: data.date.slice(0, 4), // 'YYYY' 형식으로 분리
        dateMonth: data.date.slice(5, 7), // 'MM' 형식으로 분리
        dateDay: data.date.slice(8, 10), // 'DD' 형식으로 분리
        date:data.date,
        number: data.number
      };
  
      // 세션 스토리지에서 기존 데이터 불러오기
      const existingData = JSON.parse(sessionStorage.getItem("DataArray") || "[]");
  
      // 중복 체크
      const isDuplicate = existingData.some((item) => item.name === newData.name && item.dateYear === newData.dateYear && item.dateMonth === newData.dateMonth && item.dateDay === newData.dateDay);
  
      if (isDuplicate) {
        alert("이미 수강 신청한 클래스입니다.");
        setIsSubmitting(false); // 수강 신청 완료 후 상태 변경
        return;
      }
  
      // 중복되지 않으면 새로운 데이터 추가
      const updatedData = [...existingData, newData];
      sessionStorage.setItem("DataArray", JSON.stringify(updatedData));
      setIsSubmitting(false); // 수강 신청 완료 후 상태 변경
      handtest(newData);
    }
  };
  
  const isUserLoggedIn = !!userName; // 사용자가 로그인했는지 확인

  return (
    <div className="modal z-10" ref={modalRef} onClick={onClose}>
      <motion.div initial={{ opacity: 0.5, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }} className={`modal-content overflow-y-scroll ${dark ? "bg-[#151515]  text-white" : "bg-white "}`}>
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="modal-text flex flex-col py-8 px-3 lg:p-12">
          <div className="flex flex-col lg:flex-row gap-y-4 gap-x-2">
            <div className="w-full h-[600px] bg-gray-300 rounded-2xl overflow-hidden">
              <img className="w-full h-full" src={content.imageUrl} alt="Class" />
            </div>
            {/* 사이드바 */}
            <aside className={`w-full lg:w-[380px] min-h-[600px] flex flex-col rounded-2xl p-8 gap-y-2 ${dark && "bg-[#070707]"}`} style={dark ? {} : { boxShadow: "-10px 4px 64px rgba(180, 180, 180, 0.2)" }}>
              <h3 className="font-semibold text-3xl mb-2">{content.name}</h3>
              <ClassCate txt={content.type} />
              <div className="flex flex-col gap-y-[8px] pt-3 text-lg">
                <div className="flex gap-x-2 items-center">
                  <FaLocationDot size="22px" />
                  <p>{content.address}</p>
                </div>
                <div className="flex gap-x-3 items-center">
                  <FaClock size="22px" />
                  <p>{content.time}시간</p>
                </div>
                <div className="flex gap-x-3 items-center">
                  <FaGlobe size="22px" />
                  <p>{content.line}</p>
                </div>
                <div className="flex gap-x-3 items-center">
                  <FaUsers size="22px" />
                  <p>{content.people}명</p>
                </div>
                <div className="flex gap-x-3 items-center">
                  <FaCarSide size="22px" />
                  <p>주차 {content.park}</p>
                </div>
                <div className="flex gap-x-3 items-center">
                  <FaCoins size="22px" />
                  <p>1인당 {content.price}원</p>
                </div>
              </div>
              <form onSubmit={handleSubmit(onsubmit)}>
                <h3 className="mt-8 font-medium text-xl mb-2">날짜 선택</h3>
                <Controller
                  control={control}
                  name="date"
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs} dateFormats={{ monthShort: `M` }}>
                      <DemoContainer components={["DatePicker", "DatePicker"]}>
                        <DatePicker
                          format="YYYY-MM-DD"
                          defaultValue={dayjs()}
                          onChange={(newValue) => {
                            setValue(newValue.format("YYYY-MM-DD"));
                            field.onChange(newValue.format("YYYY-MM-DD"));
                          }}
                          disablePast={true}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  )}
                />
                <h3 className="mt-6 font-medium text-xl mb-2">인원수</h3>
                <div className="flex items-center relative">
                  <Controller
                    control={control}
                    name="number"
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        value={field.value} // 초기값을 비워두고 사용자 입력에 따라 값이 들어감
                        className={`ring-1 ring-[#c8c8c8] px-3 rounded-sm text-lg w-full lg:w-[230px] h-12 outline-none ${dark && "text-gray-600"}`}
                        onChange={(e) => {
                          const inputNum = parseInt(e.target.value);
                          if (!isNaN(inputNum) && inputNum >= 1 && inputNum < 100) {
                            // 최대 두 자리까지만 허용
                            field.onChange(inputNum);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Backspace") {
                            // 값이 비어있는 경우에 알람창으로 메시지 보여주기
                            if (field.value === "" || field.value === undefined) {
                              alert("예약인원을 정해주세요");
                            } else {
                              // 값이 비어있지 않은 경우에만 마지막 자리를 제거함
                              const newValue = field.value.toString().slice(0, -1);
                              field.onChange(newValue);
                            }
                          }
                        }}
                      />
                    )}
                  />
                  <span className="absolute text-lg right-[8px] text-gray-500 bg-white p-1">명</span>
                </div>
                {isUserLoggedIn ? (
                  <button type="submit" disabled={isSubmitting} className="w-full h-[55px] bg-mainBlue text-white rounded-2xl flex justify-center items-center gap-x-3 mt-4 font-bold text-[19px]">
                    <FaRegStar size="19px" />
                    수강 신청
                  </button>
                ) : (
                  <button type="button" className="w-full h-[55px] bg-mainBlue text-white rounded-2xl flex justify-center items-center gap-x-3 mt-4 font-bold text-[19px]" onClick={handleReservation}>
                    <FaRegStar size="19px" />
                    수강 신청
                  </button>
                )}
              </form>
            </aside>
          </div>
          <div className="w-full flex flex-col gap-y-6 py-10 px-8">
            {/* modal des */}
            <div className="flex flex-col gap-y-2">
              <h4 className="font-semibold text-[27px]">클래스 소개</h4>
              <p className="w-full lg:w-[78%] text-xl mb-12" dangerouslySetInnerHTML={{ __html: content.desc }} />
              <h4 className="font-semibold text-[27px]">이런 분들에게 추천해요</h4>
              <p className="w-full lg:w-[78%] text-xl mb-12" dangerouslySetInnerHTML={{ __html: content.desc2 }} />
              <h4 className="font-semibold text-[27px]">선생님 소개</h4>
              <p className="w-full lg:w-[78%] text-xl " dangerouslySetInnerHTML={{ __html: content.desc3 }} />
              <div className="mb-4 border-2 w-fit px-2 py-1 rounded-md border-gray-400">
                <a href={content.sns} target="_blank" className={`flex gap-1 items-center ${!dark && "text-gray-600"}`} rel="noreferrer">
                  <IoLogoInstagram size="24px" color={`${dark ? "white" : "gray"}`} />
                  SNS
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}