import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { MaterialData } from "@/lib/materialData";

interface MaterialCardProps {
  material: MaterialData;
  onDownload: (url: string) => void;
}

export default function MaterialCard({ material, onDownload }: MaterialCardProps) {
  return (
    <Card className="border border-gray-100 dark:border-gray-700 shadow-sm" data-testid={`material-card-${material.id}`}>
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="text-red-600 dark:text-red-400" size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">
              {material.title}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {material.size} • PDF
            </p>
            {material.description && (
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {material.description}
              </p>
            )}
          </div>
          <Button
            onClick={() => onDownload(material.downloadUrl)}
            className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors"
            data-testid={`download-material-${material.id}`}
          >
            <Download className="mr-1" size={16} />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
