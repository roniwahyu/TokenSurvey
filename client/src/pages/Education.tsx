import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MoreVertical, 
  Play, 
  ExternalLink, 
  Download,
  PlayCircle,
  FileText,
  History,
  Search,
  BookOpen,
  Bookmark
} from "lucide-react";
import { cn } from "@/lib/utils";
import VideoCard from "@/components/VideoCard";
import MaterialCard from "@/components/MaterialCard";
import VideoModal from "@/components/VideoModal";
import { educationalVideos, VideoData } from "@/lib/videoData";
import { educationalMaterials } from "@/lib/materialData";

// Placeholder for Assessment History Data
const assessmentHistory = [
  { id: 1, name: "Tes Kecemasan", date: "2023-10-26", status: "Selesai", score: 85 },
  { id: 2, name: "Tes Depresi", date: "2023-10-25", status: "Selesai", score: 92 },
  { id: 3, name: "Tes Stres", date: "2023-10-24", status: "Selesai", score: 78 },
];

// Placeholder for detailed assessment information
const assessmentDetails = {
  "Tes Kecemasan": {
    description: "Tes ini dirancang untuk mengukur tingkat kecemasan Anda.",
    howToUse: "Jawab setiap pertanyaan dengan jujur berdasarkan perasaan Anda dalam seminggu terakhir.",
    tips: "Fokus pada perasaan Anda saat ini. Tidak ada jawaban benar atau salah."
  },
  "Tes Depresi": {
    description: "Tes ini membantu mengidentifikasi gejala depresi.",
    howToUse: "Bacalah setiap pernyataan dan pilih opsi yang paling menggambarkan kondisi Anda.",
    tips: "Pertimbangkan bagaimana Anda merasa dalam dua minggu terakhir."
  },
  "Tes Stres": {
    description: "Mengukur tingkat stres dan sumber-sumbernya.",
    howToUse: "Evaluasi seberapa sering Anda mengalami situasi yang menyebabkan stres.",
    tips: "Pikirkan tentang keseimbangan kehidupan Anda."
  }
};

