import React from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  Edit3,
  Award,
  Calendar,
  Settings,
  ChevronRight,
  BarChart3,
  Clock,
  Download,
  Share2
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock user ID for demo purposes
const MOCK_USER_ID = "demo-user";

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onClick: () => void;
  variant?: "default" | "danger";
}

function MenuItem({ icon, title, subtitle, onClick, variant = "default" }: MenuItemProps) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between p-4 rounded-2xl shadow-sm border transition-all duration-200 h-auto touch-target",
        variant === "default"
          ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-md hover:border-primary/20"
          : "bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-800"
      )}
      data-testid={`menu-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="flex items-center space-x-3">
        <div className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center",
          variant === "default"
            ? "bg-blue-100 dark:bg-blue-900"
            : "bg-red-100 dark:bg-red-900"
        )}>
          {icon}
        </div>
        <div className="text-left">
          <span className={cn(
            "font-medium block",
            variant === "default"
              ? "text-gray-700 dark:text-gray-300"
              : "text-red-600 dark:text-red-400"
          )}>
            {title}
          </span>
          {subtitle && (
            <span className="text-xs text-gray-500 dark:text-gray-400 block">
              {subtitle}
            </span>
          )}
        </div>
      </div>
      <ChevronRight
        className={cn(
          "text-sm",
          variant === "default"
            ? "text-gray-400"
            : "text-red-400"
        )}
        size={16}
      />
    </Button>
  );
}

export default function Profile() {
  const { data: user } = useQuery({
    queryKey: ["/api/users", MOCK_USER_ID],
  });

  const { data: userProgress } = useQuery({
    queryKey: ["/api/users", MOCK_USER_ID, "progress"],
  });

  const setLocation = useLocation()[1];


  const menuItems = [
    {
      icon: <BarChart3 className="w-5 h-5 text-primary" />,
      title: "Riwayat Assessment",
      subtitle: "Lihat hasil assessment sebelumnya",
      onClick: () => setLocation("/history"),
    },
    {
      icon: <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      title: "Assessment Tersimpan",
      subtitle: "Lanjutkan assessment yang belum selesai",
      onClick: () => setLocation("/assessment"),
    },
    {
      icon: <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />,
      title: "Pengaturan",
      subtitle: "Kelola preferensi aplikasi",
      onClick: () => console.log("Settings clicked"),
    },
    {
      icon: <Bell className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />,
      title: "Notifikasi",
      subtitle: "Atur pengingat dan notifikasi",
      onClick: () => console.log("Notifications clicked"),
    },
    {
      icon: <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />,
      title: "Privasi & Keamanan",
      subtitle: "Kelola data dan keamanan akun",
      onClick: () => console.log("Privacy clicked"),
    },
    {
      icon: <Download className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      title: "Unduh Data",
      subtitle: "Ekspor hasil assessment Anda",
      onClick: () => console.log("Download clicked"),
    },
    {
      icon: <Share2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      title: "Bagikan Aplikasi",
      subtitle: "Ajak teman menggunakan TokenPedia",
      onClick: () => console.log("Share clicked"),
    },
    {
      icon: <HelpCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />,
      title: "Bantuan & Dukungan",
      subtitle: "FAQ dan kontak dukungan",
      onClick: () => console.log("Help & Support clicked"),
    },
  ];

  // Mock user data for demo (since we don't have real user management)
  const mockUser = {
    name: user?.name || "Ahmad Rahman",
    pesantren: user?.pesantren || "Pesantren Al-Hikmah Jakarta",
    email: user?.email || "ahmad.rahman@example.com",
    joinDate: "September 2023",
  };

  const handleEditProfile = () => {
    // TODO: Implement profile editing
    console.log("Edit profile clicked");
  };

  const handleNotifications = () => {
    // TODO: Implement notifications settings
    console.log("Notifications clicked");
  };

  const handlePrivacySecurity = () => {
    // TODO: Implement privacy and security settings
    console.log("Privacy & Security clicked");
  };

  const handleHelpSupport = () => {
    // TODO: Implement help and support
    console.log("Help & Support clicked");
  };

  const handleLogout = () => {
    // TODO: Implement logout functionality
    console.log("Logout clicked");
  };

  return (
    <div className="px-4 py-6">
      {/* Profile Header */}
      <div className="text-center mb-8">
        <img
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&h=120"
          alt="Profile picture representing peaceful meditation and mental wellness"
          className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-white dark:border-gray-800 shadow-lg"
          data-testid="profile-image"
        />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
          {mockUser.name}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          {mockUser.pesantren}
        </p>
        <Badge variant="secondary" className="text-xs">
          <Calendar className="mr-1" size={10} />
          Bergabung {mockUser.joinDate}
        </Badge>
      </div>

      {/* Profile Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card className="text-center shadow-sm border border-gray-100 dark:border-gray-700">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary mb-1" data-testid="user-assessments">
              {userProgress?.assessmentsCompleted || 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Assessment</div>
          </CardContent>
        </Card>
        <Card className="text-center shadow-sm border border-gray-100 dark:border-gray-700">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-accent mb-1" data-testid="user-streak">
              {userProgress?.streakDays || 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Hari Berturut</div>
          </CardContent>
        </Card>
      </div>

      {/* Achievement Badge */}
      {(userProgress?.assessmentsCompleted || 0) > 0 && (
        <Card className="mb-8 bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Award className="text-primary" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Pencapaian Terbaru
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Telah menyelesaikan {userProgress?.assessmentsCompleted} assessment
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Menu Items */}
      <div className="space-y-2 mb-8">
        {menuItems.map((item) => (
          <MenuItem
            key={item.title}
            icon={item.icon}
            title={item.title}
            subtitle={item.subtitle}
            onClick={item.onClick}
          />
        ))}
      </div>

      {/* Logout Button */}
      <MenuItem
        icon={<LogOut className="text-red-600 dark:text-red-400" size={16} />}
        title="Keluar"
        subtitle="Keluar dari akun Anda"
        onClick={handleLogout}
        variant="danger"
      />

      {/* App Version */}
      <div className="mt-8 text-center">
        <p className="text-xs text-gray-400 dark:text-gray-500">
          TOKEN PEDIA v1.0.0
        </p>
      </div>
    </div>
  );
}