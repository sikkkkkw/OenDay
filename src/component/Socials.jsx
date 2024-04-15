import { Link } from "react-router-dom";

export default function Socials() {
  // const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}`;
  const kakaoUrl = "https://kauth.kakao.com/oauth/authorize";
  const config = {
    response_type: "code",
    client_id: process.env.REACT_APP_KAKAO_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${kakaoUrl}?${params}`;
  return (
    <div className="flex flex-col gap-8">
      {/* 구분선 */}
      <div className="w-full h-px bg-neutral-300" />
      {/* 소셜로그인 버튼 */}
      <div className="w-full flex flex-col gap-4">
        {/* 카카오버튼 */}
        <Link to={finalUrl}>
          <button className="h-10 w-full transition-colors rounded-md bg-yellow-500 text-white font-semibold hover:bg-yellow-400">
            카카오로 로그인
          </button>
        </Link>
        {/* 구글버튼 */}
        <button className="h-10 w-full transition-colors rounded-md bg-red-600 text-white font-semibold hover:bg-red-500">
          구글로 로그인
        </button>
      </div>
    </div>
  );
}
