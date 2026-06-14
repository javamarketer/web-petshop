import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export function LoadingSpinner({ size = 'md', text = 'Loading...' }: LoadingSpinnerProps) {
  const sizeMap = {
    sm: 24,
    md: 40,
    lg: 60,
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="animate-spin text-blue-600" size={sizeMap[size]} />
      {text && <p className="mt-4 text-gray-600">{text}</p>}
    </div>
  );
}

export function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
          <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
          <div className="h-10 bg-gray-200 rounded mt-4"></div>
        </div>
      ))}
    </div>
  );
}
