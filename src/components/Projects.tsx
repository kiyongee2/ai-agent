import { motion } from "motion/react";
import { AppWindow, Layers, Globe, CheckCircle2, ChevronRight, Smartphone } from "lucide-react";
import { ProjectItem } from "../types";
import kimbapImg from "../assets/images/kimbap_app_1781579735250.jpg";
import iroImg from "../assets/images/iro_news_1781579752832.jpg";
import portfolioImg from "../assets/images/portfolio_web_1781579770477.jpg";

export default function Projects() {
  const projects: ProjectItem[] = [
    {
      id: "project_kimbap",
      title: "김밥 주문 시스템 (Nirvana Soft)",
      subtitle: "외국인을 위한 다국어 주문 시스템 개발",
      description: "외국인 관광객이 모바일이나 소형 기기로 한식을 쉽고 명료하게 탐독하고 주문할 수 있도록 한 스마트 키오스크 오더 시스템입니다.",
      imageUrl: kimbapImg,
      role: "총괄 기획 및 아키텍처 설계",
      techStack: ["React Native", "Tailwind CSS", "i18next", "NodeJS"],
      features: [
        "영·일·중·한 4개국어 완전 실시간 렌더링 및 통번역 기능 지원",
        "클라우드 실시간 모바일 메뉴 데이터 업데이트 자동화",
        "직관적인 그림 아이콘과 장바구니 통합 결제 동선 제공",
      ],
    },
    {
      id: "project_iro",
      title: "AI 뉴스룸 [이로뉴스]",
      subtitle: "생성형 AI 및 웹 자문 및 뉴스 플랫폼 구축",
      description: "글로벌 정세, 실시간 증시, 주요 경제 지표 등을 지능형 생성형 AI로 핵심 요약하여 독자에게 신속한 맥락을 파악시켜주는 미디어 테크 서비스입니다.",
      imageUrl: iroImg,
      role: "생성형 AI 모델 커스텀 및 웹 기획 자문",
      techStack: ["React Web", "Gemini API", "Tailwind CSS", "Python Engine"],
      features: [
        "LLM 기반 헤드라인 분석 및 단일 요약 피드 자동 생성 기술",
        "깔끔한 그리드 구조를 채택한 현대적 데스크톱/모바일 반응형 레이아웃",
        "주요 경제 금융 일정의 데이터 마크다운 피드 분석 대시보드 탑재",
      ],
    },
    {
      id: "project_portfolio",
      title: "SU-DO 포트폴리오",
      subtitle: "빅데이터-AI 엔지니어 반응형 포트폴리오 가이드",
      description: "인공지능 및 빅데이터 핵심 인재들의 실무 성과물과 정체성을 세련된 모던 다크모드로 담은 포트폴리오 사이트 템플릿 및 강의 지도 결과물입니다.",
      imageUrl: portfolioImg,
      role: "포트폴리오 설계 자문, 마이너 피드백 및 프로덕션 강의",
      techStack: ["HTML5", "CSS3 Canvas", "JavaScript ES6", "Responsive Layout"],
      features: [
        "유려한 모션 이펙트와 마우스 인터랙션을 접목한 차별화된 UI 테마",
        "인적 역량(About Me), 취득 자격(Skills), 프로젝트 성과(Portfolio) 연동 관리",
        "모바일, 태블릿, PC 등 다양한 해상도에 완벽 대응하는 CSS Flex/Grid 레이아웃 완비",
      ],
    },
  ];

  return (
    <section id="projects" className="py-20 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <span className="text-xs font-extrabold tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100/50">
            RECORD & PORTFOLIO
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            대표 프로젝트 실적
          </h2>
          <div className="w-12 h-1 bg-indigo-600 mx-auto rounded-full" />
          <p className="text-slate-500 font-medium text-sm sm:text-base">
            다양한 비즈니스 모델에 생성형 AI와 프리미엄 웹 솔루션을 접목한 실전 산출물들을 소개합니다
          </p>
        </div>

        {/* Projects Grid cards */}
        <div className="space-y-16">
          {projects.map((proj, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
              >
                {/* Visual Representation Column */}
                <div className={`lg:col-span-6 relative overflow-hidden ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="relative h-64 sm:h-80 lg:h-full min-h-[320px] group">
                    <img
                      src={proj.imageUrl}
                      alt={proj.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
                    
                    {/* Floating pill indicators */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white">
                      <span className="text-xs bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-full font-bold inline-flex items-center space-x-1">
                        <Smartphone className="w-3.5 h-3.5" />
                        <span>반응형 시스템</span>
                      </span>
                      <span className="text-xs bg-indigo-600/90 backdrop-blur px-3 py-1.5 rounded-full font-extrabold tracking-wide">
                        {proj.techStack[0]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content description column */}
                <div className={`lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  
                  {/* Card head metadata */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <span className="p-1 px-2.5 rounded-md text-xs font-bold bg-indigo-50 border border-indigo-100 text-indigo-700">
                        {proj.role}
                      </span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
                      {proj.title}
                    </h3>
                    <p className="text-sm font-semibold text-slate-500">
                      {proj.subtitle}
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed pt-2">
                      {proj.description}
                    </p>
                  </div>

                  {/* Core features bullet metrics list */}
                  <div className="space-y-2.5 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-100">
                    <span className="text-xs font-extrabold text-slate-400 tracking-wider uppercase block mb-1">
                      핵심 설계 특징
                    </span>
                    <ul className="space-y-2">
                      {proj.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start space-x-2 text-xs font-medium text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack labels and tags */}
                  <div className="flex justify-between items-center pt-2 flex-wrap gap-4 border-t border-slate-100">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.techStack.map((tech) => (
                        <span key={tech} className="text-[10px] font-bold bg-slate-50 border border-slate-200 text-slate-600 px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <a
                      href="#contact"
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center space-x-1 cursor-pointer transition-colors"
                    >
                      <span>코칭 상담 문의</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
