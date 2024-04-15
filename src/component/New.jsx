import React, { useRef, useState } from "react";
import Modal from "../lib/modal.js";
import ClassCard from "./ClassCard.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { classListNew } from "../lib/classList.js";
import { FaSeedling } from "react-icons/fa";
import { motion } from "framer-motion";
import { sectVariants } from "../lib/variants.js";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";

export default function Popular({ dark }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [modalCont, setModalCont] = useState();
  const modalRef = useRef();

  const openModal = (imageUrl, item) => {
    setSelectedImage(imageUrl);
    setModalCont(item);
    setShowModal(true);
  };

  const closeModal = (e) => {
    if (modalRef.current === e.target) setShowModal(false);
    else if (e.target.classList[0] === "close") setShowModal(false);
    setSelectedImage("");
    e.stopPropagation();
  };

  return (
    <>
      <motion.section className="w-full flex px-5 my-16" variants={sectVariants} initial="start" whileInView="end" viewport={{ once: true }}>
        <div className="w-full h-full ">
          {/* title */}
          <div className="w-full max-w-[1600px] flex flex-col gap-y-2 mx-auto mb-12">
            {/* title */}
            <h2 className="font-black text-[35px] flex items-center gap-1">
              새로운 클래스
              <FaSeedling color="#ffcc32" />
            </h2>
            {/* title des */}
            <div className="font-semibold text-[20px]">지금 새로 나온 원데이 클래스는 어떠세요?</div>
          </div>
          {/* one-class */}
          <Swiper
            pagination={{ clickable: true }}
            modules={[Pagination]}
            slidesPerView={1}
            loop={true}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 3,
              },
              1500: {
                slidesPerView: 4,
              },
            }}
          >
            {classListNew.map((item, index) => (
              <SwiperSlide key={index}>
                <ClassCard openModal={openModal} desc={item} img={item.imageUrl} type={item.type} line={item.line} people={item.people} name={item.name} price={item.price} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.section>
      {showModal && <Modal dark={dark} modalRef={modalRef} imageUrl={selectedImage} onClose={closeModal} content={modalCont} />}
    </>
  );
}
