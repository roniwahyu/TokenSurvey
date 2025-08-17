import { Home, ClipboardList, GraduationCap, User } from "lucide-react";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "home", path: "/", icon: Home, label: "Beranda" },
  { id: "assessment", path: "/assessment", icon: ClipboardList, label: "Assessment" },
  { id: "education", path: "/education", icon: GraduationCap, label: "Edukasi" },
  { id: "profile", path: "/profile", icon: User, label: "Profil" },
];

export default function BottomNavigation() {
  const [location, setLocation] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 px-4 py-2 shadow-lg">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setLocation(item.path)}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 px-3 py-2 rounded-xl transition-all duration-300 ease-in-out touch-target transform active:scale-95",
                isActive
                  ? "text-primary bg-primary/15 shadow-md border border-primary/20 scale-105"
                  : "text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-primary/10 hover:shadow-sm hover:scale-105"
              )}
              data-testid={`nav-${item.id}`}
            >
              <Icon 
                className={cn(
                  "transition-transform duration-300",
                  isActive ? "animate-pulse" : ""
                )} 
                size={20} 
              />
              <span className={cn(
                "text-xs font-medium transition-all duration-300",
                isActive ? "font-semibold" : ""
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}