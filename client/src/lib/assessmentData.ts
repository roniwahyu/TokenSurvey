export interface AssessmentQuestion {
  question: string;
  options: string[];
  category?: string;
}

export interface AssessmentType {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  duration: string;
  questionCount: number;
  icon: string;
  color: string;
  questions: AssessmentQuestion[];
  scoring: {
    type: 'likert' | 'boolean';
    range: [number, number];
    categories?: { [key: string]: { min: number; max: number; label: string } };
  };
}

export const assessmentTypes: AssessmentType[] = [
  {
    id: "dass42",
    title: "DASS-42",
    shortTitle: "DASS-42",
    description: "Depression, Anxiety, Stress Scales - Mengukur tingkat depresi, kecemasan, dan stres",
    duration: "15-20 menit",
    questionCount: 42,
    icon: "chart-line",
    color: "red",
    scoring: {
      type: 'likert',
      range: [0, 3],
      categories: {
        depression: { min: 0, max: 21, label: "Depresi" },
        anxiety: { min: 0, max: 21, label: "Kecemasan" },
        stress: { min: 0, max: 21, label: "Stres" }
      }
    },
    questions: [
      // Depression items
      { question: "Saya merasa kesulitan untuk tenang setelah sesuatu mengganggu saya", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "stress" },
      { question: "Saya menyadari mulut saya terasa kering", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "anxiety" },
      { question: "Saya seperti tidak dapat merasakan perasaan positif sama sekali", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "depression" },
      { question: "Saya mengalami kesulitan bernapas (seperti napas cepat, kehabisan napas padahal tidak melakukan aktivitas fisik)", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "anxiety" },
      { question: "Saya merasa sulit untuk memiliki inisiatif dalam melakukan sesuatu", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "depression" },
      { question: "Saya cenderung bereaksi berlebihan terhadap suatu situasi", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "stress" },
      { question: "Saya mengalami gemetaran (seperti pada tangan)", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "anxiety" },
      { question: "Saya merasa banyak menggunakan energi untuk merasa cemas", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "stress" },
      { question: "Saya khawatir dengan situasi dimana saya mungkin panik dan mempermalukan diri sendiri", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "anxiety" },
      { question: "Saya merasa tidak ada hal yang dapat saya harapkan", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "depression" },
      { question: "Saya mendapati diri saya mudah gelisah", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "stress" },
      { question: "Saya merasa sulit untuk rileks", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "stress" },
      { question: "Saya merasa sedih dan tertekan", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "depression" },
      { question: "Saya tidak sabar dengan segala hal yang menunda saya untuk menyelesaikan apa yang sedang saya lakukan", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "stress" },
      { question: "Saya merasa seperti akan pingsan", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "anxiety" },
      { question: "Saya kehilangan minat pada banyak hal", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "depression" },
      { question: "Saya merasa tidak berharga sebagai seorang manusia", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "depression" },
      { question: "Saya merasa mudah tersinggung", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "stress" },
      { question: "Saya merasakan keringat berlebihan (seperti tangan berkeringat), padahal suhu tidak panas atau tidak melakukan aktivitas fisik", options: ["Tidak Pernah", "Kadang-kadang", "Seren", "Sangat Sering"], category: "anxiety" },
      { question: "Saya merasa takut tanpa alasan yang jelas", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "anxiety" },
      { question: "Saya merasa hidup tidak bermakna", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "depression" },
      { question: "Saya merasa sulit untuk tenang", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "stress" },
      { question: "Saya mengalami kesulitan menelan", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "anxiety" },
      { question: "Saya tidak dapat menikmati hal-hal yang saya lakukan", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "depression" },
      { question: "Saya menyadari perubahan denyut jantung saya padahal saya tidak melakukan aktivitas fisik (seperti denyut jantung meningkat, jantung berdebar-debar)", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "anxiety" },
      { question: "Saya merasa putus asa dan sedih", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "depression" },
      { question: "Saya merasa mudah marah", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "stress" },
      { question: "Saya merasa hampir panik", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "anxiety" },
      { question: "Saya merasa sulit untuk tenang setelah sesuatu mengganggu saya", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "stress" },
      { question: "Saya takut bahwa saya akan terhambat oleh tugas-tugas sepele yang tidak biasa saya lakukan", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "anxiety" },
      { question: "Saya tidak antusias terhadap apapun", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "depression" },
      { question: "Saya merasa sulit untuk sabar dalam menghadapi gangguan terhadap apa yang sedang saya lakukan", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "stress" },
      { question: "Saya sedang merasa gelisah", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "anxiety" },
      { question: "Saya merasa tidak berharga", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "depression" },
      { question: "Saya tidak dapat mentoleransi gangguan-gangguan terhadap apa yang sedang saya lakukan", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "stress" },
      { question: "Saya merasa sangat ketakutan", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "anxiety" },
      { question: "Saya merasa tidak ada harapan untuk masa depan", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "depression" },
      { question: "Saya merasa hidup tidak bermakna", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "depression" },
      { question: "Saya mendapati diri saya mudah gelisah", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "stress" },
      { question: "Saya merasa khawatir mengenai situasi dimana saya mungkin panik dan mempermalukan diri sendiri", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "anxiety" },
      { question: "Saya merasa gemetar (seperti pada kaki)", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "anxiety" },
      { question: "Saya tidak mampu untuk menjadi antusias tentang apapun", options: ["Tidak Pernah", "Kadang-kadang", "Sering", "Sangat Sering"], category: "depression" }
    ]
  },
  {
    id: "gse",
    title: "GSE",
    shortTitle: "GSE",
    description: "General Self-Efficacy Scale - Mengukur keyakinan diri dalam mengatasi tantangan",
    duration: "5-8 menit",
    questionCount: 10,
    icon: "user-shield",
    color: "blue",
    scoring: {
      type: 'likert',
      range: [1, 4]
    },
    questions: [
      { question: "Saya dapat selalu mengatasi masalah yang sulit jika saya berusaha dengan cukup keras", options: ["Sangat Tidak Benar", "Hampir Tidak Benar", "Hampir Benar", "Sangat Benar"] },
      { question: "Jika seseorang menentang saya, saya dapat menemukan cara dan jalan untuk mendapatkan apa yang saya inginkan", options: ["Sangat Tidak Benar", "Hampir Tidak Benar", "Hampir Benar", "Sangat Benar"] },
      { question: "Mudah bagi saya untuk berpegang teguh pada tujuan saya dan mencapai target saya", options: ["Sangat Tidak Benar", "Hampir Tidak Benar", "Hampir Benar", "Sangat Benar"] },
      { question: "Saya yakin bahwa saya dapat menangani peristiwa yang tidak terduga dengan efisien", options: ["Sangat Tidak Benar", "Hampir Tidak Benar", "Hampir Benar", "Sangat Benar"] },
      { question: "Berkat kecerdikan saya, saya tahu bagaimana menangani situasi yang tidak terduga", options: ["Sangat Tidak Benar", "Hampir Tidak Benar", "Hampir Benar", "Sangat Benar"] },
      { question: "Saya dapat memecahkan sebagian besar masalah jika saya melakukan upaya yang diperlukan", options: ["Sangat Tidak Benar", "Hampir Tidak Benar", "Hampir Benar", "Sangat Benar"] },
      { question: "Saya dapat tetap tenang ketika menghadapi kesulitan karena saya dapat mengandalkan kemampuan mengatasi masalah", options: ["Sangat Tidak Benar", "Hampir Tidak Benar", "Hampir Benar", "Sangat Benar"] },
      { question: "Ketika saya dihadapkan dengan masalah, saya biasanya dapat menemukan beberapa solusi", options: ["Sangat Tidak Benar", "Hampir Tidak Benar", "Hampir Benar", "Sangat Benar"] },
      { question: "Jika saya sedang dalam kesulitan, saya biasanya dapat memikirkan suatu solusi", options: ["Sangat Tidak Benar", "Hampir Tidak Benar", "Hampir Benar", "Sangat Benar"] },
      { question: "Saya biasanya dapat menangani apa pun yang terjadi pada saya", options: ["Sangat Tidak Benar", "Hampir Tidak Benar", "Hampir Benar", "Sangat Benar"] }
    ]
  },
  {
    id: "mhkq",
    title: "MHKQ",
    shortTitle: "MHKQ",
    description: "Mental Health Knowledge Questionnaire - Menilai pengetahuan kesehatan mental",
    duration: "10-12 menit",
    questionCount: 15,
    icon: "book-medical",
    color: "green",
    scoring: {
      type: 'boolean',
      range: [0, 1]
    },
    questions: [
      { question: "Gangguan mental dapat disembuhkan dengan perawatan yang tepat", options: ["Benar", "Salah"] },
      { question: "Orang dengan gangguan mental berbahaya bagi masyarakat", options: ["Benar", "Salah"] },
      { question: "Stres yang berkepanjangan dapat menyebabkan masalah kesehatan mental", options: ["Benar", "Salah"] },
      { question: "Gangguan mental hanya menyerang orang yang lemah mentalnya", options: ["Benar", "Salah"] },
      { question: "Terapi psikologi efektif untuk mengatasi gangguan mental", options: ["Benar", "Salah"] },
      { question: "Orang dengan gangguan mental tidak dapat bekerja secara normal", options: ["Benar", "Salah"] },
      { question: "Dukungan keluarga dan teman penting untuk pemulihan kesehatan mental", options: ["Benar", "Salah"] },
      { question: "Gangguan mental dapat dicegah dengan gaya hidup sehat", options: ["Benar", "Salah"] },
      { question: "Obat-obatan selalu diperlukan untuk mengobati gangguan mental", options: ["Benar", "Salah"] },
      { question: "Berbicara tentang masalah mental dapat membuat kondisi menjadi lebih buruk", options: ["Benar", "Salah"] },
      { question: "Gangguan mental dapat menyerang siapa saja tanpa memandang usia atau status sosial", options: ["Benar", "Salah"] },
      { question: "Orang dengan gangguan mental dapat pulih sepenuhnya", options: ["Benar", "Salah"] },
      { question: "Stigma terhadap gangguan mental dapat menghambat seseorang untuk mencari bantuan", options: ["Benar", "Salah"] },
      { question: "Aktivitas fisik dapat membantu meningkatkan kesehatan mental", options: ["Benar", "Salah"] },
      { question: "Gangguan mental adalah tanda kelemahan karakter", options: ["Benar", "Salah"] }
    ]
  },
  {
    id: "mscs",
    title: "MSCS",
    shortTitle: "MSCS",
    description: "Multidimensional Scale of Perceived Social Support - Mengukur persepsi dukungan sosial",
    duration: "8-10 menit",
    questionCount: 12,
    icon: "users",
    color: "purple",
    scoring: {
      type: 'likert',
      range: [1, 7],
      categories: {
        family: { min: 1, max: 7, label: "Keluarga" },
        friends: { min: 1, max: 7, label: "Teman" },
        significant_other: { min: 1, max: 7, label: "Orang Terdekat" }
      }
    },
    questions: [
      { question: "Ada orang khusus yang ada saat saya membutuhkannya", options: ["Sangat Tidak Setuju", "Tidak Setuju", "Agak Tidak Setuju", "Netral", "Agak Setuju", "Setuju", "Sangat Setuju"], category: "significant_other" },
      { question: "Ada orang khusus yang berbagi kegembiraan dan kesedihan saya", options: ["Sangat Tidak Setuju", "Tidak Setuju", "Agak Tidak Setuju", "Netral", "Agak Setuju", "Setuju", "Sangat Setuju"], category: "significant_other" },
      { question: "Keluarga saya benar-benar mencoba membantu saya", options: ["Sangat Tidak Setuju", "Tidak Setuju", "Agak Tidak Setuju", "Netral", "Agak Setuju", "Setuju", "Sangat Setuju"], category: "family" },
      { question: "Saya mendapatkan dukungan emosional yang saya butuhkan dari keluarga saya", options: ["Sangat Tidak Setuju", "Tidak Setuju", "Agak Tidak Setuju", "Netral", "Agak Setuju", "Setuju", "Sangat Setuju"], category: "family" },
      { question: "Saya memiliki orang khusus yang menjadi sumber kenyamanan bagi saya", options: ["Sangat Tidak Setuju", "Tidak Setuju", "Agak Tidak Setuju", "Netral", "Agak Setuju", "Setuju", "Sangat Setuju"], category: "significant_other" },
      { question: "Teman-teman saya benar-benar mencoba membantu saya", options: ["Sangat Tidak Setuju", "Tidak Setuju", "Agak Tidak Setuju", "Netral", "Agak Setuju", "Setuju", "Sangat Setuju"], category: "friends" },
      { question: "Saya dapat mengandalkan teman-teman saya saat terjadi masalah", options: ["Sangat Tidak Setuju", "Tidak Setuju", "Agak Tidak Setuju", "Netral", "Agak Setuju", "Setuju", "Sangat Setuju"], category: "friends" },
      { question: "Saya dapat berbicara tentang masalah saya dengan keluarga saya", options: ["Sangat Tidak Setuju", "Tidak Setuju", "Agak Tidak Setuju", "Netral", "Agak Setuju", "Setuju", "Sangat Setuju"], category: "family" },
      { question: "Saya memiliki teman-teman yang berbagi kegembiraan dan kesedihan saya", options: ["Sangat Tidak Setuju", "Tidak Setuju", "Agak Tidak Setuju", "Netral", "Agak Setuju", "Setuju", "Sangat Setuju"], category: "friends" },
      { question: "Ada orang khusus dalam hidup saya yang peduli terhadap perasaan saya", options: ["Sangat Tidak Setuju", "Tidak Setuju", "Agak Tidak Setuju", "Netral", "Agak Setuju", "Setuju", "Sangat Setuju"], category: "significant_other" },
      { question: "Keluarga saya bersedia membantu saya membuat keputusan", options: ["Sangat Tidak Setuju", "Tidak Setuju", "Agak Tidak Setuju", "Netral", "Agak Setuju", "Setuju", "Sangat Setuju"], category: "family" },
      { question: "Saya dapat berbicara tentang masalah saya dengan teman-teman saya", options: ["Sangat Tidak Setuju", "Tidak Setuju", "Agak Tidak Setuju", "Netral", "Agak Setuju", "Setuju", "Sangat Setuju"], category: "friends" }
    ]
  },
  {
    id: "pdd",
    title: "PDD",
    shortTitle: "PDD",
    description: "Perceived Devaluation-Discrimination Scale - Mengukur persepsi stigma kesehatan mental",
    duration: "10-15 menit",
    questionCount: 12,
    icon: "shield-exclamation",
    color: "orange",
    scoring: {
      type: 'likert',
      range: [1, 5]
    },
    questions: [
      { question: "Kebanyakan orang akan menerima seseorang yang pernah dirawat karena gangguan mental sebagai guru anak-anak mereka", options: ["Sangat Tidak Setuju", "Tidak Setuju", "Netral", "Setuju", "Sangat Setuju"] },
      { question: "Kebanyakan orang percaya bahwa seseorang yang pernah dirawat karena gangguan mental sama tidak dapat diandalkannya dengan orang lain", options: ["Sangat Tidak Setuju", "Tidak Setuju", "Netral", "Setuju", "Sangat Setuju"] },
      { question: "Kebanyakan orang akan menerima seseorang yang pernah dirawat karena gangguan mental sebagai teman dekat", options: ["Sangat Tidak Setuju", "Tidak Setuju", "Netral", "Setuju", "Sangat Setuju"] },
      { question: "Kebanyakan orang percaya bahwa seseorang yang pernah dirawat karena gangguan mental sama pintar dengan orang pada umumnya", options: ["Sangat Tidak Setuju", "Tidak Setuju", "Netral", "Setuju", "Sangat Setuju"] },
      { question: "Kebanyakan orang akan menolak seseorang yang pernah dirawat karena gangguan mental sebagai anggota keluarga melalui pernikahan", options: ["Sangat Tidak Setuju", "Tidak Setuju", "Netral", "Setuju", "Sangat Setuju"] },
      { question: "Kebanyakan orang menganggap seseorang yang pernah dirawat karena gangguan mental sama dengan orang lain", options: ["Sangat Tidak Setuju", "Tidak Setuju", "Netral", "Setuju", "Sangat Setuju"] },
      { question: "Kebanyakan majikan akan mempekerjakan seseorang yang pernah dirawat karena gangguan mental jika dia memenuhi syarat untuk pekerjaan tersebut", options: ["Sangat Tidak Setuju", "Tidak Setuju", "Netral", "Setuju", "Sangat Setuju"] },
      { question: "Kebanyakan orang menganggap seseorang yang pernah dirawat karena gangguan mental berbahaya", options: ["Sangat Tidak Setuju", "Tidak Setuju", "Netral", "Setuju", "Sangat Setuju"] },
      { question: "Kebanyakan orang akan dengan mudah menerima seseorang yang pernah dirawat karena gangguan mental sebagai teman dekat", options: ["Sangat Tidak Setuju", "Tidak Setuju", "Netral", "Setuju", "Sangat Setuju"] },
      { question: "Kebanyakan orang percaya bahwa seseorang yang pernah dirawat karena gangguan mental akan bertindak tidak terduga", options: ["Sangat Tidak Setuju", "Tidak Setuju", "Netral", "Setuju", "Sangat Setuju"] },
      { question: "Kebanyakan orang percaya bahwa seseorang yang pernah dirawat karena gangguan mental menunjukkan penilaian yang buruk", options: ["Sangat Tidak Setuju", "Tidak Setuju", "Netral", "Setuju", "Sangat Setuju"] },
      { question: "Kebanyakan orang akan menghindar dari seseorang yang pernah dirawat karena gangguan mental", options: ["Sangat Tidak Setuju", "Tidak Setuju", "Netral", "Setuju", "Sangat Setuju"] }
    ]
  }
];

