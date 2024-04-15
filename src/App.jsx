import Header from "./component/Header";
import Popular from "./component/Popular";
import New from "./component/New";
import Qna from "./component/Qna";
import Banner from "./component/Banner";
import Footer from "./component/Footer";
import { useEffect } from "react";
import { useTheme } from "./ThemeContext";

function App() {
  // 다크모드
  const { isDark, toggleDark } = useTheme();
  
  useEffect(() => { 
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0);
    };
  }, []);

  useEffect(() => {
    if (isDark) {
      // 다크모드일 때
      document.querySelector("body").style.background = "#111";
      for (let a of document.querySelectorAll("header h2, header div, section div")) {
        a.style.color = "white";
      }
      // 헤더 검색박스
      document.querySelector(".bg-\\[\\#F8F7F9\\]").style.background = "#212122";
      document.querySelector("header input").style.background = "#3b3b3b";
      for (let a of document.querySelectorAll("option")) {
        a.style.background = "#333";
      }
      document.querySelector("footer").style.background = "#232325";
      for (let a of document.querySelectorAll("footer *")) {
        a.style.color = "#cacaca";
      }
    } else {
      // 기본값
      document.querySelector("body").style.background = "";
      for (let a of document.querySelectorAll("header h2, header div, section div")) {
        a.style.color = "";
      }
      // 헤더 검색박스
      document.querySelector(".bg-\\[\\#F8F7F9\\]").style.background = "";
      document.querySelector("header input").style.background = "";
      for (let a of document.querySelectorAll("option")) {
        a.style.background = "";
      }
      document.querySelector("footer").style.background = "";
      for (let a of document.querySelectorAll("footer *")) {
        a.style.color = "";
      }
    }
  }, [isDark]);

  return (
    <>
      <Header dark={isDark} setDark={toggleDark} />
      <Popular dark={isDark} />
      <New dark={isDark} />
      <Banner />
      <Qna dark={isDark} />
      <Footer />
    </>
  );
}

export default App;
