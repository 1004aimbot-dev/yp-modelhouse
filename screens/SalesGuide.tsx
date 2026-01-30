
import React from 'react';
import { Screen } from '../types';
import TopNav from '../components/TopNav';

interface SalesGuideProps {
  navigateTo: (screen: Screen) => void;
  goBack: () => void;
  toggleMenu: () => void;
}

const SalesGuide: React.FC<SalesGuideProps> = ({ navigateTo, goBack, toggleMenu }) => {
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop";
  };

  const steps = [
    {
      id: '01',
      title: '사전 의향 및 가치관 확인',
      subtitle: 'Premium Interest Review',
      desc: '불특정 다수를 향한 홍보를 지향하지 않습니다. 브랜드의 미니멀리즘 철학에 공감하고, 자연과의 공존을 원하는 고객님들의 사전 상담 의향을 먼저 검토합니다.',
      icon: 'fact_check',
      img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: '02',
      title: '1:1 라이프스타일 큐레이션',
      subtitle: 'Curated Matching Session',
      desc: '단순한 평수 선택이 아닌, 고객님의 일상과 가장 조화로운 타입과 필지를 제안합니다. 정원 관리 성향부터 업무 환경까지 고려한 정밀한 매칭 상담이 진행됩니다.',
      icon: 'architecture',
      img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: '03',
      title: '커뮤니티 입주 최종 초청',
      subtitle: 'Selected Final Invitation',
      desc: '단지의 정온함과 수준 높은 커뮤니티 유지를 위해 최종 입주자를 정중히 모십니다. 이웃과의 조화로운 삶을 지향하는 분들만이 누릴 수 있는 마지막 승인 단계입니다.',
      icon: 'verified',
      img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop'
    }
  ];

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <TopNav title="분양 방식 및 철학" onBack={goBack} onMenu={toggleMenu} />
      
      <div className="px-6 py-14">
        <header className="text-center mb-20">
          <span className="text-primary text-[10px] font-black tracking-[0.4em] uppercase mb-4 block opacity-60">Curated Neighborhood</span>
          <h2 className="text-[34px] font-black text-text-main leading-tight tracking-tighter mb-8">
            집을 고르는 것이 아닌,<br/>
            <span className="text-primary italic underline underline-offset-8 decoration-primary/10">삶의 동료</span>를 찾는 과정
          </h2>
          <div className="bg-gray-50/80 backdrop-blur-sm p-6 rounded-[32px] border border-gray-100 max-w-[340px] mx-auto shadow-sm">
             <p className="text-text-sub text-[14px] font-medium leading-relaxed opacity-90">
                “양평 리빙 컴팩트 빌리지는 단순히 건물을 팔지 않습니다. 우리는 같은 가치를 공유하는 정온한 이웃들의 커뮤니티를 큐레이션합니다.”
             </p>
          </div>
        </header>

        <div className="space-y-24">
          {steps.map((step, idx) => (
            <div key={step.id} className="relative group">
              <div className="flex flex-col items-center mb-10">
                <div className="size-16 bg-primary text-white rounded-[24px] flex items-center justify-center text-[22px] font-black shadow-2xl shadow-primary/30 mb-6 transform group-hover:rotate-12 transition-transform duration-500">
                  {step.id}
                </div>
                <div className="text-center">
                  <p className="text-primary text-[11px] font-black uppercase tracking-widest mb-1">{step.subtitle}</p>
                  <h3 className="text-[24px] font-black text-text-main tracking-tight">{step.title}</h3>
                </div>
              </div>

              <div className="relative rounded-[48px] overflow-hidden shadow-2xl border border-gray-100">
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={step.img} 
                    alt={step.title} 
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                    onError={handleImgError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40"></div>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-8 bg-white/95 backdrop-blur-md border-t border-gray-100">
                  <p className="text-text-sub text-[15px] leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>
              </div>
              
              {idx !== steps.length - 1 && (
                <div className="flex justify-center mt-20">
                  <div className="w-px h-16 bg-gradient-to-b from-primary/40 to-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-32 p-12 bg-[#1A1A1A] rounded-[56px] text-center shadow-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-5">
            <span className="material-symbols-outlined text-[160px] text-white">shield_with_heart</span>
          </div>
          
          <div className="relative z-10">
            <h4 className="text-[22px] font-black text-white mb-6 tracking-tighter">오직 선별된 소수에게만<br/>허락된 정온한 일상</h4>
            <p className="text-gray-400 text-[14px] leading-relaxed font-medium mb-10">
              우리는 이웃을 선택할 수 있는 권리를 입주자에게 드립니다.<br/>
              소음과 무분별한 유입에서 자유로운,<br/>
              완벽하게 보호된 당신만의 영지(Domain)를 지켜드립니다.
            </p>
            <div className="inline-flex items-center gap-2 bg-primary/20 px-5 py-2 rounded-full border border-primary/30">
               <span className="size-2 bg-primary rounded-full animate-pulse"></span>
               <span className="text-primary text-[12px] font-black tracking-widest uppercase">Member Only</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-20 pt-6 bg-white sticky bottom-0 border-t border-gray-50 backdrop-blur-md z-40">
        <button 
          onClick={() => navigateTo(Screen.Contact)}
          className="w-full bg-primary text-white h-20 rounded-[24px] font-black text-[18px] shadow-2xl shadow-primary/40 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
        >
          사전 의향서 제출하기
          <span className="material-symbols-outlined font-black group-hover:translate-x-1 transition-transform text-[24px]">send</span>
        </button>
        <p className="text-center text-[11px] text-gray-400 mt-5 font-bold opacity-60">
          ※ 제출된 의향서는 프라이빗 매칭을 위한 기초 자료로만 활용됩니다.
        </p>
      </div>
    </div>
  );
};

export default SalesGuide;
