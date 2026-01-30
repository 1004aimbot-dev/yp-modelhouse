
import React from 'react';
import { Screen } from '../types';
import TopNav from '../components/TopNav';
import { HOUSE_TYPES } from '../constants';

interface TypesProps {
  navigateTo: (screen: Screen) => void;
  goBack: () => void;
  toggleMenu: () => void;
}

const Types: React.FC<TypesProps> = ({ navigateTo, goBack, toggleMenu }) => {
  return (
    <div className="flex flex-col bg-bg-light min-h-screen">
      <TopNav title="평형 및 가격 안내" onBack={goBack} onMenu={toggleMenu} />
      
      <header className="px-6 pt-12 pb-10 text-center bg-white border-b border-gray-100">
        <span className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase mb-4 block">Section 05</span>
        <h3 className="text-[30px] font-black leading-tight tracking-tight text-text-main">소형이지만,<br/><span className="text-primary">가볍지 않습니다</span></h3>
        
        <div className="mt-8 flex justify-center gap-4">
          <div className="text-center">
            <p className="text-[11px] text-gray-400 font-bold uppercase mb-1">Scale</p>
            <p className="text-lg font-black text-text-main">12 / 15 / 20평</p>
          </div>
          <div className="w-px h-8 bg-gray-100 self-end mb-2"></div>
          <div className="text-center">
            <p className="text-[11px] text-gray-400 font-bold uppercase mb-1">Price</p>
            <p className="text-lg font-black text-primary">2억 ~ 3억 5천</p>
          </div>
        </div>
      </header>

      <div className="space-y-10 py-10 pb-44">
        {HOUSE_TYPES.map(type => (
          <div key={type.id} className="px-6">
            <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
              <div className="relative aspect-[1.6]">
                <img src={type.img} alt={type.name} className="w-full h-full object-cover" />
                <div className="absolute top-5 left-5 bg-white/90 px-4 py-1.5 rounded-full text-[11px] font-black text-primary border border-primary/20">
                  TYPE {type.id}
                </div>
              </div>

              <div className="p-8">
                <h4 className="text-2xl font-black text-text-main mb-2">{type.name}</h4>
                <p className="text-text-sub text-sm leading-relaxed mb-6">{type.desc}</p>
                
                <div className="mb-8 p-4 bg-gray-50 rounded-[24px] border border-gray-100">
                  <div className="flex items-center justify-between mb-4 px-2">
                    <span className="text-[11px] font-black text-primary uppercase tracking-widest">Architectural Floor Plan</span>
                    <span className="material-symbols-outlined text-gray-300 text-[18px]">floor_plan</span>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-100 overflow-hidden p-4 shadow-inner">
                    <img 
                      src={type.floorPlanImg} 
                      alt={`${type.name} 평면도`} 
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-50 pt-6">
                  <span className="text-xl font-black text-primary">{type.size}</span>
                  <button 
                    onClick={() => navigateTo(Screen.VirtualTour)}
                    className="text-primary text-sm font-bold flex items-center gap-1 group"
                  >
                    3D VR 투어 <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/95 backdrop-blur-md border-t border-gray-100 max-w-[480px] mx-auto z-50">
        <button 
          onClick={() => navigateTo(Screen.Benefits)}
          className="w-full bg-primary text-white h-20 rounded-full font-black text-[16px] shadow-2xl shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
        >
          나에게 맞는 혜택 확인하기
          <span className="material-symbols-outlined font-black group-hover:translate-x-1 transition-transform">chevron_right</span>
        </button>
      </div>
    </div>
  );
};

export default Types;
