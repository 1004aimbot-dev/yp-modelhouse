
import React, { useState } from 'react';
import { Screen, ConsultationRequest } from '../types';
import TopNav from '../components/TopNav';

interface ContactProps {
  navigateTo: (screen: Screen) => void;
  goBack: () => void;
}

const Contact: React.FC<ContactProps> = ({ navigateTo, goBack }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!name || !phone || !agreed) {
      alert('모든 정보를 입력하고 약관에 동의해주세요.');
      return;
    }

    const newRequest: ConsultationRequest = {
      id: Date.now().toString(),
      name,
      phone,
      date: new Date().toLocaleString('ko-KR'),
      isRead: false
    };

    const existingData = localStorage.getItem('consultations');
    const consultations = existingData ? JSON.parse(existingData) : [];
    consultations.unshift(newRequest);
    localStorage.setItem('consultations', JSON.stringify(consultations));
    
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white px-8 text-center animate-in fade-in duration-500">
        <div className="size-20 bg-primary rounded-full flex items-center justify-center mb-8">
          <span className="material-symbols-outlined text-white text-[48px] font-bold">check</span>
        </div>
        <h2 className="text-[28px] font-black text-[#1A1A1A] mb-5 tracking-tighter">상담 신청 완료</h2>
        <p className="text-[#888888] text-[15px] font-medium leading-relaxed mb-10">
          “이 집이 맞는 분께만 안내드립니다.”<br/>
          라이프스타일 매칭을 위해 담당자가<br/>곧 연락드리겠습니다.
        </p>
        <button onClick={() => navigateTo(Screen.Home)} className="bg-primary text-white px-12 h-20 rounded-[24px] font-bold text-lg shadow-xl">홈으로 이동</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <TopNav title="상담 요청" onBack={goBack} />
      
      {/* SECTION 07: 분양 방식 안내 */}
      <div className="px-6 py-12 text-center border-b border-gray-50">
        <span className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase mb-4 block">Section 07</span>
        <h2 className="text-[28px] font-black text-text-main mb-6">아무에게나<br/>분양하지 않습니다</h2>
        
        <div className="space-y-4 max-w-[280px] mx-auto">
          <p className="text-text-sub text-[15px] font-medium">• 소수 우선 상담제 운영</p>
          <p className="text-text-sub text-[15px] font-medium">• 라이프스타일 기준 1:1 매칭</p>
          <p className="text-text-sub text-[15px] font-medium">• 단지 컨셉에 맞는 입주자 선별</p>
        </div>
        
        <p className="mt-8 text-primary font-black text-lg">
          “이 집이 맞는 분께만<br/>안내드립니다.”
        </p>
      </div>

      <div className="px-6 py-10 flex-1">
        <h3 className="text-2xl font-black text-text-main mb-8 leading-tight">
          이건 집이 아닙니다<br/>
          당신의 <span className="text-primary">다음 10년</span>입니다
        </h3>

        <div className="space-y-6">
          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-400 mb-2 ml-1">성함</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-16 bg-gray-50 border border-gray-100 rounded-2xl px-5 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold"
              placeholder="성함을 입력하세요"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-400 mb-2 ml-1">연락처</label>
            <input 
              type="tel" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-16 bg-gray-50 border border-gray-100 rounded-2xl px-5 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold"
              placeholder="010-0000-0000"
            />
          </div>
          <div className="flex items-center gap-3 py-4">
            <input 
              type="checkbox" 
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="size-6 accent-primary" 
              id="agree" 
            />
            <label htmlFor="agree" className="text-sm font-bold text-text-main">개인정보 수집 및 이용 동의 (필수)</label>
          </div>
        </div>
      </div>

      {/* 하단 버튼 - 폭과 높이 통일 */}
      <div className="px-6 pb-12">
        <button 
          onClick={handleSubmit}
          className="w-full bg-primary text-white h-20 rounded-[24px] font-black text-xl shadow-2xl active:scale-[0.98] transition-all"
        >
          상담 요청
        </button>
        <p className="text-center text-[11px] text-gray-400 mt-4">
          ※ 위치·가격·도면은 상담 요청자에 한해 상세 안내드립니다.
        </p>
      </div>
    </div>
  );
};

export default Contact;
