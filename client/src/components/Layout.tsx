import { Brain, Moon, Sun, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import BottomNavigation from "./BottomNavigation";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="font-impresif min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-900 dark:text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/60 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  TOKEN PEDIA
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Mental Health Platform</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button>

              <Button variant="ghost" size="sm" className="w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 active:scale-95">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with bottom padding for fixed nav */}
      <main className="container mx-auto px-4 py-6 pb-24">
        {children}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}