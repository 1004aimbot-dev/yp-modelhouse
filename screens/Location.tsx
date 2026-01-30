
import React from 'react';
import { Screen } from '../types';
import TopNav from '../components/TopNav';

interface LocationProps {
  navigateTo: (screen: Screen) => void;
  goBack: () => void;
  toggleMenu: () => void;
}

const LocationScreen: React.FC<LocationProps> = ({ navigateTo, goBack, toggleMenu }) => {
  return (
    <div className="flex flex-col bg-white min-h-screen">
      <TopNav title="입지 및 교통 안내" onBack={goBack} onMenu={toggleMenu} />
      
      {/* SECTION 02: 동적 연결성 인포그래픽 */}
      <div className="px-6 py-12 text-center border-b border-gray-50 bg-gradient-to-b from-white to-gray-50/30">
        <span className="text-primary text-[10px] font-black tracking-[0.4em] uppercase mb-4 block opacity-70">Connectivity Logic</span>
        <h2 className="text-[26px] font-black leading-tight tracking-tighter text-[#1A1A1A] mb-10">
          서울을 곁에 둔<br/>압도적인 <span className="text-primary italic">20분대의 기적</span>
        </h2>
        
        {/* 애니메이션 트래블 레이아웃 */}
        <div className="relative w-full max-w-[340px] mx-auto aspect-[1/1] mb-12 flex items-center justify-center">
          
          {/* 배경 그리드/링 */}
          <div className="absolute inset-0 flex items-center justify-center opacity-40">
            <div className="absolute w-[100%] h-[100%] border border-dashed border-gray-200 rounded-full"></div>
            <div className="absolute w-[75%] h-[75%] border border-dashed border-gray-200 rounded-full"></div>
            <div className="absolute w-[50%] h-[50%] border border-dashed border-gray-200 rounded-full"></div>
          </div>

          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 340 340">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#139E8C" stopOpacity="0" />
                <stop offset="50%" stopColor="#139E8C" stopOpacity="1" />
                <stop offset="100%" stopColor="#139E8C" stopOpacity="0" />
              </linearGradient>
            </defs>
            
            {/* 서울-현장 메인 루트 (잠실) */}
            <path 
              d="M170 170 Q 240 100, 270 60" 
              fill="none" 
              stroke="#FF4D4D" 
              strokeWidth="2.5" 
              strokeLinecap="round"
              className="animated-path"
              style={{ strokeDasharray: '6, 4', animationDuration: '0.8s' }}
            />
            
            {/* 서울-현장 메인 루트 (강남) */}
            <path 
              d="M170 170 Q 170 80, 170 20" 
              fill="none" 
              stroke="#666" 
              strokeWidth="2" 
              strokeLinecap="round"
              className="animated-path"
              style={{ strokeDasharray: '4, 6', animationDuration: '1.2s' }}
            />

            {/* 서종 IC 루프 */}
            <path 
              d="M170 170 L 100 220" 
              fill="none" 
              stroke="#139E8C" 
              strokeWidth="3" 
              strokeLinecap="round"
              className="animated-path"
              style={{ animationDuration: '0.5s' }}
            />
          </svg>

          {/* 현장 마커 (중심) */}
          <div className="z-30 relative">
            <div className="absolute -inset-6 bg-primary/20 rounded-full animate-ping opacity-30"></div>
            <div className="bg-primary size-16 rounded-3xl flex flex-col items-center justify-center shadow-2xl shadow-primary/40 border-[4px] border-white transform rotate-45">
              <div className="-rotate-45 flex flex-col items-center">
                <span className="material-symbols-outlined text-white text-[20px] font-bold">home</span>
                <span className="text-white text-[9px] font-black tracking-tighter mt-0.5">SITE</span>
              </div>
            </div>
          </div>

          {/* 잠실 마커 */}
          <div className="absolute top-[35px] right-[40px] z-20 group">
            <div className="relative flex flex-col items-center">
              <div className="bg-[#FF4D4D] text-white px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 border border-white/20 animate-pulse-soft">
                <span className="font-black text-[14px]">잠실 25분</span>
                <span className="material-symbols-outlined text-[16px]">speed</span>
              </div>
              <div className="w-px h-6 bg-gradient-to-b from-[#FF4D4D] to-transparent"></div>
            </div>
          </div>

          {/* 강남 마커 */}
          <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 z-20">
            <div className="bg-white px-3 py-1.5 rounded-xl shadow-md border border-gray-100 flex items-center gap-2">
              <span className="text-text-sub font-black text-[11px]">강남 40분</span>
              <div className="size-2 rounded-full bg-gray-200"></div>
            </div>
          </div>

          {/* 서종 IC 마커 */}
          <div className="absolute bottom-[80px] left-[45px] z-20">
            <div className="flex flex-col items-end">
              <div className="bg-white px-3 py-2 rounded-xl shadow-lg border border-primary/20 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[16px] font-black">directions_car</span>
                <span className="text-primary font-black text-[13px]">서종 IC 1분</span>
              </div>
              <p className="text-[10px] font-bold text-primary/60 mt-1 mr-2 tracking-tighter uppercase">Direct Access</p>
            </div>
          </div>
        </div>

        <div className="max-w-[300px] mx-auto space-y-4">
          <p className="text-[16px] font-black text-text-main leading-snug tracking-tight">
            서종 IC에서 600m,<br/>
            내리자마자 <span className="text-primary">집이 마중 나옵니다.</span>
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-gray-200"></span>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Efficiency of Life</span>
            <span className="h-px w-8 bg-gray-200"></span>
          </div>
        </div>
      </div>

      {/* SECTION 03: 고지대 입지 가독성 강화 */}
      <div className="px-5 py-16 bg-gray-50/50">
        <div className="text-center mb-10">
          <span className="text-primary text-[10px] font-black tracking-[0.4em] uppercase mb-2 block opacity-70">Geological Advantage</span>
          <h3 className="text-[22px] font-black text-text-main tracking-tighter">압도적인 조망, 안전한 삶</h3>
        </div>

        <div className="space-y-4 max-w-[420px] mx-auto">
          <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 group">
            <div className="flex items-center gap-4 mb-5">
               <div className="size-11 bg-primary/10 rounded-2xl flex items-center justify-center text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                 <span className="material-symbols-outlined text-[22px] font-bold">water_lux</span>
               </div>
               <div>
                 <h4 className="font-black text-[16px] text-text-main">북한강 파노라마 뷰</h4>
                 <p className="text-[12px] text-text-sub font-medium opacity-60">침수 걱정 없는 고지대 입지</p>
               </div>
            </div>
            
            <div className="h-24 w-full bg-[#F5F5F5] rounded-[24px] relative overflow-hidden flex items-end px-5 border border-gray-200/50">
               <svg className="w-full h-full" viewBox="0 0 200 80" preserveAspectRatio="none">
                 <path d="M0 80 L60 80 L130 45 L200 40 L200 80 Z" fill="#E2E8F0" />
                 <path d="M130 45 L200 40" stroke="#139E8C" strokeWidth="2.5" strokeDasharray="4 3" />
                 <circle cx="180" cy="42" r="5" fill="#FF4D4D" className="animate-pulse" />
               </svg>
               <div className="absolute left-5 bottom-3 text-[10px] font-black text-blue-400 uppercase tracking-tighter opacity-70">Bukhangang (North Han River)</div>
               <div className="absolute right-5 top-3 text-[9px] font-black text-primary bg-white/80 px-2 py-1 rounded-full shadow-sm">Elevation: +45m</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-[32px] shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="size-11 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[20px] font-bold">verified</span>
            </div>
            <div>
              <p className="font-black text-[15px] text-text-main">희소가치가 입증된 서종</p>
              <p className="text-text-sub text-[12px] font-medium opacity-60 leading-tight">정재계 인사들이 선호하는 양평 최고의 부촌</p>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 전환 버튼 */}
      <div className="px-6 pb-16 bg-white mt-auto pt-8 border-t border-gray-50">
        <button 
          onClick={() => navigateTo(Screen.Types)}
          className="w-full bg-primary text-white h-20 rounded-full font-black text-[17px] shadow-2xl shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
        >
          평형별 조망권 미리보기
          <span className="material-symbols-outlined font-black group-hover:translate-x-1 transition-transform text-[22px]">chevron_right</span>
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

export default LocationScreen;
