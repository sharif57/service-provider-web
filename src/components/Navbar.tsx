
"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Logo from "./Logo"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import AuthModal from "./authModal/authModal"
import { useUserProfileQuery } from "@/redux/feature/userSlice"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { toast } from "sonner"
import { logout } from "@/service/authService"

type AuthView = "login" | "signup" | "forgot" | "verify" | "reset" | '/' | 'resetOtp';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authView, setAuthView] = useState<AuthView>("login");

  const pathname = usePathname()
  const { data, refetch } = useUserProfileQuery(undefined)

  const router = useRouter()

  const menus = [
    { name: "Services", url: "#services" },
    { name: "Prices", url: "#prices" },
    { name: "About Us", url: "/about" },
    { name: "Support", url: "/support" },
  ]

  const handleLogOut = async () => {
    try {
      localStorage.removeItem("accessToken")
      await logout();
      toast.success("Logged out successfully!")
      window.location.href = "/";
    } catch {
      toast.error("Failed to log out. Please try again.")
    }
  }

  const IMAGE = process.env.NEXT_PUBLIC_API_URL + data?.data?.user?.profile_pic

  const handleMenuClick = (
    e: React.MouseEvent,
    menu: { name: string; url: string }
  ) => {
    setIsMenuOpen(false)

    // HASH LINKS (Services / Prices)
    if (menu.url.startsWith("#")) {
      e.preventDefault()

      // If already on homepage → scroll
      if (pathname === "/") {
        const section = document.querySelector(menu.url)
        if (section) {
          section.scrollIntoView({ behavior: "smooth" })
        }
      }
      // If on another page → go home first, then scroll
      else {
        router.push(`/${menu.url}`)
      }
    }
  }


  return (
    <header className="w-full py-4 bg-white sticky top-0 z-50 mb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center space-x-2" title="Veloo" aria-label="Home">
              <Logo />
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center space-x-6">
              {menus.map((menu) => (
                <Link
                  key={menu.name}
                  href={menu.url}
                  className="text-base font-medium text-gray-600 hover:text-[#059669]"
                  onClick={(e) => handleMenuClick(e, menu)}
                >
                  {menu.name}
                </Link>
              ))}
              {data?.data && (
                <Link
                  href="/dashboard"
                  className="text-base font-medium text-[#059669] hover:text-[#059669]"
                >
                  Dashboard
                </Link>
              )}
            </nav>


          </div>

          {/* Auth Buttons / Profile */}
          {data?.data ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="size-10 border">
                  <AvatarImage src={IMAGE} alt={data?.data?.user?.full_name} />
                  <AvatarFallback>{data?.data?.user?.full_name}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/settings/profile" className="cursor-pointer">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <Link href="/dashboard" className="cursor-pointer">
                  <DropdownMenuItem>Dashboard</DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={handleLogOut}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                className="text-[#047857] bg-[#D1FAE5] hover:bg-gray-50 text-lg font-medium px-6 py-6"
                onClick={() => setAuthModalOpen(true)}
              >
                Sign In
              </Button>
              <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
              {/* <Link href="/dashboard"> */}
              <Button
                onClick={() => setAuthModalOpen(true)}
                className="bg-[#059669] hover:bg-[#047857] text-white text-lg font-medium px-6 py-6 rounded-md">
                Create free account
              </Button>
              {/* </Link> */}
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Sidebar */}
        {isMenuOpen && (
          <>
            <div className="md:hidden fixed top-0 right-0 h-full w-4/5 max-w-xs bg-[#059669] text-white shadow-lg z-50">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b border-gray-100">
                  <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                    <Logo />
                  </Link>
                  <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(false)}>
                    <X className="h-6 w-6" />
                  </Button>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                  {menus.map((menu) => (
                    <Link
                      key={menu.name}
                      href={menu.url}
                      className="block px-4 py-2 text-lg font-medium rounded-md text-white hover:text-[#059669] hover:bg-[#D1FAE5]"
                      onClick={(e) => handleMenuClick(e, menu)}
                    >
                      {menu.name}
                    </Link>
                  ))}
                  {data?.data && (
                    <Link
                      href="/dashboard"
                      className="text-base font-medium text-gray-600 hover:text-[#059669]"
                    >
                      Dashboard
                    </Link>
                  )}
                </nav>



                <div className="p-4 border-t border-gray-100 space-y-3">
                  <Button
                    variant="ghost"
                    className="text-[#047857] w-full bg-[#D1FAE5] hover:bg-gray-50 font-medium px-6 py-6"
                    onClick={() => {
                      setAuthModalOpen(true)
                      setIsMenuOpen(false)
                    }}
                  >
                    Sign In
                  </Button>
                  <Link href="/dashboard">
                    <Button
                      className="w-full bg-[#059669] text-white text-lg font-medium hover:bg-[#047857] py-6 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Create free account
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div
              className="md:hidden fixed inset-0 bg-background/10 backdrop-blur-md bg-opacity-50 z-40"
              onClick={() => setIsMenuOpen(false)}
            />
          </>
        )}
      </div>
    </header>
  )
}
