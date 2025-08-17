
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { MaterialData } from '@/lib/materialData';

interface MaterialCardProps {
  material: MaterialData;
  onDownload: (url: string) => void;
  onViewDetails: (id: string) => void;
}

export default function MaterialCard({ material, onDownload, onViewDetails }: MaterialCardProps) {
  return (
    <Card className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-500">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-2xl shrink-0">
            <FileText size={36} className="text-blue-600 dark:text-blue-300" />
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              {material.title}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              Ukuran: {material.size}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {material.description}
            </p>
          </div>
        </div>
        <div className="flex space-x-3 mt-4">
          <Button 
            onClick={() => onViewDetails(material.id)}
            className="flex-1 bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 text-white font-semibold py-3 rounded-xl shadow-lg transform hover:scale-105 transition duration-300"
          >
            Lihat Detail
          </Button>
          <Button 
            onClick={() => onDownload(material.downloadUrl)}
            variant="outline"
            className="flex-1 border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-300 hover:bg-blue-500/10 dark:hover:bg-blue-400/10 font-semibold py-3 rounded-xl transition duration-300"
          >
            <Download size={20} className="mr-2" />
            Unduh
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
