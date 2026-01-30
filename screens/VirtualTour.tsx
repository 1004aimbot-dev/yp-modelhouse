
import React, { useState, useRef } from 'react';
import { Screen } from '../types';
import TopNav from '../components/TopNav';

interface AreaInfo {
  id: string;
  name: string;
  icon: string;
  image: string;
  hotspots: {
    top: string;
    left: string;
    title: string;
    desc: string;
  }[];
}

const AREAS: AreaInfo[] = [
  {
    id: 'living',
    name: '거실',
    icon: 'chair',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200',
    hotspots: [
      { top: '45%', left: '35%', title: '이태리 천연 가죽 소파', desc: '내구성이 뛰어난 프리미엄 가죽으로 제작되어 최상의 착좌감을 제공합니다.' },
      { top: '30%', left: '70%', title: '친환경 우드 실링팬', desc: '에너지 효율을 높여주는 저소음 실링팬으로 쾌적한 공기 순환을 도와줍니다.' }
    ]
  },
  {
    id: 'kitchen',
    name: '주방',
    icon: 'cooking',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=1200',
    hotspots: [
      { top: '50%', left: '50%', title: '대리석 아일랜드 식탁', desc: '스크래치에 강한 최고급 엔지니어드 소톤 마감으로 요리의 즐거움을 더합니다.' }
    ]
  },
  {
    id: 'bedroom',
    name: '침실',
    icon: 'bed',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1200',
    hotspots: [
      { top: '40%', left: '55%', title: '호텔식 침구 시스템', desc: '최고급 구스 다운 베딩과 간접 조명으로 완성된 완벽한 숙면 공간입니다.' }
    ]
  },
  {
    id: 'bathroom',
    name: '화장실',
    icon: 'bathtub',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200',
    hotspots: [
      { top: '45%', left: '40%', title: '스마트 거울 터치 조명', desc: '터치 한 번으로 조도를 조절할 수 있는 김서림 방지 기능의 스마트 거울입니다.' }
    ]
  },
  {
    id: 'exterior',
    name: '외관',
    icon: 'home',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
    hotspots: [
      { top: '55%', left: '45%', title: '단독 프라이빗 테라스', desc: '나만의 작은 정원을 가꿀 수 있는 독립적인 실외 데크 공간입니다.' }
    ]
  }
];

interface VirtualTourProps {
  navigateTo: (screen: Screen) => void;
  goBack: () => void;
}

