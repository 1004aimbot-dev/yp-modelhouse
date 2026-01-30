
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import { Screen } from '../types';
import TopNav from '../components/TopNav';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

interface ChatBotProps {
  navigateTo: (screen: Screen) => void;
  goBack: () => void;
  toggleMenu: () => void;
}

const SYSTEM_INSTRUCTION = `
당신은 '양평 리빙 컴팩트 빌리지'의 VIP 전담 AI 컨시어지 '리빙(Living)'입니다. 
사용자는 잠재적 수분양자(MZ세대, 은퇴 준비 세대, 전원생활을 꿈꾸는 가족 등)입니다. 
친절하고 전문적이며 고급스러운 톤으로 다음 정보를 바탕으로 상담하십시오:

1. 프로젝트 개요: 2026년 5월 15일 그랜드 오픈 예정인 프리미엄 컴팩트 하우스 단지.
2. 위치 강점: 경기 양평군 양평읍 역커길 12-1. 서종 IC 1분, 두물머리 IC 3분 거리. 잠실 25분, 강남 40분 이내 진입 가능한 압도적 서울 접근성.
3. 주택 타입 정보:
   - A타입(12평): 어반 미니멀 스튜디오. 복층 구조. 1인 가구 또는 주말 별장용.
   - B타입(15평): 프리미엄 듀오 스위트. 1.5룸 분리형. 신혼부부 및 소규모 가구 추천.
   - C타입(18평): 시그니처 테라스 로프트. 광폭 테라스와 복층 설계로 개방감 극대화.
   - D타입(20평): 그랜드 패밀리 하우스. 3-Bay, 3룸 구조. 3~4인 가구의 실거주 최적화.
4. 특별 혜택 (선착순 10세대 한정):
   - 매립형 시스템 에어컨 무상 설치
   - 프라이빗 조경 서비스 제공
   - 최신 스마트 홈 패키지 지원
   - 취득세 지원 혜택
5. 타겟별 가치:
   - MZ세대: "서울 출퇴근이 가능한 효율적인 주거와 힐링의 조화"
   - 은퇴 세대: "자연과 가까운 평온한 안식처와 견고한 자산 가치"
6. 행동 지침:
   - 대화 중 실제 방문 예약이나 상세한 가격 상담을 원하면 '상담 신청' 메뉴로 이동할 것을 제안하십시오.
   - 답변은 마크다운 형식을 적극 활용하여 가독성을 높이십시오.
   - **중요 정보**는 볼드체(**)를 사용하고, 정보 나열 시에는 글머리 기호(-)를 사용하십시오.
   - 문단 사이에는 적절한 공백을 두어 시각적으로 쾌적하게 만드십시오.
`;

const ChatBot: React.FC<ChatBotProps> = ({ navigateTo, goBack, toggleMenu }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: '안녕하세요, VIP 고객님. **양평 리빙 컴팩트 빌리지**의 AI 컨시어지 리빙입니다. \n\n입지, 주택 타입, 특별 혜택 등 궁금하신 내용을 말씀해 주시면 정성껏 안내해 드리겠습니다.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          { role: 'user', parts: [{ text: SYSTEM_INSTRUCTION }] },
          ...messages.map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.text }]
          })),
          { role: 'user', parts: [{ text: input }] }
        ],
        config: {
            temperature: 0.7,
            topP: 0.95,
            topK: 64,
        }
      });

      const aiText = response.text || "죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.";
      setMessages(prev => [...prev, { role: 'assistant', text: aiText }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', text: "상담 연결이 원활하지 않습니다. **상담 신청** 메뉴를 통해 성함을 남겨주시면 담당자가 직접 연락드리겠습니다." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    "잠실에서 얼마나 걸리나요?",
    "선착순 혜택이 궁금해요",
    "MZ세대에게 추천하는 타입은?",
    "상담 신청은 어떻게 하나요?"
  ];

  return (
    <div className="flex flex-col h-screen bg-[#F8F9FA] overflow-hidden">
      <TopNav title="AI VIP 컨시어지" onBack={goBack} onMenu={toggleMenu} />
      
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-5 py-6 space-y-6 no-scrollbar"
      >
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div className={`flex flex-col max-w-[87%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-2 ml-1">
                  <div className="size-6 bg-primary rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-[14px]">smart_toy</span>
                  </div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">AI 컨시어지</span>
                </div>
              )}
              <div 
                className={`px-5 py-3.5 rounded-[22px] text-[13px] leading-relaxed shadow-sm prose prose-sm max-w-none ${
                  msg.role === 'user' 
                  ? 'bg-primary text-white rounded-tr-none' 
                  : 'bg-white text-[#333333] border border-gray-100 rounded-tl-none font-medium'
                }`}
              >
                {msg.role === 'user' ? (
                  <p>{msg.text}</p>
                ) : (
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                )}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-white border border-gray-100 px-5 py-3 rounded-[22px] rounded-tl-none">
              <div className="flex gap-1.5">
                <div className="size-1.5 bg-primary/40 rounded-full animate-bounce"></div>
                <div className="size-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="size-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white border-t border-gray-100 p-5 pb-10">
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4">
          {quickQuestions.map((q, i) => (
            <button 
              key={i}
              onClick={() => setInput(q)}
              className="px-4 py-2 bg-gray-50 text-gray-600 text-[13px] font-bold rounded-full whitespace-nowrap border border-gray-100 active:bg-primary active:text-white transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
        
        <div className="relative flex items-center">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="궁금한 내용을 입력하세요..."
            className="w-full h-14 bg-gray-50 border border-gray-100 rounded-[20px] px-5 pr-14 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-[15px] font-medium"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`absolute right-2 size-10 rounded-xl flex items-center justify-center transition-all ${
              input.trim() && !isLoading ? 'bg-primary text-white shadow-lg' : 'bg-gray-200 text-gray-400'
            }`}
          >
            <span className="material-symbols-outlined font-bold">arrow_upward</span>
          </button>
        </div>
        
        <div className="mt-4 flex justify-between items-center px-2">
            <p className="text-[11px] text-gray-400 font-medium">실시간 AI 상담이 진행 중입니다.</p>
            <button 
                onClick={() => navigateTo(Screen.Contact)}
                className="text-primary text-[11px] font-black underline underline-offset-4"
            >
                전문 상담사 예약하기
            </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
