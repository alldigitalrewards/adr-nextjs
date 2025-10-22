import { Link } from "wouter"
import { Facebook, Twitter, Linkedin, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/security-compliance" className="hover:text-white transition-colors">
                  Security and Compliance
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors">
                  Career Opportunities
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="hover:text-white transition-colors">
                  Sitemap (HTML)
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-white transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/whitepapers" className="hover:text-white transition-colors">
                  Whitepapers
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white transition-colors">
                  News
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect with us</h3>
            <div className="flex gap-4 mb-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-6 h-6" />
              </a>
            </div>
            <Button asChild className="bg-[#0A5C8F] hover:bg-[#084A73]">
              <Link href="/demo">Schedule Demo</Link>
            </Button>
          </div>

          {/* Get in Touch Section */}
          <div>
            <h3 className="text-white font-semibold mb-4">Get in touch</h3>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-white">Phone:</p>
                <a href="tel:+18664157703" className="hover:text-white transition-colors">
                  +1 866-415-7703
                </a>
              </div>
              <div>
                <p className="font-semibold text-white mb-1">Scottsdale Financial Center III</p>
                <p className="text-sm">
                  7272 E Indian School Rd., Suite 540<br />
                  Scottsdale, Arizona 85251
                </p>
              </div>
              <div>
                <p className="font-semibold text-white mb-1">Account Servicing</p>
                <p className="text-sm">
                  430 Lake Havasu Ave<br />
                  Lake Havasu City, Arizona 86403
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-gray-400">
          <p>
            The Ezeprepaid™ Visa Prepaid Card and Ezeprepaid™ Visa Virtual Account are issued by The Bancorp Bank, N.A.; 
            Member FDIC, pursuant to a license from Visa U.S.A. Inc. Purchase, acceptance or use of the card constitutes 
            acceptance of the Cardholder Agreement and Virtual Accountholder Agreement. The Visa Virtual Account may be 
            used for electronic commerce, mail order and/or telephone order transactions everywhere Visa debit cards are 
            accepted. The Visa Prepaid Card may be used everywhere Visa debit cards are accepted. The Bancorp Bank, N.A. 
            does not endorse or sponsor, and is not affiliated in any way with this offer.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} All Digital Rewards. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

