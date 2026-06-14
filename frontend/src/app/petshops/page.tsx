'use client';

import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { petshopService } from '@/services/petshopService';
import { Petshop, PaginatedResponse } from '@/types';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { PetshopCard } from '@/components/PetshopCard';
import { Pagination } from '@/components/Pagination';

const CITIES = ['Yogyakarta Kota', 'Sleman', 'Bantul', 'Gunungkidul', 'Kulon Progo'];

export default function PetshopsPage() {
  const [petshops, setPetshops] = useState<Petshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  useEffect(() => {
    const fetchPetshops = async () => {
      try {
        setLoading(true);
        const response: PaginatedResponse<Petshop> =
          await petshopService.getAllPetshops(currentPage, 12, {
            search: searchQuery || undefined,
            city: selectedCity || undefined,
          });
        setPetshops(response.data);
        setTotalPages(response.pagination.total_pages);
      } catch (error) {
        console.error('Error fetching petshops:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPetshops();
  }, [currentPage, searchQuery, selectedCity]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleCityFilter = (city: string | null) => {
    setSelectedCity(city);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Petshop di Yogyakarta</h1>
        <p className="text-gray-600">
          Temukan petshop terpercaya dan berkualitas di seluruh Yogyakarta
        </p>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Search */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cari Petshop
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Cari nama atau alamat petshop..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>

          {/* Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Filter Kota
            </label>
            <select
              value={selectedCity || ''}
              onChange={(e) => handleCityFilter(e.target.value || null)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">Semua Kota</option>
              {CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {(searchQuery || selectedCity) && (
          <div className="mt-4 flex gap-2 flex-wrap">
            {searchQuery && (
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                Pencarian: {searchQuery}
                <button
                  onClick={() => setSearchQuery('')}
                  className="hover:text-blue-900 font-bold"
                >
                  ✕
                </button>
              </span>
            )}
            {selectedCity && (
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                Kota: {selectedCity}
                <button
                  onClick={() => handleCityFilter(null)}
                  className="hover:text-purple-900 font-bold"
                >
                  ✕
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Petshops Grid */}
      {loading ? (
        <LoadingSpinner text="Memuat petshop..." />
      ) : petshops.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg">Tidak ada petshop yang ditemukan</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCity(null);
              setCurrentPage(1);
            }}
            className="mt-4 text-blue-600 hover:text-blue-700 font-semibold"
          >
            Reset Filter
          </button>
        </div>
      ) : (
        <>
          {/* Results Count */}
          <div className="mb-6 text-gray-600">
            Menampilkan halaman {currentPage} dari {totalPages}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {petshops.map((petshop) => (
              <PetshopCard key={petshop.id} petshop={petshop} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
}
