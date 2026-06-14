'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Loader2, MapPin, Package, DollarSign, Search } from 'lucide-react';
import { petshopService } from '@/services/petshopService';
import { productService } from '@/services/productService';
import { Petshop, Product } from '@/types';

export default function HomePage() {
  const [petshops, setPetshops] = useState<Petshop[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch petshops
        const petshopsRes = await petshopService.getAllPetshops(1, 6);
        setPetshops(petshopsRes.data);

        // Fetch products
        const productsRes = await productService.getAllProducts(1, 12);
        setProducts(productsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <span className="text-6xl">🐾</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            PetShop Jogja Finder
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Temukan petshop terbaik dan bandingkan harga produk hewan peliharaan di Yogyakarta dengan mudah
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
            <div className="relative flex">
              <input
                type="text"
                placeholder="Cari produk atau petshop..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-3 rounded-l-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 text-gray-800"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-r-lg font-semibold transition flex items-center gap-2"
              >
                <Search size={20} />
                Cari
              </button>
            </div>
          </form>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            <Link
              href="/petshops"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition border-l-4 border-blue-600"
            >
              <MapPin className="text-blue-600 mb-2" size={24} />
              <h3 className="font-semibold text-gray-900 mb-1">Temukan Petshop</h3>
              <p className="text-sm text-gray-600">Lihat 100+ petshop di Yogyakarta</p>
            </Link>

            <Link
              href="/products"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition border-l-4 border-purple-600"
            >
              <Package className="text-purple-600 mb-2" size={24} />
              <h3 className="font-semibold text-gray-900 mb-1">Jelajahi Produk</h3>
              <p className="text-sm text-gray-600">Cari dari 10,000+ produk</p>
            </Link>

            <Link
              href="/compare"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition border-l-4 border-orange-600"
            >
              <DollarSign className="text-orange-600 mb-2" size={24} />
              <h3 className="font-semibold text-gray-900 mb-1">Bandingkan Harga</h3>
              <p className="text-sm text-gray-600">Temukan harga termurah</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Petshops */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Petshop Terbaru</h2>
          <Link
            href="/petshops"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Lihat Semua →
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-blue-600" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {petshops.map((petshop) => (
              <Link
                key={petshop.id}
                href={`/petshops/${petshop.id}`}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden group"
              >
                <div className="h-40 bg-gradient-to-r from-blue-400 to-blue-600 overflow-hidden relative">
                  {petshop.image_url ? (
                    <img
                      src={petshop.image_url}
                      alt={petshop.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">
                      🐾
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-blue-600">
                    {petshop.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {petshop.address}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>📍 {petshop.city}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                    <span>📞 {petshop.phone}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Popular Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50 rounded-lg mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Produk Populer</h2>
          <Link
            href="/products"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Lihat Semua →
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-blue-600" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-4 group"
              >
                <div className="h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-3xl group-hover:bg-gray-300 transition">
                  {product.category === 'Makanan Kucing' || product.category === 'Makanan Anjing'
                    ? '🍖'
                    : product.category === 'Pasir Kucing'
                      ? '🪣'
                      : product.category === 'Vitamin & Suplemen'
                        ? '💊'
                        : product.category === 'Kandang & Rumah'
                          ? '🏠'
                          : product.category === 'Grooming'
                            ? '✂️'
                            : '🎾'}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 mb-2">{product.category}</p>
                <p className="text-xs text-gray-500 mb-3">{product.brand}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-blue-600">
                    Rp{product.price.toLocaleString('id-ID')}
                  </span>
                  <span
                    className={`text-xs font-semibold ${
                      product.stock > 0
                        ? 'text-green-600 bg-green-100'
                        : 'text-red-600 bg-red-100'
                    } px-2 py-1 rounded`}
                  >
                    {product.stock > 0 ? `Stok: ${product.stock}` : 'Habis'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <p className="text-blue-100">Petshop di DIY</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <p className="text-blue-100">Produk Tersedia</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1,000+</div>
              <p className="text-blue-100">Pengunjung Per Hari</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Siap Mencari Petshop Terbaik?</h2>
          <p className="text-lg mb-8 text-blue-100">
            Jelajahi ratusan petshop dan temukan harga terbaik untuk hewan peliharaan Anda
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/petshops"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Temukan Petshop
            </Link>
            <Link
              href="/products"
              className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
            >
              Jelajahi Produk
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
