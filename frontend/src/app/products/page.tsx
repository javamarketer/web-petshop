'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { productService } from '@/services/productService';
import { Product, PaginatedResponse, FilterOptions } from '@/types';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ProductCard } from '@/components/ProductCard';
import { Pagination } from '@/components/Pagination';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({ categories: [], brands: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'price' | 'name' | 'newest'>('newest');

  // Fetch filters
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await productService.getFilters();
        setFilters(response.data);
      } catch (error) {
        console.error('Error fetching filters:', error);
      }
    };
    fetchFilters();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response: PaginatedResponse<Product> = await productService.getAllProducts(
          currentPage,
          12,
          {
            search: searchQuery || undefined,
            category: selectedCategory || undefined,
            brand: selectedBrand || undefined,
          }
        );
        setProducts(response.data);
        setTotalPages(response.pagination.total_pages);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, searchQuery, selectedCategory, selectedBrand]);

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'newest':
      default:
        return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
    }
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedBrand(null);
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery || selectedCategory || selectedBrand;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Jelajahi Produk</h1>
        <p className="text-gray-600">
          Temukan ribuan produk hewan peliharaan dari berbagai petshop
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Filter size={20} />
              Filter
            </h2>

            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cari Produk
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Nama atau brand..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-6 pb-6 border-b">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Kategori
              </label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {filters.categories.map((category) => (
                  <label
                    key={category}
                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategory === category}
                      onChange={() =>
                        setSelectedCategory(selectedCategory === category ? null : category)
                      }
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-gray-700">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="mb-6 pb-6 border-b">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Brand
              </label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {filters.brands.map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBrand === brand}
                      onChange={() => setSelectedBrand(selectedBrand === brand ? null : brand)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-gray-700">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="w-full bg-red-100 text-red-700 hover:bg-red-200 py-2 rounded-lg font-semibold transition text-sm"
              >
                Reset Filter
              </button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Sort & Controls */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex justify-between items-center gap-4">
              <div className="text-sm text-gray-600">
                {products.length === 0 ? 'Tidak ada produk' : `${products.length} produk ditemukan`}
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
              >
                <option value="newest">Terbaru</option>
                <option value="name">Nama (A-Z)</option>
                <option value="price">Harga Terendah</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <LoadingSpinner text="Memuat produk..." />
          ) : products.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-lg mb-4">Tidak ada produk yang ditemukan</p>
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} showPetshop={true} />
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
      </div>
    </div>
  );
}
