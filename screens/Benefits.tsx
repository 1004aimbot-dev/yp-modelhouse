
import React from 'react';
import { Screen } from '../types';
import TopNav from '../components/TopNav';
import { BENEFITS } from '../constants';

interface BenefitsProps {
  navigateTo: (screen: Screen) => void;
  goBack: () => void;
}

const Benefits: React.FC<BenefitsProps> = ({ navigateTo, goBack }) => {
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop";
  };

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <TopNav title="VIP 추천 가이드" onBack={goBack} />
      
      <div className="px-6 pt-6 pb-4">
        <div className="text-center mb-4">
          <span className="text-primary text-[9px] font-black tracking-[0.4em] uppercase mb-1.5 block opacity-60">Section 06</span>
          <h2 className="text-[26px] font-black leading-tight tracking-tighter text-[#1A1A1A]">
            이런 분에게<br/>추천합니다
          </h2>
        </div>

        <div className="relative rounded-[32px] overflow-hidden p-1">
          <div className="absolute inset-0 opacity-10 grayscale">
            <img 
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop" 
              className="w-full h-full object-cover" 
              alt="bg" 
              onError={handleImgError}
            />
          </div>
          
          <div className="relative z-10 space-y-2">
            {[
              "서울을 완전히 떠나고 싶진 않은 분",
              "주말용이 아닌 ‘실거주’를 원하는 분",
              "부모님, 혹은 자신의 노후를 고려하는 분",
              "집을 투자보다 ‘삶’으로 보는 분"
            ].map((text, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl flex items-center gap-3 border border-gray-100 shadow-sm active:scale-[0.99] transition-transform">
                <div className="size-6 bg-primary rounded-full flex items-center justify-center shrink-0 shadow-sm shadow-primary/20">
                  <span className="material-symbols-outlined text-white text-[14px] font-black">check</span>
                </div>
                <p className="font-bold text-text-main text-[15px] tracking-tight">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 p-6 bg-primary rounded-[28px] text-center shadow-lg shadow-primary/20 border border-white/20">
          <p className="text-white/90 font-bold text-[15px] leading-tight">
            하나라도 해당된다면,<br/>
            이 단지는 <span className="text-white text-[17px] font-black underline underline-offset-4 decoration-white/40">당신을 위한 선택</span>입니다.
          </p>
        </div>
      </div>

      <div className="px-6 py-6 bg-gray-50/50 flex-1">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-px flex-1 bg-gray-200"></div>
          <h4 className="font-black text-text-sub text-[12px] uppercase tracking-widest px-2 opacity-60 text-center">
            Limited VIP Benefits
          </h4>
          <div className="h-px flex-1 bg-gray-200"></div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
           {BENEFITS.map((benefit) => (
             <div key={benefit.id} className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100 flex flex-col group active:scale-95 transition-all">
               <div className="relative aspect-[4/3] overflow-hidden">
                 <img 
                    src={benefit.img} 
                    alt={benefit.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    onError={handleImgError}
                 />
                 <div className="absolute top-2 right-2 size-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm">
                   <span className="material-symbols-outlined text-primary text-[18px] font-bold">{benefit.icon}</span>
                 </div>
               </div>
               <div className="p-3.5">
                 <p className="text-primary text-[9px] font-black mb-0.5 tracking-tighter opacity-70">{benefit.number}</p>
                 <h5 className="text-[13px] font-black text-text-main leading-tight mb-1">{benefit.title}</h5>
                 <p className="text-[10px] text-text-sub font-medium opacity-60 leading-tight">{benefit.desc}</p>
               </div>
             </div>
           ))}
        </div>
        
        <p className="mt-4 text-center text-text-sub text-[11px] font-medium opacity-50">
          ※ 위 혜택은 사전 예약 10세대 한정으로 제공됩니다.
        </p>
      </div>

      <div className="px-6 pb-12 pt-4 bg-white">
        <button 
          onClick={() => navigateTo(Screen.Contact)}
          className="w-full bg-primary text-white h-20 rounded-full font-black text-[16px] shadow-2xl shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
        >
          VIP 사전 상담 신청하기
          <span className="material-symbols-outlined font-black group-hover:translate-x-1 transition-transform">chevron_right</span>
        </button>
      </div>
    </div>
  );
};

export default Benefits;
