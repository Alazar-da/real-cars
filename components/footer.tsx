// components/footer.tsx (updated)
import Link from "next/link";
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin 
} from "react-icons/fa";
import { 
  MdEmail, 
  MdPhone, 
  MdLocationOn 
} from "react-icons/md";

export function Footer() {
  return (
    <footer className="bg-background/90 border-t border-border mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold tracking-tight">
                Lux<span className="text-gradient">Auto</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Premium automotive showroom offering the finest selection of luxury vehicles worldwide.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/cars" className="text-muted-foreground hover:text-amber-500 transition">Browse Cars</Link></li>
              <li><Link href="/admin" className="text-muted-foreground hover:text-amber-500 transition">Admin Portal</Link></li>
              <li><Link href="/" className="text-muted-foreground hover:text-amber-500 transition">Test Drive</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2"><MdPhone className="w-4 h-4" /> +1 (888) 555-0123</li>
              <li className="flex items-center gap-2"><MdEmail className="w-4 h-4" /> hello@luxauto.com</li>
              <li className="flex items-center gap-2"><MdLocationOn className="w-4 h-4" /> 123 Luxury Lane, Beverly Hills, CA</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full bg-secondary hover:bg-amber-500/20 transition">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-secondary hover:bg-amber-500/20 transition">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-secondary hover:bg-amber-500/20 transition">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-secondary hover:bg-amber-500/20 transition">
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground text-sm">
          <p>&copy; 2024 LuxAuto. All rights reserved. Luxury redefined.</p>
        </div>
      </div>
    </footer>
  );
}