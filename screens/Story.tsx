
import React from 'react';
import { Screen } from '../types';
import TopNav from '../components/TopNav';

interface StoryProps {
  navigateTo: (screen: Screen) => void;
  goBack: () => void;
}

const Story: React.FC<StoryProps> = ({ navigateTo, goBack }) => {
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop";
  };

  return (
    <div className="flex flex-col bg-white overflow-x-hidden pb-8">
      <TopNav title="브랜드 스토리" onBack={goBack} />
      
      {/* SECTION 01: 전망 섹션 */}
      <div className="px-8 pt-6 pb-4 text-center">
        <span className="text-primary text-[8px] font-black tracking-[0.4em] uppercase mb-1.5 block opacity-60">Section 01</span>
        <h1 className="text-[24px] font-black leading-tight tracking-tighter text-text-main">
          전망은 옵션이<br/><span className="text-primary italic">아닙니다</span>
        </h1>
        <div className="w-6 h-[2px] bg-primary mx-auto mt-3 opacity-30"></div>
      </div>

      <section className="px-5 mb-8">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] shadow-2xl mb-5 border-4 border-white">
          <img 
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop" 
            alt="Premium Village View" 
            className="w-full h-full object-cover"
            onError={handleImgError}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60"></div>
          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-white text-base font-bold tracking-tight">거실에서 누리는 북한강의 사계</p>
          </div>
        </div>
        
        <div className="space-y-3 text-center px-4">
          <p className="text-text-main text-[15px] leading-relaxed font-black">
            이 단지는 ‘전원주택’이 아니라<br/>
            하루의 배경을 바꾸는 선택입니다.
          </p>
          <ul className="space-y-0.5 text-text-sub text-[13px] font-medium opacity-70">
            <li>• 거실에서 내려다보이는 북한강</li>
            <li>• 계절마다 색이 달라지는 풍경</li>
            <li>• 창을 여는 순간 느껴지는 여백</li>
          </ul>
          <p className="text-primary font-black text-[16px] pt-0.5 underline underline-offset-4 decoration-primary/20">👉 이건 조망이 아니라 일상입니다.</p>
        </div>
      </section>

      {/* SECTION 04: 단지 설계 철학 */}
      <section className="bg-gray-50/50 px-5 py-8 border-y border-gray-100/50">
        <div className="text-center mb-6">
          <span className="text-primary text-[8px] font-black tracking-[0.4em] uppercase mb-1 block opacity-60">Section 04</span>
          <h2 className="text-[22px] font-black text-text-main tracking-tighter leading-tight">보여주기보다<br/>오래 살기 위해</h2>
        </div>

        <div className="mb-6 px-1">
          <div className="aspect-video w-full rounded-[24px] overflow-hidden shadow-lg border-[4px] border-white">
            <img 
              src="https://images.unsplash.com/photo-1600607687946-4740523ec366?q=80&w=1200&auto=format&fit=crop" 
              alt="Architecture Detail" 
              className="w-full h-full object-cover"
              onError={handleImgError}
            />
          </div>
          <p className="text-center text-[10px] text-gray-400 mt-2.5 font-bold tracking-tight opacity-70">지속 가능한 삶을 위한 정교한 마감</p>
        </div>
        
        <div className="grid grid-cols-1 gap-2 px-1">
          {[
            { title: "전 세대 정남향 배치", desc: "하루 종일 채광이 머무는 따뜻한 집", icon: "sunny" },
            { title: "관리 부담 최소화", desc: "컴팩트한 설계로 유지 보수의 편리함", icon: "construction" },
            { title: "프라이빗한 거리", desc: "단지형이지만 과하지 않은 이웃과의 거리", icon: "compress" },
            { title: "유니버설 동선", desc: "나이 들어도 불편함 없는 배리어 프리", icon: "accessible" }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded-[20px] border border-gray-100 shadow-sm flex items-center gap-3.5 active:scale-[0.98] transition-all">
              <div className="size-9 bg-gray-50 rounded-lg flex items-center justify-center text-primary/60 shrink-0">
                <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
              </div>
              <div>
                <h4 className="font-black text-[14px] text-text-main leading-none mb-1">{item.title}</h4>
                <p className="text-text-sub text-[11px] font-medium opacity-60 leading-tight">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="px-6 mt-12 pb-8">
        <button 
          onClick={() => navigateTo(Screen.Location)}
          className="w-full bg-primary text-white h-20 rounded-full font-black text-[16px] shadow-2xl shadow-primary/30 active:scale-[0.97] transition-all flex items-center justify-center gap-2 group"
        >
          거리 및 입지 확인하기
          <span className="material-symbols-outlined font-black group-hover:translate-x-1 transition-transform text-[20px]">chevron_right</span>
        </button>
      </div>
    </div>
  );
};

export default Story;
