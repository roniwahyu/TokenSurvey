import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ExternalLink } from "lucide-react";
import { VideoData, extractYouTubeVideoId } from "@/lib/videoData";

interface VideoModalProps {
  video: VideoData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ video, isOpen, onClose }: VideoModalProps) {
  if (!video) return null;

  const videoId = extractYouTubeVideoId(video.url);

  const handleOpenExternal = () => {
    window.open(video.url, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-1">
        <DialogHeader className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <DialogTitle className="font-semibold text-gray-900 dark:text-white">
              {video.title}
            </DialogTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleOpenExternal}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-xs"
                data-testid="open-youtube"
              >
                <ExternalLink className="mr-1" size={12} />
                YouTube
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                data-testid="close-video-modal"
              >
                <X size={16} />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="p-4">
          <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
            {videoId ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                data-testid="youtube-iframe"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-center">
                <div>
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Video player tidak dapat dimuat
                  </p>
                  <Button
                    onClick={handleOpenExternal}
                    className="bg-red-600 hover:bg-red-700 text-white"
                    data-testid="fallback-youtube"
                  >
                    <ExternalLink className="mr-2" size={16} />
                    Buka di YouTube
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {video.description && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {video.description}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
