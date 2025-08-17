
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
  Bookmark,
  X,
  Gamepad2,
  Globe,
  PenTool,
  Heart,
  Shield,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import VideoCard from "@/components/VideoCard";
import VideoModal from "@/components/VideoModal";
import { educationalVideos, VideoData } from "@/lib/videoData";
import { educationalMaterials } from "@/lib/materialData";

// Placeholder for Assessment History Data
const assessmentHistory = [
  { id: 1, name: "Tes Kecemasan", date: "2023-10-26", status: "Selesai", score: 85 },
  { id: 2, name: "Tes Depresi", date: "2023-10-25", status: "Selesai", score: 92 },
  { id: 3, name: "Tes Stres", date: "2023-10-24", status: "Selesai", score: 78 },
];

// External games and interactive tools
const externalGames = [
  {
    id: "1",
    title: "Mindfulness Garden",
    description: "Game interaktif untuk melatih mindfulness dan relaksasi",
    url: "https://www.mindfulnessgarden.com",
    type: "Relaksasi",
    icon: "🌸"
  },
  {
    id: "2", 
    title: "Mood Tracker Interactive",
    description: "Aplikasi web untuk melacak dan memahami perubahan mood",
    url: "https://moodtools.org/mood-tracker",
    type: "Self-Monitoring",
    icon: "📊"
  },
  {
    id: "3",
    title: "Anxiety Relief Games", 
    description: "Kumpulan mini games untuk mengurangi kecemasan",
    url: "https://www.anxietyrelief.games",
    type: "Terapi",
    icon: "🎮"
  },
  {
    id: "4",
    title: "Breathing Exercises",
    description: "Panduan teknik pernapasan interaktif untuk santri",
    url: "https://breathe.islamicwellness.org",
    type: "Spiritual",
    icon: "🫁"
  }
];

// Blog articles for mental health
const blogArticles = [
  {
    id: "1",
    title: "Kesehatan Mental dalam Perspektif Islam",
    excerpt: "Memahami konsep kesehatan mental menurut ajaran Islam dan cara menjaganya dalam kehidupan sehari-hari di pesantren.",
    author: "Dr. Ahmad Fadhil",
    date: "15 November 2023",
    readTime: "8 menit",
    category: "Spiritual",
    imageUrl: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=400&h=250&fit=crop"
  },
  {
    id: "2", 
    title: "Mengatasi Stres Akademik dengan Dzikir",
    excerpt: "Teknik-teknik dzikir dan doa yang dapat membantu santri mengelola tekanan belajar dan ujian.",
    author: "Ustadzah Fatimah",
    date: "12 November 2023", 
    readTime: "6 menit",
    category: "Praktis",
    imageUrl: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=400&h=250&fit=crop"
  },
  {
    id: "3",
    title: "Membangun Resiliensi Mental Santri",
    excerpt: "Strategi membangun ketahanan mental untuk menghadapi tantangan hidup di pesantren dan masa depan.",
    author: "Prof. Dr. Siti Nurhaliza",
    date: "10 November 2023",
    readTime: "10 menit", 
    category: "Pengembangan Diri",
    imageUrl: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=400&h=250&fit=crop"
  },
  {
    id: "4",
    title: "Menjaga Keseimbangan Ibadah dan Kesehatan Mental",
    excerpt: "Panduan praktis menyeimbangkan aktivitas ibadah, belajar, dan perawatan kesehatan mental.",
    author: "Ustadz Muhammad Ridho",
    date: "8 November 2023",
    readTime: "7 menit",
    category: "Spiritual",
    imageUrl: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=400&h=250&fit=crop"
  }
];

