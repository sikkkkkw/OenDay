import React, { useRef, useState } from "react";
import Modal from "../lib/modal.js";
import ClassCard from "./ClassCard.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { classList } from "../lib/classList.js";
import { FaFire } from "react-icons/fa6";
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
      <motion.section className="w-full flex px-5 mt-16 mb-28" variants={sectVariants} initial="start" whileInView="end" viewport={{ once: true }}>
        <div className="w-full h-full ">
          {/* title */}
          <div className="w-full max-w-[1600px] flex flex-col gap-y-2 mx-auto mb-12">
            {/* title */}
            <h2 className="font-black text-[35px] flex items-center gap-1">
              인기 클래스 <FaFire color="#ffcc32" />
            </h2>
            {/* title des */}
            <div className="font-semibold text-[20px]">어떤 클래스가 좋을지 모르겠다면? 많은 사람이 찾는 클래스부터 시작해보세요.</div>
          </div>
          {/* one-class */}
          <Swiper
            slidesPerView={1}
            pagination={{ clickable: true }}
            modules={[Pagination]}
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
            autoplay={{
              delay: 2500,
              disableOnInteraction: true,
            }}
          >
            {classList.map((item, index) => (
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
