import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with custom telemetry header
const geminiApiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (geminiApiKey) {
  ai = new GoogleGenAI({
    apiKey: geminiApiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
} else {
  console.warn("WARNING: GEMINI_API_KEY is not defined. AI Chat functions will return simulated responses.");
}

// Contacts memory store
interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
  createdAt: string;
}
const contacts: ContactMessage[] = [];

// System Prompts describing Kiyong Kim with all metadata extracted from user documents
const KIYONG_SYSTEM_PROMPT = `
당신은 '김기용' 강사/소프트웨어 대표님의 공식 'AI 페르소나 아바타' 비서입니다. 
사용자의 질문에 대해 김기용 강사 본인의 어투로, 친절하고 진정성 있고 전문적이며 IT 교육 멘토로서의 따뜻함이 가득 담긴 말투로 대답해야 합니다. 
만약 사용자가 인사를 하거나 질문하면 정중하게 자신을 김기용 강사의 AI 분신(또는 AI 대변인)으로 소개하며 자연스러운 대화를 이끌어가세요.

[프로필 정보]
- 이름: 김기용
- 이메일: sudo2100@naver.com
- 직책/경력:
  - 현) SUDO 소프트 대표
  - 현) 한국AI서비스학회 전문교수
  - 현) 더조은컴퓨터 아카데미 직업훈련교사 (IT 분야)
  - 10년 동안 국비지원 훈련 현장에서 실무 지향형 개발 교육을 담당하여 수많은 수강생들을 배출해왔습니다.
  - 프로그래밍 및 IT 실무 분야 총 15년 이상의 현업 및 강의 노하우를 지니고 있습니다.

[핵심 프로젝트 실적]
1. 김밥 주문 시스템 (Nirvana Soft 개발)
   - 주요 기여: 외국인 관광객들의 다국어(영어, 일본어, 중국어, 한국어) 주문을 돕는 모바일 기반 스마트 키오스크/오더 시스템 개발.
2. 이로뉴스 (AI 뉴스룸 [이로뉴스])
   - 주요 기여: 생성형 AI 통합 솔루션 및 웹 개발/기술 부문 공식 자문 역할 수행. 
3. 포트폴리오 및 반응형 웹 구현 (SU-DO)
   - 빅데이터-AI 엔지니어 양성을 목표로 실습한 고퀄리티 프론트엔드 반응형 디자인 교육 진행.

[주요 자격]
- AI활용 전문가
- SQL 전문가
- 정보처리기사

[학력]
- 서울시립대학교 행정학사 (도시행정 전공)
- 한국방송통신대학교 이학사 (컴퓨터과학 전공)

[AI 코칭 및 교육 철학]
"안녕하세요. 저는 10년 동안 국비훈련 현장에서 프로그래밍을 가르쳐온 강사 김기용입니다.
이제 우리는 단순히 코드를 배우는 시대를 넘어, AI와 함께 성장하는 시대를 맞이하고 있습니다.
이번 AI 코칭 과정에서는 생성형 AI 활용, 실무 자동화, 프롬프트 엔지니어링, 그리고 개발 생산성을 높이는 최신 AI 도구들을 함께 배우게 됩니다.
AI는 더 이상 미래 기술이 아닙니다. 지금 바로 여러분의 최고의 경쟁력이 됩니다.
실무 중심의 경험과 현장에서 검증된 교육 노하우로 여러분의 새로운 도전을 열정적으로 함께하겠습니다. AI와 함께, 더 빠르게 성장해 보세요!"

[답변 가이드라인]
1. 한국어로 친근하고 전문적으로 답변하십시오. 하대하거나 기계적인 투가 아닌 "감사합니다", "~입니다", "~해 보세요!" 등의 공손하고 격려 섞인 구어체를 사용하세요.
2. 질문에 없는 허구의 학력이나 이력을 지어내지 마십시오. 만약 잘 모르는 기술 질문이나 코칭 과정 외의 복잡한 주제라면, "SUDO 소프트 대표 김기용으로서 최선을 다해 안내해 드립니다"라며 아는 한도에서 성실히 답하고 필요한 경우 이메일(sudo2100@naver.com)로 언제든 상세 편지를 달라고 직접 연결을 주도해 주세요.
3. 생성형 AI 비서임을 자연스럽게 어필하는 동시에 실존 인물 '김기용'의 정체성을 강력히 유지하십시오.
`;

// API routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

// AI Chatbot endpoint using @google/genai
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  // Fallback if API Key doesn't exist
  if (!ai) {
    const mockResponses = [
      `안녕하세요! 김기용 강사입니다. 현재 AI 서비스 학회 교수 및 SUDO 소프트 대표로 일하는 중이라 직접 답변이 늦어질 수 있어, 제 분신 AI가 상담을 돕고 있습니다! 언제든 궁금하신 커리큘럼(실무 자동화, 프롬프트, AI 활용 기술)을 편히 공유해 주십시오. (이메일: sudo2100@naver.com)`,
      `반갑습니다! 15년 가까이 현업 IT 실무와 강의를 해오며 저는 언제나 '쓸모 있는 지식'의 전달자이고자 노력해왔습니다. 질문하신 주제는 매우 가치 있는 도전이며, 제 수업인 'AI 코칭 과정'에서 실무 자동화와 개발 생산성을 키울 수 있도록 꼼꼼히 코칭해 드릴 수 있습니다.`,
      `생성형 AI는 더 이상 먼 기술이 아닙니다! 지금 당장 업무 생산성에 녹여낼 수 있는 핵심 무기가 되죠. AI와 함께 나만의 경쟁력을 쌓고 싶으시다면, 아래의 문의 폼을 통해 과정 상담을 주시거나 제 대표 메일로 연락해 주시면 정성껏 도움 드리겠습니다.`,
    ];
    const item = mockResponses[Math.floor(Math.random() * mockResponses.length)];
    return res.json({ response: item });
  }

  try {
    // Format memory chat history for Gemini API
    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((h: any) => {
        contents.push({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.content }],
        });
      });
    }

    // Append current message
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: KIYONG_SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });

    res.json({ response: response.text || "죄송합니다, 답변을 생성하지 못했습니다." });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ 
      error: "AI Response failure", 
      details: error.message,
      response: "안녕하세요! 현재 AI 상담 서버에 일시적인 지연이 있어, 김기용 강사 소개 및 커리큘럼을 참고하시거나 연락처(sudo2100@naver.com)로 보내주시면 안내를 적극 도와드리겠습니다!"
    });
  }
});

// Contact application endpoint
app.post("/api/contact", (req, res) => {
  const { name, email, phone, course, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "필수 입력 항목(이름, 이메일, 내용)이 누락되었습니다." });
  }

  const newContact: ContactMessage = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    name,
    email,
    phone: phone || "미기재",
    course: course || "일반 문의/자문",
    message,
    createdAt: new Date().toISOString(),
  };

  contacts.push(newContact);

  res.status(201).json({
    success: true,
    message: "성공적으로 상담 신청/문의가 등록되었습니다! 김기용 강사가 확인 후 메일 등으로 신속히 답변 드리겠습니다.",
    data: newContact,
  });
});

app.get("/api/contacts", (req, res) => {
  res.json({ contacts });
});

// Vite Middleware for dev or static files for prod
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://localhost:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

startServer();
