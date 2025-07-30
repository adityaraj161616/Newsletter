"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Menu, X, User, LogOut, Zap } from "lucide-react"
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
    { name: "Articles", href: "/articles" },
    { name: "Playbooks", href: "/playbooks" },
    { name: "Tools", href: "/tools" },
    { name: "Income Reports", href: "/income" },
    { name: "About", href: "/about" },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-slate-200/50"
          : "bg-white/10 backdrop-blur-md border-b border-white/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-all duration-300 shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span
                className={`text-2xl font-bold transition-colors duration-300 ${
                  scrolled ? "text-slate-900" : "text-white"
                } group-hover:text-purple-600`}
              >
                WorkFlow
              </span>
              <span
                className={`text-xs font-medium transition-colors duration-300 ${
                  scrolled ? "text-slate-500" : "text-white/70"
                }`}
              >
                Future of Work
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`transition-colors duration-300 font-medium relative group px-3 py-2 rounded-lg hover:bg-white/10 ${
                  scrolled ? "text-slate-700 hover:text-slate-900" : "text-white/90 hover:text-white"
                }`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`flex items-center space-x-2 hover:bg-white/10 ${
                      scrolled ? "text-slate-700 hover:text-slate-900" : "text-white/90 hover:text-white"
                    }`}
                  >
                    <User className="w-5 h-5" />
                    <span className="font-medium">{session.user?.name || "User"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 bg-white/95 backdrop-blur-xl border border-slate-200/50"
                >
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="text-slate-700 hover:text-slate-900">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/subscription" className="text-slate-700 hover:text-slate-900">
                      Subscription
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()} className="text-slate-700 hover:text-slate-900">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="ghost"
                  asChild
                  className={`hover:bg-white/10 ${
                    scrolled ? "text-slate-700 hover:text-slate-900" : "text-white/90 hover:text-white"
                  }`}
                >
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                  asChild
                >
                  <Link href="/pricing">Try WorkFlow Pro for $1</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className={`hover:bg-white/10 ${
                scrolled ? "text-slate-700 hover:text-slate-900" : "text-white/90 hover:text-white"
              }`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200/50 rounded-b-2xl shadow-lg">
            <div className="px-6 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-slate-700 hover:text-slate-900 transition-colors font-medium text-lg py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
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
                      Try WorkFlow Pro for $1
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
