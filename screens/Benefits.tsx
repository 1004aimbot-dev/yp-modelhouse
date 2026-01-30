
import React from 'react';
import { Screen } from '../types';
import TopNav from '../components/TopNav';
import { BENEFITS } from '../constants';

interface BenefitsProps {
  navigateTo: (screen: Screen) => void;
  goBack: () => void;
  toggleMenu: () => void;
}

const Benefits: React.FC<BenefitsProps> = ({ navigateTo, goBack, toggleMenu }) => {
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop";
  };

  const targets = [
    {
      text: "서울을 완전히 떠나고 싶진 않은 분",
      img: "https://images.unsplash.com/photo-1548115184-bc6544d06a58?q=80&w=800&auto=format&fit=crop",
      tag: "CITY-NATURE LINK"
    },
    {
      text: "주말용이 아닌 ‘실거주’를 원하는 분",
      img: "https://images.unsplash.com/photo-1600585154542-6379b17449fd?q=80&w=800&auto=format&fit=crop",
      tag: "REAL LIFE SPACE"
    },
    {
      text: "부모님, 혹은 자신의 노후를 고려하는 분",
      img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop",
      tag: "PEACEFUL RETIREMENT"
    },
    {
      text: "집을 투자보다 ‘삶’으로 보는 분",
      img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
      tag: "LIFE AS ART"
    }
  ];

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <TopNav title="VIP 추천 가이드" onBack={goBack} onMenu={toggleMenu} />
      
      <div className="px-6 pt-10 pb-12">
        <div className="text-center mb-10">
          <span className="text-primary text-[10px] font-black tracking-[0.4em] uppercase mb-2 block opacity-60">Section 06</span>
          <h2 className="text-[28px] font-black leading-tight tracking-tighter text-[#1A1A1A]">
            이런 분에게<br/>추천합니다
          </h2>
        </div>

        <div className="space-y-12">
          {targets.map((item, idx) => (
            <div key={idx} className="group animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${idx * 150}ms` }}>
              {/* 리스트 항목 */}
              <div className="flex items-center gap-4 mb-6 px-2">
                <div className="size-8 bg-primary rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                  <span className="material-symbols-outlined text-white text-[16px] font-black">check</span>
                </div>
                <p className="font-black text-text-main text-[18px] tracking-tight">{item.text}</p>
              </div>

              {/* 사이 일러스트레이션 */}
              <div className="relative aspect-[16/9] w-full rounded-[32px] overflow-hidden shadow-xl border border-gray-100 group-hover:scale-[1.02] transition-transform duration-500">
                <img 
                  src={item.img} 
                  className="w-full h-full object-cover" 
                  alt={item.tag} 
                  onError={handleImgError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-6">
                  <span className="text-white/80 text-[10px] font-black tracking-[0.2em] uppercase">{item.tag}</span>
                </div>
              </div>
              
              {/* 구분선 (마지막 항목 제외) */}
              {idx !== targets.length - 1 && (
                <div className="flex justify-center mt-12">
                  <div className="w-px h-12 bg-gradient-to-b from-primary/30 to-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-primary rounded-[40px] text-center shadow-2xl shadow-primary/30 border border-white/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="material-symbols-outlined text-[120px]">villa</span>
          </div>
          <p className="relative z-10 text-white font-black text-[18px] leading-snug">
            하나라도 해당된다면,<br/>
            이 단지는 <span className="text-white underline underline-offset-4 decoration-white/40 italic">당신을 위한 정답</span>입니다.
          </p>
        </div>
      </div>

      <div className="px-6 py-12 bg-gray-50/50 border-y border-gray-100">
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="size-1.5 bg-primary rounded-full"></div>
          <h4 className="font-black text-text-main text-[14px] uppercase tracking-widest">
            Limited VIP Benefits
          </h4>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
           {BENEFITS.map((benefit) => (
             <div key={benefit.id} className="bg-white rounded-[28px] overflow-hidden shadow-sm border border-gray-100 flex flex-col group active:scale-95 transition-all">
               <div className="relative aspect-square overflow-hidden">
                 <img 
                    src={benefit.img} 
                    alt={benefit.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    onError={handleImgError}
                 />
                 <div className="absolute top-3 right-3 size-9 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-md">
                   <span className="material-symbols-outlined text-primary text-[20px] font-bold">{benefit.icon}</span>
                 </div>
               </div>
               <div className="p-5">
                 <p className="text-primary text-[10px] font-black mb-1 tracking-tighter opacity-70">{benefit.number}</p>
                 <h5 className="text-[14px] font-black text-text-main leading-tight mb-1.5">{benefit.title}</h5>
                 <p className="text-[11px] text-text-sub font-medium opacity-60 leading-tight">{benefit.desc}</p>
               </div>
             </div>
           ))}
        </div>
        
        <p className="mt-6 text-center text-text-sub text-[11px] font-medium opacity-50">
          ※ 위 혜택은 사전 예약 10세대 한정으로 제공됩니다.
        </p>
      </div>

      <div className="px-6 pb-16 pt-8 bg-white">
        <button 
          onClick={() => navigateTo(Screen.Contact)}
          className="w-full bg-primary text-white h-20 rounded-full font-black text-[17px] shadow-2xl shadow-primary/40 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
        >
          VIP 사전 상담 신청하기
          <span className="material-symbols-outlined font-black group-hover:translate-x-1 transition-transform text-[22px]">chevron_right</span>
        </button>
      </div>
    </div>
  );
};

export default Benefits;
