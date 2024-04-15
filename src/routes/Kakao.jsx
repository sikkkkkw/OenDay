import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { apiKakaoLogin } from "../api";

export default function Kakao() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const code = params.get("code");
  const { data } = useQuery(["getUser", { code }], apiKakaoLogin);
  const navigate = useNavigate();
  if (data?.result === true) {
    navigate("/users/profile");
  }
  return (
    <div className="w-full flex flex-col items-center justify-center py-16">
      <div className="text-2xl font-bold">잠시만 기다려 주세요</div>
      <div className="text-sm font-semibold">카카오 로그인 중입니다.</div>
    </div>
  );
}
