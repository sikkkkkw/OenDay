import useUser from "../component/useUser";
import { apiPostLogout } from "../api";
// import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  // const queryClient = useQueryClient();
  const navigate = useNavigate();
  const data = useUser();
  console.log(data);

  // data가 존재하고 user 속성도 존재하는지 확인
  if (!data || !data.user) {
    return <div>Loading...</div>;
  }
  const handleLogout = async () => {
    await apiPostLogout();
    // queryClient.invalidateQueries("getUser");
    navigate("/"); //홈으로 이동
  };

  return (
    <div className="w-full flex justify-center py-16">
      <div className="flex flex-col gap-5">
        <div>username: {data?.user.username} </div>
        <div>email: {data?.user.email}</div>
        <div className="size-14 rounded-full overflow-hidden">
          <img src={data?.user.profileImage} alt="profile_image" />
        </div>
      </div>
      <button onClick={handleLogout} className="px-4 py-2 text-white bg-red-500">
        로그아웃
      </button>
    </div>
  );
}
