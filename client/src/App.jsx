import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { logo2 } from "./assets";
import { Home, CreatePost } from "./pages";
import ShiningButton from "./ShiningButton";

function App() {
  return (
    <BrowserRouter>
      <header className="w-full px-4 sm:px-4 py-4 flex justify-between items-center bg-white border-b-[#e6ebf4]">
        <Link to={"/"}>
          <img src={logo2} className="w-28 object-contain" alt="logo" />
        </Link>

        <Link
          // className="bg-violet-500 text-white px-4 py-2 rounded-md"
          to={"/create-post"}
        >
          <ShiningButton name = {"Create"}/>
        </Link>
      </header>

        
      <main className="bg-[#f8fafe] sm:px-8 px-4 py-5 w-full min-h-[calc(100vh-73px) text-black">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/create-post" element={<CreatePost/>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
