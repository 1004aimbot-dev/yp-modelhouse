
import React from 'react';
import { Screen } from '../types';
import TopNav from '../components/TopNav';

interface StoryProps {
  navigateTo: (screen: Screen) => void;
  goBack: () => void;
  toggleMenu: () => void;
}

const Story: React.FC<StoryProps> = ({ navigateTo, goBack, toggleMenu }) => {
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop";
  };

  return (
    <div className="flex flex-col bg-white overflow-x-hidden pb-12">
      <TopNav title="브랜드 스토리" onBack={goBack} onMenu={toggleMenu} />
      
      {/* SECTION 01: 전망 섹션 */}
      <div className="px-8 pt-10 pb-6 text-center">
        <span className="text-primary text-[10px] font-black tracking-[0.4em] uppercase mb-2 block opacity-60">Section 01</span>
        <h1 className="text-[28px] font-black leading-tight tracking-tighter text-text-main">
          전망은 옵션이<br/><span className="text-primary italic">아닙니다</span>
        </h1>
        <div className="w-8 h-[2px] bg-primary mx-auto mt-4 opacity-30"></div>
      </div>

      <section className="px-5 mb-12">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[40px] shadow-2xl mb-6 border-4 border-white">
          <img 
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop" 
            alt="Premium Village View" 
            className="w-full h-full object-cover"
            onError={handleImgError}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
          <div className="absolute bottom-8 left-8 right-8">
            <p className="text-white text-lg font-black tracking-tight drop-shadow-lg">거실에서 누리는 북한강의 사계</p>
          </div>
        </div>
        
        <div className="space-y-4 text-center px-6">
          <p className="text-text-main text-[16px] leading-relaxed font-black">
            이 단지는 ‘전원주택’이 아니라<br/>
            하루의 배경을 바꾸는 선택입니다.
          </p>
          <ul className="space-y-1 text-text-sub text-[14px] font-medium opacity-80">
            <li>• 거실에서 파노라마로 펼쳐지는 북한강</li>
            <li>• 미세먼지 걱정 없는 깨끗한 숲의 공기</li>
            <li>• 창을 여는 순간 일상이 예술이 됩니다</li>
          </ul>
        </div>
      </section>

      {/* SECTION 02: 왜 서종인가? (양평의 강남) */}
      <section className="bg-gray-50/70 px-6 py-16 border-y border-gray-100/50">
        <div className="text-center mb-10">
          <span className="text-primary text-[10px] font-black tracking-[0.4em] uppercase mb-2 block opacity-60">Section 02</span>
          <h2 className="text-[26px] font-black text-text-main tracking-tighter leading-tight">양평의 강남, 서종<br/>그 이름이 보증하는 가치</h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100">
            <div className="flex items-start gap-4 mb-4">
              <div className="size-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[24px]">trending_up</span>
              </div>
              <div>
                <h4 className="font-black text-[17px] mb-1">독보적인 지가 상승률</h4>
                <p className="text-text-sub text-[13px] leading-relaxed font-medium">서종면은 양평 내에서도 가장 높은 공시지가와 실거래가를 기록하는 지역입니다. 자연을 누리면서도 자산 가치는 지켜냅니다.</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100">
            <div className="flex items-start gap-4 mb-4">
              <div className="size-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[24px]">distance</span>
              </div>
              <div>
                <h4 className="font-black text-[17px] mb-1">서울 20분대의 기적</h4>
                <p className="text-text-sub text-[13px] leading-relaxed font-medium">서종 IC를 통해 서울 강남권까지 30분대 진입이 가능합니다. 주말용 별장이 아닌, 매일의 출퇴근이 가능한 완벽한 'First Home'입니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03: 하이엔드 인프라 (테라로사, 서종초) */}
      <section className="px-6 py-16">
        <div className="text-center mb-10">
          <span className="text-primary text-[10px] font-black tracking-[0.4em] uppercase mb-2 block opacity-60">Section 03</span>
          <h2 className="text-[26px] font-black text-text-main tracking-tighter leading-tight">문화와 교육이 흐르는<br/>우아한 공동체</h2>
        </div>

        <div className="relative rounded-[40px] overflow-hidden mb-8 shadow-xl">
          <img 
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200" 
            alt="Seojong Culture" 
            className="w-full aspect-video object-cover"
            onError={handleImgError}
          />
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <p className="text-[11px] font-black uppercase tracking-widest opacity-80 mb-1">Cultural Life</p>
            <p className="text-[18px] font-black">테라로사, 구하우스 갤러리가 이웃입니다</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="size-10 bg-gray-50 rounded-xl flex items-center justify-center text-primary/60 shrink-0">
              <span className="material-symbols-outlined text-[20px]">school</span>
            </div>
            <div>
              <h5 className="font-black text-[16px] mb-1">명문 혁신학교, 서종초등학교</h5>
              <p className="text-text-sub text-[13px] leading-relaxed font-medium">자연 속 창의 교육으로 유명한 서종초등학교 학군으로, 아이들에게 정서적 풍요로움과 높은 수준의 교육 환경을 선물합니다.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="size-10 bg-gray-50 rounded-xl flex items-center justify-center text-primary/60 shrink-0">
              <span className="material-symbols-outlined text-[20px]">palette</span>
            </div>
            <div>
              <h5 className="font-black text-[16px] mb-1">예술인과 지식인의 마을</h5>
              <p className="text-text-sub text-[13px] leading-relaxed font-medium">서종면은 작가, 예술가, 전문직 종사자들이 모여 사는 곳입니다. 수준 높은 이웃과 함께하는 정온한 커뮤니티를 누리십시오.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 04: 단지 설계 철학 (기존 섹션 확장) */}
      <section className="bg-primary/5 px-6 py-16 border-t border-primary/10">
        <div className="text-center mb-10">
          <span className="text-primary text-[10px] font-black tracking-[0.4em] uppercase mb-2 block opacity-60">Section 04</span>
          <h2 className="text-[26px] font-black text-text-main tracking-tighter leading-tight">보여주기보다<br/>오래 살기 위해</h2>
        </div>

        <div className="mb-8 px-1">
          <div className="aspect-video w-full rounded-[32px] overflow-hidden shadow-2xl border-[6px] border-white">
            <img 
              src="https://images.unsplash.com/photo-1600607687946-4740523ec366?q=80&w=1200&auto=format&fit=crop" 
              alt="Architecture Detail" 
              className="w-full h-full object-cover"
              onError={handleImgError}
            />
          </div>
          <p className="text-center text-[12px] text-gray-400 mt-4 font-black tracking-tight opacity-70">지속 가능한 삶을 위한 정교한 마감</p>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {[
            { title: "전 세대 정남향 배치", desc: "하루 종일 채광이 머무는 따뜻한 집", icon: "sunny" },
            { title: "관리 부담 최소화", desc: "컴팩트한 설계로 유지 보수의 편리함", icon: "construction" },
            { title: "완벽한 프라이버시", desc: "단지형 관리와 독립적인 시야 확보의 조화", icon: "security" },
            { title: "배리어 프리 동선", desc: "나이 들어도 불편함 없는 유니버설 디자인", icon: "accessible" }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-5 rounded-[28px] border border-gray-100 shadow-sm flex items-center gap-4 active:scale-[0.98] transition-all">
              <div className="size-11 bg-gray-50 rounded-2xl flex items-center justify-center text-primary/70 shrink-0 shadow-inner">
                <span className="material-symbols-outlined text-[20px] font-black">{item.icon}</span>
              </div>
              <div>
                <h4 className="font-black text-[15px] text-text-main leading-none mb-1.5">{item.title}</h4>
                <p className="text-text-sub text-[12px] font-medium opacity-70 leading-tight">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 마지막 맺음말 섹션 */}
      <section className="px-10 py-20 text-center">
        <h3 className="text-[22px] font-black text-text-main leading-snug tracking-tighter mb-4">
          우리는 당신의 삶에<br/>
          가장 어울리는 배경을 짓습니다
        </h3>
        <p className="text-text-sub text-[14px] font-medium opacity-60 leading-relaxed mb-10">
          단순한 집 그 이상의 가치,<br/>
          양평 리빙 컴팩트 빌리지가 완성합니다.
        </p>

        <button 
          onClick={() => navigateTo(Screen.Location)}
          className="w-full bg-primary text-white h-20 rounded-full font-black text-[17px] shadow-2xl shadow-primary/30 active:scale-[0.97] transition-all flex items-center justify-center gap-3 group"
        >
          입지 및 거리 상세 확인
          <span className="material-symbols-outlined font-black group-hover:translate-x-1 transition-transform text-[22px]">chevron_right</span>
        </button>
      </section>
    </div>
  );
};

export default Story;