export default function Education() {
  const [showPopup, setShowPopup] = useState(false);
  const [activeSection, setActiveSection] = useState<"videos" | "materials" | "assessments">("videos");
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showMaterialDetails, setShowMaterialDetails] = useState<{ [key: string]: boolean }>({});
  const [selectedMaterialId, setSelectedMaterialId] = useState<string | null>(null);
  const [showAssessmentInfo, setShowAssessmentInfo] = useState<string | null>(null);

  const handleMenuToggle = () => {
    setShowPopup(!showPopup);
  };

  const handleSectionChange = (section: "videos" | "materials" | "assessments") => {
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

  const toggleMaterialDetails = (id: string) => {
    setSelectedMaterialId(id);
    setShowMaterialDetails(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const openMaterialInNewTab = (url: string) => {
    window.open(url, '_blank');
  };

  const openAssessmentDetails = (name: string) => {
    setShowAssessmentInfo(name);
  };

  const closeAssessmentDetails = () => {
    setShowAssessmentInfo(null);
  };

  return (
    <div className="font-impresif min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-black text-gray-900 dark:text-white">

      {/* Education Header with Popup Menu */}
      <div className="px-4 py-8">
        <div className="mb-12 relative">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 drop-shadow-lg">
              Edukasi & Kesejahteraan Mental
            </h1>
            <Button
              variant="ghost"
              onClick={handleMenuToggle}
              className={cn(
                "p-4 rounded-2xl transition-all duration-300 hover:scale-110 shadow-xl border-2",
                showPopup 
                  ? "bg-gradient-to-r from-green-500 to-blue-500 text-white border-green-600" 
                  : "bg-white/10 border-blue-300 hover:bg-white/20 dark:bg-gray-800 dark:border-gray-600"
              )}
              data-testid="education-menu-toggle"
            >
              <MoreVertical size={28} className="animate-pulse-slow" />
            </Button>
          </div>

          {/* Enhanced Upward Popup Menu */}
          <div 
            className={cn(
              "absolute right-0 bottom-full mb-4 w-80 glassmorphism-enhanced rounded-3xl shadow-2xl border border-white/30 z-50 transition-all duration-500 backdrop-blur-xl",
              showPopup ? "opacity-100 visible translate-y-0 scale-100" : "opacity-0 invisible translate-y-8 scale-95"
            )}
            data-testid="education-popup"
          >
            <div className="p-6 space-y-4">
              <button
                onClick={() => handleSectionChange("videos")}
                className={cn(
                  "w-full flex items-center space-x-5 px-5 py-5 text-left rounded-2xl transition-all duration-300 touch-target transform hover:scale-105 shadow-lg",
                  activeSection === "videos"
                    ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-red-500/40"
                    : "hover:bg-gray-100/10 dark:hover:bg-gray-700/30 text-gray-700 dark:text-gray-300"
                )}
                data-testid="menu-videos"
              >
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center shrink-0",
                  activeSection === "videos" ? "bg-white/30 shadow-lg" : "bg-red-100 dark:bg-red-900"
                )}>
                  <PlayCircle size={32} className={activeSection === "videos" ? "text-white" : "text-red-500 dark:text-red-400"} />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-lg flex items-center gap-2">
                    🎥 Video Edukasi
                    <span className="px-2.5 py-1.5 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-full text-xs font-semibold">
                      Populer
                    </span>
                  </div>
                  <p className="text-xs opacity-80 mt-1.5 leading-relaxed">Jelajahi video interaktif pilihan.</p>
                </div>
              </button>

              <button
                onClick={() => handleSectionChange("materials")}
                className={cn(
                  "w-full flex items-center space-x-5 px-5 py-5 text-left rounded-2xl transition-all duration-300 touch-target transform hover:scale-105 shadow-lg",
                  activeSection === "materials"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-blue-500/40"
                    : "hover:bg-gray-100/10 dark:hover:bg-gray-700/30 text-gray-700 dark:text-gray-300"
                )}
                data-testid="menu-materials"
              >
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center shrink-0",
                  activeSection === "materials" ? "bg-white/30 shadow-lg" : "bg-blue-100 dark:bg-blue-900"
                )}>
                  <FileText size={32} className={activeSection === "materials" ? "text-white" : "text-blue-500 dark:text-blue-400"} />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-lg flex items-center gap-2">
                    📚 Materi PDF
                    <span className="px-2.5 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold">
                      Baru
                    </span>
                  </div>
                  <p className="text-xs opacity-80 mt-1.5 leading-relaxed">Unduh materi lengkap untuk belajar mandiri.</p>
                </div>
              </button>

              <button
                onClick={() => handleSectionChange("assessments")}
                className={cn(
                  "w-full flex items-center space-x-5 px-5 py-5 text-left rounded-2xl transition-all duration-300 touch-target transform hover:scale-105 shadow-lg",
                  activeSection === "assessments"
                    ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-yellow-500/40"
                    : "hover:bg-gray-100/10 dark:hover:bg-gray-700/30 text-gray-700 dark:text-gray-300"
                )}
                data-testid="menu-assessments"
              >
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center shrink-0",
                  activeSection === "assessments" ? "bg-white/30 shadow-lg" : "bg-yellow-100 dark:bg-yellow-900"
                )}>
                  <BookOpen size={32} className={activeSection === "assessments" ? "text-white" : "text-yellow-500 dark:text-yellow-400"} />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-lg flex items-center gap-2">
                    📝 Assessment
                    <span className="px-2.5 py-1.5 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-full text-xs font-semibold">
                      Cek
                    </span>
                  </div>
                  <p className="text-xs opacity-80 mt-1.5 leading-relaxed">Ukur pemahaman Anda.</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Hero Section - Mental Health Focus */}
        <section className="mb-12 text-center py-16 px-6 rounded-3xl shadow-2xl border-2 border-transparent bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1567095761475-92d9e17e57f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=600')" }}>
          <div className="absolute inset-0 bg-black/40 rounded-3xl backdrop-blur-sm"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold mb-4 leading-tight text-white drop-shadow-xl">
              Jaga Keseimbangan Mental Anda
            </h2>
            <p className="text-xl text-white opacity-90 mb-8 max-w-3xl mx-auto">
              Temukan sumber daya, materi, dan tes untuk mendukung kesehatan mental Anda. Mari mulai perjalanan positif ini bersama.
            </p>
            <Button 
              onClick={() => handleSectionChange("assessments")}
              className="px-8 py-4 text-lg font-bold rounded-full shadow-xl transform hover:scale-105 transition duration-300 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white"
              data-testid="hero-assessment-cta"
            >
              Mulai Assessment Gratis
            </Button>
          </div>
        </section>

        {/* Videos Section */}
        <section 
          className={cn("mb-12", activeSection !== "videos" && "hidden")}
          data-testid="videos-section"
        >
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              Video Edukasi Pilihan
            </h3>
             <Button variant="link" className="text-lg text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1" onClick={() => handleSectionChange("videos")}>
              Lihat Semua <ExternalLink size={18} />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {educationalVideos.slice(0, 3).map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onPlay={handleVideoPlay}
                onOpenExternal={(url) => window.open(url, '_blank')}
              />
            ))}
          </div>
        </section>

        {/* Materials Section - Mental Health Focus */}
        <section 
          className={cn("mb-12", activeSection !== "materials" && "hidden")}
          data-testid="materials-section"
        >
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              Materi Pembelajaran Santri
            </h3>
             <Button variant="link" className="text-lg text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1" onClick={() => handleSectionChange("materials")}>
              Lihat Semua <ExternalLink size={18} />
            </Button>
          </div>
          <div className="space-y-6">
            {educationalMaterials.map((material) => (
              <div key={material.id} className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-4 flex-grow">
                    <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-2xl shrink-0">
                      <FileText size={36} className="text-blue-600 dark:text-blue-300" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">{material.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Ukuran: {material.size}</p>
                    </div>
                  </div>
                  <div className="flex space-x-3 md:ml-auto">
                    <Button 
                      onClick={() => toggleMaterialDetails(material.id)}
                      className="rounded-full px-5 py-3 shadow-md bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 text-white font-semibold transition duration-300"
                      data-testid={`view-details-${material.id}`}
                    >
                      {showMaterialDetails[material.id] ? 'Tutup' : 'Baca'}
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => openMaterialInNewTab(material.url)} 
                      className="rounded-full px-5 py-3 border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-300 hover:bg-blue-500/10 dark:hover:bg-blue-400/10 font-semibold transition duration-300"
                      data-testid={`download-${material.id}`}
                    >
                      <Download size={20} className="mr-2" /> Unduh
                    </Button>
                  </div>
                </div>
                {showMaterialDetails[material.id] && (
                  <div className="mt-5 pt-5 border-t border-gray-200 dark:border-gray-700">
                    <h5 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Detail Materi:</h5>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{material.description}</p>
                    <div className="flex space-x-3 mt-4">
                       <Button 
                        onClick={() => openMaterialInNewTab(material.url)} 
                        className="rounded-lg px-5 py-3 shadow-md bg-gradient-to-r from-purple-400 to-indigo-500 hover:from-purple-500 hover:to-indigo-600 text-white font-semibold transition duration-300"
                        data-testid={`read-online-${material.id}`}
                      >
                        <Bookmark size={20} className="mr-2" /> Baca Online
                      </Button>
                       <Button 
                        variant="outline"
                        onClick={() => openMaterialInNewTab(material.url)} 
                        className="rounded-lg px-5 py-3 border-gray-400 text-gray-700 dark:border-gray-500 dark:text-gray-300 hover:bg-gray-500/10 dark:hover:bg-gray-400/10 font-semibold transition duration-300"
                        data-testid={`download-again-${material.id}`}
                      >
                        <Download size={20} className="mr-2" /> Unduh Lagi
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Assessment Section */}
        <section 
          className={cn("mb-12", activeSection !== "assessments" && "hidden")}
          data-testid="assessments-section"
        >
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              Assessment Mandiri
            </h3>
             <Button variant="link" className="text-lg text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1" onClick={() => handleSectionChange("assessments")}>
              Lihat Riwayat <History size={18} className="ml-1"/>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(assessmentDetails).map(([name, details]) => (
              <Card 
                key={name} 
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 border-2 border-transparent hover:border-blue-500 transition duration-300 cursor-pointer"
                onClick={() => openAssessmentDetails(name)}
              >
                <CardContent className="p-0 flex flex-col items-center text-center">
                  <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-2xl mb-4">
                    <BookOpen size={48} className="text-yellow-600 dark:text-yellow-300" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{name}</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{details.description}</p>
                  <Button className="rounded-lg px-6 py-3 font-semibold bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white shadow-md">
                    Mulai Tes
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Assessment Information Modal */}
        {showAssessmentInfo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-lg" onClick={closeAssessmentDetails}>
            <div 
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-3xl w-full border-2 border-blue-500" 
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-200 dark:border-gray-700">
                <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                  {showAssessmentInfo}
                </h3>
                <Button variant="ghost" onClick={closeAssessmentDetails} className="p-2 rounded-full hover:bg-red-500/20">
                  <X size={28} className="text-red-600 dark:text-red-400" />
                </Button>
              </div>
              <div className="space-y-6 text-lg">
                <div className="bg-blue-50 dark:bg-gray-700/50 p-4 rounded-xl border-l-4 border-blue-500">
                  <h4 className="font-bold text-xl mb-2 text-blue-700 dark:text-blue-300">Deskripsi:</h4>
                  <p className="text-gray-800 dark:text-gray-200">{assessmentDetails[showAssessmentInfo]?.description}</p>
                </div>
                <div className="bg-yellow-50 dark:bg-gray-700/50 p-4 rounded-xl border-l-4 border-yellow-500">
                  <h4 className="font-bold text-xl mb-2 text-yellow-700 dark:text-yellow-300">Cara Menggunakan:</h4>
                  <p className="text-gray-800 dark:text-gray-200">{assessmentDetails[showAssessmentInfo]?.howToUse}</p>
                </div>
                <div className="bg-green-50 dark:bg-gray-700/50 p-4 rounded-xl border-l-4 border-green-500">
                  <h4 className="font-bold text-xl mb-2 text-green-700 dark:text-green-300">Tips:</h4>
                  <p className="text-gray-800 dark:text-gray-200">{assessmentDetails[showAssessmentInfo]?.tips}</p>
                </div>
              </div>
              <div className="mt-8 flex justify-center">
                <Button 
                  onClick={() => { /* TODO: Navigate to assessment test */ }} 
                  className="px-8 py-4 text-lg font-bold rounded-full shadow-xl transform hover:scale-105 transition duration-300 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 text-white"
                >
                  Mulai Assessment
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* History Assessment Shortcut */}
        {activeSection === "assessments" && (
          <Button
            onClick={() => { /* TODO: Navigate to history page */ }}
            className="fixed bottom-8 right-8 z-40 p-4 rounded-full shadow-xl transform hover:scale-110 transition duration-300 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white flex items-center space-x-2"
            aria-label="Riwayat Assessment"
            data-testid="history-shortcut"
          >
            <History size={32} />
            <span className="font-bold">Riwayat</span>
          </Button>
        )}
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

// Custom CSS for glassmorphism effect and animation
// This part would typically be in a global CSS file or a dedicated styles component.
// For demonstration, it's conceptually represented here.
/*
.glassmorphism-enhanced {
  background-color: rgba(255, 255, 255, 0.2); // Semi-transparent white background
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1); // Soft blue shadow
  border: 1px solid rgba(255, 255, 255, 0.3); // Semi-transparent border
}

.animate-pulse-soft {
  animation: pulse-soft 2s infinite ease-in-out;
}

.animate-pulse-slow {
  animation: pulse-slow 3s infinite ease-in-out;
}

@keyframes pulse-soft {
  0%, 100% {
    transform: scale(0.95);
    opacity: 0.9;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
}

@keyframes pulse-slow {
  0%, 100% {
    transform: scale(0.98);
    opacity: 0.85;
  }
  50% {
    transform: scale(1.02);
    opacity: 1;
  }
}

.touch-target {
  min-height: 60px; // Ensure larger touch targets for mobile
  min-width: 60px;
}
*/