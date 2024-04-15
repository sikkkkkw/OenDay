import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { apiGetUser } from "../api";

export default function useUser() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const Storage = sessionStorage.getItem("userData");
    if (Storage) {
      setUserData(JSON.parse(Storage));
    }
  }, []);
  // console.log("useruser",userData?.token);
  const { data } = useQuery(["getUser", { token: userData?.token }], apiGetUser);
  // console.log(data?.user);
  return data || userData;
}
