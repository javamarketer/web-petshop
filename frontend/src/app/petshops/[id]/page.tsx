'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { MapPin, Phone, Clock, Mail, ArrowLeft } from 'lucide-react';
import { petshopService } from '@/services/petshopService';
import { Petshop } from '@/types';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ProductCard } from '@/components/ProductCard';

export default function PetshopDetailPage() {
  const params = useParams();
  const petshopId = params?.id as string;

  const [petshop, setPetshop] = useState<Petshop | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'products' | 'info'>('products');

  useEffect(() => {
    const fetchPetshop = async () => {
      try {
        setLoading(true);
        const response = await petshopService.getPetshopById(Number(petshopId));
        setPetshop(response.data);
      } catch (error) {
        console.error('Error fetching petshop:', error);
      } finally {
        setLoading(false);
      }
    };

    if (petshopId) {
      fetchPetshop();
    }
  }, [petshopId]);

  if (loading) {
    return <LoadingSpinner text="Memuat petshop..." />;
  }

  if (!petshop) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Petshop tidak ditemukan</h1>
        <Link href="/petshops" className="text-blue-600 hover:text-blue-700 font-semibold">
          Kembali ke Petshops
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-gray-600">
        <Link href="/petshops" className="hover:text-blue-600">
          Petshops
        </Link>
        <span>/</span>
        <span className="font-semibold text-gray-900">{petshop.city}</span>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-12 mb-12 text-white">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{petshop.name}</h1>
            <p className="text-blue-100 text-lg max-w-2xl">{petshop.description}</p>
          </div>
          <span className="text-6xl">🐾</span>
        </div>

        {/* Contact & Info Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-8 border-t-2 border-blue-400">
          <div>
            <p className="text-blue-100 text-sm mb-1">📍 Lokasi</p>
            <p className="font-semibold">{petshop.city}</p>
          </div>
          <div>
            <p className="text-blue-100 text-sm mb-1">📞 Telepon</p>
            <a href={`tel:${petshop.phone}`} className="font-semibold hover:text-blue-100">
              {petshop.phone}
            </a>
          </div>
          {petshop.opening_time && petshop.closing_time && (
            <div>
              <p className="text-blue-100 text-sm mb-1">🕐 Jam Operasional</p>
              <p className="font-semibold">
                {petshop.opening_time} - {petshop.closing_time}
              </p>
            </div>
          )}
          {petshop.email && (
            <div>
              <p className="text-blue-100 text-sm mb-1">📧 Email</p>
              <a href={`mailto:${petshop.email}`} className="font-semibold hover:text-blue-100">
                {petshop.email}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Info Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Details */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Informasi Petshop</h2>

          <div className="space-y-4">
            <div className="border-b pb-4">
              <p className="text-sm text-gray-600 mb-1">Nama Petshop</p>
              <p className="font-semibold text-gray-900">{petshop.name}</p>
            </div>

            <div className="border-b pb-4">
              <div className="flex items-start gap-2 mb-2">
                <MapPin size={16} className="text-blue-600 mt-1" />
                <div>
                  <p className="text-sm text-gray-600 mb-1">Alamat Lengkap</p>
                  <p className="font-semibold text-gray-900">{petshop.address}</p>
                </div>
              </div>
            </div>

            <div className="border-b pb-4">
              <div className="flex items-center gap-2 mb-2">
                <Phone size={16} className="text-green-600" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">Hubungi Kami</p>
                  <a href={`tel:${petshop.phone}`} className="font-semibold text-blue-600 hover:underline">
                    {petshop.phone}
                  </a>
                </div>
              </div>
            </div>

            {petshop.email && (
              <div className="border-b pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Mail size={16} className="text-orange-600" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <a href={`mailto:${petshop.email}`} className="font-semibold text-blue-600 hover:underline">
                      {petshop.email}
                    </a>
                  </div>
                </div>
              </div>
            )}

            {petshop.opening_time && petshop.closing_time && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={16} className="text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Jam Operasional</p>
                    <p className="font-semibold text-gray-900">
                      {petshop.opening_time} - {petshop.closing_time} WIB
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 space-y-3">
            <a
              href={`https://wa.me/${petshop.phone.replace(/\D/g, '')}?text=Halo, saya ingin bertanya tentang produk`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition text-center"
            >
              💬 Chat via WhatsApp
            </a>
            <a
              href={`tel:${petshop.phone}`}
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition text-center"
            >
              📞 Hubungi Sekarang
            </a>
          </div>
        </div>

        {/* Map Preview */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Lokasi di Peta</h2>

          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center text-6xl mb-6">
            📍
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-600 mb-2">Koordinat Lokasi</p>
            <p className="font-mono text-sm font-semibold text-gray-900 mb-4">
              {petshop.latitude}, {petshop.longitude}
            </p>
            <a
              href={`https://www.google.com/maps/search/${petshop.latitude},${petshop.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition"
            >
              Buka di Google Maps
            </a>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="flex gap-4 border-b">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 font-semibold border-b-2 transition ${
              activeTab === 'products'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            🛍️ Produk ({petshop.products?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('info')}
            className={`px-6 py-3 font-semibold border-b-2 transition ${
              activeTab === 'info'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            ℹ️ Informasi
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'products' ? (
        <div>
          {petshop.products && petshop.products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {petshop.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-lg">Tidak ada produk di petshop ini</p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Tentang Petshop Ini</h3>
          {petshop.description ? (
            <p className="text-gray-700 leading-relaxed mb-6">{petshop.description}</p>
          ) : (
            <p className="text-gray-600">Tidak ada deskripsi tersedia</p>
          )}

          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
            <h4 className="font-semibold text-gray-900 mb-2">📌 Tips Kunjungan</h4>
            <ul className="text-gray-700 text-sm space-y-1">
              <li>✓ Hubungi terlebih dahulu untuk memastikan produk tersedia</li>
              <li>✓ Lihat jam operasional sebelum berkunjung</li>
              <li>✓ Bandingkan harga dengan petshop lain untuk mendapatkan harga terbaik</li>
              <li>✓ Tanyakan tentang garansi dan kebijakan pengembalian</li>
            </ul>
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="mt-12 text-center">
        <Link
          href="/petshops"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
        >
          <ArrowLeft size={20} />
          Kembali ke Petshops
        </Link>
      </div>
    </div>
  );
}
