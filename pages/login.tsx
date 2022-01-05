import { useState, useCallback, useEffect } from "react";
import { Button, Input } from "components";
import { useAuth } from "libs/context/AuthContext";
import { useRouter } from "next/router";
import { NextPage } from "next/types";

const Home: NextPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, user, loading } = useAuth();
  const { push, query } = useRouter();

  useEffect(() => {
    if (user?._id) {
      query.redirect ? push(query.redirect as string) : push("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [push, user]);

  const submitLogin = useCallback((e) => {
    e.preventDefault();
    login(username, password, true)
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
          <Button className="w-full" isLoading={loading} onClick={submitLogin}>Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default Home;
