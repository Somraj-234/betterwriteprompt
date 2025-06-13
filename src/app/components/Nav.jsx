"use client";
import { ChevronRight, Github, Star, Sun, Moon, X } from "lucide-react";
import OrangeButton from "./OrangeButton";
import { useTheme } from "../context/Theme";

function Nav() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="nav w-full h-20 sm:h-20 pt-4 bg-transparent border-b border-white/10 dark:border-white/10 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between gap-4 bg-transparent border-white/10 text-black pb-4 sm:px-16 px-4">
        <div className="logo">
          <div className="cursor-pointer flex items-center text-lg sm:text-xl font-bold font-product-sans italic tracking-tighter text-black dark:text-white">
            better<span>write</span>
            <span className="text-[#0063FF] dark:text-[#2F70ED]">prompt</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 bg-transparent hover:bg-blue-500/10 p-2 rounded-full flex items-center justify-center cursor-pointer" onClick={toggleTheme}>
            {theme === "dark" ? (
              <Sun className="text-gray-500 dark:text-white" size={20} />
            ) : (
              <Moon className="text-gray-500 dark:text-white" size={20} />
            )}
          </button>
          <OrangeButton
            width="w-10"
            height="h-10"
            rounded="rounded-xl"
            href="https://x.com/somrajjj"
            imgUrl="/x.svg"
            isIcon={false}
          />
          <OrangeButton
            width="w-10"
            height="h-10"
            rounded="rounded-xl"
            href="https://github.com/Somraj-234/betterwriteprompt"
            Icon={Github}
          />
        </div>
      </div>
    </div>
  );
}

export default Nav;
