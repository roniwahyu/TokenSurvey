import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink } from "lucide-react";
import { VideoData } from "@/lib/videoData";

interface VideoCardProps {
  video: VideoData;
  onPlay: (video: VideoData) => void;
  onOpenExternal: (url: string) => void;
}

export default function VideoCard({ video, onPlay, onOpenExternal }: VideoCardProps) {
  return (
    <Card className="border border-gray-100 dark:border-gray-700 shadow-sm" data-testid={`video-card-${video.id}`}>
      <CardContent className="p-4">
        <div className="flex space-x-4">
          <img 
            src={video.thumbnail} 
            alt={`Thumbnail for ${video.title}`}
            className="w-20 h-16 rounded-lg object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1 line-clamp-2">
              {video.title}
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              {video.duration} • {video.views}
            </p>
            <div className="flex space-x-2">
              <Button
                onClick={() => onPlay(video)}
                className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded-lg text-xs font-medium hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                data-testid={`play-video-${video.id}`}
              >
                <Play className="mr-1" size={12} />
                Play
              </Button>
              <Button
                onClick={() => onOpenExternal(video.url)}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-xs hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                data-testid={`youtube-video-${video.id}`}
              >
                <ExternalLink className="mr-1" size={12} />
                YouTube
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
