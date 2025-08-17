// Assessment scoring and interpretation logic
import { assessmentTypes } from "./assessmentData";

export interface AssessmentScore {
  totalScore: number;
  subscales?: { [key: string]: number };
  interpretation: string;
  severity: 'Normal' | 'Mild' | 'Moderate' | 'Severe' | 'Extremely Severe';
  recommendations: string[];
}

// DASS-42 Scoring Logic
export function calculateDASSScore(answers: { [key: string]: number }): AssessmentScore {
  const depressionItems = [3, 5, 10, 13, 16, 17, 21, 24, 26, 31, 34, 37, 38, 42];
  const anxietyItems = [2, 4, 7, 9, 15, 19, 20, 23, 25, 28, 30, 36, 40, 41];
  const stressItems = [1, 6, 8, 11, 12, 14, 18, 22, 27, 29, 32, 33, 35, 39];

  const depressionScore = depressionItems.reduce((sum, item) => sum + (answers[item] || 0), 0) * 2;
  const anxietyScore = anxietyItems.reduce((sum, item) => sum + (answers[item] || 0), 0) * 2;
  const stressScore = stressItems.reduce((sum, item) => sum + (answers[item] || 0), 0) * 2;

  const totalScore = depressionScore + anxietyScore + stressScore;

  // Determine severity based on highest subscale score
  const maxScore = Math.max(depressionScore, anxietyScore, stressScore);
  let severity: AssessmentScore['severity'] = 'Normal';
  
  if (maxScore >= 37) severity = 'Extremely Severe';
  else if (maxScore >= 26) severity = 'Severe';
  else if (maxScore >= 15) severity = 'Moderate';
  else if (maxScore >= 10) severity = 'Mild';

  const interpretation = `
    Skor Depresi: ${depressionScore} (${getDASSCategory(depressionScore, 'depression')})
    Skor Kecemasan: ${anxietyScore} (${getDASSCategory(anxietyScore, 'anxiety')})
    Skor Stress: ${stressScore} (${getDASSCategory(stressScore, 'stress')})
    
    Tingkat keseluruhan: ${severity}
  `;

  const recommendations = generateDASSRecommendations(severity, depressionScore, anxietyScore, stressScore);

  return {
    totalScore,
    subscales: { depression: depressionScore, anxiety: anxietyScore, stress: stressScore },
    interpretation,
    severity,
    recommendations
  };
}

function getDASSCategory(score: number, type: string): string {
  if (type === 'depression') {
    if (score >= 28) return 'Extremely Severe';
    if (score >= 21) return 'Severe';
    if (score >= 14) return 'Moderate';
    if (score >= 10) return 'Mild';
    return 'Normal';
  } else if (type === 'anxiety') {
    if (score >= 20) return 'Extremely Severe';
    if (score >= 15) return 'Severe';
    if (score >= 10) return 'Moderate';
    if (score >= 8) return 'Mild';
    return 'Normal';
  } else { // stress
    if (score >= 34) return 'Extremely Severe';
    if (score >= 26) return 'Severe';
    if (score >= 19) return 'Moderate';
    if (score >= 15) return 'Mild';
    return 'Normal';
  }
}

// GSE Scoring Logic
export function calculateGSEScore(answers: { [key: string]: number }): AssessmentScore {
  const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
  
  let severity: AssessmentScore['severity'] = 'Normal';
  let interpretation = '';
  
  if (totalScore >= 32) {
    severity = 'Normal';
    interpretation = 'Tingkat self-efficacy tinggi. Anda memiliki keyakinan yang kuat terhadap kemampuan diri dalam mengatasi berbagai situasi.';
  } else if (totalScore >= 26) {
    severity = 'Mild';
    interpretation = 'Tingkat self-efficacy sedang-tinggi. Anda cukup yakin dengan kemampuan diri Anda.';
  } else if (totalScore >= 20) {
    severity = 'Moderate';
    interpretation = 'Tingkat self-efficacy sedang. Ada ruang untuk meningkatkan keyakinan diri Anda.';
  } else {
    severity = 'Severe';
    interpretation = 'Tingkat self-efficacy rendah. Penting untuk membangun keyakinan diri Anda.';
  }

  const recommendations = generateGSERecommendations(severity, totalScore);

  return {
    totalScore,
    interpretation,
    severity,
    recommendations
  };
}

