
import React from 'react';
import { Screen } from '../types';
import TopNav from '../components/TopNav';

interface StoryProps {
  navigateTo: (screen: Screen) => void;
  goBack: () => void;
}

const Story: React.FC<StoryProps> = ({ navigateTo, goBack }) => {
  return (
    <div className="flex flex-col bg-white overflow-x-hidden">
      <TopNav title="브랜드 스토리" onBack={goBack} />
      
      {/* SECTION 01: 전망은 옵션이 아닙니다 */}
      <div className="px-6 pt-12 pb-16 text-center">
        <span className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase mb-4 block">Section 01</span>
        <h1 className="text-[32px] font-black leading-tight tracking-tight text-text-main animate-in fade-in slide-in-from-bottom-4 duration-700">
          전망은 옵션이<br/><span className="text-primary">아닙니다</span>
        </h1>
        <div className="w-12 h-[1px] bg-primary mx-auto mt-8 opacity-50"></div>
      </div>

      <section className="px-6 mb-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] shadow-xl mb-8">
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000" 
            alt="Bukhangang View" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-8 left-8">
            <p className="text-white text-xl font-bold">거실에서 누리는 북한강의 사계</p>
          </div>
        </div>
        <div className="space-y-6 text-center">
          <p className="text-text-main text-[18px] leading-relaxed font-bold">
            이 단지는 ‘전원주택’이 아니라<br/>
            하루의 배경을 바꾸는 선택입니다.
          </p>
          <ul className="space-y-2 text-text-sub text-[16px]">
            <li>• 거실에서 내려다보이는 북한강</li>
            <li>• 계절마다 색이 달라지는 풍경</li>
            <li>• 창을 여는 순간 느껴지는 여백</li>
          </ul>
          <p className="text-primary font-black text-xl">👉 이건 조망이 아니라 일상입니다.</p>
        </div>
      </section>

      {/* SECTION 04: 단지 설계 철학 */}
      <section className="bg-gray-50 px-6 py-20 border-y border-gray-100">
        <div className="text-center mb-12">
          <span className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase mb-2 block">Section 04</span>
          <h2 className="text-[28px] font-black text-text-main">보여주기보다<br/>오래 살기 위해</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {[
            { title: "전 세대 정남향 배치", desc: "하루 종일 채광이 머무는 따뜻한 집" },
            { title: "관리 부담 최소화", desc: "컴팩트한 설계로 유지 보수의 편리함" },
            { title: "프라이빗한 거리", desc: "단지형이지만 과하지 않은 이웃과의 거리" },
            { title: "유니버설 동선", desc: "나이 들어도 불편함 없는 배리어 프리" }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h4 className="font-black text-lg mb-1">{item.title}</h4>
              <p className="text-text-sub text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
        
        <p className="mt-10 text-center text-text-main font-bold text-lg">
          👉 혼자 살아도, 함께 살아도<br/>무리 없는 집
        </p>
      </section>

      {/* 하단 버튼 - 폭과 높이 통일 */}
      <div className="px-6 pb-12 mt-8">
        <button 
          onClick={() => navigateTo(Screen.Location)}
          className="w-full bg-primary text-white h-20 rounded-[24px] font-black text-[18px] shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          거리 및 입지 확인하기
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default Story;
