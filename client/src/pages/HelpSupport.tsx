
import React, { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  ArrowLeft,
  HelpCircle,
  MessageCircle,
  Mail,
  Phone,
  Send,
  Search,
  BookOpen,
  Video,
  FileText,
  ExternalLink,
  Star,
  MessageSquare,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export default function HelpSupport() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const faqData: FAQItem[] = [
    {
      id: "1",
      question: "Apa itu TOKEN PEDIA?",
      answer: "TOKEN PEDIA adalah platform kesehatan mental yang dirancang khusus untuk santri dan komunitas pesantren. Aplikasi ini menyediakan assessment psikologi, edukasi, dan dukungan kesehatan mental dengan pendekatan Islami.",
      category: "umum"
    },
    {
      id: "2",
      question: "Bagaimana cara melakukan assessment?",
      answer: "Untuk melakukan assessment, klik tombol 'Assessment' di menu bawah, pilih jenis assessment yang ingin Anda lakukan (PHQ-9, GAD-7, DASS-21, PSS-10, atau SWLS), lalu ikuti instruksi yang diberikan. Assessment dapat disimpan dan dilanjutkan di lain waktu.",
      category: "assessment"
    },
    {
      id: "3",
      question: "Apakah data saya aman?",
      answer: "Ya, keamanan data Anda adalah prioritas kami. Semua data disimpan dengan enkripsi tingkat tinggi dan tidak dibagikan kepada pihak ketiga tanpa persetujuan Anda. Anda dapat mengatur privasi di halaman Pengaturan.",
      category: "privasi"
    },
    {
      id: "4",
      question: "Berapa lama waktu yang dibutuhkan untuk assessment?",
      answer: "Waktu assessment bervariasi: PHQ-9 (5-7 menit), GAD-7 (3-5 menit), DASS-21 (8-10 menit), PSS-10 (5-7 menit), dan SWLS (3-5 menit). Anda dapat menjeda dan melanjutkan kapan saja.",
      category: "assessment"
    },
    {
      id: "5",
      question: "Bagaimana cara melihat hasil assessment?",
      answer: "Setelah menyelesaikan assessment, Anda dapat melihat hasilnya di halaman 'Riwayat' melalui menu Profile. Hasil disertai dengan interpretasi dan rekomendasi sesuai kondisi Anda.",
      category: "hasil"
    },
    {
      id: "6",
      question: "Apakah aplikasi ini gratis?",
      answer: "Ya, TOKEN PEDIA sepenuhnya gratis untuk digunakan oleh santri dan komunitas pesantren. Semua fitur assessment, edukasi, dan dukungan tersedia tanpa biaya.",
      category: "umum"
    },
    {
      id: "7",
      question: "Bagaimana jika saya butuh bantuan profesional?",
      answer: "Jika hasil assessment menunjukkan kondisi yang memerlukan perhatian khusus, aplikasi akan memberikan rekomendasi untuk berkonsultasi dengan tenaga profesional. Kami juga menyediakan kontak helpline untuk dukungan darurat.",
      category: "bantuan"
    },
    {
      id: "8",
      question: "Bisakah saya mengulang assessment?",
      answer: "Ya, Anda dapat mengulang assessment kapan saja. Disarankan untuk melakukan assessment secara berkala (mingguan atau bulanan) untuk memantau perkembangan kesehatan mental Anda.",
      category: "assessment"
    }
  ];

  const filteredFAQ = faqData.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactSubmit = () => {
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast({
        title: "Form Tidak Lengkap",
        description: "Mohon lengkapi semua field yang diperlukan",
        variant: "destructive"
      });
      return;
    }

    // TODO: Implement contact form submission
    toast({
      title: "Pesan Terkirim",
      description: "Tim support akan merespons dalam 24 jam",
    });

    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  const quickActions = [
    {
      title: "Panduan Pengguna",
      description: "Pelajari cara menggunakan semua fitur",
      icon: <BookOpen className="text-blue-500" size={24} />,
      action: () => setLocation("/guide")
    },
    {
      title: "Tutorial Video",
      description: "Tonton video panduan step-by-step",
      icon: <Video className="text-red-500" size={24} />,
      action: () => window.open("https://youtube.com/@tokenpedia", "_blank")
    },
    {
      title: "Dokumentasi",
      description: "Dokumentasi lengkap untuk developer",
      icon: <FileText className="text-green-500" size={24} />,
      action: () => window.open("/docs", "_blank")
    },
    {
      title: "Komunitas",
      description: "Bergabung dengan komunitas pengguna",
      icon: <MessageSquare className="text-purple-500" size={24} />,
      action: () => window.open("https://discord.gg/tokenpedia", "_blank")
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-black">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => setLocation("/profile")}
            className="touch-target"
          >
            <ArrowLeft size={20} className="mr-2" />
            Kembali
          </Button>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            Bantuan & Dukungan
          </h1>
          <div className="w-20"></div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Emergency Contact */}
        <Card className="shadow-lg border-0 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-red-200 dark:border-red-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                <Phone className="text-red-600 dark:text-red-400" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-red-800 dark:text-red-200">
                  Butuh Bantuan Darurat?
                </h3>
                <p className="text-sm text-red-700 dark:text-red-300">
                  Hubungi hotline kesehatan mental 24/7
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => window.open("tel:119", "_self")}
                className="border-red-300 text-red-700 hover:bg-red-100 touch-target"
              >
                Call 119
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <Card
              key={index}
              className="shadow-lg border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm cursor-pointer hover:shadow-xl transition-all duration-200"
              onClick={action.action}
            >
              <CardContent className="p-4 text-center">
                <div className="mb-3 flex justify-center">
                  {action.icon}
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                  {action.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {action.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search FAQ */}
        <Card className="shadow-lg border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Cari pertanyaan atau topik..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="shadow-lg border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900 dark:text-white">
              <HelpCircle className="mr-3 text-primary" size={20} />
              Pertanyaan yang Sering Diajukan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="space-y-2">
              {filteredFAQ.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {filteredFAQ.length === 0 && (
              <div className="text-center py-8">
                <HelpCircle className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-gray-500 dark:text-gray-400">
                  Tidak ditemukan FAQ yang sesuai dengan pencarian Anda
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card className="shadow-lg border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900 dark:text-white">
              <MessageCircle className="mr-3 text-primary" size={20} />
              Hubungi Kami
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Nama Lengkap"
                value={contactForm.name}
                onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
              />
              <Input
                type="email"
                placeholder="Email"
                value={contactForm.email}
                onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>

            <Input
              placeholder="Subjek (Opsional)"
              value={contactForm.subject}
              onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
            />

            <Textarea
              placeholder="Deskripsikan masalah atau pertanyaan Anda..."
              rows={4}
              value={contactForm.message}
              onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
            />

            <Button
              onClick={handleContactSubmit}
              className="w-full touch-target"
            >
              <Send className="mr-2" size={16} />
              Kirim Pesan
            </Button>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="shadow-lg border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">
              Informasi Kontak
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="text-primary" size={20} />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Email</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">support@tokenpedia.id</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MessageCircle className="text-green-500" size={20} />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">WhatsApp</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">+62 812-3456-7890</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Clock className="text-blue-500" size={20} />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Jam Operasional</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Senin - Jumat, 08:00 - 17:00 WIB</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rating */}
        <Card className="shadow-lg border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Apakah halaman ini membantu?
            </h4>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Button
                  key={star}
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    toast({
                      title: "Terima Kasih!",
                      description: "Feedback Anda membantu kami berkembang",
                    });
                  }}
                  className="touch-target"
                >
                  <Star className="text-yellow-400" size={20} />
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
