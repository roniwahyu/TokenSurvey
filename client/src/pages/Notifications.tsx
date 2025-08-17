import React, { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Bell,
  BellOff,
  Clock,
  AlertCircle,
  CheckCircle,
  Info,
  Settings,
  Trash2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "assessment";
  timestamp: Date;
  isRead: boolean;
  actionUrl?: string;
}

export default function Notifications() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Notification settings
  const [pushNotifications, setPushNotifications] = useState(true);
  const [assessmentReminders, setAssessmentReminders] = useState(true);
  const [dailyTips, setDailyTips] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);

  // Mock notifications data
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "1",
      title: "Assessment PHQ-9 Tersedia",
      message: "Saatnya melakukan assessment kesehatan mental mingguan Anda",
      type: "assessment",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isRead: false,
      actionUrl: "/assessment?type=phq9"
    },
    {
      id: "2",
      title: "Tips Harian: Mindfulness",
      message: "Cobalah bermeditasi selama 5 menit untuk menenangkan pikiran",
      type: "info",
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      isRead: true
    },
    {
      id: "3",
      title: "Assessment Selesai",
      message: "Hasil assessment GAD-7 Anda telah tersedia",
      type: "success",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      isRead: true,
      actionUrl: "/history"
    },
    {
      id: "4",
      title: "Pengingat Assessment",
      message: "Anda belum menyelesaikan assessment DASS-21",
      type: "warning",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      isRead: false,
      actionUrl: "/assessment?type=dass21"
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="text-green-500" size={20} />;
      case "warning":
        return <AlertCircle className="text-yellow-500" size={20} />;
      case "assessment":
        return <Clock className="text-blue-500" size={20} />;
      default:
        return <Info className="text-gray-500" size={20} />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800";
      case "warning":
        return "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800";
      case "assessment":
        return "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800";
      default:
        return "bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-800";
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, isRead: true }))
    );
    toast({
      title: "Semua Notifikasi Dibaca",
      description: "Semua notifikasi telah ditandai sebagai dibaca",
    });
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    toast({
      title: "Notifikasi Dihapus",
      description: "Notifikasi telah berhasil dihapus",
    });
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    toast({
      title: "Semua Notifikasi Dihapus",
      description: "Semua notifikasi telah dibersihkan",
    });
  };

  const handleNotificationClick = (notification: NotificationItem) => {
    markAsRead(notification.id);
    if (notification.actionUrl) {
      setLocation(notification.actionUrl);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

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
          <div className="flex items-center">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              Notifikasi
            </h1>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            onClick={() => setLocation("/settings")}
            className="touch-target"
          >
            <Settings size={20} />
          </Button>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Notification Settings */}
        <Card className="shadow-lg border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900 dark:text-white">
              <Bell className="mr-3 text-primary" size={20} />
              Pengaturan Notifikasi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Push Notifications
                </Label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Terima notifikasi pada perangkat
                </p>
              </div>
              <Switch
                checked={pushNotifications}
                onCheckedChange={setPushNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Pengingat Assessment
                </Label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Ingatkan untuk melakukan assessment
                </p>
              </div>
              <Switch
                checked={assessmentReminders}
                onCheckedChange={setAssessmentReminders}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Tips Harian
                </Label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Tips kesehatan mental setiap hari
                </p>
              </div>
              <Switch
                checked={dailyTips}
                onCheckedChange={setDailyTips}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Laporan Mingguan
                </Label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Ringkasan progres mingguan
                </p>
              </div>
              <Switch
                checked={weeklyReports}
                onCheckedChange={setWeeklyReports}
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        {notifications.length > 0 && (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={markAllAsRead}
              className="flex-1 touch-target"
              disabled={unreadCount === 0}
            >
              <CheckCircle className="mr-2" size={16} />
              Tandai Semua Dibaca
            </Button>
            <Button
              variant="outline"
              onClick={clearAllNotifications}
              className="flex-1 touch-target"
            >
              <Trash2 className="mr-2" size={16} />
              Hapus Semua
            </Button>
          </div>
        )}

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.length === 0 ? (
            <Card className="shadow-lg border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <BellOff className="mx-auto mb-4 text-gray-400" size={48} />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Tidak Ada Notifikasi
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Semua notifikasi Anda akan muncul di sini
                </p>
              </CardContent>
            </Card>
          ) : (
            notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`shadow-lg border-0 backdrop-blur-sm cursor-pointer transition-all duration-200 hover:shadow-xl ${
                  getNotificationColor(notification.type)
                } ${!notification.isRead ? "ring-2 ring-primary/20" : ""}`}
                onClick={() => handleNotificationClick(notification)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                            {notification.title}
                          </h4>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          {format(notification.timestamp, "dd MMM yyyy, HH:mm", { locale: id })}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                      className="text-gray-400 hover:text-red-500 touch-target"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}