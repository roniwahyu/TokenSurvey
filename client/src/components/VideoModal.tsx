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
      <DialogContent className="max-w-5xl w-full p-0 modern-card animate-fade-scale border-0 overflow-hidden">
        <DialogHeader className="p-6 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <DialogTitle className="font-bold text-xl mb-2 text-white">
                🎬 {video.title}
              </DialogTitle>
              <p className="text-white/80 text-sm">{video.description}</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleOpenExternal}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl font-semibold shadow-lg hover:scale-105 transition-all duration-200 backdrop-blur-sm"
                data-testid="open-youtube"
              >
                <ExternalLink className="mr-2" size={16} />
                🚀 Lihat di YouTube
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
        
        <div className="p-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
          <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
            {videoId ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-2xl"
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
