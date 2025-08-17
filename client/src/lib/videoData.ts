export interface VideoData {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  duration: string;
  views: string;
  description?: string;
}

export const educationalVideos: VideoData[] = [
  {
    id: "1",
    title: "Seri 1 Pengenalan Assessment Kesehatan Mental untuk Santri",
    url: "https://youtu.be/Z0MgOOZYnpc",
    thumbnail: "https://images.unsplash.com/photo-1564769625905-50e93615e769?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=180",
    duration: "12 menit",
    views: "3.2k views",
    description: "Pengenalan dasar tentang pentingnya assessment kesehatan mental untuk santri dalam lingkungan pesantren."
  },
  {
    id: "2",
    title: "Eps 1 Pentingnya Memahami Kesehatan Mental di Pesantren",
    url: "https://youtu.be/QJKn7Fvyiv0",
    thumbnail: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=180",
    duration: "18 menit",
    views: "5.7k views",
    description: "Memahami mengapa kesehatan mental penting bagi santri dan bagaimana pesantren dapat mendukung kesejahteraan psikologis."
  },
  {
    id: "3",
    title: "Seri 3 Cara Mengelola Stres dan Kecemasan",
    url: "https://youtu.be/PQJS3CgBMBM",
    thumbnail: "https://images.unsplash.com/photo-1564769625905-50e93615e769?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=180",
    duration: "22 menit",
    views: "4.8k views",
    description: "Teknik-teknik praktis untuk mengelola stres dan kecemasan yang sering dialami santri."
  },
  {
    id: "4",
    title: "Seri 4 Manajemen Beban Dalam Pencegahan Pernikahan Muda Melalui Budaya Lokal",
    url: "https://youtu.be/NCIZJWA-_Cw",
    thumbnail: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=180",
    duration: "14 menit",
    views: "1.9k views",
    description: "Strategi mengelola beban emosional dan sosial melalui pendekatan budaya lokal."
  },
  {
    id: "5",
    title: "Eps 2 Orang Tua Episode 2",
    url: "https://youtu.be/btSo9R8vGH0",
    thumbnail: "https://images.unsplash.com/photo-1564769625905-50e93615e769?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=180",
    duration: "16 menit",
    views: "2.4k views",
    description: "Peran orang tua dalam mendukung kesehatan mental anak dan remaja."
  },
  {
    id: "6",
    title: "Cara Santri Cari Bantuan Kesehatan Jiwa",
    url: "https://youtu.be/X9tNDlCdttw",
    thumbnail: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=180",
    duration: "20 menit",
    views: "4.1k views",
    description: "Panduan praktis bagi santri untuk mencari bantuan kesehatan mental yang sesuai."
  },
  {
    id: "7",
    title: "Seri 2 Perawatan Dan Pencegahan Pernikahan Muda",
    url: "https://www.youtube.com/watch?v=LJ3aJNA9ABs",
    thumbnail: "https://images.unsplash.com/photo-1564769625905-50e93615e769?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=180",
    duration: "13 menit",
    views: "2.7k views",
    description: "Strategi perawatan dan pencegahan pernikahan dini melalui pendidikan dan dukungan."
  }
];

export const getVideoById = (id: string): VideoData | undefined => {
  return educationalVideos.find(video => video.id === id);
};

export const extractYouTubeVideoId = (url: string): string | null => {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};