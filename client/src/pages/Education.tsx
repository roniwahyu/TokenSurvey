import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MoreVertical, 
  Play, 
  ExternalLink, 
  Download,
  PlayCircle,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";
import VideoCard from "@/components/VideoCard";
import MaterialCard from "@/components/MaterialCard";
import VideoModal from "@/components/VideoModal";
import { educationalVideos, VideoData } from "@/lib/videoData";
import { educationalMaterials } from "@/lib/materialData";

export default function Education() {
  const [showPopup, setShowPopup] = useState(false);
  const [activeSection, setActiveSection] = useState<"videos" | "materials">("videos");
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const handleMenuToggle = () => {
    setShowPopup(!showPopup);
  };

  const handleSectionChange = (section: "videos" | "materials") => {
    setActiveSection(section);
    setShowPopup(false);
  };

  const handleVideoPlay = (video: VideoData) => {
    setSelectedVideo(video);
    setShowVideoModal(true);
  };

  const handleVideoClose = () => {
    setShowVideoModal(false);
    setSelectedVideo(null);
  };

  return (
    <div className="min-h-full">
      {/* Education Header with Popup Menu */}
      <div className="px-4 py-6">
        <div className="mb-6 relative">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edukasi</h2>
            <Button
              variant="ghost"
              onClick={handleMenuToggle}
              className="p-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20"
              data-testid="education-menu-toggle"
            >
              <MoreVertical size={20} />
            </Button>
          </div>
          
          {/* Top Popup Menu (appears above button) */}
          <div 
            className={cn(
              "absolute right-0 bottom-full mb-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 transition-all duration-200",
              showPopup ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2"
            )}
            data-testid="education-popup"
          >
            <div className="p-2">
              <button
                onClick={() => handleSectionChange("videos")}
                className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                data-testid="menu-videos"
              >
                <PlayCircle className="text-red-500" size={20} />
                <span>Video Playlist</span>
              </button>
              <button
                onClick={() => handleSectionChange("materials")}
                className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                data-testid="menu-materials"
              >
                <FileText className="text-blue-500" size={20} />
                <span>Materi PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Featured Content */}
        <section className="mb-8">
          <div className="relative mb-6 rounded-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400" 
              alt="Mental health awareness and mindfulness concept" 
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-semibold mb-1">Kesehatan Mental Santri</h3>
              <p className="text-sm opacity-90">Pentingnya menjaga kesejahteraan psikologis</p>
            </div>
          </div>
        </section>

        {/* Videos Section */}
        <section 
          className={cn("mb-8", activeSection !== "videos" && "hidden")}
          data-testid="videos-section"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Video Edukasi
          </h3>
          <div className="space-y-4">
            {educationalVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onPlay={handleVideoPlay}
                onOpenExternal={(url) => window.open(url, '_blank')}
              />
            ))}
          </div>
        </section>

        {/* Materials Section */}
        <section 
          className={cn("mb-8", activeSection !== "materials" && "hidden")}
          data-testid="materials-section"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Materi PDF
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {educationalMaterials.map((material) => (
              <MaterialCard
                key={material.id}
                material={material}
                onDownload={(url) => window.open(url, '_blank')}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Video Modal */}
      <VideoModal
        video={selectedVideo}
        isOpen={showVideoModal}
        onClose={handleVideoClose}
      />

      {/* Overlay to close popup when clicking outside */}
      {showPopup && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}
