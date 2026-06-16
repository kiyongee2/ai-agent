import { ChevronUp, Mail, Shield, Building } from "lucide-react";

interface FooterProps {
  onScrollToTop: () => void;
}

export default function Footer({ onScrollToTop }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-slate-850 pb-8">
          
          {/* Logo & Brand text */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-extrabold text-sm tracking-wider">
                S
              </span>
              <span className="font-extrabold text-lg text-white tracking-tight">
                SUDO <span className="text-indigo-400">AI Coaching</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-semibold">
              SUDO 소프트 대표 김기용의 AI 실무 코칭 아바타 상담 웹시스템입니다. 
              10년 국비 양성 필드 노하우를 녹여내어 생성형 AI, 프롬프트 엔지니어링 및 실무 컴퓨터 프로그래밍을 명료하게 지도합니다.
            </p>
          </div>

          {/* Quick links & summary details */}
          <div className="md:col-span-4 space-y-3 text-xs">
            <h4 className="font-bold text-slate-200 uppercase tracking-widest text-[10px]">김기용의 AI 코칭 철학</h4>
            <p className="italic text-slate-500 leading-normal font-semibold">
              "AI는 더 이상 미래 기술이 아닙니다. 지금 바로 여러분의 경쟁력이 됩니다. 
              실무 중심의 경험과 검증된 노하우로 당신의 새로운 도전을 주도하겠습니다."
            </p>
          </div>

          {/* Technical and regulatory credentials */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="font-bold text-slate-200 uppercase tracking-widest text-[10px]">기관 및 학회 정보</h4>
            <ul className="space-y-1.5 font-medium">
              <li className="flex items-center space-x-1.5">
                <Building className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>SUDO 소프트 대표</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <Shield className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>한국AI서비스학회 전문교수</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <Mail className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <a href="mailto:sudo2100@naver.com" className="hover:text-indigo-300">
                  sudo2100@naver.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 font-semibold gap-4">
          <div>
            © 2026 SUDO Soft & Kiyong Kim. All rights reserved. 
            <span className="block sm:inline sm:ml-2 text-[10px] text-slate-600 block">
              Powered by Google AI Studio Gemini 3.5 & React 19 Full-Stack Framework
            </span>
          </div>

          <button
            onClick={onScrollToTop}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-indigo-400 hover:text-indigo-300 rounded-full transition active:scale-90 cursor-pointer flex items-center justify-center border border-slate-700"
            title="위로 이동"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