// Detailed assessment information
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
  const [activeSection, setActiveSection] = useState<"videos" | "materials" | "assessments" | "games" | "blog">("videos");
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showMaterialDetails, setShowMaterialDetails] = useState<{ [key: string]: boolean }>({});
  const [selectedMaterialId, setSelectedMaterialId] = useState<string | null>(null);
  const [showAssessmentInfo, setShowAssessmentInfo] = useState<string | null>(null);
  const [selectedBlogArticle, setSelectedBlogArticle] = useState<any>(null);
  const [showBlogModal, setShowBlogModal] = useState(false);

  const handleMenuToggle = () => {
    setShowPopup(!showPopup);
  };

  const handleSectionChange = (section: "videos" | "materials" | "assessments" | "games" | "blog") => {
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

  const openGameExternal = (url: string) => {
    window.open(url, '_blank');
  };

  const openBlogArticle = (article: any) => {
    setSelectedBlogArticle(article);
    setShowBlogModal(true);
  };

  const closeBlogModal = () => {
    setShowBlogModal(false);
    setSelectedBlogArticle(null);
  };

  return (
    <div className="font-poppins min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-black text-gray-900 dark:text-white">

      {/* Education Header with Popup Menu */}
      <div className="px-4 py-8">
        <div className="mb-12 relative">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 drop-shadow-lg">
              Pusat Edukasi Kesehatan Mental Santri
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
              <MoreVertical size={28} className="animate-pulse" />
            </Button>
          </div>

          {/* Enhanced Navigation Menu */}
          <div 
            className={cn(
              "absolute right-0 bottom-full mb-4 w-96 glassmorphism-enhanced rounded-3xl shadow-2xl border border-white/30 z-50 transition-all duration-500 backdrop-blur-xl",
              showPopup ? "opacity-100 visible translate-y-0 scale-100" : "opacity-0 invisible translate-y-8 scale-95"
            )}
            data-testid="education-popup"
          >
            <div className="p-6 space-y-4">
              {/* Videos Button */}
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
                  <p className="text-xs opacity-80 mt-1.5 leading-relaxed">Video pembelajaran kesehatan mental untuk santri</p>
                </div>
              </button>

              {/* Materials Button */}
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
                  <p className="text-xs opacity-80 mt-1.5 leading-relaxed">Panduan lengkap kesehatan mental santri</p>
                </div>
              </button>

              {/* Games Button */}
              <button
                onClick={() => handleSectionChange("games")}
                className={cn(
                  "w-full flex items-center space-x-5 px-5 py-5 text-left rounded-2xl transition-all duration-300 touch-target transform hover:scale-105 shadow-lg",
                  activeSection === "games"
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-green-500/40"
                    : "hover:bg-gray-100/10 dark:hover:bg-gray-700/30 text-gray-700 dark:text-gray-300"
                )}
                data-testid="menu-games"
              >
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center shrink-0",
                  activeSection === "games" ? "bg-white/30 shadow-lg" : "bg-green-100 dark:bg-green-900"
                )}>
                  <Gamepad2 size={32} className={activeSection === "games" ? "text-white" : "text-green-500 dark:text-green-400"} />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-lg flex items-center gap-2">
                    🎮 Games Interaktif
                    <span className="px-2.5 py-1.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs font-semibold">
                      Seru
                    </span>
                  </div>
                  <p className="text-xs opacity-80 mt-1.5 leading-relaxed">Tools interaktif untuk kesehatan mental</p>
                </div>
              </button>

              {/* Blog Button */}
              <button
                onClick={() => handleSectionChange("blog")}
                className={cn(
                  "w-full flex items-center space-x-5 px-5 py-5 text-left rounded-2xl transition-all duration-300 touch-target transform hover:scale-105 shadow-lg",
                  activeSection === "blog"
                    ? "bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-purple-500/40"
                    : "hover:bg-gray-100/10 dark:hover:bg-gray-700/30 text-gray-700 dark:text-gray-300"
                )}
                data-testid="menu-blog"
              >
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center shrink-0",
                  activeSection === "blog" ? "bg-white/30 shadow-lg" : "bg-purple-100 dark:bg-purple-900"
                )}>
                  <PenTool size={32} className={activeSection === "blog" ? "text-white" : "text-purple-500 dark:text-purple-400"} />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-lg flex items-center gap-2">
                    📝 Blog & Artikel
                    <span className="px-2.5 py-1.5 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-xs font-semibold">
                      Terbaru
                    </span>
                  </div>
                  <p className="text-xs opacity-80 mt-1.5 leading-relaxed">Artikel mendalam kesehatan mental</p>
                </div>
              </button>

              {/* Assessment Button */}
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
                    🔍 Assessment Info
                    <span className="px-2.5 py-1.5 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-full text-xs font-semibold">
                      Info
                    </span>
                  </div>
                  <p className="text-xs opacity-80 mt-1.5 leading-relaxed">Panduan lengkap assessment</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Hero Section - Mental Health Focus */}
        <section className="mb-12 text-center py-16 px-6 rounded-3xl shadow-2xl border-2 border-transparent bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1564769625905-50e93615e769?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=600')" }}>
          <div className="absolute inset-0 bg-black/40 rounded-3xl backdrop-blur-sm"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold mb-4 leading-tight text-white drop-shadow-xl">
              Platform Edukasi Kesehatan Mental Santri
            </h2>
            <p className="text-xl text-white opacity-90 mb-8 max-w-3xl mx-auto">
              Temukan berbagai media pembelajaran, tools interaktif, dan artikel mendalam untuk mendukung kesehatan mental Anda sebagai santri.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                onClick={() => handleSectionChange("videos")}
                className="px-6 py-3 text-lg font-bold rounded-full shadow-xl transform hover:scale-105 transition duration-300 bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white"
                data-testid="hero-video-cta"
              >
                🎥 Video Edukasi
              </Button>
              <Button 
                onClick={() => handleSectionChange("games")}
                className="px-6 py-3 text-lg font-bold rounded-full shadow-xl transform hover:scale-105 transition duration-300 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white"
                data-testid="hero-games-cta"
              >
                🎮 Games Interaktif
              </Button>
              <Button 
                onClick={() => handleSectionChange("blog")}
                className="px-6 py-3 text-lg font-bold rounded-full shadow-xl transform hover:scale-105 transition duration-300 bg-gradient-to-r from-purple-400 to-violet-500 hover:from-purple-500 hover:to-violet-600 text-white"
                data-testid="hero-blog-cta"
              >
                📝 Baca Artikel
              </Button>
            </div>
          </div>
        </section>

        {/* Videos Section */}
        <section 
          className={cn("mb-12", activeSection !== "videos" && "hidden")}
          data-testid="videos-section"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              🎥 Video Pembelajaran Kesehatan Mental
            </h3>
            <Button variant="link" className="text-lg text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1">
              Lihat Semua <ExternalLink size={18} />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          className={cn("mb-12", activeSection !== "materials" && "hidden")}
          data-testid="materials-section"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              📚 Materi Pembelajaran PDF
            </h3>
            <Button variant="link" className="text-lg text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1">
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
                      onClick={() => openMaterialInNewTab(material.downloadUrl)} 
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
                        onClick={() => openMaterialInNewTab(material.downloadUrl)} 
                        className="rounded-lg px-5 py-3 shadow-md bg-gradient-to-r from-purple-400 to-indigo-500 hover:from-purple-500 hover:to-indigo-600 text-white font-semibold transition duration-300"
                        data-testid={`read-online-${material.id}`}
                      >
                        <Bookmark size={20} className="mr-2" /> Baca Online
                      </Button>
                       <Button 
                        variant="outline"
                        onClick={() => openMaterialInNewTab(material.downloadUrl)} 
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

        {/* Games Section */}
        <section 
          className={cn("mb-12", activeSection !== "games" && "hidden")}
          data-testid="games-section"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              🎮 Tools Interaktif & Games Edukasi
            </h3>
            <Button variant="link" className="text-lg text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1">
              Lihat Semua <Globe size={18} />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {externalGames.map((game) => (
              <Card key={game.id} className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-500 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">{game.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400">
                          {game.title}
                        </h4>
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs font-semibold">
                          {game.type}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                        {game.description}
                      </p>
                      <Button 
                        onClick={() => openGameExternal(game.url)}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl shadow-lg transform hover:scale-105 transition duration-300"
                        data-testid={`play-game-${game.id}`}
                      >
                        <Gamepad2 size={20} className="mr-2" />
                        Mainkan Sekarang
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Blog Section */}
        <section 
          className={cn("mb-12", activeSection !== "blog" && "hidden")}
          data-testid="blog-section"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              📝 Artikel & Blog Kesehatan Mental
            </h3>
            <Button variant="link" className="text-lg text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1">
              Lihat Semua <ExternalLink size={18} />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogArticles.map((article) => (
              <Card key={article.id} className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-purple-500 cursor-pointer group overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-xs font-semibold">
                      {article.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <span>Oleh {article.author}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">{article.date}</span>
                    <Button 
                      onClick={() => openBlogArticle(article)}
                      className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transform hover:scale-105 transition duration-300"
                      data-testid={`read-article-${article.id}`}
                    >
                      Baca Selengkapnya
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Assessment Section */}
        <section 
          className={cn("mb-12", activeSection !== "assessments" && "hidden")}
          data-testid="assessments-section"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              🔍 Informasi Assessment
            </h3>
            <Button variant="link" className="text-lg text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1">
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
                    Lihat Detail
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
                  onClick={() => window.location.href = '/assessment'} 
                  className="px-8 py-4 text-lg font-bold rounded-full shadow-xl transform hover:scale-105 transition duration-300 bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 text-white"
                >
                  Mulai Assessment
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Blog Modal */}
        {showBlogModal && selectedBlogArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-lg" onClick={closeBlogModal}>
            <div 
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-purple-500" 
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video relative overflow-hidden rounded-t-3xl">
                <img 
                  src={selectedBlogArticle.imageUrl} 
                  alt={selectedBlogArticle.title}
                  className="w-full h-full object-cover"
                />
                <Button 
                  variant="ghost" 
                  onClick={closeBlogModal} 
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white"
                >
                  <X size={28} />
                </Button>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm font-semibold">
                    {selectedBlogArticle.category}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
                  {selectedBlogArticle.title}
                </h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300 mb-6">
                  <span>Oleh {selectedBlogArticle.author}</span>
                  <span>•</span>
                  <span>{selectedBlogArticle.date}</span>
                  <span>•</span>
                  <span>{selectedBlogArticle.readTime}</span>
                </div>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
                    {selectedBlogArticle.excerpt}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                    Implementasi dalam Kehidupan Sehari-hari
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                  </p>
                </div>
              </div>
            </div>
          </div>
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
