
import React, { useState, useEffect, useRef } from 'react';
import { Screen } from '../types';

interface HomeProps {
  navigateTo: (screen: Screen) => void;
  toggleMenu: () => void;
}

const Home: React.FC<HomeProps> = ({ navigateTo, toggleMenu }) => {
  const locationSectionRef = useRef<HTMLDivElement>(null);
  
  const suggestions = [
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

  const handleChipClick = (id: string) => {
    if (id === 'scroll-location') {
      locationSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigateTo(id as Screen);
    }
  };

  return (
    <div className="flex flex-col bg-white min-h-screen animate-in fade-in duration-500 relative">
      {/* 상단 헤더 */}
      <header className="sticky top-0 z-[60] bg-white/95 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          {/* Minimalist Logo */}
          <div className="size-10 bg-primary/5 rounded-xl flex items-center justify-center mr-3 border border-primary/10 shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
              <path d="M7 4L12 11L17 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 11V20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 16C16 16 18 16 19 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
              <path d="M5 14C5 14 6 14 7 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-primary text-[10px] font-black tracking-widest uppercase leading-none">양평 리빙 컴팩트 빌리지</span>
            <h2 className="text-[17px] font-bold tracking-tight text-text-main leading-tight mt-1">VIP 특별 초청장</h2>
          </div>
        </div>
        <button 
          onClick={toggleMenu}
          className="size-11 bg-gray-50 rounded-full flex items-center justify-center text-primary active:scale-90 transition-transform shadow-sm"
        >
          <span className="material-symbols-outlined text-[26px]">menu</span>
        </button>
      </header>

      {/* 추천 칩 섹션 */}
      <div className="w-full overflow-x-auto no-scrollbar py-3 px-4 flex items-center gap-3 bg-gray-50/40 border-b border-gray-100">
        <span className="text-[10px] font-black text-primary uppercase tracking-tighter shrink-0 bg-primary/10 px-2 py-1 rounded-md">추천 가이드</span>
        <div className="flex gap-2">
          {suggestions.map((chip) => (
            <button
              key={chip.id}
              onClick={() => handleChipClick(chip.id)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm whitespace-nowrap active:scale-95 transition-all"
            >
              <span className="text-[13px] font-bold text-[#333333]">{chip.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 모델하우스 오픈 카운트다운 */}
      <div className="px-6 pt-6 pb-4">
        <div className="bg-white rounded-[32px] p-5 border border-gray-100 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)] text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/10 via-primary to-primary/10"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-1.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
              <span className="text-primary text-[10px] font-black tracking-[0.15em]">2026. 05. 15 그랜드 오픈</span>
            </div>
            
            <div className="flex items-start justify-center gap-2">
              <div className="flex flex-col items-center min-w-[45px]">
                <div className="text-[26px] font-black text-[#1A1A1A] leading-none tracking-tighter tabular-nums">
                  {formatNum(timeLeft.days)}
                </div>
                <div className="text-[10px] font-bold text-gray-400 mt-1.5">일</div>
              </div>
              <div className="text-[22px] font-black text-[#1A1A1A] mt-0.5">:</div>
              <div className="flex flex-col items-center min-w-[45px]">
                <div className="text-[26px] font-black text-[#1A1A1A] leading-none tracking-tighter tabular-nums">
                  {formatNum(timeLeft.hours)}
                </div>
                <div className="text-[10px] font-bold text-gray-400 mt-1.5">시간</div>
              </div>
              <div className="text-[22px] font-black text-[#1A1A1A] mt-0.5">:</div>
              <div className="flex flex-col items-center min-w-[45px]">
                <div className="text-[26px] font-black text-[#1A1A1A] leading-none tracking-tighter tabular-nums">
                  {formatNum(timeLeft.minutes)}
                </div>
                <div className="text-[10px] font-bold text-gray-400 mt-1.5">분</div>
              </div>
              <div className="text-[22px] font-black text-[#1A1A1A] mt-0.5">:</div>
              <div className="flex flex-col items-center min-w-[45px]">
                <div className="text-[26px] font-black text-primary leading-none tracking-tighter tabular-nums">
                  {formatNum(timeLeft.seconds)}
                </div>
                <div className="text-[10px] font-bold text-gray-400 mt-1.5">초</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 비주얼 섹션 */}
      <div className="relative w-full px-4">
        <div 
          className="w-full aspect-[4/5] bg-cover bg-center rounded-[40px] relative overflow-hidden shadow-xl"
          style={{ 
            backgroundImage: `url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200")` 
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />
          
          <div className="absolute bottom-10 left-8 right-8">
            <div className="inline-block bg-white/80 backdrop-blur-lg px-4 py-2 rounded-full mb-4 border border-primary/10 shadow-md">
              <p className="text-primary text-[11px] font-black tracking-[0.1em]">VVIP 특별 초청 단지</p>
            </div>
            
            <h1 className="text-white text-[24px] font-black leading-tight tracking-tighter drop-shadow-md">
              2026년 5월,<br/>
              양평의 새로운<br/>
              <span className="text-primary italic drop-shadow-sm">Signature Life</span>
            </h1>
          </div>
        </div>
      </div>

      {/* 브랜드 메시지 */}
      <div className="px-10 py-12 text-center">
        <h2 className="text-[24px] font-black text-[#1A1A1A] tracking-tight leading-tight">작지만 완벽한 공간</h2>
        <p className="text-[#777777] text-[14px] mt-3 leading-relaxed font-medium">
          불필요한 것은 덜어내고 삶의 본질만 담았습니다.<br/>
          당신만을 위해 준비된 특별한 안식처를 만나보세요.
        </p>
      </div>

      {/* --- 입지 통합 섹션 --- */}
      <div ref={locationSectionRef} className="scroll-mt-20 border-t border-gray-100 bg-white">
        <div className="px-6 py-10 text-center border-b border-gray-50">
          <span className="text-primary text-[8px] font-black tracking-[0.4em] uppercase mb-1.5 block opacity-60">Section 02</span>
          <h2 className="text-[22px] font-black leading-tight tracking-tighter text-[#1A1A1A] mb-6">
            가깝기 때문에<br/>가능한 삶
          </h2>
          
          <div className="relative w-full max-w-[280px] mx-auto aspect-square mb-8 flex items-center justify-center bg-[#F9F9F9] rounded-full border border-gray-100 shadow-inner">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 320 320">
              <circle cx="160" cy="160" r="140" fill="none" stroke="#EAEAEA" stroke-width="1.5" />
              <circle cx="160" cy="160" r="100" fill="none" stroke="#EAEAEA" stroke-width="1" stroke-dasharray="4 4" />
              <circle cx="160" cy="160" r="50" fill="#FFFFFF" stroke="#EAEAEA" stroke-width="1.2" />
              
              <line x1="160" y1="160" x2="160" y2="20" stroke="#FF4D4D" stroke-width="1" stroke-dasharray="2 2" />
              <line x1="160" y1="160" x2="260" y2="80" stroke="#FF4D4D" stroke-width="1.5" stroke-dasharray="2 2" />
              <line x1="160" y1="160" x2="100" y2="210" stroke="#139E8C" stroke-width="2" stroke-linecap="round" />
              <line x1="160" y1="160" x2="220" y2="210" stroke="#CCCCCC" stroke-width="1.5" />
            </svg>

            <div className="z-20 bg-primary size-12 rounded-full flex flex-col items-center justify-center shadow-xl shadow-primary/30 border-[2px] border-white">
              <span className="material-symbols-outlined text-white text-[16px] font-bold">home</span>
              <span className="text-white text-[7px] font-black tracking-tighter mt-0.5 uppercase">현장</span>
            </div>

            <div className="absolute top-[8px] left-1/2 -translate-x-1/2 z-10">
              <div className="bg-white px-2.5 py-1 rounded-lg shadow-sm border border-gray-100 flex items-center gap-1">
                <span className="text-gray-400 font-black text-[10px]">강남 40분</span>
                <div className="size-1 rounded-full bg-gray-200"></div>
              </div>
            </div>

            <div className="absolute top-[60px] right-[20px] z-10 animate-bounce-subtle">
              <div className="bg-[#FF4D4D] px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1 border border-white/20">
                <span className="text-white font-black text-[12px]">잠실 25분</span>
                <span className="material-symbols-outlined text-white text-[12px]">location_on</span>
              </div>
            </div>

            <div className="absolute top-[190px] left-[55px] z-10">
              <div className="bg-white px-2 py-1 rounded-lg shadow-sm border border-primary/30 flex items-center gap-1">
                <span className="text-primary font-black text-[10px]">서종 IC 1분</span>
                <div className="size-1 rounded-full bg-primary animate-pulse"></div>
              </div>
            </div>
            
            <div className="absolute top-[190px] left-[175px] z-10">
              <div className="bg-white px-2 py-1 rounded-lg shadow-sm border border-gray-200 flex items-center gap-1">
                <span className="text-gray-500 font-black text-[10px]">두물머리 3분</span>
                <div className="size-1 rounded-full bg-gray-200"></div>
              </div>
            </div>
          </div>

          <p className="text-[14px] font-black text-text-main leading-tight tracking-tight px-4">
            “출근도 가능한 전원주택,<br/>
            그래서 주말용이 아닙니다.”
          </p>
        </div>

        <div className="px-5 py-10 bg-gray-50/40">
          <div className="text-center mb-6">
            <span className="text-primary text-[8px] font-black tracking-[0.4em] uppercase mb-1.5 block opacity-60">Section 03</span>
            <h3 className="text-[19px] font-black text-text-main tracking-tighter">입지는 복제될 수 없습니다</h3>
          </div>

          <div className="space-y-2.5 max-w-[400px] mx-auto">
            <div className="bg-white p-5 rounded-[28px] shadow-sm border border-gray-100/50">
              <div className="flex items-center gap-3 mb-3">
                 <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                   <span className="material-symbols-outlined text-[16px] font-bold">water_lux</span>
                 </div>
                 <h4 className="font-black text-[14px]">강을 내려다보는 고지대 입지</h4>
              </div>
              
              <div className="h-20 w-full bg-[#F5F5F5] rounded-xl relative overflow-hidden flex items-end px-3 border border-gray-200/50">
                 <svg className="w-full h-full" viewBox="0 0 200 80">
                   <path d="M0 80 L70 80 L140 40 L200 35 L200 80 Z" fill="#E2E8F0" />
                   <path d="M140 40 L200 35" stroke="#139E8C" stroke-width="2" stroke-dasharray="3 3" />
                   <circle cx="180" cy="38" r="4" fill="#FF4D4D" />
                 </svg>
                 <div className="absolute left-3 bottom-2 text-[8px] font-black text-blue-400 uppercase tracking-tighter opacity-70">북한강 (Bukhangang)</div>
                 <div className="absolute right-3 top-2 text-[7px] font-black text-primary/60 tracking-tighter">침수 걱정 없는 고지대</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-[28px] shadow-sm border border-gray-100/50 flex items-center gap-3">
              <div className="size-9 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[16px] font-bold">verified</span>
              </div>
              <div>
                <p className="font-black text-[13px]">검증된 서종 생활권</p>
                <p className="text-text-sub text-[10px] font-medium opacity-60 leading-tight">유명 카페, 문화 공간이 공존하는 지역</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 bg-white sticky bottom-0 z-40 border-t border-gray-50/50 backdrop-blur-sm">
        <button 
          onClick={() => navigateTo(Screen.Contact)}
          className="w-full bg-primary h-16 rounded-[20px] text-white text-[15px] font-black shadow-xl shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
        >
          VIP 사전 상담 신청하기
          <span className="material-symbols-outlined font-black text-[20px]">arrow_forward</span>
        </button>
      </div>

      <style>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2.5s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Home;
