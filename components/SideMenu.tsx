
import React, { useState, useEffect } from 'react';
import { Screen, ConsultationRequest } from '../types';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose, currentScreen, onNavigate }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const checkUnread = () => {
      const data = localStorage.getItem('consultations');
      if (data) {
        try {
          const consultations: ConsultationRequest[] = JSON.parse(data);
          const count = consultations.filter(c => c.isRead === false).length;
          setUnreadCount(count);
        } catch (e) {
          setUnreadCount(0);
        }
      }
    };

    if (isOpen) {
      checkUnread();
    }
  }, [isOpen]);

  const menuItems = [
    { id: Screen.Home, label: '홈', icon: 'home' },
    { id: Screen.Chat, label: 'AI VIP 상담', icon: 'smart_toy' },
    { id: Screen.Story, label: '브랜드 스토리', icon: 'auto_stories' },
    { id: Screen.Location, label: '입지 안내', icon: 'location_on' },
    { id: Screen.Types, label: '주택 타입', icon: 'villa' },
    { id: Screen.VirtualTour, label: '가상 투어', icon: 'view_in_ar' },
    { id: Screen.Benefits, label: 'VIP 혜택 안내', icon: 'workspace_premium' },
    { id: Screen.Contact, label: '상담 신청하기', icon: 'event_available' },
  ];

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      <div 
        className={`fixed top-0 left-0 bottom-0 w-[80%] max-w-[340px] bg-white z-[101] shadow-2xl transition-transform duration-500 ease-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase">Premium Living</p>
            <h2 className="text-xl font-bold tracking-tight mt-1">양평 리빙 빌리지</h2>
          </div>
          <button onClick={onClose} className="size-10 flex items-center justify-center text-text-sub">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto no-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all ${
                currentScreen === item.id 
                ? 'bg-primary/10 text-primary font-bold shadow-sm shadow-primary/5' 
                : 'text-text-main hover:bg-gray-50'
              }`}
            >
              <span className={`material-symbols-outlined ${currentScreen === item.id ? 'fill-1' : ''}`}>
                {item.icon}
              </span>
              <span className="text-base tracking-tight">{item.label}</span>
              {currentScreen === item.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
            </button>
          ))}
        </div>

        <div className="p-8 bg-gray-50 border-t border-gray-100">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 opacity-60">
              <span className="material-symbols-outlined text-sm">call</span>
              <span className="text-xs font-bold tracking-widest">분양 문의 1588-0000</span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-[10px] text-text-sub leading-relaxed">
                Copyright © 2024 양평 리빙.<br/>All rights reserved.
              </p>
              
              <button 
                onClick={() => onNavigate(Screen.Admin)}
                className="relative text-[10px] font-bold text-gray-400 hover:text-primary transition-colors flex items-center gap-1 group"
              >
                <span className="material-symbols-outlined text-[14px]">admin_panel_settings</span>
                관리자
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] size-4 rounded-full flex items-center justify-center font-black animate-bounce shadow-sm">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
