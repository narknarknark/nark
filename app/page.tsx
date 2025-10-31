"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, ChevronDown } from "lucide-react"

function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "proxy">("home")
  const [initialSearchQuery, setInitialSearchQuery] = useState("")
  const [showGamesDropdown, setShowGamesDropdown] = useState(false)

  const games = [
    { name: "The Binding of Isaac", path: "/games/tboi.html" },
    { name: "Drift Boss", path: "/games/driftboss.html" },
    { name: "Kart Bros", path: "/games/kart.html" },
    { name: "Moto X3M", path: "/games/motox3m.html" },
    { name: "Happy Wheels", path: "/games/happy.html" },
    { name: "OvO", path: "/games/ovo.html" },
    { name: "BTD5", path: "/games/btd5.html" },
    { name: "Minecraft 1.5.2", path: "/games/eagler.html" },
    { name: "Slither.IO", path: "/games/slither.html" },
    { name: "HS: Fleeing the Complex", path: "/games/hs.html" },
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest(".dropdown-container")) {
        setShowGamesDropdown(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  if (currentPage === "proxy") {
    return <ProxyPage onBack={() => setCurrentPage("home")} initialQuery={initialSearchQuery} />
  }

  return (
    <div className="min-h-screen bg-[#3a3a3a]">
      {/* Banner */}
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] shadow-lg">
        <div className="container mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="https://i.postimg.cc/hPFZ97ds/images-modified.png" alt="Logo" className="h-12 w-12" />
              <h1
                className="text-4xl font-bold tracking-wider lowercase text-[crimson]"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                nark's homework
              </h1>
            </div>

            <div className="flex gap-3">
              <a href="https://forms.gle/wvmso2PH4xASdwoy9" target="_blank" rel="noopener noreferrer">
                <button className="bg-black text-red-600 px-5 py-2.5 rounded border-2 border-[crimson] font-bold hover:bg-[#1a1a1a] transition-colors min-w-[120px]">
                  Game Recommendations
                </button>
              </a>

              <div className="dropdown-container relative">
                <button
                  onClick={() => setShowGamesDropdown(!showGamesDropdown)}
                  className="bg-black text-red-600 px-5 py-2.5 rounded border-2 border-[crimson] font-bold hover:bg-[#1a1a1a] transition-colors min-w-[120px] flex items-center justify-center gap-2"
                >
                  Games <ChevronDown size={16} />
                </button>
                {showGamesDropdown && (
                  <div className="absolute right-0 mt-2 min-w-[200px] bg-[#1a1a1a] rounded border-2 border-[crimson] shadow-xl z-50">
                    {games.map((game) => (
                      <a key={game.path} href={game.path} target="_blank" rel="noopener noreferrer" className="block">
                        <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-[#2a2a2a] transition-colors text-sm border-0">
                          {game.name}
                        </button>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => setCurrentPage("proxy")}
                className="bg-black text-red-600 px-5 py-2.5 rounded border-2 border-[crimson] font-bold hover:bg-[#1a1a1a] transition-colors min-w-[120px]"
              >
                Proxy
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="container mx-auto px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-6xl font-black mb-8 tracking-widest animate-gradient"
            style={{
              fontFamily: "Orbitron, sans-serif",
              background: "linear-gradient(90deg, #dc143c, #ff6b6b, #ff1744, #c41e3a, #dc143c)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "gradientShift 3s ease infinite",
            }}
          >
            Welcome to Nark's Homework.
          </h2>

          <p className="text-[crimson] text-lg leading-relaxed mb-12" style={{ fontFamily: "Rajdhani, sans-serif" }}>
            Hello! I am Nark, a fifteen-year-old kid from Illinois. I have made this site as a project for my
            classmates; but you may use this site for your liking. In the top right we have a "Games" dropdown, as well
            as a recommendation button which will take you to a Google Form. I will eventually read the recommendations
            and add these games!
          </p>

          {/* Proxy Search Bar */}
          <ProxySearchBar
            onSearch={(query) => {
              setInitialSearchQuery(query)
              setCurrentPage("proxy")
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  )
}

function ProxySearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim())
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="mt-12">
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] p-8 rounded-lg shadow-xl border-2 border-[crimson]">
        <div className="flex items-center gap-3 mb-4">
          <Search className="text-[crimson]" size={28} />
          <h3 className="text-2xl font-bold text-[crimson]" style={{ fontFamily: "Orbitron, sans-serif" }}>
            Web Proxy & Search
          </h3>
        </div>
        <p className="text-gray-300 mb-6" style={{ fontFamily: "Rajdhani, sans-serif" }}>
          Browse websites directly or search the web anonymously
        </p>
        <div className="flex gap-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter website URL or search term..."
            className="flex-1 px-4 py-3 bg-[#2a2a2a] border-2 border-[crimson] rounded text-white outline-none"
            style={{ fontFamily: "Rajdhani, sans-serif" }}
          />
          <button
            onClick={handleSearch}
            className="bg-black text-red-600 px-6 py-3 rounded border-2 border-[crimson] font-bold hover:bg-[#1a1a1a] transition-colors"
            style={{ fontFamily: "Rajdhani, sans-serif" }}
          >
            Search →
          </button>
        </div>
      </div>
    </div>
  )
}

function ProxyPage({ onBack, initialQuery }: { onBack: () => void; initialQuery: string }) {
  const [url, setUrl] = useState(initialQuery)
  const [showFrame, setShowFrame] = useState(false)
  const [frameUrl, setFrameUrl] = useState("")

  const isURL = (str: string) => {
    return str.includes(".") && !str.includes(" ")
  }

  const navigate = (input?: string) => {
    const searchInput = input || url.trim()
    if (!searchInput) return

    let targetUrl: string

    if (isURL(searchInput)) {
      if (!searchInput.startsWith("http://") && !searchInput.startsWith("https://")) {
        targetUrl = "https://" + searchInput
      } else {
        targetUrl = searchInput
      }
    } else {
      targetUrl = "https://www.google.com/search?igu=1&q=" + encodeURIComponent(searchInput)
    }

    setFrameUrl(targetUrl)
    setShowFrame(true)
  }

  useEffect(() => {
    if (initialQuery) {
      navigate(initialQuery)
    }
  }, [])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      navigate()
    }
  }

  return (
    <div className="h-screen flex flex-col bg-[#3a3a3a]">
      {/* Proxy Header */}
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] shadow-lg p-4 flex items-center gap-4 z-50">
        <button
          onClick={onBack}
          className="bg-black text-red-600 px-5 py-2.5 rounded border-2 border-[crimson] font-bold hover:bg-[#1a1a1a] transition-colors"
          style={{ fontFamily: "Rajdhani, sans-serif" }}
        >
          ← Back
        </button>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter website URL or search term..."
          className="flex-1 px-4 py-3 bg-[#2a2a2a] border-2 border-[crimson] rounded text-white outline-none"
          style={{ fontFamily: "Rajdhani, sans-serif" }}
          autoFocus
        />
        <button
          onClick={navigate}
          className="bg-black text-red-600 px-6 py-3 rounded border-2 border-[crimson] font-bold hover:bg-[#1a1a1a] transition-colors"
          style={{ fontFamily: "Rajdhani, sans-serif" }}
        >
          Go
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 relative overflow-hidden">
        {!showFrame ? (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl px-8 text-center">
            <h2 className="text-4xl font-bold text-[crimson] mb-6" style={{ fontFamily: "Orbitron, sans-serif" }}>
              Web Proxy & Search
            </h2>
            <p className="text-[crimson] text-xl mb-6" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              Enter a website URL to browse directly, or type any search term to search with Google.
            </p>
            <div className="text-[crimson] mb-8" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              <p className="font-bold mb-2">Examples:</p>
              <p>• google.com</p>
              <p>• coolmathgames.com</p>
              <p>• wikipedia.org</p>
            </div>
            <div
              className="bg-red-900/20 border-2 border-[crimson] rounded-lg p-4 text-[crimson]"
              style={{ fontFamily: "Rajdhani, sans-serif" }}
            >
              <p className="font-bold">Note:</p>
              <p className="text-sm">
                Some websites (like YouTube, Netflix, etc.) block embedding for security reasons and may not work in
                this proxy.
              </p>
            </div>
          </div>
        ) : (
          <iframe
            src={frameUrl}
            className="w-full h-full border-0 bg-white"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
      </div>
    </div>
  )
}

export default App
