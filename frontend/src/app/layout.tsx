import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PetShop Jogja Finder',
  description: 'Temukan petshop terbaik dan bandingkan harga produk hewan peliharaan di Yogyakarta',
  keywords: 'petshop, yogyakarta, hewan peliharaan, kucing, anjing, bandingkan harga',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-gray-50">
        <div className="min-h-screen flex flex-col">
          <header className="bg-white shadow-sm sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🐾</span>
                <h1 className="text-2xl font-bold text-blue-600">PetShop Jogja Finder</h1>
              </div>
              <div className="flex gap-6">
                <a href="/" className="text-gray-600 hover:text-blue-600 transition">
                  Home
                </a>
                <a href="/petshops" className="text-gray-600 hover:text-blue-600 transition">
                  Petshops
                </a>
                <a href="/products" className="text-gray-600 hover:text-blue-600 transition">
                  Products
                </a>
                <a href="/compare" className="text-gray-600 hover:text-blue-600 transition">
                  Compare
                </a>
              </div>
            </nav>
          </header>

          <main className="flex-grow">{children}</main>

          <footer className="bg-gray-800 text-white py-12 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">About Us</h3>
                  <p className="text-gray-300 text-sm">
                    Membantu Anda menemukan petshop terbaik dan bandingkan harga produk hewan peliharaan di
                    Yogyakarta.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>
                      <a href="/petshops" className="hover:text-white transition">
                        Petshops
                      </a>
                    </li>
                    <li>
                      <a href="/products" className="hover:text-white transition">
                        Products
                      </a>
                    </li>
                    <li>
                      <a href="/compare" className="hover:text-white transition">
                        Compare Price
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Support</h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>
                      <a href="#" className="hover:text-white transition">
                        Help Center
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white transition">
                        Contact Us
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white transition">
                        FAQ
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    <a href="#" className="text-gray-300 hover:text-white transition">
                      Facebook
                    </a>
                    <a href="#" className="text-gray-300 hover:text-white transition">
                      Instagram
                    </a>
                    <a href="#" className="text-gray-300 hover:text-white transition">
                      Twitter
                    </a>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300 text-sm">
                <p>
                  &copy; 2026 PetShop Jogja Finder. All rights reserved. | Built with ❤️ for pet
                  lovers
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
