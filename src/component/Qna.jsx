import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { sectVariants } from "../lib/variants";

const Detail = ({ summ, txt, border, dark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleQna = () => setIsOpen(!isOpen);
  return (
    <div className="">
      <button onClick={toggleQna} className={`${border} px-5 py-[16px] border-[#ccc] w-full text-left flex justify-between items-center text-[20px] font-semibold outline-none`}>
        <p>{summ}</p>
        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div className={`overflow-hidden text-[18px] ${dark ? "bg-[#212121]" : "bg-[#f7f7f7]"}`} initial={{ height: 0, padding: "0px 20px" }} animate={{ height: "60px", padding: "16px 20px" }} exit={{ height: 0, padding: "0px 20px" }} transition={{ duration: 0.2 }}>
            {txt}            
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Qna({ dark }) {
  return (
    <motion.section className="w-full flex justify-center py-5 select-none" variants={sectVariants} initial="start" whileInView="end" viewport={{ once: true }}>
      <div className="w-[95%] max-w-[1100px] h-full flex flex-col gap-y-2">
        <h2 className="font-black text-[34px] mb-[20px]">자주 묻는 질문</h2>
        <div className="w-full max-w-[1100px] mx-auto flex flex-col border border-[#ccc] rounded-2xl overflow-hidden">
          <Detail summ="원데이클래스가 뭔가요?" txt="'원데이클래스'는 말 그대로 하루 몇시간 동안 가볍게 들을 수 있는 수업입니다. 바쁜 일상에서도 부담 없이 색다른 체험을 할 수 있습니다." border="border-b" dark={dark} />
          <Detail summ="로그인하면 어떤 혜택을 받을 수 있나요?" txt="원하는 원데이클래스를 수강 신청하고, 수업일이 다가오면 알림톡을 받을 수 있습니다." border="border-b" dark={dark} />
          <Detail summ="온라인 클래스는 어떻게 진행되나요?" txt="Zoom, Skype 등 화상회의 프로그램을 사용합니다." border="border-b" dark={dark} />
          <Detail summ="혼자서도 참가할 수 있나요?" txt="네. 모든 수업은 신청 인원에 상관없이 참가할 수 있습니다. 단 수업 참가 인원보다 많은 인원은 신청할 수 없습니다." border="border-b" dark={dark} />
          <Detail summ="결제는 어떻게 하나요?" txt="결제 기능은 구현 예정입니다." dark={dark} />
        </div>
      </div>
    </motion.section>
  );
}
