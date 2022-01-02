import { useState, useEffect } from "react";
import { NextPage } from "next/types";

import { Dashboard } from "layout";
import { Button, Input } from "components";

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);

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
            label="Email"
            placeholder="john@doe.com"
            type="email"
            className="mb-4 text-sm"
          />
          <Input
            label="Password"
            placeholder="********"
            type="password"
            className="mb-4 text-sm"
          />
          <div className="flex ml-1 mb-8">
            <input
              id="test"
              className="checkbox"
              type="checkbox"
            />
            <label htmlFor="test" className="text-xs ml-4 mb-2">Remember Me</label>
          </div>
          <Button className="w-full" isLoading={isLoading} onClick={() => setIsLoading(true)}>Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default Home;
