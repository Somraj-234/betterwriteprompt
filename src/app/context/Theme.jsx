"use client"
import { createContext, useContext, useState, useEffect } from "react"

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
    const getInitialTheme = () => {
        if (typeof window !== "undefined") {
            const storedTheme = localStorage.getItem("theme")
            if (storedTheme) {
                return storedTheme
            }
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                return "dark"
            }
        }
        return "light"
    }

    const [theme, setTheme] = useState(getInitialTheme)

    useEffect(() => {
        document.documentElement.classList.remove("light", "dark")
        document.documentElement.classList.add(theme)
        localStorage.setItem("theme", theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
    }
    
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

// Custom hook for using the theme context
export function useTheme() {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }
    return context
}

