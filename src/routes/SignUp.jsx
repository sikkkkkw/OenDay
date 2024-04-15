import { Link, useNavigate } from "react-router-dom";
import Button from "../component/Button";
import InputBox from "../component/InputBox";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { apiPostRegister } from "../api";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useState } from "react";
import { useTheme } from "../ThemeContext";

export default function SignUp() {
  const [passView, setPassView] = useState(true);
  const [pass2View, setPass2View] = useState(true);
  const onEyeClick = () => setPassView(!passView);
  const onEye2Click = () => setPass2View(!pass2View);
  const [checked, setChecked] = useState(false);
  const { isDark } = useTheme();

  const handleChecked = (e) => {
    setChecked(e.target.checked);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();

  const { mutate } = useMutation(apiPostRegister, {
    onSuccess: (data) => {
      if (data?.result === true) {
        // 성공하면 로그인 페이지로 이동
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
    // console.log(formData);
  };

  return (
    <>
      <Link to="/" className={`text-center flex flex-col items-center w-16 mx-1 pt-2 ${isDark && "text-white"}`}>
        <IoMdArrowRoundBack size="35px" />
        <span className="font-semibold">홈페이지</span>
      </Link>
      <div className="w-full flex justify-center py-16 select-none">
        <div className="max-w-screen-sm w-full flex flex-col gap-8 px-4">
          {/* 회원가입 타이틀 */}
          <div className="flex flex-col gap-2">
            <div className="w-full text-center text-4xl font-bold mb-1 text-mainBlue">회원가입</div>
            <div className={`w-full text-center text-neutral-600 ${isDark && "text-white"}`}>
              회원가입이 되어 있다면&nbsp;
              <Link to="/users/login" className="text-mainBlue font-semibold hover:underline underline-offset-2">
                로그인하기
              </Link>
            </div>
          </div>
          {/* 회원가입 Form 영역 */}
          <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-4">
            <InputBox
              register={register}
              name="username"
              type="text"
              placeholder="아이디"
              errorOption={{
                required: "아이디를 적어주세요.",
                minLength: {
                  value: 2,
                  message: "아이디를 정확히 입력하세요.",
                },
              }}
              errors={errors?.username?.message}
            />
            {/* 이메일 */}
            <InputBox
              register={register}
              name="email"
              type="email"
              placeholder="이메일"
              errorOption={{
                required: "이메일을 적어주세요.",
                pattern: {
                  value: /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/,
                  message: "이메일을 정확히 입력하세요.",
                },
              }}
              errors={errors?.email?.message}
            />
            {/* 전화번호 */}
            <InputBox
              register={register}
              name="phone"
              type="tel"
              placeholder="010-0000-0000"
              errorOption={{
                required: "전화번호는 필수 입력사항입니다",
                pattern: {
                  value: /^\d{3}-\d{3,4}-\d{4}$/,
                  message: "전화번호 형식을 지켜주세요 (예: 010-1234-5678)",
                },
              }}
              errors={errors?.phone?.message}
            />
            {/* 비밀번호 */}
            <div className="relative">
              <InputBox
                register={register}
                name="password"
                type={passView ? "password" : "text"}
                placeholder="비밀번호"
                errorOption={{
                  required: "비밀번호를 적어주세요.",
                  minLength: {
                    value: 4,
                    message: "비밀번호는 최소 네글자입니다.",
                  },
                }}
                errors={errors?.password?.message}
              />
              {passView ? <FaEye onClick={onEyeClick} className="absolute top-[10px] right-[18px] cursor-pointer" size="26px" color="#ccc" /> : <FaEyeSlash onClick={onEyeClick} className="absolute top-[8px] right-4 cursor-pointer" size="30px" color="#ccc" />}
            </div>
            {/* 비밀번호 확인 */}
            <div className="relative">
              <InputBox
                register={register}
                name="password2"
                type={pass2View ? "password" : "text"}
                placeholder="비밀번호 확인"
                errorOption={{
                  required: "비밀번호를 확인해주세요.",
                  validate: (value, form) => {
                    return value === form.password || "확인을 위해 비밀번호를 다시 입력해주세요.";
                  },
                }}
                errors={errors?.password2?.message}
              />
              {pass2View ? <FaEye onClick={onEye2Click} className="absolute top-[10px] right-[18px] cursor-pointer" size="26px" color="#ccc" /> : <FaEyeSlash onClick={onEye2Click} className="absolute top-[8px] right-4 cursor-pointer" size="30px" color="#ccc" />}
            </div>
            <div className="text-center">
              <input type="checkbox" id="agree" onChange={handleChecked} />
              <label htmlFor="agree" className={`${isDark && "text-white"}`}>
                &nbsp;&nbsp;개인정보 제공 및 카카오톡을 통한 알림톡 전송에 동의합니다.
              </label>
            </div>
            <Button type="submit" text="회원가입" disabled={!checked} />
          </form>
        </div>
      </div>
    </>
  );
}
