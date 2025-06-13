import { Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";
import {ThemeProvider} from "./context/Theme";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "betterwriteprompt",
  description: "improve prompts using betterwriteprompt to get better image and video generation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} antialiased `}>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
