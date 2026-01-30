
import React from 'react';
import { Screen } from '../types';
import TopNav from '../components/TopNav';

interface LocationProps {
  navigateTo: (screen: Screen) => void;
  goBack: () => void;
}

const LocationScreen: React.FC<LocationProps> = ({ navigateTo, goBack }) => {
  return (
    <div className="flex flex-col bg-[#F4F6F8] min-h-screen">
      <TopNav title="입지 및 교통 안내" onBack={goBack} />
      
      {/* SECTION 02: 거리로 증명되는 프리미엄 */}
      <div className="px-6 py-12 text-center bg-white">
        <span className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase mb-3 block">Section 02</span>
        <h2 className="text-[30px] font-black leading-tight tracking-tighter text-[#1A1A1A]">
          가깝기 때문에<br/>가능한 삶
        </h2>
        
        <div className="mt-8 space-y-4">
          <div className="flex justify-center gap-3">
             <div className="bg-gray-50 px-5 py-4 rounded-2xl border border-gray-100 flex-1">
               <p className="text-xs text-gray-400 font-bold mb-1">🚗 잠실</p>
               <p className="text-xl font-black text-primary">25분</p>
             </div>
             <div className="bg-gray-50 px-5 py-4 rounded-2xl border border-gray-100 flex-1">
               <p className="text-xs text-gray-400 font-bold mb-1">🚗 강남</p>
               <p className="text-xl font-black text-primary">35분</p>
             </div>
          </div>
          <div className="flex justify-center gap-3">
             <div className="bg-gray-50 px-5 py-4 rounded-2xl border border-gray-100 flex-1">
               <p className="text-xs text-gray-400 font-bold mb-1">🛣 서종 IC</p>
               <p className="text-lg font-black text-gray-700">1분</p>
             </div>
             <div className="bg-gray-50 px-5 py-4 rounded-2xl border border-gray-100 flex-1">
               <p className="text-xs text-gray-400 font-bold mb-1">🛣 두물머리 IC</p>
               <p className="text-lg font-black text-gray-700">3분</p>
             </div>
          </div>
        </div>

        <p className="mt-8 text-lg font-black text-text-main leading-relaxed">
          “출근도 가능한 전원주택,<br/>
          그래서 주말용이 아닙니다.”
        </p>
      </div>

      {/* SECTION 03: 입지 가치 */}
      <div className="px-6 py-16 bg-primary/5">
        <div className="text-center mb-10">
          <span className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase mb-2 block">Section 03</span>
          <h3 className="text-[26px] font-black text-text-main">북한강 + 서울 접근성</h3>
          <p className="text-primary font-bold mt-2">입지는 따라 만들 수 없습니다</p>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-[28px] shadow-sm flex items-start gap-4">
            <span className="material-symbols-outlined text-primary font-bold">water_lux</span>
            <div>
              <p className="font-black text-lg">강을 내려다보는 고지대 입지</p>
              <p className="text-text-sub text-sm">홍수 걱정 없는 안전한 뷰 포인트</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-[28px] shadow-sm flex items-start gap-4">
            <span className="material-symbols-outlined text-primary font-bold">verified</span>
            <div>
              <p className="font-black text-lg">검증된 서종 생활권</p>
              <p className="text-text-sub text-sm">유명 카페, 문화 공간이 공존하는 지역</p>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-text-sub text-[15px] leading-relaxed">
          이 조건은<br/>
          돈으로도, 설계로도 복제되지 않습니다.
        </p>
      </div>

      {/* 하단 버튼 - 폭과 높이 통일 */}
      <div className="px-6 pb-12 bg-white mt-auto">
        <button 
          onClick={() => navigateTo(Screen.Types)}
          className="w-full bg-primary text-white h-20 rounded-[24px] font-black text-[18px] shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          평형 및 가격대 확인하기
          <span className="material-symbols-outlined text-[22px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default LocationScreen;
