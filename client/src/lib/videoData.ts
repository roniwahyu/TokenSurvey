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
    title: "Seri 3 Manajemen Stres Dalam Mencegah Pernikahan Muda Melalui Budaya Lokal",
    url: "https://youtu.be/_22feazq014",
    thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=180",
    duration: "15 menit",
    views: "2.1k views",
    description: "Mempelajari teknik manajemen stres yang efektif dalam konteks budaya lokal untuk mencegah pernikahan dini."
  },
  {
    id: "2",
    title: "Seri 1 Kesakralan dan Filosofi Pernikahan",
    url: "https://youtu.be/rGYAoVZxau4",
    thumbnail: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=180",
    duration: "12 menit",
    views: "1.8k views",
    description: "Memahami nilai-nilai sakral dan filosofi mendalam dalam institusi pernikahan dalam Islam."
  },
  {
    id: "3",
    title: "Eps 3 Dokter Medis",
    url: "https://youtu.be/GCN6d7A-yyk",
    thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=180",
    duration: "18 menit",
    views: "3.2k views",
    description: "Perspektif medis tentang kesehatan mental dan pentingnya intervensi profesional."
  },
  {
    id: "4",
    title: "Seri 4 Manajemen Beban Dalam Pencegahan Pernikahan Muda Melalui Budaya Lokal",
    url: "https://youtu.be/NCIZJWA-_Cw",
    thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=180",
    duration: "14 menit",
    views: "1.9k views",
    description: "Strategi mengelola beban emosional dan sosial melalui pendekatan budaya lokal."
  },
  {
    id: "5",
    title: "Eps 2 Orang Tua Episode 2",
    url: "https://youtu.be/btSo9R8vGH0",
    thumbnail: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=180",
    duration: "16 menit",
    views: "2.4k views",
    description: "Peran orang tua dalam mendukung kesehatan mental anak dan remaja."
  },
  {
    id: "6",
    title: "Cara Santri Cari Bantuan Kesehatan Jiwa",
    url: "https://youtu.be/X9tNDlCdttw",
    thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=180",
    duration: "20 menit",
    views: "4.1k views",
    description: "Panduan praktis bagi santri untuk mencari bantuan kesehatan mental yang sesuai."
  },
  {
    id: "7",
    title: "Seri 2 Perawatan Dan Pencegahan Pernikahan Muda",
    url: "https://www.youtube.com/watch?v=LJ3aJNA9ABs",
    thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=180",
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
