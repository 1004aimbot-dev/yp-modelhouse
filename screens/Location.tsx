
import React from 'react';
import { Screen } from '../types';
import TopNav from '../components/TopNav';

interface LocationProps {
  navigateTo: (screen: Screen) => void;
  goBack: () => void;
}

const LocationScreen: React.FC<LocationProps> = ({ navigateTo, goBack }) => {
  return (
    <div className="flex flex-col bg-white min-h-screen">
      <TopNav title="입지 및 교통 안내" onBack={goBack} />
      
      {/* SECTION 02: 정밀 시간-거리 인포그래픽 */}
      <div className="px-6 py-8 text-center border-b border-gray-50">
        <span className="text-primary text-[9px] font-black tracking-[0.4em] uppercase mb-2 block opacity-70">Section 02</span>
        <h2 className="text-[24px] font-black leading-tight tracking-tighter text-[#1A1A1A] mb-8">
          가깝기 때문에<br/>가능한 삶
        </h2>
        
        {/* 정밀 트래블 맵 (320x320) */}
        <div className="relative w-full max-w-[320px] mx-auto aspect-square mb-10 flex items-center justify-center bg-[#F9F9F9] rounded-full border border-gray-100 shadow-inner">
          
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 320 320">
            <circle cx="160" cy="160" r="140" fill="none" stroke="#EAEAEA" stroke-width="1.5" />
            <circle cx="160" cy="160" r="100" fill="none" stroke="#EAEAEA" stroke-width="1" stroke-dasharray="4 4" />
            <circle cx="160" cy="160" r="50" fill="#FFFFFF" stroke="#EAEAEA" stroke-width="1.2" />
            
            <line x1="160" y1="160" x2="160" y2="20" stroke="#FF4D4D" stroke-width="1" stroke-dasharray="2 2" />
            <line x1="160" y1="160" x2="260" y2="80" stroke="#FF4D4D" stroke-width="1.5" stroke-dasharray="2 2" />
            <line x1="160" y1="160" x2="100" y2="210" stroke="#139E8C" stroke-width="2" stroke-linecap="round" />
            <line x1="160" y1="160" x2="220" y2="210" stroke="#CCCCCC" stroke-width="1.5" />
          </svg>

          <div className="z-20 bg-primary size-14 rounded-full flex flex-col items-center justify-center shadow-2xl shadow-primary/40 border-[3px] border-white">
            <span className="material-symbols-outlined text-white text-[18px] font-bold">home</span>
            <span className="text-white text-[8px] font-black tracking-tighter mt-0.5">SITE</span>
          </div>

          <div className="absolute top-[5px] left-1/2 -translate-x-1/2 z-10">
            <div className="bg-white px-3 py-1.5 rounded-lg shadow-md border border-gray-100 flex items-center gap-1.5">
              <span className="text-gray-400 font-black text-[11px]">강남 40분</span>
              <div className="size-1.5 rounded-full bg-gray-200"></div>
            </div>
          </div>

          <div className="absolute top-[65px] right-[25px] z-10 animate-bounce-subtle">
            <div className="bg-[#FF4D4D] px-3.5 py-1.5 rounded-xl shadow-xl flex items-center gap-1.5 border border-white/20">
              <span className="text-white font-black text-[13px]">잠실 25분</span>
              <span className="material-symbols-outlined text-white text-[14px]">location_on</span>
            </div>
          </div>

          <div className="absolute top-[205px] left-[65px] z-10">
            <div className="bg-white px-2.5 py-1.5 rounded-lg shadow-sm border border-primary/40 flex items-center gap-1">
              <span className="text-primary font-black text-[11px]">서종 IC 1분</span>
              <div className="size-1.5 rounded-full bg-primary animate-pulse"></div>
            </div>
          </div>
          
          <div className="absolute top-[205px] left-[185px] z-10">
            <div className="bg-white px-2.5 py-1.5 rounded-lg shadow-sm border border-gray-200 flex items-center gap-1">
              <span className="text-gray-500 font-black text-[11px]">두물머리 3분</span>
              <div className="size-1.5 rounded-full bg-gray-200"></div>
            </div>
          </div>
        </div>

        <p className="text-[15px] font-black text-text-main leading-tight tracking-tight">
          “출근도 가능한 전원주택,<br/>
          그래서 주말용이 아닙니다.”
        </p>
      </div>

      {/* SECTION 03: 고지대 입지 인포그래픽 */}
      <div className="px-5 py-8 bg-gray-50/50">
        <div className="text-center mb-6">
          <span className="text-primary text-[9px] font-black tracking-[0.4em] uppercase mb-1.5 block opacity-70">Section 03</span>
          <h3 className="text-[20px] font-black text-text-main tracking-tighter">입지는 복제될 수 없습니다</h3>
        </div>

        <div className="space-y-3">
          <div className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-100/50">
            <div className="flex items-center gap-4 mb-4">
               <div className="size-9 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                 <span className="material-symbols-outlined text-[18px] font-bold">water_lux</span>
               </div>
               <h4 className="font-black text-[15px]">강을 내려다보는 고지대 입지</h4>
            </div>
            
            <div className="h-20 w-full bg-[#F5F5F5] rounded-xl relative overflow-hidden flex items-end px-4 border border-gray-200/50">
               <svg className="w-full h-full" viewBox="0 0 200 80">
                 <path d="M0 80 L70 80 L140 40 L200 35 L200 80 Z" fill="#E2E8F0" />
                 <path d="M140 40 L200 35" stroke="#139E8C" stroke-width="2" stroke-dasharray="3 3" />
                 <circle cx="180" cy="38" r="4" fill="#FF4D4D" />
               </svg>
               <div className="absolute left-4 bottom-2 text-[9px] font-black text-blue-400">Bukhangang River</div>
               <div className="absolute right-4 top-2 text-[8px] font-black text-primary/60 tracking-tighter">FLOOD FREE ZONE</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-[24px] shadow-sm border border-gray-100/50 flex items-center gap-3">
            <div className="size-9 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[18px] font-bold">verified</span>
            </div>
            <div>
              <p className="font-black text-[14px]">검증된 서종 생활권</p>
              <p className="text-text-sub text-[11px] font-medium opacity-60 leading-tight">유명 카페, 문화 공간이 공존하는 지역</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-12 bg-white mt-auto pt-6">
        <button 
          onClick={() => navigateTo(Screen.Types)}
          className="w-full bg-primary text-white h-20 rounded-full font-black text-[16px] shadow-2xl shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
        >
          평형 및 가격대 확인
          <span className="material-symbols-outlined font-black group-hover:translate-x-1 transition-transform">chevron_right</span>
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
