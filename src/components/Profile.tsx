import { motion } from "motion/react";
import { Mail, Briefcase, GraduationCap, FileCheck, Info, Sparkles } from "lucide-react";

export default function Profile() {
  const avatarUrl = "/src/assets/images/instructor_profile_avatar_1781580708363.jpg";

  const currentPositions = [
    "현) SUDO 소프트 대표",
    "현) 한국AI서비스학회 전문교수",
    "현) 더조은컴퓨터 아카데미 직업훈련교사(IT 분야)",
  ];

  const careerList = [
    "프로그래밍 분야 15년 실무 및 강의 경험",
    "[Nirvana Soft] - 외국인을 위한 주문 시스템 개발",
    "AI 뉴스룸 [이로뉴스] - 생성형 AI 및 웹 자문",
    "정보시스템 감리 협회 – 생성형 AI 활용 강의",
    "한양사이버대학교 평생교육원 – 빅데이터 분석기사 실기(인강)",
  ];

  const licenses = ["AI활용 전문가", "SQL 전문가", "정보처리기사"];

  const education = [
    "서울시립대학교 행정학사 (도시행정 전공)",
    "한국방송통신대학교 이학사 (컴퓨터과학 전공)",
  ];

  return (
    <section id="profile" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            강사 프로필 및 소개
          </h2>
          <div className="w-12 h-1 bg-indigo-600 mx-auto rounded-full" />
          <p className="text-slate-500 font-medium text-sm sm:text-base">
            현업 대표와 전문대학 교수의 실전 노하우로 설계된 정교한 교육 과정
          </p>
        </div>

        {/* Master Profile Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Column 1: Avatar Image & Quick Contact Contact Card */}
          <div className="lg:col-span-5 flex flex-col items-center space-y-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative p-3 bg-white border border-slate-100 rounded-3xl shadow-xl max-w-sm w-full"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 relative group">
                <img
                  src={avatarUrl}
                  alt="Kim Kiyong Instructor Portrait"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-xs bg-indigo-600 text-white px-2.5 py-1 rounded-full font-bold">
                    대표 김기용
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Micro email card info */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center space-x-3 w-full max-w-sm">
              <span className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl">
                <Mail className="w-5 h-5 text-indigo-600" />
              </span>
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-slate-400 block">공식 이메일</span>
                <a href="mailto:sudo2100@naver.com" className="text-sm font-extrabold text-slate-800 hover:text-indigo-600 transition">
                  sudo2100@naver.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Extracted text elements */}
          <div className="lg:col-span-7 space-y-8">
            {/* Header & current positions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-xs uppercase font-extrabold tracking-widest text-indigo-600 bg-indigo-50/50 border border-indigo-100/50 px-2.5 py-1 rounded-md">
                  PROFILE
                </span>
                <span className="text-slate-400 text-xs font-bold">생성형 AI 자문 위원</span>
              </div>
              <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                김기용 <span className="text-lg font-medium text-slate-500">SUDO 소프트 대표</span>
              </h3>
              
              {/* Current badges */}
              <ul className="space-y-2 border-l-2 border-indigo-600 pl-4">
                {currentPositions.map((pos, idx) => (
                  <li key={idx} className="text-base font-semibold text-slate-800">
                    {pos}
                  </li>
                ))}
              </ul>
            </div>

            {/* Segmented lists */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              
              {/* Experiencies card list */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
                  <Briefcase className="w-4 h-4 text-indigo-600" />
                  <h4 className="text-sm font-bold text-slate-900">주요 경력</h4>
                </div>
                <ul className="space-y-2">
                  {careerList.map((item, idx) => (
                    <li key={idx} className="text-xs text-slate-600 leading-relaxed flex items-start space-x-1.5">
                      <span className="text-indigo-600 font-bold shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                {/* Major qualification cards */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
                    <FileCheck className="w-4 h-4 text-indigo-600" />
                    <h4 className="text-sm font-bold text-slate-900">주요 자격</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {licenses.map((item, idx) => (
                      <span key={idx} className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200/50">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Educations */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
                    <GraduationCap className="w-4 h-4 text-indigo-600" />
                    <h4 className="text-sm font-bold text-slate-900">학력 정보</h4>
                  </div>
                  <ul className="space-y-2">
                    {education.map((item, idx) => (
                      <li key={idx} className="text-xs text-slate-600 leading-relaxed flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Section 3: High Fidelity Quote greeting cards [Page 3 details] */}
        <div className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-slate-50 p-6 sm:p-10 rounded-3xl border border-slate-100 relative overflow-hidden"
          >
            {/* Top right floating icons */}
            <div className="absolute top-6 right-6 opacity-10">
              <Info className="w-24 h-24 text-indigo-600" />
            </div>

            <div className="max-w-4xl mx-auto space-y-6 relative z-10">
              <div className="flex items-center space-x-2 text-indigo-600">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-extrabold uppercase tracking-widest">강사 인사글</span>
              </div>

              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                <p>안녕하세요.</p>
                <p>저는 10년 동안 국비훈련 현장에서 프로그래밍을 가르쳐온 강사입니다.</p>
                <p>
                  이제 우리는 단순히 코드를 배우는 시대를 넘어,{" "}
                  <strong className="text-indigo-600 underline decoration-indigo-200 underline-offset-4">AI와 함께 성장하는 시대</strong>를 맞이하고 있습니다.
                </p>
                <p>
                  이번 AI 코칭 과정에서는 생성형 AI 활용, 실무 자동화, 프롬프트 엔지니어링, 그리고 개발 생산성을 높이는 최신 AI 도구들을 함께 배우게 됩니다.
                </p>
                <p className="text-lg font-bold text-slate-900">
                  "AI는 더 이상 미래 기술이 아닙니다. 지금 바로 여러분의 최고의 경쟁력이 됩니다."
                </p>
                <p>
                  실무 중심의 경험과 현장에서 검증된 교육 노하우로 여러분의 새로운 도전을 열정 가득히 함께하겠습니다.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between flex-wrap gap-4">
                <div className="space-y-0.5">
                  <span className="text-xs text-slate-400 font-semibold block">SUDO 소프트 & 한국AI서비스학회</span>
                  <span className="text-sm font-bold text-slate-800">김기용 강사 배상</span>
                </div>
                <div className="text-indigo-600 font-extrabold text-sm sm:text-base">
                  AI와 함께, 더 빠르게 성장해 보세요.
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
