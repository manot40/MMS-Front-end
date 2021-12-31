import { useState, useEffect } from "react";
import { NextPage } from "next/types";

import { Dashboard } from "layout";

const Home: NextPage = () => {
  return (
    <div className="container mx-auto max-w-xs h-screen flex items-center -m-8">
      <div className="w-full">
        <div className="font-display font-bold text-3xl mb-14 tracking-wide">
          <h1 className="underline underline-4 underline-offset-8">
            LOGIN
          </h1>
        </div>
        <form>
          <div className="flex flex-col mb-4">
            <label className="text-xs ml-1 mb-2">Email</label>
            <input
              className="input"
              placeholder="john@doe.com"
              type="email"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-xs ml-1 mb-2">Password</label>
            <input
              className="input"
              placeholder="********"
              type="password"
            />
          </div>
          <div className="flex ml-1 mb-8">
            <input
              id="test"
              className="checkbox"
              type="checkbox"
            />
            <label htmlFor="test" className="text-xs ml-4 mb-2">Remember Me</label>
          </div>
          <button className="btn w-full">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
