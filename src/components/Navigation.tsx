import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export default function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const menuItems = [
    { id: "hero", label: "홈" },
    { id: "profile", label: "강사 소개" },
    { id: "projects", label: "대표 실적" },
    { id: "contact", label: "코칭 신청" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm tracking-widest shadow-md">
              S
            </span>
            <span className="font-extrabold text-lg text-slate-900 tracking-tight cursor-pointer" onClick={() => onNavigate("hero")}>
              SUDO <span className="text-indigo-600">AI Coaching</span>
            </span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative py-2 text-sm font-medium transition-colors cursor-pointer ${
                  activeSection === item.id ? "text-indigo-600 font-semibold" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onNavigate("contact")}
              className="inline-flex items-center space-x-1 px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 active:scale-95 transition cursor-pointer"
            >
              <span>코칭 상담신청</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
