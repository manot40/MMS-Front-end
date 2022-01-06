/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback } from "react";
import { Button, Input, Toast } from "components";
import { useAuth } from "libs/context/AuthContext";
import { useRouter } from "next/router";
import { NextPage } from "next/types";

const Home: NextPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { loading, login } = useAuth();
  const { push, query } = useRouter();

  function redirect() {
    query.redirect ? push(query.redirect as string) : push("/");
  }

  const submitLogin = useCallback((e) => {
    e.preventDefault();
    login(username, password, true).then(({error}) => {
      if (!error) redirect();
      else setMessage("Username atau password salah!");
    });
  }, [login, password, username]);

  return (
    <div className="container mx-auto max-w-xs h-screen flex items-center -m-8">
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
      <Toast message={message} title="Error!" close={setMessage} />
    </div>
  );
};

export default Home;
