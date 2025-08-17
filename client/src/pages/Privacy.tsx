
import React, { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Shield,
  Lock,
  Eye,
  EyeOff,
  Key,
  Download,
  Trash2,
  AlertTriangle,
  CheckCircle,
  FileText,
  UserX,
  Database
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Privacy() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Privacy settings state
  const [dataSharing, setDataSharing] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [crashReports, setCrashReports] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState("private");
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  // Password change state
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Password baru dan konfirmasi tidak cocok",
        variant: "destructive"
      });
      return;
    }

    if (newPassword.length < 8) {
      toast({
        title: "Error", 
        description: "Password harus minimal 8 karakter",
        variant: "destructive"
      });
      return;
    }

    // TODO: Implement password change API call
    toast({
      title: "Password Berhasil Diubah",
      description: "Password Anda telah berhasil diperbarui",
    });

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowPasswordForm(false);
  };

  const handleExportData = () => {
    // TODO: Implement data export functionality
    toast({
      title: "Export Data Dimulai",
      description: "Data Anda sedang dipersiapkan untuk di-download",
    });
  };

  const handleDeleteAccount = () => {
    // TODO: Implement account deletion with confirmation
    toast({
      title: "Konfirmasi Diperlukan",
      description: "Silakan hubungi support untuk menghapus akun",
      variant: "destructive"
    });
  };

  const handleClearData = () => {
    // TODO: Implement data clearing functionality
    toast({
      title: "Data Assessment Dihapus",
      description: "Semua data assessment lokal telah dibersihkan",
    });
  };

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
            Privasi & Keamanan
          </h1>
          <div className="w-20"></div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Security Overview */}
        <Card className="shadow-lg border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-green-600 dark:text-green-400" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Akun Aman
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Keamanan akun Anda dalam kondisi baik
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Secure
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Account Security */}
        <Card className="shadow-lg border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900 dark:text-white">
              <Lock className="mr-3 text-primary" size={20} />
              Keamanan Akun
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Change Password */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Ubah Password
                  </Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Perbarui password untuk keamanan yang lebih baik
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowPasswordForm(!showPasswordForm)}
                  className="touch-target"
                >
                  <Key className="mr-2" size={16} />
                  {showPasswordForm ? "Batal" : "Ubah"}
                </Button>
              </div>

              {showPasswordForm && (
                <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="relative">
                    <Input
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="Password saat ini"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </div>

                  <div className="relative">
                    <Input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Password baru"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </div>

                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Konfirmasi password baru"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </div>

                  <Button
                    onClick={handleChangePassword}
                    className="w-full touch-target"
                    disabled={!currentPassword || !newPassword || !confirmPassword}
                  >
                    Simpan Password Baru
                  </Button>
                </div>
              )}
            </div>

            {/* Two Factor Authentication */}
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Autentikasi 2 Faktor
                </Label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Tambahkan lapisan keamanan ekstra
                </p>
              </div>
              <Switch
                checked={twoFactorAuth}
                onCheckedChange={setTwoFactorAuth}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card className="shadow-lg border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900 dark:text-white">
              <Shield className="mr-3 text-primary" size={20} />
              Pengaturan Privasi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Berbagi Data Anonim
                </Label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Bantu perbaikan aplikasi dengan data anonim
                </p>
              </div>
              <Switch
                checked={dataSharing}
                onCheckedChange={setDataSharing}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Analytics & Insights
                </Label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Kumpulkan data penggunaan untuk insights
                </p>
              </div>
              <Switch
                checked={analytics}
                onCheckedChange={setAnalytics}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Laporan Crash
                </Label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Kirim laporan otomatis saat aplikasi error
                </p>
              </div>
              <Switch
                checked={crashReports}
                onCheckedChange={setCrashReports}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Marketing
                </Label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Terima tips dan update via email
                </p>
              </div>
              <Switch
                checked={marketingEmails}
                onCheckedChange={setMarketingEmails}
              />
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="shadow-lg border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900 dark:text-white">
              <Database className="mr-3 text-primary" size={20} />
              Manajemen Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              onClick={handleExportData}
              className="w-full touch-target"
            >
              <Download className="mr-2" size={16} />
              Export Data Saya
            </Button>

            <Button
              variant="outline"
              onClick={handleClearData}
              className="w-full touch-target"
            >
              <Trash2 className="mr-2" size={16} />
              Hapus Data Assessment
            </Button>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2 mb-3">
                <AlertTriangle className="text-red-500" size={20} />
                <span className="text-sm font-medium text-red-600 dark:text-red-400">
                  Zona Bahaya
                </span>
              </div>

              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                className="w-full touch-target"
              >
                <UserX className="mr-2" size={16} />
                Hapus Akun Permanen
              </Button>

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                Tindakan ini tidak dapat dibatalkan
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Policy */}
        <Card className="shadow-lg border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <CardContent className="p-4">
            <Button
              variant="ghost"
              onClick={() => window.open("/privacy-policy", "_blank")}
              className="w-full touch-target"
            >
              <FileText className="mr-2" size={16} />
              Baca Kebijakan Privasi
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
