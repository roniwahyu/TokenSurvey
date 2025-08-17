import { Home, ClipboardList, GraduationCap, BarChart3, User } from "lucide-react";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "home", path: "/", icon: Home, label: "Beranda" },
  { id: "assessment", path: "/assessment", icon: ClipboardList, label: "Assessment" },
  { id: "education", path: "/education", icon: GraduationCap, label: "Edukasi" },
  { id: "history", path: "/history", icon: BarChart3, label: "Riwayat" },
  { id: "profile", path: "/profile", icon: User, label: "Profil" },
];

export default function BottomNavigation() {
  const [location, setLocation] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 px-2 py-2 shadow-lg">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setLocation(item.path)}
              className={cn(
                "relative flex flex-col items-center justify-center space-y-1 px-2 py-2 rounded-xl transition-all duration-300 ease-in-out touch-target transform active:scale-95 group btn-press",
                isActive
                  ? "text-primary bg-primary/15 shadow-md border border-primary/20 scale-105 nav-active"
                  : "text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-primary/10 hover:shadow-sm hover:scale-105"
              )}
              data-testid={`nav-${item.id}`}
            >
              {/* Active indicator dot */}
              {isActive && (
                <div className="absolute -top-1 w-1 h-1 bg-primary rounded-full animate-pulse"></div>
              )}
              
              {/* Ripple effect on tap */}
              <div className={cn(
                "absolute inset-0 rounded-xl bg-primary/20 opacity-0 scale-75 transition-all duration-200",
                "group-active:opacity-100 group-active:scale-100"
              )}></div>
              
              <Icon 
                className={cn(
                  "relative z-10 transition-all duration-300",
                  isActive ? "animate-bounce" : "group-hover:animate-pulse"
                )} 
                size={20} 
              />
              <span className={cn(
                "relative z-10 text-xs font-medium transition-all duration-300 text-center",
                isActive ? "font-semibold text-primary" : "group-hover:font-medium"
              )}>
                {item.label}
              </span>
              
              {/* Hover glow effect */}
              <div className={cn(
                "absolute inset-0 rounded-xl bg-gradient-to-t from-primary/5 to-transparent opacity-0 transition-opacity duration-300",
                "group-hover:opacity-100"
              )}></div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}