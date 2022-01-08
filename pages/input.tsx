import { useEffect } from "react";
import { useRouter } from "next/router";

const Input = () => {
  const { push } = useRouter();

  useEffect(() => {
    const refresh = localStorage.getItem("refreshToken");
    if (refresh) push("/transaction/new");
    else push("/login");
  }, [push])
  
  return <div />
}

export default Input;
