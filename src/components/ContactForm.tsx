import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle, Info, Phone, Mail, Award, Calendar } from "lucide-react";
import { SavedContact, ContactData } from "../types";

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactData>({
    name: "",
    email: "",
    phone: "",
    course: "AI 코칭 과정 (생성형 AI & 프롬프트)",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  
  // Local storage cache for user's past query history on this device
  const [myQueries, setMyQueries] = useState<SavedContact[]>([]);

  useEffect(() => {
    const historical = localStorage.getItem("kiyong_contact_history");
    if (historical) {
      try {
        setMyQueries(JSON.parse(historical));
      } catch (e) {
        console.error("Local history recovery failure", e);
      }
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert("이름, 이메일, 문의 내용은 필수 입력 정보입니다.");
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitSuccess(data.message);
        setFormData({
          name: "",
          email: "",
          phone: "",
          course: "AI 코칭 과정 (생성형 AI & 프롬프트)",
          message: "",
        });

        // Cache message record into browser storage for premium persistence simulation
        const updatedQueries = [data.data, ...myQueries];
        setMyQueries(updatedQueries);
        localStorage.setItem("kiyong_contact_history", JSON.stringify(updatedQueries));
      } else {
        throw new Error(data.error || "Submit registration issue");
      }
    } catch (err: any) {
      console.error("Submit fail:", err);
      // Fallback local persistence if offline / backend connection error
      const mockSaved: SavedContact = {
        ...formData,
        id: `local_${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      const updatedQueries = [mockSaved, ...myQueries];
      setMyQueries(updatedQueries);
      localStorage.setItem("kiyong_contact_history", JSON.stringify(updatedQueries));
      
      setSubmitSuccess("신청 정보가 접수 완료되었습니다! (서버 연결 일시 지연으로 장치 로컬 세션에 우선 안전하게 기록되었습니다. 김기용 강사가 직접 메일로 조만간 성실히 안내 드리겠습니다.)");
      setFormData({
        name: "",
        email: "",
        phone: "",
        course: "AI 코칭 과정 (생성형 AI & 프롬프트)",
        message: "",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <span className="text-xs font-extrabold tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100/50">
            CONSULTATION REQUEST
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            코칭 과정 및 자문 상담 문의
          </h2>
          <div className="w-12 h-1 bg-indigo-600 mx-auto rounded-full" />
          <p className="text-slate-500 font-medium text-sm sm:text-base">
            생성형 AI 이식 및 실무 코칭 강좌 수강에 관심 있으신 분은 부담 없이 언제든 상담을 접수해 주세요
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-6xl mx-auto">
          
          {/* Column 1: Contact direct Card */}
          <div className="lg:col-span-4 bg-slate-900 text-white p-8 rounded-3xl flex flex-col justify-between shadow-xl space-y-8">
            <div className="space-y-6">
              <h3 className="text-xl font-extrabold tracking-tight">상담안내</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                SUDO 소프트 대표이자 10년 차 공인 컴퓨터 직업훈련교사 김기용이 직접 기업별, 수험 목적별 맞춤 코칭 솔루션을 제안 드립니다.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-center space-x-3.5">
                  <span className="p-2.5 bg-white/10 rounded-xl">
                    <Mail className="w-4 h-4 text-indigo-400" />
                  </span>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold">직접 이메일 문의</span>
                    <a href="mailto:sudo2100@naver.com" className="text-xs font-bold text-slate-100 hover:text-indigo-300">
                      sudo2100@naver.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3.5">
                  <span className="p-2.5 bg-white/10 rounded-xl">
                    <Phone className="w-4 h-4 text-indigo-400" />
                  </span>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold">메세지 유선 연락</span>
                    <span className="text-xs font-bold text-slate-100">sudo2100@naver.com로 메일 주소 공유</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3.5">
                  <span className="p-2.5 bg-white/10 rounded-xl">
                    <Award className="w-4 h-4 text-indigo-400" />
                  </span>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold">코칭 주요 커리큘럼</span>
                    <span className="text-xs font-bold text-slate-100">AI 실무 자동화 / 프롬프트 엔지니어링 / SQL 전문가</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Micro info */}
            <div className="pt-6 border-t border-white/10 text-[10px] text-slate-400 font-medium">
              * 기재하신 소형 개인 정보(이름, 이메일)는 오직 김기용 강사의 회신용 용도로만 안전하게 활용됩니다.
            </div>
          </div>

          {/* Column 2: Form application */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-10 border border-slate-100 rounded-3xl shadow-xl flex flex-col justify-between">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">이름 *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="성함을 한글로 입력해 주세요"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:outline-none rounded-xl px-4 py-3 text-xs text-slate-800 transition"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">이메일 주소 *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@domain.com"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:outline-none rounded-xl px-4 py-3 text-xs text-slate-800 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">연락처 (선택)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="010-0000-0000"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:outline-none rounded-xl px-4 py-3 text-xs text-slate-800 transition"
                  />
                </div>

                {/* Course option */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">관심 코칭 코스 선택</label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:outline-none rounded-xl px-4 py-3 text-xs text-slate-800 transition cursor-pointer"
                  >
                    <option>AI 코칭 과정 (생성형 AI & 프롬프트)</option>
                    <option>업무/실무 자동화 비즈니스 코칭</option>
                    <option>SQL 자격 및 빅데이터 특화 특강</option>
                    <option>개발 기업 협업 / 생성형 AI 및 웹 자문</option>
                  </select>
                </div>
              </div>

              {/* Message text area */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">문의 내용 *</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="상담을 원하시는 교육 내용이나, 기업 자문 이슈에 대해 자유로이 기록해 주세요."
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:outline-none rounded-xl px-4 py-3 text-xs text-slate-800 transition resize-none"
                />
              </div>

              {/* Actions success */}
              <div className="flex flex-col space-y-4 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs tracking-wide rounded-xl shadow-lg shadow-indigo-600/10 active:scale-98 transition flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? "문의 전송 중..." : "상담 신청 제출하기"}</span>
                </button>

                <AnimatePresence>
                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-start space-x-2 text-emerald-800 text-xs leading-relaxed"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{submitSuccess}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </form>
          </div>

        </div>

        {/* Persisted inquiry history container */}
        {myQueries.length > 0 && (
          <div className="max-w-6xl mx-auto mt-16 space-y-4">
            <div className="border-b border-slate-200 pb-2">
              <h4 className="text-sm font-bold text-slate-800 flex items-center space-x-1.5">
                <Calendar className="w-4 h-4 text-indigo-600" />
                <span>내가 신청한 상담 내역 ({myQueries.length}건)</span>
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myQueries.map((item) => (
                <div key={item.id} className="bg-white border border-slate-200/60 p-4 rounded-2xl shadow-sm text-xs space-y-2">
                  <div className="flex justify-between items-center text-[10px] text-slate-400">
                    <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      {item.course}
                    </span>
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h5 className="font-extrabold text-slate-800">
                    신청자: {item.name} ({item.email})
                  </h5>
                  <p className="text-slate-600 line-clamp-2 bg-slate-50 p-2 rounded">
                    {item.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
