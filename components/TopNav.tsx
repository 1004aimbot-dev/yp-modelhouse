
import React from 'react';

interface TopNavProps {
  title: string;
  onBack: () => void;
  onMenu?: () => void;
  onShare?: () => void;
  dark?: boolean;
}

const TopNav: React.FC<TopNavProps> = ({ title, onBack, onMenu, onShare, dark = false }) => {
  return (
    <nav className={`sticky top-0 z-50 flex items-center px-2 py-3 justify-between border-b ${dark ? 'bg-black/90 text-white border-white/10' : 'bg-white/90 text-text-main border-gray-100'} backdrop-blur-xl`}>
      <button 
        onClick={onBack} 
        className="size-12 flex items-center justify-center active:scale-90 transition-transform"
        aria-label="뒤로 가기"
      >
        <span className="material-symbols-outlined text-[28px] font-light">chevron_left</span>
      </button>
      
      <h2 className="text-[15px] font-bold tracking-[0.15em] text-center flex-1 uppercase opacity-90 truncate px-2">
        {title}
      </h2>
      
      <div className="flex items-center gap-1 pr-2">
        {onShare && (
          <button 
            className="size-10 flex items-center justify-center material-symbols-outlined text-primary text-[22px] active:scale-90 transition-transform" 
            onClick={onShare}
          >
            share
          </button>
        )}
        {onMenu && (
          <button 
            onClick={onMenu}
            className="size-10 flex items-center justify-center bg-gray-50 rounded-full text-primary active:scale-90 transition-transform shadow-sm"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>
        )}
        {!onMenu && !onShare && <div className="size-10" />}
      </div>
    </nav>
  );
};

export default TopNav;