// MHKQ Scoring Logic
export function calculateMHKQScore(answers: { [key: string]: number }): AssessmentScore {
  const correctAnswers = {
    1: 1, 2: 1, 3: 0, 4: 1, 5: 0, 6: 1, 7: 1, 8: 0, 9: 1, 10: 1,
    11: 0, 12: 1, 13: 1, 14: 0, 15: 1, 16: 1, 17: 0, 18: 1, 19: 1, 20: 0
  };

  let correctCount = 0;
  Object.entries(correctAnswers).forEach(([key, correctAnswer]) => {
    if (answers[key] === correctAnswer) correctCount++;
  });

  const totalScore = (correctCount / 20) * 100;
  
  let severity: AssessmentScore['severity'] = 'Normal';
  let interpretation = '';

  if (totalScore >= 80) {
    severity = 'Normal';
    interpretation = 'Pengetahuan kesehatan mental sangat baik. Anda memiliki pemahaman yang komprehensif tentang kesehatan mental.';
  } else if (totalScore >= 60) {
    severity = 'Mild';
    interpretation = 'Pengetahuan kesehatan mental baik. Masih ada beberapa area yang bisa dipelajari lebih lanjut.';
  } else if (totalScore >= 40) {
    severity = 'Moderate';
    interpretation = 'Pengetahuan kesehatan mental cukup. Disarankan untuk mempelajari lebih banyak tentang kesehatan mental.';
  } else {
    severity = 'Severe';
    interpretation = 'Pengetahuan kesehatan mental perlu ditingkatkan. Sangat disarankan untuk mencari sumber edukasi yang tepat.';
  }

  const recommendations = generateMHKQRecommendations(severity, totalScore);

  return {
    totalScore,
    interpretation: `Skor: ${correctCount}/20 (${totalScore.toFixed(1)}%)\n${interpretation}`,
    severity,
    recommendations
  };
}

// MSCS Scoring Logic
export function calculateMSCSScore(answers: { [key: string]: number }): AssessmentScore {
  const familyItems = [3, 4, 8, 11];
  const friendsItems = [6, 7, 9, 12];
  const significantOtherItems = [1, 2, 5, 10];

  const familyScore = familyItems.reduce((sum, item) => sum + (answers[item] || 1), 0);
  const friendsScore = friendsItems.reduce((sum, item) => sum + (answers[item] || 1), 0);
  const significantOtherScore = significantOtherItems.reduce((sum, item) => sum + (answers[item] || 1), 0);
  
  const totalScore = familyScore + friendsScore + significantOtherScore;
  
  let severity: AssessmentScore['severity'] = 'Normal';
  let interpretation = '';

  if (totalScore >= 60) {
    severity = 'Normal';
    interpretation = 'Dukungan sosial sangat baik. Anda memiliki sistem dukungan yang kuat dari berbagai sumber.';
  } else if (totalScore >= 48) {
    severity = 'Mild';
    interpretation = 'Dukungan sosial baik. Anda memiliki dukungan yang cukup dari lingkungan sekitar.';
  } else if (totalScore >= 36) {
    severity = 'Moderate';
    interpretation = 'Dukungan sosial sedang. Ada beberapa area dukungan yang bisa diperkuat.';
  } else {
    severity = 'Severe';
    interpretation = 'Dukungan sosial rendah. Penting untuk membangun jaringan dukungan yang lebih kuat.';
  }

  const recommendations = generateMSCSRecommendations(severity, familyScore, friendsScore, significantOtherScore);

  return {
    totalScore,
    subscales: { family: familyScore, friends: friendsScore, significantOther: significantOtherScore },
    interpretation: `
      Dukungan Keluarga: ${familyScore}/28
      Dukungan Teman: ${friendsScore}/28  
      Dukungan Orang Penting: ${significantOtherScore}/28
      Total: ${totalScore}/84
      
      ${interpretation}
    `,
    severity,
    recommendations
  };
}

// PDD Scoring Logic
export function calculatePDDScore(answers: { [key: string]: number }): AssessmentScore {
  const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
  
  let severity: AssessmentScore['severity'] = 'Normal';
  let interpretation = '';

  if (totalScore >= 15) {
    severity = 'Severe';
    interpretation = 'Menunjukkan tanda-tanda signifikan gangguan mood persisten. Sangat disarankan untuk konsultasi dengan profesional kesehatan mental.';
  } else if (totalScore >= 10) {
    severity = 'Moderate';
    interpretation = 'Menunjukkan beberapa gejala gangguan mood yang perlu diperhatikan.';
  } else if (totalScore >= 5) {
    severity = 'Mild';
    interpretation = 'Menunjukkan gejala ringan yang sebaiknya dipantau.';
  } else {
    severity = 'Normal';
    interpretation = 'Tidak menunjukkan tanda-tanda signifikan gangguan mood persisten.';
  }

  const recommendations = generatePDDRecommendations(severity, totalScore);

  return {
    totalScore,
    interpretation,
    severity,
    recommendations
  };
}

