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
    <nav className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = location === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setLocation(item.path)}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 px-2 py-3 rounded-lg transition-all duration-200 touch-target",
                isActive
                  ? "text-primary bg-primary/15 shadow-sm border border-primary/20"
                  : "text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-primary/10 hover:shadow-sm"
              )}
              data-testid={`nav-${item.id}`}
            >
              <Icon className="text-lg" size={20} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}