import { motion } from "motion/react";
import { Sparkles, ArrowRight, AppWindow, Cpu, Award } from "lucide-react";
import bannerUrl from "../assets/images/ai_coaching_banner_1781579699499.jpg";

interface HeroProps {
  onNavigate: (section: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden bg-slate-50">
      {/* Background graphic elements */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img
          src={bannerUrl}
          alt="AI Network connections background"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-20 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text branding */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/50"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
              <span className="text-xs font-bold text-indigo-700 tracking-wider uppercase">
                10년 경력의 검증된 IT 교육 멘토
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]"
            >
              AI - Coaching
              <span className="block mt-2 text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-500">
                코드를 넘어 AI와 함께 성장하는 시대
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed"
            >
              현) SUDO 소프트 대표이자 한국AI서비스학회 전문교수 김기용이 직접 제안하는 AI 코칭 과정. 
              단순 코딩 중심에서 탈피해 생성형 AI 도구를 적시에 활용하고, 실무를 자동화하며, 
              자신만의 폭발적인 경쟁력을 만들어내는 고밀도 맞춤 지도를 만나보세요.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto"
            >
              <button
                onClick={() => onNavigate("contact")}
                className="px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/15 hover:shadow-indigo-600/25 active:scale-[0.98] transition flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <span>코칭 과정 문의하기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>

          {/* Core Feature highlights box */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/90 p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xl backdrop-blur-sm space-y-6"
            >
              <h3 className="text-sm font-bold text-slate-800 tracking-wider uppercase border-b border-slate-100 pb-3">
                AI 코칭 핵심 배움 리스트
              </h3>

              <div className="space-y-4">
                {[
                  {
                    icon: <Cpu className="w-5 h-5 text-indigo-600" />,
                    title: "생성형 AI & 프롬프트 엔지니어링",
                    desc: "단순 입력을 넘어서 정확한 의도의 질의로 원하는 개발 성과를 유도하는 코칭",
                  },
                  {
                    icon: <AppWindow className="w-5 h-5 text-indigo-600" />,
                    title: "실무 자동화 & 생산성 제고",
                    desc: "고부가가치 실무 수행을 위한 최신 AI 자동화 도구 이식 및 통합 활용기법",
                  },
                  {
                    icon: <Award className="w-5 h-5 text-indigo-600" />,
                    title: "현장 검증 수준 맞춤 전수",
                    desc: "10년 국비 교육 현장에서 누적된 검증된 세부 가이드 및 실제 비즈니스 자문 연계",
                  },
                ].map((feature, idx) => (
                  <div key={idx} className="flex space-x-4 items-start">
                    <span className="p-2 rounded-xl bg-indigo-50/70 border border-indigo-100/50 shrink-0">
                      {feature.icon}
                    </span>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-900">{feature.title}</h4>
                      <p className="text-xs text-slate-500 leading-normal">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
