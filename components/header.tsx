"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CartIcon } from "@/components/cart-icon"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useTranslation, type Language } from "@/lib/i18n"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [language, setLanguage] = useState<Language>("uk")
  const { t } = useTranslation(language)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }

    const savedLang = localStorage.getItem("language") as Language
    if (savedLang) {
      setLanguage(savedLang)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    window.location.href = "/"
  }

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image src="/armigera-logo.png" alt="Armigera Art Logo" width={40} height={40} className="object-contain" />
            <div className="text-2xl font-bold text-gray-900">ARMIGERA ART</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="text-gray-700 hover:text-gray-900 font-medium">
                {t("theme")}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{t("theme")}</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link href="/gallery?category=landscapes">{t("landscapes")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/gallery?category=portraits">{t("portraits")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/gallery?category=still-life">{t("stillLife")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/gallery?category=sacred-art">{t("sacredArt")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/gallery?category=icons">{t("icons")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/gallery?category=children">{t("children")}</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="text-gray-700 hover:text-gray-900 font-medium">
                {t("technique")}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{t("technique")}</DropdownMenuLabel>
                <DropdownMenuItem>{t("oil")}</DropdownMenuItem>
                <DropdownMenuItem>{t("acrylic")}</DropdownMenuItem>
                <DropdownMenuItem>{t("tempera")}</DropdownMenuItem>
                <DropdownMenuItem>{t("pastel")}</DropdownMenuItem>
                <DropdownMenuItem>{t("ink")}</DropdownMenuItem>
                <DropdownMenuItem>{t("pencils")}</DropdownMenuItem>
                <DropdownMenuItem>{t("charcoal")}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="text-gray-700 hover:text-gray-900 font-medium">
                {t("artists")}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{t("artists")}</DropdownMenuLabel>
                <DropdownMenuItem>Андрійович Тетяна</DropdownMenuItem>
                <DropdownMenuItem>Зоряна Іленко (Павлишин)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/story" className="text-gray-700 hover:text-gray-900 font-medium">
              {t("ourStory")}
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-gray-900 font-medium">
              {t("blog")}
            </Link>
            <Link href="/contacts" className="text-gray-700 hover:text-gray-900 font-medium">
              {t("contacts")}
            </Link>
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher currentLanguage={language} onLanguageChange={handleLanguageChange} />
            <CartIcon language={language} />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <User className="h-5 w-5 mr-2" />
                    {user.name || user.email}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{t("myAccount")}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {user.role === "admin" && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/admin">{t("adminPanel")}</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem>{t("profile")}</DropdownMenuItem>
                  <DropdownMenuItem>{t("orders")}</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    {t("logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/auth/login">
                    <User className="h-5 w-5 mr-2" />
                    {t("signIn")}
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/auth/register">{t("register")}</Link>
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link href="/gallery" className="text-gray-700 hover:text-gray-900 font-medium">
                {t("gallery")}
              </Link>
              <Link href="/story" className="text-gray-700 hover:text-gray-900 font-medium">
                {t("ourStory")}
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-gray-900 font-medium">
                {t("blog")}
              </Link>
              <Link href="/contacts" className="text-gray-700 hover:text-gray-900 font-medium">
                {t("contacts")}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
