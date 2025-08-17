export interface MaterialData {
  id: string;
  title: string;
  size: string;
  type: string;
  downloadUrl: string;
  url?: string;
  description?: string;
  category?: string;
}

export const educationalMaterials: MaterialData[] = [
  {
    id: "1",
    title: "Panduan Kesehatan Mental untuk Santri",
    size: "2.4 MB",
    type: "PDF",
    downloadUrl: "https://example.com/panduan-kesehatan-mental-santri.pdf",
    description: "Panduan lengkap tentang menjaga kesehatan mental dalam lingkungan pesantren",
    category: "guide"
  },
  {
    id: "2",
    title: "Teknik Manajemen Stres Islami",
    size: "1.8 MB",
    type: "PDF", 
    downloadUrl: "#",
    description: "Strategi mengelola stres dengan pendekatan nilai-nilai Islam",
    category: "technique"
  },
  {
    id: "3",
    title: "Memahami Gangguan Kecemasan",
    size: "3.1 MB",
    type: "PDF",
    downloadUrl: "#",
    description: "Informasi mendalam tentang jenis-jenis gangguan kecemasan dan cara mengatasinya",
    category: "education"
  },
  {
    id: "4",
    title: "Panduan Self-Care untuk Santri",
    size: "2.0 MB", 
    type: "PDF",
    downloadUrl: "#",
    description: "Tips perawatan diri yang sesuai dengan nilai-nilai pesantren",
    category: "self-care"
  },
  {
    id: "5",
    title: "Mengatasi Depresi dengan Pendekatan Holistik",
    size: "2.7 MB",
    type: "PDF",
    downloadUrl: "#",
    description: "Pendekatan menyeluruh dalam mengatasi gejala depresi",
    category: "treatment"
  },
  {
    id: "6",
    title: "Komunikasi Efektif untuk Kesehatan Mental",
    size: "1.5 MB",
    type: "PDF", 
    downloadUrl: "#",
    description: "Cara berkomunikasi yang mendukung kesehatan mental diri dan orang lain",
    category: "communication"
  }
];

export const getMaterialById = (id: string): MaterialData | undefined => {
  return educationalMaterials.find(material => material.id === id);
};

export const getMaterialsByCategory = (category: string): MaterialData[] => {
  return educationalMaterials.filter(material => material.category === category);
};
