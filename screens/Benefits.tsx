
import React from 'react';
import { Screen } from '../types';
import TopNav from '../components/TopNav';

interface BenefitsProps {
  navigateTo: (screen: Screen) => void;
  goBack: () => void;
}

const Benefits: React.FC<BenefitsProps> = ({ navigateTo, goBack }) => {
  return (
    <div className="flex flex-col bg-white">
      <TopNav title="VIP 추천 가이드" onBack={goBack} />
      
      {/* SECTION 06: 이런 분에게 추천합니다 */}
      <div className="px-6 py-12">
        <div className="text-center mb-12">
          <span className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase mb-3 block">Section 06</span>
          <h2 className="text-[30px] font-black leading-tight tracking-tighter text-[#1A1A1A]">
            이런 분에게<br/>추천합니다
          </h2>
        </div>

        <div className="space-y-4">
          {[
            "서울을 완전히 떠나고 싶진 않은 분",
            "주말용이 아닌 ‘실거주’를 원하는 분",
            "부모님, 혹은 자신의 노후를 고려하는 분",
            "집을 투자보다 ‘삶’으로 보는 분"
          ].map((text, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-[24px] flex items-center gap-4">
              <div className="size-8 bg-primary rounded-full flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-white text-[18px] font-bold">check</span>
              </div>
              <p className="font-bold text-text-main text-[17px]">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-primary rounded-[32px] text-center shadow-xl shadow-primary/20">
          <p className="text-white/90 font-bold text-lg leading-relaxed">
            하나라도 해당된다면,<br/>
            이 단지는 <span className="text-white text-2xl font-black underline underline-offset-8">당신을 위한 선택</span>입니다.
          </p>
        </div>
      </div>

      <div className="p-8 pb-20 border-t border-gray-50 bg-gray-50/50">
        <h4 className="text-center font-black text-text-main text-xl mb-8">한정된 세대에게만 드리는<br/>사전 예약 특별 혜택</h4>
        <div className="grid grid-cols-2 gap-4">
           <div className="bg-white p-5 rounded-2xl text-center shadow-sm">
             <span className="material-symbols-outlined text-primary mb-2">ac_unit</span>
             <p className="text-xs font-bold">시스템 에어컨</p>
           </div>
           <div className="bg-white p-5 rounded-2xl text-center shadow-sm">
             <span className="material-symbols-outlined text-primary mb-2">payments</span>
             <p className="text-xs font-bold">취득세 지원</p>
           </div>
        </div>
      </div>

      {/* 하단 버튼 - 폭과 높이 통일 */}
      <div className="px-6 pb-12 mt-4">
        <button 
          onClick={() => navigateTo(Screen.Contact)}
          className="w-full bg-primary text-white h-20 rounded-[24px] font-black text-[18px] shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center"
        >
          상담 요청
        </button>
      </div>
    </div>
  );
};

export default Benefits;
