'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, X } from 'lucide-react';
import { compareService } from '@/services/compareService';
import { CompareResponse } from '@/types';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function ComparePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [compareResult, setCompareResult] = useState<CompareResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setError('Masukkan nama produk untuk dibandingkan');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await compareService.compareProductPrice(searchQuery);
      setCompareResult(response.data);
    } catch (err) {
      setError('Produk tidak ditemukan. Coba cari produk lain.');
      setCompareResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setCompareResult(null);
    setError(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">💰 Bandingkan Harga</h1>
        <p className="text-gray-600 text-lg">
          Cari produk dan lihat harganya di berbagai petshop untuk mendapatkan penawaran terbaik
        </p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-12 max-w-2xl mx-auto">
        <form onSubmit={handleSearch}>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Cari nama produk (contoh: Royal Canin Kitten)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2"
            >
              <Search size={20} />
              Cari
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 bg-red-50 border-l-4 border-red-600 p-4 rounded">
            <p className="text-red-700 font-semibold">{error}</p>
          </div>
        )}
      </div>

      {/* Results */}
      {loading ? (
        <LoadingSpinner text="Membandingkan harga..." />
      ) : compareResult ? (
        <div>
          {/* Product Header */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl">🎁</div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{compareResult.product_name}</h2>
                <div className="flex gap-3 mt-2">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {compareResult.product_category}
                  </span>
                  {compareResult.product_brand && (
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {compareResult.product_brand}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Price Range Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
              <p className="text-sm text-gray-600 mb-1">💚 Harga Terendah</p>
              <p className="text-2xl font-bold text-green-600">
                Rp{compareResult.price_range.min.toLocaleString('id-ID')}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-600">
              <p className="text-sm text-gray-600 mb-1">❌ Harga Tertinggi</p>
              <p className="text-2xl font-bold text-red-600">
                Rp{compareResult.price_range.max.toLocaleString('id-ID')}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
              <p className="text-sm text-gray-600 mb-1">📊 Rata-rata</p>
              <p className="text-2xl font-bold text-blue-600">
                Rp{compareResult.price_range.average.toLocaleString('id-ID')}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-600">
              <p className="text-sm text-gray-600 mb-1">💰 Bisa Hemat</p>
              <p className="text-2xl font-bold text-purple-600">
                Rp{compareResult.price_range.savings.toLocaleString('id-ID')}
              </p>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b-2 border-gray-300">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold text-gray-900">Petshop</th>
                    <th className="px-6 py-4 text-right font-bold text-gray-900">Harga</th>
                    <th className="px-6 py-4 text-center font-bold text-gray-900">Stok</th>
                    <th className="px-6 py-4 text-left font-bold text-gray-900">Alamat</th>
                    <th className="px-6 py-4 text-center font-bold text-gray-900">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {compareResult.comparison.map((item, idx) => {
                    const isCheapest = item.price === compareResult.price_range.min;
                    return (
                      <tr
                        key={item.petshop_id}
                        className={`border-b transition ${
                          isCheapest
                            ? 'bg-green-50 hover:bg-green-100'
                            : idx % 2 === 0
                              ? 'bg-white hover:bg-gray-50'
                              : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-gray-900">{item.petshop_name}</p>
                            <p className="text-sm text-gray-500">{item.city}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <span className="text-2xl font-bold text-blue-600">
                              Rp{item.price.toLocaleString('id-ID')}
                            </span>
                            {isCheapest && (
                              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded font-bold">
                                TERBAIK
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`px-3 py-1 rounded-full font-semibold text-sm ${
                              item.stock > 0
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {item.stock > 0 ? `${item.stock}` : 'Habis'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-600 line-clamp-2">{item.address}</p>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <a
                            href={`https://wa.me/${item.phone.replace(/\D/g, '')}?text=Halo, saya tertarik dengan ${compareResult.product_name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-semibold transition text-sm"
                          >
                            💬 Chat
                            <ArrowRight size={16} />
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleClear}
              className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-6 py-3 rounded-lg font-semibold transition"
            >
              Cari Produk Lain
            </button>
            <Link
              href="/products"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition inline-flex items-center gap-2"
            >
              Jelajahi Lebih Banyak
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg mb-4">Cari produk di atas untuk melihat perbandingan harga</p>
          <Link
            href="/products"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Lihat Semua Produk
          </Link>
        </div>
      )}

      {/* Info Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
          <h3 className="text-lg font-bold text-gray-900 mb-2">🎯 Temukan Harga Terbaik</h3>
          <p className="text-gray-700 text-sm">
            Bandingkan harga produk yang sama di berbagai petshop dan hemat hingga jutaan rupiah
          </p>
        </div>

        <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
          <h3 className="text-lg font-bold text-gray-900 mb-2">💰 Transparansi Harga</h3>
          <p className="text-gray-700 text-sm">
            Lihat harga terendah, tertinggi, dan rata-rata untuk produk yang sama
          </p>
        </div>

        <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-600">
          <h3 className="text-lg font-bold text-gray-900 mb-2">📞 Hubungi Langsung</h3>
          <p className="text-gray-700 text-sm">
            Chat via WhatsApp langsung ke petshop untuk konfirmasi stok dan penawaran khusus
          </p>
        </div>
      </div>
    </div>
  );
}