const VirtualTour: React.FC<VirtualTourProps> = ({ navigateTo, goBack }) => {
  const [activeArea, setActiveArea] = useState<AreaInfo>(AREAS[0]);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isImgLoading, setIsImgLoading] = useState(true);
  const startPos = useRef({ x: 0, y: 0 });

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    startPos.current = { x: clientX - offset.x, y: clientY - offset.y };
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const newX = Math.max(-100, Math.min(100, clientX - startPos.current.x));
    const newY = Math.max(-60, Math.min(60, clientY - startPos.current.y));
    
    setOffset({ x: newX, y: newY });
  };

  const handleEnd = () => setIsDragging(false);

  const handleAreaChange = (area: AreaInfo) => {
    if (area.id === activeArea.id) return;
    setIsImgLoading(true);
    setActiveArea(area);
    setActiveHotspot(null);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a] select-none overflow-hidden">
      <TopNav title="15평형 VR 투어" onBack={goBack} />
      
      {/* 구역 선택 탭 */}
      <div className="bg-white px-4 py-4 border-b border-gray-100 overflow-x-auto no-scrollbar shrink-0">
        <div className="flex gap-2 min-w-max justify-center">
          {AREAS.map(area => (
            <button 
              key={area.id}
              onClick={() => handleAreaChange(area)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-bold transition-all ${
                activeArea.id === area.id 
                ? 'bg-primary text-white shadow-lg scale-105' 
                : 'bg-white text-gray-400 border border-gray-100'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{area.icon}</span>
              {area.name}
            </button>
          ))}
        </div>
      </div>

      {/* VR 뷰어 메인 */}
      <div 
        className="relative flex-1 bg-gray-900 overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      >
        {/* 로딩 인디케이터 - 투명 배경 오버레이 */}
        {isImgLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-[40] bg-black/30 backdrop-blur-sm pointer-events-none transition-opacity duration-300">
            <div className="w-12 h-12 border-4 border-white/20 border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="text-white text-[11px] font-black tracking-[0.2em] uppercase">Loading Space...</p>
          </div>
        )}

        {/* 이미지 컨테이너 - 확실한 가시성 확보 */}
        <div 
          className="absolute w-[130%] h-[130%] top-[-15%] left-[-15%] will-change-transform"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        >
          <img 
            key={activeArea.image} 
            src={activeArea.image} 
            alt={activeArea.name} 
            className="w-full h-full object-cover transition-opacity duration-500"
            onLoad={() => setIsImgLoading(false)}
            onError={() => setIsImgLoading(false)}
            draggable={false}
          />
          
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />

          {/* 핫스팟 */}
          {activeArea.hotspots.map((spot, index) => (
            <div 
              key={`${activeArea.id}-spot-${index}`}
              className="absolute"
              style={{ top: spot.top, left: spot.left }}
            >
              <div className="relative flex flex-col items-center">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveHotspot(activeHotspot === index ? null : index);
                  }}
                  className={`size-11 rounded-full flex items-center justify-center transition-all ${
                    activeHotspot === index ? 'bg-white text-primary rotate-45' : 'bg-primary/90 text-white'
                  } border-2 border-white shadow-xl active:scale-90`}
                >
                  <span className="material-symbols-outlined text-[24px] font-bold">add</span>
                </button>

                {activeHotspot === index && (
                  <div className="absolute bottom-14 w-52 bg-white/95 backdrop-blur-xl p-5 rounded-[24px] shadow-2xl border border-white animate-in fade-in zoom-in-95 duration-200 z-50">
                    <p className="text-primary text-[10px] font-black uppercase tracking-widest mb-1">Room Info</p>
                    <p className="text-[15px] font-black text-[#1A1A1A] mb-1 tracking-tight">{spot.title}</p>
                    <p className="text-[12px] text-gray-500 leading-relaxed font-medium">{spot.desc}</p>
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/95 rotate-45 border-r border-b border-gray-100"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 드래그 안내 */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 bg-black/40 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 pointer-events-none z-30">
          <span className="material-symbols-outlined text-white text-[18px] animate-pulse">360</span>
          <p className="text-white text-[11px] font-bold">화면을 드래그하여 둘러보세요</p>
        </div>
      </div>

      {/* 하단 설명 카드 - 내부 여백 조정하여 버튼 폭 통일 */}
      <div className="bg-white px-6 pt-8 pb-12 rounded-t-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] shrink-0 z-40 border-t border-gray-50">
        <div className="px-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col">
              <span className="text-primary text-[11px] font-black uppercase tracking-wider mb-0.5">Premium Architecture</span>
              <h3 className="text-[24px] font-black text-[#1A1A1A] tracking-tighter">{activeArea.name} 미리보기</h3>
            </div>
            <div className="size-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400">
              <span className="material-symbols-outlined text-[24px]">{activeArea.icon}</span>
            </div>
          </div>
          
          <p className="text-gray-500 text-[14px] leading-relaxed mb-8 font-medium">
            최고급 자재로 마감된 실제 내부 모습을 확인하세요.<br/>
            <b>상단 메뉴</b>를 통해 다른 공간으로 즉시 이동 가능합니다.
          </p>
        </div>

        {/* 하단 버튼 - 폭과 높이 통일 */}
        <button 
          onClick={() => navigateTo(Screen.Contact)}
          className="w-full bg-primary text-white h-20 rounded-[24px] font-black text-[17px] flex items-center justify-center gap-2 shadow-xl shadow-primary/20 active:scale-[0.98] transition-all"
        >
          실물 투어 사전 예약하기
          <span className="material-symbols-outlined font-black">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default VirtualTour;
