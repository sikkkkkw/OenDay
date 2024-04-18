import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRotateLeft, FaSun, FaMoon } from "react-icons/fa6";
import useUser from "./useUser";
import { apiPostLogout } from "../api";
import logo from "../img/logo.svg";
import SearchPage from "./SearchPage.jsx";
import { classList } from "../lib/classList";
import angleDown from "../img/angleDown.svg";
import { motion } from "framer-motion";

export default function Header({ dark, setDark }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [classType, setClassType] = useState("");
  const [participants, setParticipants] = useState("");
  const [onlineOffline, setOnlineOffline] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  const handleReset = () => {
    setSearchQuery("");
    setClassType("");
    setParticipants("");
    setOnlineOffline("");
    setPriceRange("");
    setFilteredClasses([]);
    setIsSearched(false);
  };

  const userData = useUser();
  // console.log(userData);
  const userName = userData; // 유저 아이디 추출

  const handleLogout = async () => {
    await apiPostLogout();
    sessionStorage.clear();
    window.location.href = "/";
  };

  const handleSearch = () => {
    const filtered = classList.filter((item) => {
      const nameIncludesQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const typeIncludesQuery = item.type.toLowerCase().includes(searchQuery.toLowerCase());
      return nameIncludesQuery || typeIncludesQuery;
    }).filter((item) => {
      return (!classType || item.type === classType) &&
        (!participants || item.people.includes(participants)) &&
        (!onlineOffline || item.line === onlineOffline) &&
        (!priceRange || parseInt(item.price) >= parseInt(priceRange));
    });
    setFilteredClasses(filtered);
    setIsSearched(true);
  };
  const titVariants = {
    start: { y: "100px" },
    end: { y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } },
  };
  const titVariants2 = {
    start: { opacity: 0 },
    end: { opacity: 1 },
  };

  return (
    <>
      <header className="w-full flex justify-center select-none">
        <div className="w-full h-screen">
          <div className="absolute z-10 w-full flex justify-between p-4 px-[20px]">
            <img src={logo} alt="하루만로고" className="w-[114px] cursor-pointer" onClick={() => window.location.reload()} />
            <div className="flex text-mainBlue font-semibold text-lg ">
              <div className="px-2 pb-1 flex ml-4 md:ml-0 md:mr-4 items-top cursor-pointer h-fit items-center" onClick={() => setDark(!dark)}>
                {dark ? (
                  <>
                    <FaSun size="25px" className="mr-1" />
                    <p className="hidden md:inline-block">밝게</p>
                  </>
                ) : (
                  <>
                    <FaMoon size="25px" />
                    <p className="hidden md:inline-block">어둡게</p>
                  </>
                )}
              </div>
              <div>
                {userName ? (
                  <>
                    <Link to="/users/mypage" className="px-3 py-2 rounded-xl mx-1 text-white bg-mainBlue">
                      {userName?.user?.username}&nbsp;님
                    </Link>
                    <Link className="px-2 py-1 rounded-lg mx-1" onClick={handleLogout}>
                      로그아웃
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/users/login" className="px-2 py-1 rounded-lg mx-1">
                      로그인
                    </Link>
                    <Link to="/users/signup" className="px-3 py-2 rounded-xl mx-2 text-white bg-mainBlue">
                      회원가입
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="w-full h-[75vh] flex justify-center items-center bg-center bg-cover mainhead">
            <div className="w-full max-w-[1000px] flex items-center justify-between">
              {/* 헤더 제목 */}
              <motion.div className="px-4 select-none" initial="start" animate="end" transition={{ delayChildren: 0.2, staggerChildren: 0.1 }}>
                <h2 className="font-semibold mb-2 text-[#333] ffNetm">하루만클래스와 함께하는</h2>
                <h1 className="font-bold flex flex-col gap-y-3 text-[#333] ffNetm">
                  <div className="ffNetm">대구만의</div>
                  <div className="ffNetm flex overflow-hidden">
                    즐거운&nbsp;
                    <span className="flex">
                      <motion.div variants={titVariants} className="ffNetm">
                        하
                      </motion.div>
                      <motion.div variants={titVariants} className="ffNetm">
                        루
                      </motion.div>
                      <motion.div variants={titVariants} className="ffNetm">
                        하
                      </motion.div>
                      <motion.div variants={titVariants} className="ffNetm">
                        루
                      </motion.div>
                    </span>
                  </div>
                </h1>
                <motion.h3 className="text-xl ml-3 mt-4" variants={titVariants2} transition={{ duration: 0.5 }}>
                  &lt;하루만클래스&gt;는 오직 대구에서만 즐길 수 있는
                  <br />
                  특별한 원데이클래스를 제공해드립니다.
                </motion.h3>
              </motion.div>
            </div>
          </div>
          <div className="absolute w-full flex justify-center top-[65vh] px-2">
            <div className="w-[1000px] h-[290px] md:h-[245px] bg-[#F8F7F9] rounded-[20px]">
              <div className="w-full flex">
                <div className="w-full flex justify-end p-4 pr-[11%]">
                  <p className="flex items-center gap-1 font-semibold cursor-pointer" onClick={handleReset}>
                    <span>검색 초기화</span> <FaArrowRotateLeft />
                  </p>
                </div>
              </div>
              <div className="w-full flex justify-center ">
                <input className="border-2 w-[80%] h-[50px] pl-2 hover:border-[#239AFF] focus:outline-none focus:ring-2 focus:ring-[#239AFF]  text-center placeholder-center rounded-2xl" type="text" placeholder="검색어 입력창" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
              <div className="w-full flex flex-wrap justify-center text-center gap-4 py-6">
                <button className="w-fit">
                  <select className="border-2 border-gray-400 rounded-2xl outline-none p-2 pr-[29px] cursor-pointer" style={{ background: `url(${angleDown}) no-repeat 90% 50%/15px` }} value={classType} onChange={(e) => setClassType(e.target.value)}>
                    <option value="" disabled className="bg-white">
                      분류
                    </option>
                    <option value="drawing" className="bg-white">
                      드로잉
                    </option>
                    <option value="perfume" className="bg-white">
                      음악
                    </option>
                    <option value="baking" className="bg-white">
                      요리
                    </option>
                    <option value="sport" className="bg-white">
                      스포츠
                    </option>
                    <option value="ceramic" className="bg-white">
                      체험
                    </option>
                    {/* 나머지 옵션들 추가 */}
                  </select>
                </button>
                {/* 세부 검색박스 버튼들 */}
                <button className="w-fit">
                  <select className="border-2 border-gray-400 rounded-2xl outline-none p-2 pr-[29px] cursor-pointer" style={{ background: `url(${angleDown}) no-repeat 90% 50%/15px` }} value={participants} onChange={(e) => setParticipants(e.target.value)}>
                    <option value="" disabled className="bg-white">
                      참가 인원
                    </option>
                    <option value="0-4" className="bg-white">
                      0 ~ 4 명
                    </option>
                    <option value="5-9" className="bg-white">
                      5 ~ 9명
                    </option>
                    <option value="10-15" className="bg-white">
                      10 ~ 15명
                    </option>
                    {/* 나머지 옵션들 추가 */}
                  </select>
                </button>
                <button className="w-fit">
                  <select className="border-2 border-gray-400 rounded-2xl outline-none p-2 pr-8 cursor-pointer" style={{ background: `url(${angleDown}) no-repeat 90% 50%/15px` }} value={onlineOffline} onChange={(e) => setOnlineOffline(e.target.value)}>
                    <option value="" disabled className="bg-white">
                      온/오프라인
                    </option>
                    <option value="online" className="bg-white">
                      온라인
                    </option>
                    <option value="offline" className="bg-white">
                      오프라인
                    </option>
                  </select>
                </button>
                <button className="w-fit">
                  <select className="border-2 border-gray-400 rounded-2xl outline-none p-2 cursor-pointer" style={{ background: `url(${angleDown}) no-repeat 90% 50%/15px` }} value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                    <option value="" disabled className="bg-white">
                      가격
                    </option>
                    <option value="30000" className="bg-white">
                      30,000원 ~
                    </option>
                    <option value="50000" className="bg-white">
                      50,000원 ~
                    </option>
                    <option value="100000" className="bg-white">
                      100,000원 ~
                    </option>
                    {/* 나머지 옵션들 추가 */}
                  </select>
                </button>
              </div>
              <div className="w-full flex justify-center mt-[0px] sm:mt-[15px]">
                <button className="w-[50%] py-3 bg-mainBlue rounded-full" onClick={handleSearch}>
                  <p className="font-bold text-[26px] text-white">강좌 검색하기</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* modal */}
      <section className="w-full h-full flex justify-center">
        {isSearched && (
          <div className="w-full h-full flex justify-center">
            <SearchPage dark={dark} searchQuery={searchQuery} classList={filteredClasses} />
          </div>
        )}
      </section>
    </>
  );
}