export const getAssessmentById = (id: string): AssessmentType | undefined => {
  return assessmentTypes.find(assessment => assessment.id === id);
};

export const calculateScore = (assessment: AssessmentType, answers: (number | boolean)[]): { scores: { [key: string]: number }, categories: { [key: string]: string }, interpretation: string } => {
  const { scoring, questions } = assessment;
  
  if (assessment.id === 'dass42') {
    const categoryScores = { depression: 0, anxiety: 0, stress: 0 };
    const categoryLabels = { depression: 'Normal', anxiety: 'Normal', stress: 'Normal' };
    
    questions.forEach((q, index) => {
      if (q.category && answers[index] !== undefined) {
        categoryScores[q.category as keyof typeof categoryScores] += answers[index] as number;
      }
    });
    
    // Multiply by 2 for DASS-42 scoring
    Object.keys(categoryScores).forEach(key => {
      categoryScores[key as keyof typeof categoryScores] *= 2;
    });
    
    // Determine severity levels
    const getDepressionLevel = (score: number) => {
      if (score <= 9) return 'Normal';
      if (score <= 13) return 'Ringan';
      if (score <= 20) return 'Sedang';
      if (score <= 27) return 'Berat';
      return 'Sangat Berat';
    };
    
    const getAnxietyLevel = (score: number) => {
      if (score <= 7) return 'Normal';
      if (score <= 9) return 'Ringan';
      if (score <= 14) return 'Sedang';
      if (score <= 19) return 'Berat';
      return 'Sangat Berat';
    };
    
    const getStressLevel = (score: number) => {
      if (score <= 14) return 'Normal';
      if (score <= 18) return 'Ringan';
      if (score <= 25) return 'Sedang';
      if (score <= 33) return 'Berat';
      return 'Sangat Berat';
    };
    
    categoryLabels.depression = getDepressionLevel(categoryScores.depression);
    categoryLabels.anxiety = getAnxietyLevel(categoryScores.anxiety);
    categoryLabels.stress = getStressLevel(categoryScores.stress);
    
    const interpretation = `Hasil assessment DASS-42 menunjukkan tingkat depresi: ${categoryLabels.depression}, kecemasan: ${categoryLabels.anxiety}, dan stres: ${categoryLabels.stress}. Hasil ini dapat digunakan sebagai skrining awal dan bukan diagnosis medis.`;
    
    return { scores: categoryScores, categories: categoryLabels, interpretation };
  }
  
  if (assessment.id === 'gse') {
    const totalScore = answers.reduce((sum, answer) => sum + (typeof answer === 'number' ? answer : 0), 0);
    const averageScore = totalScore / answers.length;
    
    let level = 'Rendah';
    if (averageScore >= 3.5) level = 'Tinggi';
    else if (averageScore >= 2.5) level = 'Sedang';
    
    const interpretation = `Skor GSE Anda adalah ${totalScore} dari 40 (rata-rata: ${averageScore.toFixed(2)}). Tingkat self-efficacy Anda: ${level}. Skor yang lebih tinggi menunjukkan keyakinan diri yang lebih kuat dalam mengatasi tantangan.`;
    
    return { 
      scores: { total: totalScore, average: parseFloat(averageScore.toFixed(2)) }, 
      categories: { level }, 
      interpretation 
    };
  }
  
  if (assessment.id === 'mhkq') {
    const correctAnswers = [true, false, true, false, true, false, true, true, false, false, true, true, true, true, false];
    const score = answers.reduce((sum, answer, index) => {
      return sum + (answer === correctAnswers[index] ? 1 : 0);
    }, 0);
    
    const percentage = (score / correctAnswers.length) * 100;
    let level = 'Rendah';
    if (percentage >= 80) level = 'Tinggi';
    else if (percentage >= 60) level = 'Sedang';
    
    const interpretation = `Skor pengetahuan kesehatan mental Anda adalah ${score} dari ${correctAnswers.length} (${percentage.toFixed(1)}%). Tingkat pengetahuan: ${level}. Skor yang lebih tinggi menunjukkan pemahaman yang lebih baik tentang kesehatan mental.`;
    
    return { 
      scores: { correct: score, total: correctAnswers.length, percentage: parseFloat(percentage.toFixed(1)) }, 
      categories: { level }, 
      interpretation 
    };
  }
  
  if (assessment.id === 'mscs') {
    const categoryScores = { family: 0, friends: 0, significant_other: 0 };
    const categoryCount = { family: 0, friends: 0, significant_other: 0 };
    
    questions.forEach((q, index) => {
      if (q.category && answers[index] !== undefined) {
        const category = q.category as keyof typeof categoryScores;
        const score = typeof answers[index] === 'number' ? answers[index] as number : 0;
        categoryScores[category] += score;
        categoryCount[category]++;
      }
    });
    
    const categoryAverages = {
      family: categoryScores.family / categoryCount.family,
      friends: categoryScores.friends / categoryCount.friends,
      significant_other: categoryScores.significant_other / categoryCount.significant_other
    };
    
    const totalAverage = (categoryAverages.family + categoryAverages.friends + categoryAverages.significant_other) / 3;
    
    let level = 'Rendah';
    if (totalAverage >= 5.5) level = 'Tinggi';
    else if (totalAverage >= 4) level = 'Sedang';
    
    const interpretation = `Skor dukungan sosial Anda: Keluarga (${categoryAverages.family.toFixed(2)}), Teman (${categoryAverages.friends.toFixed(2)}), Orang Terdekat (${categoryAverages.significant_other.toFixed(2)}). Rata-rata keseluruhan: ${totalAverage.toFixed(2)}. Tingkat dukungan sosial: ${level}.`;
    
    return { 
      scores: { 
        ...categoryScores, 
        ...categoryAverages, 
        totalAverage: parseFloat(totalAverage.toFixed(2)) 
      }, 
      categories: { level }, 
      interpretation 
    };
  }
  
  if (assessment.id === 'pdd') {
    // Reverse score for positive items (items 1, 3, 4, 6, 7, 9)
    const reverseItems = [0, 2, 3, 5, 6, 8];
    const totalScore = answers.reduce((sum, answer, index) => {
      const score = typeof answer === 'number' ? answer : 0;
      return sum + (reverseItems.includes(index) ? (6 - score) : score);
    }, 0);
    
    const averageScore = totalScore / answers.length;
    
    let level = 'Rendah';
    if (averageScore >= 4) level = 'Tinggi';
    else if (averageScore >= 3) level = 'Sedang';
    
    const interpretation = `Skor persepsi stigma Anda adalah ${totalScore} dari 60 (rata-rata: ${averageScore.toFixed(2)}). Tingkat persepsi stigma: ${level}. Skor yang lebih tinggi mengindikasikan persepsi stigma yang lebih kuat terhadap gangguan kesehatan mental.`;
    
    return { 
      scores: { total: totalScore, average: parseFloat(averageScore.toFixed(2)) }, 
      categories: { level }, 
      interpretation 
    };
  }
  
  // Default return
  return { scores: {}, categories: {}, interpretation: 'Assessment completed.' };
};
