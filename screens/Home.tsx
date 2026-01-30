
import React, { useState, useEffect } from 'react';
import { Screen } from '../types';

interface HomeProps {
  navigateTo: (screen: Screen) => void;
  toggleMenu: () => void;
}

const Home: React.FC<HomeProps> = ({ navigateTo, toggleMenu }) => {
  const suggestions = [
    { id: Screen.Location, label: '📍 교통 및 입지 확인' },
    { id: Screen.VirtualTour, label: '✨ 3D 가상 투어' },
    { id: Screen.Benefits, label: '🎁 VIP 특별 혜택' },
    { id: Screen.Story, label: '📖 브랜드 이야기' },
  ];

  const targetDate = new Date('2026-05-15T10:00:00').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    updateTimer(); 
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNum = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="flex flex-col bg-white min-h-screen animate-in fade-in duration-500 relative">
      {/* 상단 헤더 */}
      <header className="sticky top-0 z-[60] bg-white/95 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 py-4">
        <div className="flex flex-col">
          <span className="text-primary text-[10px] font-black tracking-widest uppercase leading-none">양평 리빙 컴팩트 빌리지</span>
          <h2 className="text-[17px] font-bold tracking-tight text-text-main leading-tight mt-1">VIP 특별 초청장</h2>
        </div>
        <button 
          onClick={toggleMenu}
          className="size-11 bg-gray-50 rounded-full flex items-center justify-center text-primary active:scale-90 transition-transform shadow-sm"
        >
          <span className="material-symbols-outlined text-[26px]">menu</span>
        </button>
      </header>

      {/* 추천 칩 섹션 */}
      <div className="w-full overflow-x-auto no-scrollbar py-4 px-4 flex gap-2 bg-gray-50/40 border-b border-gray-100">
        {suggestions.map((chip) => (
          <button
            key={chip.id}
            onClick={() => navigateTo(chip.id)}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full shadow-sm whitespace-nowrap active:scale-95 transition-all"
          >
            <span className="text-[14px] font-bold text-[#333333]">{chip.label}</span>
          </button>
        ))}
      </div>

      {/* 모델하우스 오픈 카운트다운 */}
      <div className="px-6 py-6">
        <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.06)] text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/10 via-primary to-primary/10"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-1.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
              <span className="text-primary text-[11px] font-black tracking-[0.15em]">2026. 05. 15 그랜드 오픈</span>
            </div>
            
            <div className="flex items-start justify-center gap-2">
              <div className="flex flex-col items-center min-w-[50px]">
                <div className="text-[32px] font-black text-[#1A1A1A] leading-none tracking-tighter tabular-nums">
                  {formatNum(timeLeft.days)}
                </div>
                <div className="text-[11px] font-bold text-gray-400 mt-2">일</div>
              </div>
              
              <div className="text-[24px] font-light text-gray-200 mt-0.5">:</div>
              
              <div className="flex flex-col items-center min-w-[50px]">
                <div className="text-[32px] font-black text-[#1A1A1A] leading-none tracking-tighter tabular-nums">
                  {formatNum(timeLeft.hours)}
                </div>
                <div className="text-[11px] font-bold text-gray-400 mt-2">시간</div>
              </div>

              <div className="text-[24px] font-light text-gray-200 mt-0.5">:</div>

              <div className="flex flex-col items-center min-w-[50px]">
                <div className="text-[32px] font-black text-[#1A1A1A] leading-none tracking-tighter tabular-nums">
                  {formatNum(timeLeft.minutes)}
                </div>
                <div className="text-[11px] font-bold text-gray-400 mt-2">분</div>
              </div>

              <div className="text-[24px] font-light text-gray-200 mt-0.5">:</div>

              <div className="flex flex-col items-center min-w-[50px]">
                <div className="text-[32px] font-black text-primary leading-none tracking-tighter tabular-nums">
                  {formatNum(timeLeft.seconds)}
                </div>
                <div className="text-[11px] font-bold text-gray-400 mt-2">초</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 비주얼 섹션 */}
      <div className="relative w-full px-4">
        <div 
          className="w-full aspect-[4/5] bg-cover bg-center rounded-[48px] relative overflow-hidden shadow-2xl"
          style={{ 
            backgroundImage: `url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200")` 
          }}
        >
          {/* 어두운 상단 오버레이를 조금 더 강화하여 가독성 확보 */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />
          
          <div className="absolute bottom-12 left-10 right-10">
            <div className="inline-block bg-primary/20 backdrop-blur-md px-5 py-2 rounded-full mb-6 border border-white/30">
              <p className="text-primary text-[11px] font-black tracking-[0.1em]">VVIP 특별 초청 단지</p>
            </div>
            
            <h1 className="text-white text-[28px] font-black leading-tight tracking-tighter drop-shadow-md">
              2026년 5월,<br/>
              양평의 새로운<br/>
              <span className="text-primary italic drop-shadow-none">Signature Life</span>
            </h1>
          </div>
        </div>
      </div>

      {/* 브랜드 메시지 */}
      <div className="px-10 py-20 text-center">
        <h2 className="text-[28px] font-black text-[#1A1A1A] tracking-tight leading-tight">작지만 완벽한 공간</h2>
        <p className="text-[#777777] text-[16px] mt-4 leading-relaxed font-medium">
          불필요한 것은 덜어내고 삶의 본질만 담았습니다.<br/>
          당신만을 위해 준비된 특별한 안식처를 만나보세요.
        </p>
      </div>

      {/* 하단 상담 신청 버튼 */}
      <div className="px-6 pb-12 mt-auto">
        <button 
          onClick={() => navigateTo(Screen.Contact)}
          className="w-full bg-primary h-20 rounded-[24px] text-white text-[18px] font-black shadow-2xl shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
        >
          VIP 사전 상담 신청하기
          <span className="material-symbols-outlined font-black">arrow_forward</span>
        </button>
      </div>

      {/* AI 챗봇 플로팅 버튼 (FAB) */}
      <div className="fixed bottom-24 right-6 z-[70] flex flex-col items-end gap-3 pointer-events-none">
        <div className="bg-white px-4 py-2.5 rounded-2xl shadow-xl border border-gray-100 animate-in fade-in slide-in-from-right-4 duration-700 delay-1000 pointer-events-auto">
            <p className="text-[#1A1A1A] text-[12px] font-bold tracking-tight">AI 컨시어지에게 질문해보세요! ✨</p>
        </div>
        <button 
          onClick={() => navigateTo(Screen.Chat)}
          className="size-16 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 active:scale-90 transition-all pointer-events-auto relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="material-symbols-outlined text-[32px] font-bold">smart_toy</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
