import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-xl font-bold text-primary">Dokan</span>
              <span className="text-xl font-bold text-foreground ml-1">Abddelazez</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted online shopping destination for electronics, fashion, and more.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/brands" className="text-muted-foreground hover:text-primary transition-colors">
                  Brands
                </Link>
              </li>
              <li>
                <Link href="/shops" className="text-muted-foreground hover:text-primary transition-colors">
                  Shops
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/products?category=clothes"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Clothes
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=shoes"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Shoes
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=watches"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Watches
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=electronics"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Electronics
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Dokan Abddelazez. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
