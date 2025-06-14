"use client";
import { useState, useRef, useEffect } from "react";
import Nav from "./components/Nav";
import {
  Settings,
  Send,
  Image,
  Video,
  User,
  UserRound,
  Settings2,
  Panda,
  Copy,
  CopyCheck,
  Frame,
  Palette,
  Smile,
  Check,
} from "lucide-react";
import Lottie from "lottie-react";
import animationData from "../../public/Animation - 1746788619944.json";

const MODES = [
  { key: "image", label: "image", icon: <Image size={20} className="mr-2" /> },
  { key: "video", label: "video", icon: <Video size={20} className="mr-2" /> },
  {
    key: "avatar",
    label: "avatar",
    icon: <Panda size={20} className="mr-2" />,
  },
  {
    key: "character",
    label: "character",
    icon: <UserRound size={20} className="mr-2" />,
  },
  {
    key: "poster",
    label: "poster",
    icon: <Palette size={20} className="mr-2" />,
  },
  { key: "logo", label: "logo", icon: <Frame size={20} className="mr-2" /> },
  {
    key: "meme_parody",
    label: "meme parody",
    icon: <Smile size={20} className="mr-2" />,
  },
];

export default function Home() {
  const [userPrompt, setUserPrompt] = useState("");
  const [improvedPrompt, setImprovedPrompt] = useState("");
  const [mode, setMode] = useState("image");
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const dropdownRef = useRef(null);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userPrompt.trim()) return;
    setLoading(true);
    setImprovedPrompt("");
    setSubmitted(true);
    try {
      const response = await fetch("/api/improve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userPrompt, mode }),
      });
      const data = await response.json();
      setImprovedPrompt(data.improvedPrompt || "no response received.");
    } catch (error) {
      setImprovedPrompt("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#0A0A0B] relative overflow-x-hidden px-2 sm:px-4">
      <Nav />
      <div className="flex flex-col items-center w-full">
        <div
          className={`transition-opacity duration-500 ${
            submitted
              ? "opacity-0 pointer-events-none"
              : "opacity-100 flex flex-col justify-center items-center"
          }`}
        >
          <h1 className="font-product-sans text-3xl sm:text-4xl md:text-5xl font-bold select-none text-[#1a1a1a] dark:text-white tracking-tighter text-center">
            What's in your{" "}
            <span className="text-[#0063FF] dark:text-[#2F70ED]">mind</span>{" "}
            today?
          </h1>
          <p className="w-2/3 sm:w-full text-gray-400 text-center dark:text-white text-sm sm:text-base">
            click on settings option to choose different types of prompt
          </p>
        </div>

        <div
          className={`w-full flex flex-col items-center transition-all duration-700 ${
            submitted
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10 pointer-events-none"
          }`}
          style={{ minHeight: "3rem" }}
        >
          {loading ? (
            <div className="flex items-center justify-center mb-8 animate-fade-in">
              <Lottie
                animationData={animationData}
                loop={true}
                style={{ width: 100, height: 100 }}
              />
            </div>
          ) : (
            improvedPrompt && (
              <div className="mb-4 w-full max-w-4xl text-base sm:text-lg text-left animate-fade-in flex flex-col items-start gap-2 justify-start text-[#1a1a1a] dark:text-white px-2 sm:px-0">
                <div className="w-full font-product-sans">{improvedPrompt}</div>
                <div className="w-4 h-4 flex items-center justify-center mt-2">
                  <div className="relative">
                    {copied ? (
                      <Check
                        className="text-[#1a1a1a] dark:text-white cursor-pointer absolute top-0 left-0 transition-all duration-300 ease-in-out transform scale-100 opacity-100"
                        size={20}
                      />
                    ) : (
                      <Copy
                        className="text-[#1a1a1a] dark:text-white hover:text-[#0063FF] dark:hover:text-[#2F70ED] cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95"
                        size={20}
                        onClick={() => {
                          navigator.clipboard.writeText(improvedPrompt);
                          setCopied(true);
                          setTimeout(() => {
                            setCopied(false);
                          }, 2000);
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        <div
          className="w-full max-w-4xl h-40 relative px-0 sm:px-4"
          style={{ minHeight: "15rem" }}
        >
          <form
            onSubmit={handleSubmit}
            className={`absolute left-1/2 w-full max-w-4xl flex flex-col items-center transition-all duration-700
              ${
                submitted
                  ? "fixed bottom-4 sm:bottom-10 translate-y-0"
                  : "top-0 translate-y-0"
              }
              -translate-x-1/2 z-20 px-2 sm:px-0`}
            style={{
              transitionProperty: "all",
            }}
          >
            <div className="w-full h-40 rounded-3xl bg-[#F4F4F4] dark:bg-[#131313] border border-[#ececec] dark:border-[#252525] p-2 sm:p-4 flex flex-col justify-between">
              <textarea
                className="w-full h-full text-base sm:text-lg text-[#303030] dark:text-white focus:outline-none resize-none placeholder:text-[#838383] dark:placeholder:text-white/35 bg-transparent font-product-sans custom-scrollbar"
                placeholder="Ask Anything....."
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                disabled={loading}
              />
              <div className="w-full flex justify-end items-center gap-2 mt-2">
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    aria-label="Settings"
                    className="bg-white rounded-xl p-3 hover:bg-gray-100 transition border border-gray-200 cursor-pointer"
                    onClick={() => setDropdownOpen((v) => !v)}
                    disabled={loading}
                  >
                    <Settings2 size={20} className="text-black" />
                  </button>
                  {dropdownOpen && (
                    <div
                      className={`absolute ${
                        submitted ? "bottom-full mb-2" : "top-full mt-2"
                      } right-0 w-52 sm:w-56 bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-100 dark:border-white/10 z-20 p-4 shadow-lg overflow-y-auto max-h-56 hide-scrollbar `}
                    >
                      {MODES.map((m) => (
                        <button
                          key={m.key}
                          type="button"
                          className={`flex items-center w-full px-4 py-2 text-lefthover:bg-[#F4F4F4] hover:bg-[#f8f8f8] dark:hover:bg-white/15 transition rounded-2xl font-product-sans text-lg cursor-pointer ${
                            mode === m.key
                              ? "bg-[#F4F4F4]  text-[#0063FF]"
                              : "text-[#7e7e7e] "
                          }`}
                          onClick={() => {
                            setMode(m.key);
                            setDropdownOpen(false);
                          }}
                          disabled={loading}
                        >
                          {m.icon}
                          {m.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  aria-label="Send"
                  className="bg-[#0063FF] dark:bg-[#2F70ED] hover:bg-[#0059E5] text-white rounded-xl p-3 transition flex items-center justify-center cursor-pointer"
                  disabled={loading}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="absolute bottom-0 left-4 w-full h-10 flex justify-start">
        <p className="text-sm text-[#1a1a1a] dark:text-white font-product-sans">
          Built with 💙 by <a href="https://somraj.vercel.app/" className="text-[#0063FF] dark:text-[#2F70ED] font-bold underline">Somraj</a>
        </p>
      </div>
    </div>
  );
}
