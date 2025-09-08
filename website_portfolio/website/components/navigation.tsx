"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Download, Mail, Github, Linkedin } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useContact } from "@/contexts/contact-context"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { showContactOptions, setShowContactOptions } = useContact()
  const pathname = usePathname()

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Blogposts", href: "/blog" },
    { name: "Projects", href: "/projects" },
  ]

  const handleDownloadResume = () => {
    // Create a link element and trigger download
    const link = document.createElement("a")
    link.href = "/resume.pdf"
    link.download = "resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const toggleContactOptions = () => {
    setShowContactOptions(!showContactOptions)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (showContactOptions && !target.closest(".contact-dropdown")) {
        setShowContactOptions(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [showContactOptions, setShowContactOptions])

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link href="/" className="font-bold text-xl text-foreground">
            Portfolio
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}

            <Button variant="ghost" size="sm" onClick={handleDownloadResume} className="text-sm font-medium">
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </Button>

            <div className="relative contact-dropdown">
              <Button variant="ghost" size="sm" onClick={toggleContactOptions} className="text-sm font-medium">
                Contact Me
              </Button>

              {showContactOptions && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-md shadow-lg py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <Button variant="ghost" size="sm" asChild className="w-full justify-start px-4 py-2">
                    <a href="mailto:your.email@example.com">
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </a>
                  </Button>
                  <Button variant="ghost" size="sm" asChild className="w-full justify-start px-4 py-2">
                    <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                  <Button variant="ghost" size="sm" asChild className="w-full justify-start px-4 py-2">
                    <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-medium transition-colors hover:text-primary ${
                      pathname === item.href ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}

                <Button
                  variant="ghost"
                  onClick={() => {
                    handleDownloadResume()
                    setIsOpen(false)
                  }}
                  className="justify-start text-lg font-medium"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </Button>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-medium text-muted-foreground mb-3">Contact Me</p>
                  <div className="flex flex-col space-y-2">
                    <Button variant="ghost" size="sm" asChild className="justify-start">
                      <a href="mailto:your.email@example.com">
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm" asChild className="justify-start">
                      <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm" asChild className="justify-start">
                      <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
