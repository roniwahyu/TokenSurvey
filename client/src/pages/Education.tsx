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
              className={cn(
                "p-3 rounded-xl transition-all duration-200 hover:scale-105 shadow-md",
                showPopup 
                  ? "bg-gradient-to-r from-green-500 to-blue-500 text-white" 
                  : "bg-primary/10 text-primary hover:bg-primary/20"
              )}
              data-testid="education-menu-toggle"
            >
              <MoreVertical size={20} className="animate-pulse-soft" />
            </Button>
          </div>
          
          {/* Enhanced Upward Popup Menu */}
          <div 
            className={cn(
              "absolute right-0 bottom-full mb-3 w-64 glassmorphism-enhanced rounded-2xl shadow-2xl border border-white/20 z-50 transition-all duration-300 backdrop-blur-xl",
              showPopup ? "opacity-100 visible translate-y-0 scale-100" : "opacity-0 invisible translate-y-4 scale-95"
            )}
            data-testid="education-popup"
          >
            <div className="p-4 space-y-3">
              <button
                onClick={() => handleSectionChange("videos")}
                className={cn(
                  "w-full flex items-center space-x-4 px-4 py-4 text-left rounded-xl transition-all duration-200 touch-target transform hover:scale-105",
                  activeSection === "videos"
                    ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg"
                    : "hover:bg-white/10 text-gray-700 dark:text-gray-300"
                )}
                data-testid="menu-videos"
              >
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center",
                  activeSection === "videos" ? "bg-white/20" : "bg-red-100 dark:bg-red-900"
                )}>
                  <PlayCircle size={24} className={activeSection === "videos" ? "text-white" : "text-red-500"} />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm flex items-center gap-2">
                    🎥 Video Edukasi
                    <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded-full text-xs">
                      Hot
                    </span>
                  </div>
                  <p className="text-xs opacity-80 mt-1">Konten video interaktif berkualitas tinggi</p>
                </div>
              </button>
              
              <button
                onClick={() => handleSectionChange("materials")}
                className={cn(
                  "w-full flex items-center space-x-4 px-4 py-4 text-left rounded-xl transition-all duration-200 touch-target transform hover:scale-105",
                  activeSection === "materials"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : "hover:bg-white/10 text-gray-700 dark:text-gray-300"
                )}
                data-testid="menu-materials"
              >
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center",
                  activeSection === "materials" ? "bg-white/20" : "bg-blue-100 dark:bg-blue-900"
                )}>
                  <FileText size={24} className={activeSection === "materials" ? "text-white" : "text-blue-500"} />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm flex items-center gap-2">
                    📚 Materi PDF
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-xs">
                      New
                    </span>
                  </div>
                  <p className="text-xs opacity-80 mt-1">Unduh materi lengkap untuk belajar offline</p>
                </div>
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
