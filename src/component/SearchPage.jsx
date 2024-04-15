import React, { useRef, useState } from "react";
import { classList, classListNew } from "../lib/classList.js";
import ClassCard from "./ClassCard.jsx";
import Modal from "../lib/modal.js";

export default function SearchPage({ searchQuery, dark }) {
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

  const filteredClasses = [...classList, ...classListNew].filter((item) => {
    return (item.name.includes(searchQuery) || item.type.includes(searchQuery)) && (item.name.length >= 2 || item.type.length >= 2) && searchQuery.length >= 2;
  });

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="h-fit flex flex-wrap gap-x-[50px] mt-10 md:mt-6 gap-y-10">
          {filteredClasses.length === 0 ? (
            <p className={`text-xl underline underline-offset-[8px] font-semibold text-center ${dark && "text-white"}`}>입력하신 이름의 클래스는 없습니다.</p>
          ) : (
            filteredClasses.map((item) => (
              <>
                <ClassCard openModal={openModal} desc={item} img={item.imageUrl} type={item.type} line={item.line} people={item.people} name={item.name} price={item.price} />
              </>
            ))
          )}
        </div>
      </div>
      {showModal && <Modal modalRef={modalRef} imageUrl={selectedImage} onClose={closeModal} content={modalCont} />}
    </>
  );
}
