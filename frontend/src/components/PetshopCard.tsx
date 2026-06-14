import Link from 'next/link';
import { Petshop } from '@/types';
import { MapPin, Phone, Clock } from 'lucide-react';

interface PetshopCardProps {
  petshop: Petshop;
}

export function PetshopCard({ petshop }: PetshopCardProps) {
  return (
    <Link
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
        <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 line-clamp-2">
          {petshop.name}
        </h3>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-start gap-2">
            <MapPin size={16} className="flex-shrink-0 mt-0.5 text-blue-600" />
            <span className="line-clamp-2">{petshop.address}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
              📍 {petshop.city}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Phone size={16} className="text-green-600" />
            <span className="text-xs">{petshop.phone}</span>
          </div>

          {petshop.opening_time && petshop.closing_time && (
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-orange-600" />
              <span className="text-xs">
                {petshop.opening_time} - {petshop.closing_time}
              </span>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition text-sm">
            Lihat Detail
          </button>
        </div>
      </div>
    </Link>
  );
}
