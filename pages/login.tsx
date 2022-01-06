/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback } from "react";
import { Button, Input } from "components";
import { useAuth } from "libs/context/AuthContext";
import clsx from "clsx";
import { useRouter } from "next/router";
import { NextPage } from "next/types";

const Home: NextPage = () => {
  const [username, setUsername] = useState("");
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");

  const { loading, login } = useAuth();
  const { push, query } = useRouter();

  function redirect() {
    query.redirect ? push(query.redirect as string) : push("/");
  }

  const submitLogin = useCallback((e) => {
    e.preventDefault();
    login(username, password, true).then(({error}) => {
      if (!error) redirect();
      else setOpen(true);
    });
  }, [login, password, username]);

  return (
    <div className="container mx-auto max-w-xs h-screen flex items-center -m-8">
      <div onClick={() => setOpen(false)} className={clsx(
        "p-4 bg-red-200 text-red-800 border rounded-2xl fixed w-11/12 left-1/2 bottom-5 -translate-x-1/2 transition-all duration-300",
        open ? "" : "-bottom-0 translate-y-full"
      )}>
        <div className="relative flex">
          <div className="self-start mr-4 h-fit">
            {/* @ts-ignore */}
            <ion-icon name="close-circle-outline" style={{fontSize: "18px"}} />
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold">Error</h1>
            <p className="text-sm">Username atau password salah!</p>
          </div>
          <div className="absolute right-0 cursor-pointer">
            {/* @ts-ignore */}
            <ion-icon name="close" style={{fontSize: "18px"}} />
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="font-display font-bold text-3xl mb-14 tracking-wide">
          <span className="underline underline-4 underline-offset-8">
            LOGIN
          </span>
        </div>
        <form>
          <Input
            label="Username"
            placeholder="johndoe"
            type="text"
            value={username}
            onChange={(val) => setUsername(val)}
            className="mb-4 text-sm dark:border-none"
          />
          <Input
            label="Password"
            placeholder="********"
            type="password"
            value={password}
            onChange={(val) => setPassword(val)}
            className="mb-4 text-sm dark:border-none"
          />
          <div className="flex ml-1 mb-8">
            <input
              id="test"
              className="checkbox"
              type="checkbox"
            />
            <label htmlFor="test" className="text-xs ml-4 mb-2">Remember Me</label>
          </div>
          <Button className="w-full" isLoading={loading ? true : false} onClick={submitLogin}>Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default Home;
