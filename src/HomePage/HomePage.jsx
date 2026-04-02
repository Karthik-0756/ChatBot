import React, { useEffect, useState } from "react";
import user from "../assets/user.png"
import messenger from "../assets/messenger.png"
import SendIcon from "../assets/SendIcon.png"
import deleteIcon from "../assets/delete.png";


import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { GoogleGenAI } from "@google/genai";


// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });





const HomePage = () => {
  const [input, setInput] = useState({ sender: "user", text: "" });
  const [message, setMessage] = useState([]);
  const [waitingMSG, setWaitingMSG] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.text.trim()) return;
    setWaitingMSG(true);
    setMessage((prev) => [...prev, { sender: "user", text: input.text }]);

    const UserQuery = input.text;
    setInput({ ...input, text: "" })
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: UserQuery,
      });

      setMessage((prev) => [...prev, { sender: "ai", text: response.text }]);
      console.log("Ai response : ", response.text)

    } catch (e) { console.error("AI Error:", e); }
    finally { setWaitingMSG(false); }




  }

  const handleDelete = () => {
    setMessage("");
  }
  //   const EnterKey = (e) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     handleSubmit();
  //   }
  // };

  // const file=input.files[0];
  // const reader = new  FileReader();
  // reader.readAsDataURL(file);

  // reader.onload=()=>{
  //   const base64=reader.result;
  //   console.log(base64);
  // }



  return (
    <div className="md:h-screen h-[775px] md:w-full  bg-[#1c1c20] flex justify-center">

      {/* Main container */}
      <div className="md:w-[800px] md:h-full w-full bg-[#16171d]  border-l border-r border-gray-800 flex flex-col">

        {/* Header */}
        <div className="flex justify-center md:py-5 py-3 border-b border-gray-800">

          <h1 className="text-center text-white text-2xl md:text-3xl font-bold mt-3">
            Welcome to  ChatBot

          </h1>
          <DotLottieReact
            src="https://lottie.host/a3d35d4b-b10a-4096-bf19-4d25fd0ec366/Zj9d1p0x04.lottie"
            loop
            autoplay
            className="w-30 "
          />

        </div>


        {/* Chat Area */}
        <div id="msgCenter" className="flex-1 overflow-y-auto p-6 space-y-4">

          {/* User Message */}
          {/* {input && (
          <div className="flex justify-end">
            <div className="bg-purple-600 text-white px-4 py-2 rounded-2xl max-w-[70%]">
              {input}
            </div>
          </div>
        )} */}

          {/* AI Message */}
          {message.length > 0 && (
            <div className=" py-2 px-0 space-y-4 flex-1">
              {message.map((message, index) => (
                window.scrollTo(0, 0),
                <div key={index} className={`flex w-full ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div >
                    {message.sender === "user" ?
                      <div className="flex justify-end ">
                        <div className="bg-purple-600 text-white px-4 py-2 rounded-2xl max-w-[100%] text-center mr-2 ">{message.text}</div>
                        <img className="w-7 h-7 mt-2 " src={user} alt="user icon" />
                      </div> :
                      <div className="flex">

                        
                        <div className="flex"> <img className="w-7 h-7 mt-2" src={messenger} alt="ai" /> <div className="bg-purple-600 text-white px-4 py-2 rounded-2xl max-w-[80%] ml-3"> {message.text} </div> </div>

                      </div>}
                  </div>
                </div>
              ))}
              {waitingMSG && (<div className="flex"> <img className="w-7 h-7 mt-2" src={messenger} alt="ai" /> <p className="ml-3 bg-purple-600  px-4 py-2 rounded-2xl max-w-[70%] text-white animate-pulse">Thinking...</p> </div>)}
            </div>
          )}

        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="p-4 md:pb-10 pb-15 border-t border-gray-800 flex gap-3" >
          <input
            value={input.text}
            onChange={(e) => setInput({ ...input, text: e.target.value })}
            placeholder="Ask anything..."
            className="flex-1 bg-transparent border border-gray-600 rounded-xl px-4 py-2 text-white outline-none"
          //  onKeyDown={(e)=>{EnterKey(e)}}

          />
          {/* <input type="file" className="text-white"/> */}
          <button
            type="submit"
            className="bg-purple-600 text-white px-3 rounded-2xl cursor-pointer"
          // onClick={handleSubmit}

          >
            <img src={SendIcon} className="md:w-5 md:h-5 w-4 h-4" alt="" />
          </button>
          <button><img src={deleteIcon} className="w-5 h-6 cursor-pointer" onClick={handleDelete} alt="" /></button>
        </form>

      </div>
    </div>
  );
};

export default HomePage;
