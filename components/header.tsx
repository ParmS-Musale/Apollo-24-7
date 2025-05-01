import Link from "next/link"
import { Search, ShoppingCart, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="relative h-10 w-32">
                <div className="flex items-center">
                  <div className="text-2xl font-bold text-[#02475b]">Apollo</div>
                  <div className="text-xl font-bold text-[#fc9916]">247</div>
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#" className="text-[#02475b] hover:text-[#fc9916] font-medium">
              Doctors
            </Link>
            <Link href="#" className="text-[#02475b] hover:text-[#fc9916] font-medium">
              Pharmacy
            </Link>
            <Link href="#" className="text-[#02475b] hover:text-[#fc9916] font-medium">
              Lab Tests
            </Link>
            <Link href="#" className="text-[#02475b] hover:text-[#fc9916] font-medium">
              Health Records
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-[#02475b]">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button variant="ghost" size="icon" className="text-[#02475b]">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Button>
            <Button variant="ghost" size="icon" className="text-[#02475b]">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden text-[#02475b]">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
