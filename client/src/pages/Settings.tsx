
import React, { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  ArrowLeft,
  Bell,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Shield,
  Palette,
  Globe,
  Smartphone,
  Monitor,
  Save,
  RotateCcw
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const [, setLocation] = useLocation();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  // Settings state
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [language, setLanguage] = useState("id");
  const [fontSize, setFontSize] = useState([16]);
  const [autoSave, setAutoSave] = useState(true);
  const [privacyMode, setPrivacyMode] = useState(false);

  const handleSaveSettings = () => {
    // TODO: Implement settings save to backend
    localStorage.setItem('userSettings', JSON.stringify({
      notifications,
      soundEnabled,
      language,
      fontSize: fontSize[0],
      autoSave,
      privacyMode,
      theme
    }));
    
    toast({
      title: "Pengaturan Disimpan",
      description: "Semua pengaturan telah berhasil disimpan",
    });
  };

  const handleResetSettings = () => {
    setNotifications(true);
    setSoundEnabled(true);
    setLanguage("id");
    setFontSize([16]);
    setAutoSave(true);
    setPrivacyMode(false);
    setTheme("light");
    
    toast({
      title: "Pengaturan Direset",
      description: "Semua pengaturan dikembalikan ke default",
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
            Pengaturan
          </h1>
          <div className="w-20"></div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Appearance Settings */}
        <Card className="shadow-lg border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900 dark:text-white">
              <Palette className="mr-3 text-primary" size={20} />
              Tampilan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Mode Tema
              </Label>
              <div className="flex space-x-2">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  onClick={() => setTheme("light")}
                  className="flex-1 touch-target"
                >
                  <Sun className="mr-2" size={16} />
                  Terang
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  onClick={() => setTheme("dark")}
                  className="flex-1 touch-target"
                >
                  <Moon className="mr-2" size={16} />
                  Gelap
                </Button>
                <Button
                  variant={theme === "system" ? "default" : "outline"}
                  onClick={() => setTheme("system")}
                  className="flex-1 touch-target"
                >
                  <Monitor className="mr-2" size={16} />
                  Sistem
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Ukuran Font: {fontSize[0]}px
              </Label>
              <Slider
                value={fontSize}
                onValueChange={setFontSize}
                max={24}
                min={12}
                step={1}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="shadow-lg border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900 dark:text-white">
              <Bell className="mr-3 text-primary" size={20} />
              Notifikasi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Notifikasi Push
                </Label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Terima notifikasi tentang assessment dan tips
                </p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Suara Notifikasi
                </Label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Putar suara saat menerima notifikasi
                </p>
              </div>
              <Switch
                checked={soundEnabled}
                onCheckedChange={setSoundEnabled}
              />
            </div>
          </CardContent>
        </Card>

        {/* App Settings */}
        <Card className="shadow-lg border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900 dark:text-white">
              <Smartphone className="mr-3 text-primary" size={20} />
              Aplikasi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Bahasa
              </Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id">Bahasa Indonesia</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ar">العربية</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Auto Save Progress
                </Label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Otomatis simpan progres assessment
                </p>
              </div>
              <Switch
                checked={autoSave}
                onCheckedChange={setAutoSave}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card className="shadow-lg border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900 dark:text-white">
              <Shield className="mr-3 text-primary" size={20} />
              Privasi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Mode Privasi
                </Label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Sembunyikan data sensitif di layar utama
                </p>
              </div>
              <Switch
                checked={privacyMode}
                onCheckedChange={setPrivacyMode}
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Button
            onClick={handleSaveSettings}
            className="flex-1 touch-target bg-primary"
          >
            <Save className="mr-2" size={16} />
            Simpan Pengaturan
          </Button>
          <Button
            variant="outline"
            onClick={handleResetSettings}
            className="flex-1 touch-target"
          >
            <RotateCcw className="mr-2" size={16} />
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
