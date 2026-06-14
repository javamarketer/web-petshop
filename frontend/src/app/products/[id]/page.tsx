'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Phone, MapPin, ArrowLeft } from 'lucide-react';
import { productService } from '@/services/productService';
import { compareService } from '@/services/compareService';
import { Product, CompareResponse } from '@/types';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ProductCard } from '@/components/ProductCard';

const getCategoryIcon = (category: string): string => {
  const iconMap: Record<string, string> = {
    'Makanan Kucing': '🍖',
    'Makanan Anjing': '🍖',
    'Makanan Hewan Lain': '🍖',
    'Pasir Kucing': '🪣',
    'Vitamin & Suplemen': '💊',
    'Kandang & Rumah': '🏠',
    'Aksesoris & Mainan': '🎾',
    'Grooming': '✂️',
  };
  return iconMap[category] || '🎁';
};

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [comparison, setComparison] = useState<CompareResponse | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch product detail
        const productRes = await productService.getProductById(Number(productId));
        setProduct(productRes.data);

        // Fetch price comparison
        const comparisonRes = await compareService.compareProductById(Number(productId));
        setComparison(comparisonRes.data);

        // Fetch related products
        if (productRes.data.category) {
          const relatedRes = await productService.getAllProducts(1, 6, {
            category: productRes.data.category,
          });
          setRelatedProducts(
            relatedRes.data.filter((p) => p.id !== Number(productId)).slice(0, 4)
          );
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchData();
    }
  }, [productId]);

  if (loading) {
    return <LoadingSpinner text="Memuat produk..." />;
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Produk tidak ditemukan</h1>
        <Link href="/products" className="text-blue-600 hover:text-blue-700 font-semibold">
          Kembali ke Produk
        </Link>
      </div>
    );
  }

  const cheapestOption = comparison?.comparison
    ? comparison.comparison.reduce((prev, current) =>
        prev.price < current.price ? prev : current
      )
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-gray-600">
        <Link href="/products" className="hover:text-blue-600">
          Produk
        </Link>
        <span>/</span>
        <span>{product.category}</span>
        <span>/</span>
        <span className="font-semibold text-gray-900">{product.name}</span>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Product Image & Info */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-12 h-64 mb-6 flex items-center justify-center text-9xl">
            {getCategoryIcon(product.category)}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

            <div className="flex gap-4 mb-6">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                {product.category}
              </span>
              {product.brand && (
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {product.brand}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b">
              <div>
                <p className="text-sm text-gray-600 mb-1">Harga</p>
                <p className="text-3xl font-bold text-blue-600">
                  Rp{product.price.toLocaleString('id-ID')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Stok</p>
                <p
                  className={`text-2xl font-bold ${
                    product.stock > 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {product.stock > 0 ? `${product.stock} tersedia` : 'Habis'}
                </p>
              </div>
            </div>

            {product.description && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Deskripsi</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            )}
          </div>

          {/* Petshop Info */}
          {product.petshop && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Tersedia di Petshop Ini
              </h3>
              <Link
                href={`/petshops/${product.petshop.id}`}
                className="block bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold mb-2">{product.petshop.name}</h4>
                    <div className="flex items-center gap-2 text-blue-100 mb-2">
                      <MapPin size={16} />
                      <span>{product.petshop.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-100">
                      <Phone size={16} />
                      <span>{product.petshop.phone}</span>
                    </div>
                  </div>
                  <span className="text-2xl">🐾</span>
                </div>
                <button className="w-full bg-white text-blue-600 font-semibold py-2 rounded hover:bg-blue-50 transition mt-4">
                  Lihat Petshop →
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Sidebar - Price Comparison */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h3 className="text-lg font-bold text-gray-900 mb-4">💰 Perbandingan Harga</h3>

            {comparison && comparison.comparison.length > 0 ? (
              <div className="space-y-3">
                {comparison.comparison.map((item) => (
                  <div
                    key={item.petshop_id}
                    className={`p-4 rounded-lg border-2 transition ${
                      cheapestOption?.petshop_id === item.petshop_id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-gray-900">{item.petshop_name}</p>
                        <p className="text-xs text-gray-500">{item.city}</p>
                      </div>
                      {cheapestOption?.petshop_id === item.petshop_id && (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                          Termurah
                        </span>
                      )}
                    </div>

                    <p className="text-2xl font-bold text-blue-600 mb-2">
                      Rp{item.price.toLocaleString('id-ID')}
                    </p>

                    <p className="text-xs text-gray-600 mb-3">
                      Stok: {item.stock > 0 ? item.stock : 'Habis'}
                    </p>

                    <a
                      href={`https://wa.me/${item.phone.replace(/\D/g, '')}?text=Halo, saya tertarik dengan ${product.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded font-semibold transition text-center text-sm"
                    >
                      💬 WhatsApp
                    </a>
                  </div>
                ))}

                {comparison.price_range && (
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 mt-4">
                    <p className="text-xs text-gray-600 mb-2">Rentang Harga</p>
                    <div className="space-y-1">
                      <p className="text-sm">
                        <span className="font-semibold">Min:</span> Rp
                        {comparison.price_range.min.toLocaleString('id-ID')}
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">Maks:</span> Rp
                        {comparison.price_range.max.toLocaleString('id-ID')}
                      </p>
                      <p className="text-sm">
                        <span className="font-semibold">Rata-rata:</span> Rp
                        {comparison.price_range.average.toLocaleString('id-ID')}
                      </p>
                      <p className="text-sm text-green-600">
                        <span className="font-semibold">Hemat:</span> Rp
                        {comparison.price_range.savings.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-600 text-sm">Tidak ada perbandingan harga tersedia</p>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Produk Serupa</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} showPetshop={true} />
            ))}
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="text-center">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
        >
          <ArrowLeft size={20} />
          Kembali ke Produk
        </Link>
      </div>
    </div>
  );
}
