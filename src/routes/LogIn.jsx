import { Link, useNavigate } from "react-router-dom";
import InputBox from "../component/InputBox";
import Button from "../component/Button";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { apiPostLogin } from "../api";
import useUser from "../component/useUser";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useTheme } from "../ThemeContext";
// import React, { useEffect } from "react
// import App from "../App";

export default function LogIn() {
  const { isDark } = useTheme();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm();

  const { mutate } = useMutation(apiPostLogin, {
    onSuccess: (data) => {
      // console.log(data);
      if (data.result === true) {
        // 서버에서 성공 여부를 확인
        // 로그인 성공 시 세션 스토리지에 데이터 저장
        sessionStorage.setItem("userData", JSON.stringify(data));
        queryClient.invalidateQueries("getUser");
        navigate("/");
      } else {
        // 로그인 실패 시
        sessionStorage.clear();
        navigate("/users/login");
      }
    },
    onSettled: (data) => {
      if (data?.result === false) {
        setError("username", {
          message: data.message,
        });
      }
    },
  });

  const onValid = (formData) => {
    mutate(formData);
  };

  const data = useUser();

  return (
    <>
      <Link to="/" className={`text-center flex flex-col items-center w-16 mx-1 pt-2 ${isDark && "text-white"}`}>
        <IoMdArrowRoundBack size="35px" />
        <span className="font-semibold">홈페이지</span>
      </Link>
      <div>
        {data?.isLogin === true ? (
          (window.location.href = "/")
        ) : (
          <div className="w-full flex justify-center py-16 select-none">
            <div className="max-w-screen-sm w-full flex flex-col gap-8 px-4">
              {/* 로그인 타이틀 */}
              <div className="flex flex-col gap-2">
                <div className="w-full text-center text-4xl font-bold mb-1 text-mainBlue">로그인</div>
                <div className={`w-full text-center ${isDark ? "text-gray-200" : "text-neutral-600"} `}>
                  아직 회원이 아니라면&nbsp;
                  <Link to="/users/signup" className="text-mainBlue font-semibold hover:underline underline-offset-2">
                    가입하기
                  </Link>
                </div>
              </div>
              {/* 로그인 form 영역 */}
              <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-4">
                {/* 아이디 */}
                <InputBox
                  register={register}
                  name="username"
                  type="text"
                  placeholder="아이디"
                  errorOption={{
                    required: "아이디는 필수 입력사항입니다.",
                  }}
                  errors={errors?.username?.message}
                />
                {/* 비밀번호 */}
                <InputBox
                  register={register}
                  name="password"
                  type="password"
                  placeholder="패스워드"
                  errorOption={{
                    required: "패스워드는 필수 입력사항입니다.",
                  }}
                  errors={errors?.password?.message}
                />
                {/* 버튼 */}
                <Button type="submit" text="로그인" />
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
