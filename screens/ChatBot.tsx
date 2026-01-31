
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
   - **답변은 최소 3~5문장 이상으로 아주 상세하고 풍부하게 작성하십시오.** 단답형 답변은 지양하십시오.
   - 고객의 질문에 공감하고, 추가적인 매력을 자연스럽게 어필하십시오.
   - 대화 중 실제 방문 예약이나 상세한 가격 상담을 원하면 '상담 신청' 메뉴로 이동할 것을 정중히 제안하십시오.
   - 답변은 마크다운 형식을 적극 활용하여 가독성을 높이십시오. (중요 내용은 볼드체)
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

  const getFallbackResponse = (query: string): string => {
    // 1. 강남 Specific
    if (query.includes('강남')) {
      return "강남역까지는 **약 40분대**로 진입이 가능합니다.\n\n출퇴근 시간대에도 올림픽대로를 통해 편리하게 이동하실 수 있으며, 강남의 주요 업무 지구와의 접근성이 뛰어납니다.\n\n서울의 인프라를 누리면서도 퇴근 후에는 완벽한 전원 생활을 즐기실 수 있습니다.";
    }
    // 2. 잠실 Specific
    if (query.includes('잠실')) {
      return "잠실역까지는 **약 25분**이면 도착하실 수 있습니다.\n\n롯데월드타워, 송파구청 등 주요 시설을 동네 생활권처럼 이용하실 수 있는 **특급 입지**입니다.\n\n서종 IC가 1분 거리에 있어 언제든 가볍게 서울로 이동이 가능합니다.";
    }
    // 3. 신도림/여의도/서부권 Specific
    if (query.includes('신도림') || query.includes('여의도') || query.includes('영등포')) {
      return "신도림 및 서울 서부권까지는 **약 55분~1시간** 내외로 이동이 가능합니다.\n\n양평 IC와 올림픽대로를 연계하여 신호 대기 없이 쾌속으로 진입하실 수 있습니다.\n\n주말에는 다소 차량이 많을 수 있지만, 평일 출퇴근 시간대에는 생각보다 훨씬 빠르게 이동하실 수 있는 **서울 생활권**입니다.";
    }
    // 4. 인천/부평 Specific
    if (query.includes('인천') || query.includes('부평')) {
      return "인천 및 부평 지역까지는 **약 1시간 10분 ~ 1시간 30분** 정도 소요됩니다.\n\n수도권제1순환고속도로와 올림픽대로를 통해 끊김 없이 연결되어, 장거리 이동의 피로감이 적습니다.\n\n주말 나들이나 가끔 있는 이동에도 크게 부담 없는 **수도권 생활권**입니다.";
    }
    // 5. General Location/Traffic
    if (query.includes('거리') || query.includes('시간') || query.includes('위치') || query.includes('교통')) {
      return "저희 단지는 **서종 IC 1분**, **두물머리 IC 3분** 거리에 위치하여 서울 접근성이 매우 뛰어납니다.\n\n잠실 20분대, 강남 40분대로 서울 주요 도심까지 쾌속으로 연결됩니다. 도심의 편리함과 자연의 여유를 동시에 누리세요.";
    }

    if (query.includes('혜택') || query.includes('이벤트') || query.includes('서비스') || query.includes('프로모션')) {
      return "오직 **선착순 10세대** 고객님께만 드리는 **총 2,000만원 상당의 프리미엄 풀패키지** 혜택을 안내해 드립니다!\n\n1. ✨ **LG/삼성 최신형 시스템 에어컨** 전실 매립 (거실+침실)\n2. 🌿 **프라이빗 테라스 조경** (전문 가드너 시공)\n3. 🏠 **AI 스마트홈 IoT 시스템** 구축 (음성제어 조명/난방)\n4. 💰 **취득세 전액 지원** 프로모션\n\n지금 바로 상담 신청을 남기시면 이 모든 특별 혜택의 주인공이 되실 수 있습니다. 기회를 놓치지 마세요.";
    }
    if (query.includes('MZ') || query.includes('추천') || query.includes('1인') || query.includes('타입')) {
      return "**MZ세대의 라이프스타일**을 완벽하게 분석하여 설계된 두 가지 주력 타입을 추천해 드립니다.\n\n🏠 **A타입 (12평 / 어반 미니멀)**\n- 높은 층고의 **복층 스튜디오** 구조로 일반 아파트보다 훨씬 넓은 개방감을 선사합니다.\n- 나만의 작업실이나 주말 힐링을 위한 **세컨드 하우스**로 인기가 매우 높습니다.\n\n🏡 **B타입 (15평 / 프리미엄 듀오)**\n- **1.5룸 분리형 설계**로 침실과 생활 공간을 완벽하게 구분하여 프라이버시를 강화했습니다.\n- 신혼부부나 재택근무가 많은 프리랜서 분들께 강력 추천하는 **실속형 프리미엄** 타입입니다.";
    }
    if (query.includes('상담') || query.includes('예약') || query.includes('전화') || query.includes('가격') || query.includes('얼마')) {
      return "자세한 분양가 및 모델하우스 방문 예약은 **VIP 전담 상담사**를 통해 상세히 안내받으실 수 있습니다.\n\n우측 상단의 **메뉴(≡)** 버튼을 클릭하시거나, 대화창 하단의 **'전문 상담사 예약하기'** 링크를 이용해 주세요.\n\n성함과 연락처를 남겨주시면, 대기 시간 없이 원하시는 시간에 맞춰 **우선 상담**을 도와드리겠습니다.";
    }
    return "문의하신 내용은 전문 상담사를 통해 더 자세하고 친절하게 안내받으실 수 있습니다.\n\n저희 양평 리빙 컴팩트 빌리지에 관심을 가져주셔서 진심으로 감사드리며, **상담 신청**을 남겨주시면 담당 VIP 매니저가 신속히 연락드려 궁금증을 완벽하게 해결해 드리겠습니다.";
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;

      // Check if API key is valid (not placeholder)
      if (!apiKey || apiKey === 'PLACEHOLDER_API_KEY') {
        throw new Error("Invalid API Key");
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
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
      console.warn("Chat API Failed, using fallback:", error);
      // Use smart fallback instead of generic error
      const fallbackText = getFallbackResponse(input);

      // Artificial delay for realism
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', text: fallbackText }]);
        setIsLoading(false);
      }, 1000);
      return;
    } finally {
      if (process.env.API_KEY && process.env.API_KEY !== 'PLACEHOLDER_API_KEY') {
        setIsLoading(false);
      }
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
                className={`px-5 py-3.5 rounded-[22px] text-[13px] leading-relaxed shadow-sm prose prose-sm max-w-none ${msg.role === 'user'
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
            className={`absolute right-2 size-10 rounded-xl flex items-center justify-center transition-all ${input.trim() && !isLoading ? 'bg-primary text-white shadow-lg' : 'bg-gray-200 text-gray-400'
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
