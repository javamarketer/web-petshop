import Link from 'next/link';
import { Product } from '@/types';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  showPetshop?: boolean;
}

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

export function ProductCard({ product, showPetshop = false }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-4 group"
    >
      <div className="h-40 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-4 flex items-center justify-center text-5xl group-hover:scale-110 transition">
        {getCategoryIcon(product.category)}
      </div>

      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 text-sm">
        {product.name}
      </h3>

      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
          {product.category}
        </span>
        {product.brand && (
          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
            {product.brand}
          </span>
        )}
      </div>

      {showPetshop && product.petshop && (
        <p className="text-xs text-gray-500 mb-2 line-clamp-1">
          📍 {product.petshop.name}
        </p>
      )}

      <div className="flex justify-between items-center mt-4 pt-4 border-t">
        <div>
          <p className="text-xs text-gray-500 mb-1">Harga</p>
          <span className="text-lg font-bold text-blue-600">
            Rp{product.price.toLocaleString('id-ID')}
          </span>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 mb-1">Stok</p>
          <span
            className={`text-sm font-semibold ${
              product.stock > 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {product.stock > 0 ? `${product.stock}` : 'Habis'}
          </span>
        </div>
      </div>

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition text-sm mt-3 flex items-center justify-center gap-2">
        <ShoppingCart size={16} />
        Lihat Detail
      </button>
    </Link>
  );
}