// Recommendation generators
function generateDASSRecommendations(severity: string, depression: number, anxiety: number, stress: number): string[] {
  const recommendations = [];
  
  if (severity === 'Normal') {
    recommendations.push('Pertahankan keseimbangan hidup yang sehat');
    recommendations.push('Lanjutkan aktivitas yang mendukung kesejahteraan mental');
  } else {
    recommendations.push('Konsultasi dengan psikolog atau konselor');
    recommendations.push('Praktikkan teknik relaksasi dan mindfulness');
    recommendations.push('Jaga pola tidur dan olahraga teratur');
    
    if (depression > anxiety && depression > stress) {
      recommendations.push('Fokus pada aktivitas yang meningkatkan mood positif');
    } else if (anxiety > depression && anxiety > stress) {
      recommendations.push('Pelajari teknik manajemen kecemasan');
    } else if (stress > depression && stress > anxiety) {
      recommendations.push('Identifikasi dan kelola sumber stress');
    }
  }
  
  return recommendations;
}

function generateGSERecommendations(severity: string, score: number): string[] {
  const recommendations = [];
  
  if (severity === 'Normal') {
    recommendations.push('Pertahankan keyakinan diri yang baik');
    recommendations.push('Berbagi pengalaman positif dengan orang lain');
  } else {
    recommendations.push('Tetapkan tujuan kecil yang dapat dicapai');
    recommendations.push('Rayakan pencapaian sekecil apapun');
    recommendations.push('Cari dukungan dari orang-orang terdekat');
    recommendations.push('Praktikkan self-talk yang positif');
  }
  
  return recommendations;
}

function generateMHKQRecommendations(severity: string, score: number): string[] {
  const recommendations = [];
  
  if (severity === 'Normal') {
    recommendations.push('Terus update pengetahuan kesehatan mental');
    recommendations.push('Berbagi informasi dengan orang lain');
  } else {
    recommendations.push('Pelajari lebih banyak tentang kesehatan mental');
    recommendations.push('Ikuti workshop atau seminar kesehatan mental');
    recommendations.push('Baca buku atau artikel terpercaya');
    recommendations.push('Konsultasi dengan profesional untuk informasi akurat');
  }
  
  return recommendations;
}

function generateMSCSRecommendations(severity: string, family: number, friends: number, significantOther: number): string[] {
  const recommendations = [];
  
  if (severity === 'Normal') {
    recommendations.push('Pertahankan hubungan sosial yang baik');
    recommendations.push('Apresiasi dukungan yang ada');
  } else {
    recommendations.push('Bangun komunikasi yang lebih terbuka');
    recommendations.push('Cari komunitas atau kelompok yang sesuai');
    recommendations.push('Investasikan waktu untuk hubungan yang bermakna');
    
    if (family < friends && family < significantOther) {
      recommendations.push('Perkuat hubungan dengan keluarga');
    } else if (friends < family && friends < significantOther) {
      recommendations.push('Bangun pertemanan yang lebih solid');
    } else if (significantOther < family && significantOther < friends) {
      recommendations.push('Komunikasikan kebutuhan dengan orang terdekat');
    }
  }
  
  return recommendations;
}

function generatePDDRecommendations(severity: string, score: number): string[] {
  const recommendations = [];
  
  if (severity === 'Normal') {
    recommendations.push('Pertahankan rutinitas yang sehat');
    recommendations.push('Monitor perubahan mood secara berkala');
  } else {
    recommendations.push('Konsultasi dengan psikiater atau psikolog');
    recommendations.push('Pertimbangkan terapi kognitif behavioral');
    recommendations.push('Jaga rutinitas harian yang terstruktur');
    recommendations.push('Monitor gejala secara berkala');
    
    if (severity === 'Severe') {
      recommendations.push('Segera cari bantuan profesional');
      recommendations.push('Informasikan kondisi kepada keluarga terdekat');
    }
  }
  
  return recommendations;
}

// Main calculation function
export function calculateAssessmentScore(type: string, answers: { [key: string]: number }): AssessmentScore {
  switch (type) {
    case 'dass42':
      return calculateDASSScore(answers);
    case 'gse':
      return calculateGSEScore(answers);
    case 'mhkq':
      return calculateMHKQScore(answers);
    case 'mscs':
      return calculateMSCSScore(answers);
    case 'pdd':
      return calculatePDDScore(answers);
    default:
      throw new Error(`Unknown assessment type: ${type}`);
  }
}