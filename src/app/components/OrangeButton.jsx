'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import React from 'react';

function OrangeButton({
  isIcon = true,
  Icon = ChevronRight, // Pass component, not string
  width = "w-60",
  height = "h-14",
  type = "button",
  isText = false,
  text = "",
  loadingText = "Loading...",
  isLoading = false,
  href = "/",
  toGradient = "#0063FF",
  fromGradient = "#74AAFF",
  hoverToGradient= "#0059E5",
   hoverFromGradient = "#488DFA",
  textColor = "white",
  rounded = "rounded-full",
  imgUrl = null,
}) {
  const buttonStyles = {
    background: `linear-gradient(to bottom, ${fromGradient}, ${toGradient})`,
  };

  const hoverStyles = {
    background: `linear-gradient(to bottom, ${hoverFromGradient}, ${hoverToGradient})`,
  };

  const content = (
    <button
      type={type}
      className={`relative flex items-center justify-center ${width} ${height} overflow-hidden ${rounded} transition-all duration-300 cursor-pointer`}
      style={buttonStyles}
      onMouseEnter={(e) => (e.currentTarget.style.background = hoverStyles.background)}
      onMouseLeave={(e) => (e.currentTarget.style.background = buttonStyles.background)}
    >
      <div className="flex items-center justify-center gap-2 cursor-pointer">
      {imgUrl && (
          <img src={imgUrl} alt="icon" className="w-4 h-4" />
        )}
        {isText && (
          <span className={`text-${textColor} font-bold text-base`}>
            {isLoading ? loadingText : text}
          </span>
        )}

        {isIcon && Icon && (
          <Icon
            className={`text-${textColor}`}
            strokeWidth={2.5}
            size={16}
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        )}
        
      </div>
      <div
        className={`absolute inline-flex items-center justify-center ${rounded} p-[1px] ${width} h-14`}
        style={{
          background:
            "radial-gradient(circle at center, rgba(255, 255, 255, 0.24), rgba(255, 255, 255, 0.24))",
          mask: `
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0)
          `,
          maskComposite: "xor",
          WebkitMask: `
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0)
          `,
          WebkitMaskComposite: "xor",
        }}
      />
    </button>
  );

  return type === "submit" ? content : <Link href={href}>{content}</Link>;
}

export default OrangeButton;
