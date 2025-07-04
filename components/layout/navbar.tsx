"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Menu, X, User, LogOut, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Latest", href: "/articles" },
    {
      name: "Topics",
      href: "/topics",
      dropdown: [
        { name: "AI & Technology", href: "/topics/ai-technology" },
        { name: "Remote Work", href: "/topics/remote-work" },
        { name: "Leadership", href: "/topics/leadership" },
        { name: "Productivity", href: "/topics/productivity" },
        { name: "Career Growth", href: "/topics/career-growth" },
      ],
    },
    {
      name: "Resources",
      href: "/resources",
      dropdown: [
        { name: "Playbooks", href: "/playbooks" },
        { name: "Tools", href: "/tools" },
        { name: "Templates", href: "/resources/templates" },
        { name: "Guides", href: "/resources/guides" },
      ],
    },
    {
      name: "Solutions",
      href: "/solutions",
      dropdown: [
        { name: "For Teams", href: "/solutions/teams" },
        { name: "For Leaders", href: "/solutions/leaders" },
        { name: "For HR", href: "/solutions/hr" },
        { name: "Enterprise", href: "/solutions/enterprise" },
      ],
    },
    {
      name: "Events",
      href: "/events",
      dropdown: [
        { name: "Upcoming Events", href: "/events/upcoming" },
        { name: "Webinars", href: "/events/webinars" },
        { name: "Workshops", href: "/events/workshops" },
        { name: "Past Events", href: "/events/past" },
      ],
    },
    { name: "About", href: "/about" },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-slate-200/50" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors duration-300">
              charter
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.dropdown ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="text-slate-700 hover:text-slate-900 transition-colors duration-300 font-medium flex items-center"
                      >
                        {item.name}
                        <ChevronDown className="ml-1 w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                      {item.dropdown.map((subItem) => (
                        <DropdownMenuItem key={subItem.name} asChild>
                          <Link href={subItem.href} className="w-full">
                            {subItem.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    href={item.href}
                    className="text-slate-700 hover:text-slate-900 transition-colors duration-300 font-medium relative group"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 text-slate-700 hover:text-slate-900">
                    <User className="w-5 h-5" />
                    <span className="font-medium">{session.user?.name || "User"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/subscription">Subscription</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" asChild className="text-slate-700 hover:text-slate-900">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <Link href="/pricing">Try Charter Pro for $1</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200/50 rounded-b-2xl shadow-lg">
            <div className="px-6 py-6 space-y-4">
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block text-slate-700 hover:text-slate-900 transition-colors font-medium text-lg py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.dropdown && (
                    <div className="ml-4 space-y-2 mt-2">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block text-slate-600 hover:text-slate-800 text-sm py-1"
                          onClick={() => setIsOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="border-t border-slate-200 pt-4 space-y-3">
                {session ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="block text-slate-700 hover:text-slate-900 font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/subscription"
                      className="block text-slate-700 hover:text-slate-900 font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      Subscription
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="block w-full text-left text-slate-700 hover:text-slate-900 font-medium"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block text-slate-700 hover:text-slate-900 font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/pricing"
                      className="block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-medium text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      Try Charter Pro for $1
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
