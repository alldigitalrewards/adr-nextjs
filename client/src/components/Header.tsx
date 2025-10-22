import { Button } from "@/components/ui/button"
import { Link } from "wouter"
import { Search, Menu } from "lucide-react"
import { useState } from "react"

interface NavigationItem {
  label: string
  url?: string
  color?: string
  submenu?: Array<{
    label: string
    url?: string
    description?: string
  }>
}

interface HeaderProps {
  navigation?: NavigationItem[]
}

export default function Header({ navigation = [] }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      {/* Top Bar */}
      <div className="bg-[#0A5C8F] text-white">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center text-sm">
          <div>
            Learn more about All Digital Rewards.{" "}
            <Link href="/contact" className="underline hover:no-underline">
              Contact us now! &gt;
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span>Contact Sales: (888) 512-0556</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/logo.svg"
              alt="All Digital Rewards"
              className="h-12"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => setActiveMenu(item.label)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link
                  href={item.url || "#"}
                  className="px-4 py-2 rounded hover:bg-gray-100 transition-colors font-medium"
                  style={{
                    borderBottom: item.color ? `3px solid ${item.color}` : undefined,
                  }}
                >
                  {item.label}
                </Link>

                {/* Mega Menu Dropdown */}
                {item.submenu && item.submenu.length > 0 && activeMenu === item.label && (
                  <div className="absolute left-0 top-full mt-2 w-64 bg-white shadow-lg rounded-lg p-4 border">
                    {item.submenu.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.url || "#"}
                        className="block px-4 py-2 hover:bg-gray-50 rounded transition-colors"
                      >
                        <div className="font-medium">{subItem.label}</div>
                        {subItem.description && (
                          <div className="text-sm text-gray-600 mt-1">
                            {subItem.description}
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Search className="w-5 h-5" />
            </button>
            <Button variant="outline" asChild className="hidden md:inline-flex">
              <Link href="/contact">Contact Sales</Link>
            </Button>
            <Button asChild className="hidden md:inline-flex bg-[#0A5C8F] hover:bg-[#084A73]">
              <Link href="/demo">Schedule Demo</Link>
            </Button>
            
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            {navigation.map((item, index) => (
              <div key={index} className="py-2">
                <Link
                  href={item.url || "#"}
                  className="block px-4 py-2 hover:bg-gray-50 rounded font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {item.submenu && (
                  <div className="pl-4 mt-2 space-y-1">
                    {item.submenu.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.url || "#"}
                        className="block px-4 py-2 text-sm hover:bg-gray-50 rounded"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}

