import React, { useRef, useState } from "react";
import ClassCard from "./ClassCard.jsx";
import Modal from "../lib/modal.js";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";

export default function SearchPage({ dark, filteredClasses, isEmpty }) {
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
      <div className="w-full flex justify-center">
        <div className="w-full h-fit flex flex-wrap gap-x-[50px] mt-10 md:mt-6 gap-y-10 ">
          {isEmpty ? (
            <p className={`text-xl underline underline-offset-[8px] font-semibold text-center mx-auto ${dark && "text-white"}`}>검색 조건을 입력해주세요.</p>
          ) : filteredClasses.length === 0 ? (
            <p className={`text-xl underline underline-offset-[8px] font-semibold text-center mx-auto ${dark && "text-white"}`}>해당하는 조건의 클래스는 없습니다.</p>
          ) : (
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
              {filteredClasses.map((item) => (
                <SwiperSlide key={item.id}>
                  <ClassCard openModal={openModal} desc={item} img={item.imageUrl} type={item.type} line={item.line} people={item.people} name={item.name} price={item.price} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
      {showModal && <Modal modalRef={modalRef} imageUrl={selectedImage} onClose={closeModal} content={modalCont} />}
    </>
  );
}
